import CellModel from "./CellModel";
import { CELL_BASENUM, GRID_WIDTH, GRID_HEIGHT } from "./constValue";
import { CELL_TYPE, CELL_STATUS, ANITIME } from './typeModel'
import EffectInfo from "./EffectInfo";

export default class GameModel {
	cells: Array<Array<CellModel>> = null
	cellBgs = null
	lastPos: cc.Vec2
	cellTypeNum: number;
	cellCreateType: Array<number> = []		//生成种类
	curTime: number = 0;									//当前动物播放时间

	changeModels: CellModel[];
	effectsQueue: EffectInfo[];

	constructor() {
		this.cells = null;
		this.cellBgs = null;
		this.lastPos = cc.v2(-1, -1);
		this.cellTypeNum = 6;
		this.cellCreateType = [];
	}

	public getCells(): CellModel[][] {
		return this.cells;
	}

	// controller调用的主要入口
	// 点击某个格子
	public selectCell(pos: cc.Vec2): [CellModel[], EffectInfo[]] {
		this.changeModels = [];		// 发生改变的model，将作为返回值，给view播动作
		this.effectsQueue = []; 	// 动物消失，爆炸等特效
		let lastPos = this.lastPos;
		let delta = Math.abs(pos.x - lastPos.x) + Math.abs(pos.y - lastPos.y);
		//非相邻格子， 直接返回
		if (delta != 1) {
			this.lastPos = pos;
			return [[], []];
		}
		//当前点击的格子
		let curClickCell = this.cells[pos.y][pos.x];
		// 上一次点击的格式
		let lastClickCell = this.cells[lastPos.y][lastPos.x];

		this.exchangeCell(lastPos, pos);
		let result1 = this.checkPoint(pos.x, pos.y)[0];
		let result2 = this.checkPoint(lastPos.x, lastPos.y)[0];
		this.curTime = 0; // 动画播放的当前时间
		this.pushToChangeModels(curClickCell);
		this.pushToChangeModels(lastClickCell);
		// 判断两个是否是特殊的动物
		let isCanBomb =
			curClickCell.status == CELL_STATUS.BIRD ||
			lastClickCell.status == CELL_STATUS.BIRD;
		//不会发生消除的情况
		if (result1.length < 3 && result2.length < 3 && !isCanBomb) {
			this.exchangeCell(lastPos, pos);
			curClickCell.moveToAndBack(lastPos);
			lastClickCell.moveToAndBack(pos);
			this.lastPos = cc.v2(-1, -1);
			return [this.changeModels, []];
		}
		else {
			this.lastPos = cc.v2(-1, -1);
			curClickCell.moveTo(lastPos, this.curTime);
			lastClickCell.moveTo(pos, this.curTime);
			let checkVec2: cc.Vec2[] = [pos, lastPos];
			this.curTime += ANITIME.TOUCH_MOVE;
			this.processCrush(checkVec2);
			return [this.changeModels, this.effectsQueue];
		}
	}

	//初始化
	public init() {

		this.initCell();
		this.doWeight();

	}
	//初始化格子
	private initCell() {
		this.cells = []
		this.setCellTypeNum(this.cellTypeNum);
		for (let i = 1; i <= GRID_WIDTH; i++) {
			this.cells[i] = [];
			for (let j = 1; j <= GRID_HEIGHT; j++) {
				this.cells[i][j] = new CellModel();
			}
		}
	}

	//消除重复
	private doWeight() {

		for (let i = 1; i <= GRID_WIDTH; i++) {
			for (let j = 1; j <= GRID_HEIGHT; j++) {
				let flag = true;
				while (flag) {
					flag = false;
					this.cells[i][j].type = this.getRandomCellType();
					let result = this.checkPoint(j, i)[0];
					if (result.length > 2) {
						flag = true;
					}
					this.cells[i][j].setXY(cc.v2(j, i));
					this.cells[i][j].setStart(cc.v2(j, i));
				}
			}
		}
	}

	//检查方向
	checkWithDirection(x: number, y: number, direction: cc.Vec2[]): cc.Vec2[] {
		let queue: cc.Vec2[] = [];
		let vis: boolean[] = [];
		vis[x + y * 9] = true;
		queue.push(cc.v2(x, y));
		let front = 0;
		while (front < queue.length) {
			let point = queue[front];
			front++;
			if (this.cross(point.x, point.y) || !this.cells[point.y][point.x]) {
				continue;
			}
			let cellModel = this.cells[point.y][point.x];

			for (let i = 0; i < direction.length; i++) {
				let tmpX = point.x + direction[i].x;
				let tmpY = point.y + direction[i].y;
				if (this.cross(tmpX, tmpY)
					|| vis[tmpX + tmpY * 9]
					|| !this.cells[tmpY][tmpX]) {
					continue;
				}
				if (cellModel.type == this.cells[tmpY][tmpX].type) {
					vis[tmpX + tmpY * 9] = true;
					queue.push(cc.v2(tmpX, tmpY));
				}
			}
		}
		return queue;
	}

	//是否越界
	cross(x: number, y: number): boolean {
		return x < 1 || x > 9 || y < 1 || y > 9;
	}

	//检查范围是否可以消除
	checkPoint(x: number, y: number): [cc.Vec2[], CELL_STATUS, CELL_TYPE] {
		if (this.cross(x, y) || !this.cells[y][x]) {
			return [[], CELL_STATUS.COMMON, CELL_TYPE.EMPTY];
		}
		let rowResult: cc.Vec2[] =
			this.checkWithDirection(x, y, [cc.v2(1, 0), cc.v2(-1, 0)]);
		let colResult: cc.Vec2[] =
			this.checkWithDirection(x, y, [cc.v2(0, -1), cc.v2(0, 1)]);

		let result: cc.Vec2[] = [];
		let newCellStatus = CELL_STATUS.COMMON;

		//纵横大小大于5,则是鸟
		if (rowResult.length >= 5 || colResult.length >= 5) {
			newCellStatus = CELL_STATUS.BIRD;
		}
		//爆炸
		else if (rowResult.length >= 3 && colResult.length >= 3) {
			newCellStatus = CELL_STATUS.WRAP;
		}
		else if (rowResult.length >= 4) {
			newCellStatus = CELL_STATUS.LINE;
		}
		else if (colResult.length >= 4) {
			newCellStatus = CELL_STATUS.COLUMN;
		}
		//基础消除
		if (rowResult.length >= 3) {
			result = rowResult;
		}
		if (colResult.length >= 3) {
			//复制一份数据
			let tmp = result.concat();
			//过滤重复的方格
			for (let newEle of colResult) {
				let flag = false;
				for (let oldEle of tmp) {
					if (newEle.x == oldEle.x && newEle.y == oldEle.y) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					result.push(newEle);
				}
			}
		}
		return [result, newCellStatus, this.cells[y][x].type];
	}

	checkType(x: number, y: number): CELL_TYPE {
		return this.cells[y][x].type;
	}

	// 消除
	processCrush(checkVec2: cc.Vec2[]) {
		let cycleCount = 0;
		while (checkVec2.length > 0) {
			let bombModels: CellModel[] = [];
			//特殊消除
			if (cycleCount == 0 && checkVec2.length == 2) {
				let pos1 = checkVec2[0];
				let pos2 = checkVec2[1];
				let model1 = this.cells[pos1.y][pos1.x];
				let model2 = this.cells[pos2.y][pos2.x];

				//如果是鸟
				if (model1.status == CELL_STATUS.BIRD) {
					model1.type = model2.type;
					bombModels.push(model1);
				}
				else if (model2.status == CELL_STATUS.BIRD) {
					model2.type = model1.type;
					bombModels.push(model2);
				}

			}
			//简单消除
			for (let pos of checkVec2) {

				let [result, newCellStatus, newCellType] = this.checkPoint(pos.x, pos.y);
				if (result.length < 3) {
					continue;
				}
				for (let pos of result) {
					let model = this.cells[pos.y][pos.x];
					this.crushCell(pos.x, pos.y, false, cycleCount);
					if (model.status != CELL_STATUS.COMMON) {
						bombModels.push(model);
					}
				}
				this.createNewCell(pos, newCellStatus, newCellType);
			}
			this.processBomb(bombModels, cycleCount);
			this.curTime += ANITIME.DIE;
			checkVec2 = this.down();
			cycleCount++;
		}
	}

	//生成新cell
	createNewCell(pos: cc.Vec2, status: CELL_STATUS, type: CELL_TYPE) {
		if (status == CELL_STATUS.COMMON) {
			return;
		}
		if (status == CELL_STATUS.BIRD) {
			type = CELL_TYPE.BIRD
		}
		let model = new CellModel(type);
		this.cells[pos.y][pos.x] = model
		model.setStart(pos);
		model.setXY(pos);
		model.setStatus(status);
		model.setVisible(0, false);
		model.setVisible(this.curTime, true);
		this.changeModels.push(model);
	}
	// 下落
	down(): cc.Vec2[] {
		let newCheckPoint: cc.Vec2[] = [];
		for (let y = 1; y <= GRID_WIDTH; y++) {
			for (let x = 1; x <= GRID_HEIGHT; x++) {

				if (!this.cells[y][x]) {

					let curRow = y;
					for (let k = curRow; k <= GRID_HEIGHT; k++) {
						if (this.cells[k][x]) {
							this.pushToChangeModels(this.cells[k][x]);
							newCheckPoint.push(this.cells[k][x].position);
							this.cells[curRow][x] = this.cells[k][x];
							this.cells[k][x] = null;
							this.cells[curRow][x].setXY(cc.v2(x, curRow));
							this.cells[curRow][x].moveTo(cc.v2(x, curRow), this.curTime);
							curRow++;
						}
					}

					let count = 1;
					for (let k = curRow; k <= GRID_HEIGHT; k++) {

						this.cells[k][x] = new CellModel(this.getRandomCellType());
						this.cells[k][x].setStart(cc.v2(x, count + GRID_HEIGHT));
						this.cells[k][x].setXY(cc.v2(x, count + GRID_HEIGHT));
						this.cells[k][x].moveTo(cc.v2(x, k), this.curTime);
						
						this.changeModels.push(this.cells[k][x]);
						newCheckPoint.push(this.cells[k][x].position);
						count++;
					}
				}
			}
		}
		this.curTime += ANITIME.TOUCH_MOVE + 0.3
		return newCheckPoint;
	}

	pushToChangeModels(model: CellModel) {
		if (this.changeModels.indexOf(model) != -1) {
			return;
		}
		this.changeModels.push(model);
	}

	cleanCmd() {
		for (let i = 1; i <= GRID_WIDTH; i++) {
			for (let j = 1; j <= GRID_HEIGHT; j++) {
				if (this.cells[i][j]) {
					this.cells[i][j].cmd = [];
				}
			}
		}
	}

	exchangeCell(pos1: cc.Vec2, pos2: cc.Vec2) {
		let tmpModel = this.cells[pos1.y][pos1.x];
		this.cells[pos1.y][pos1.x] = this.cells[pos2.y][pos2.x];
		this.cells[pos1.y][pos1.x].setXY(pos1);
		this.cells[pos2.y][pos2.x] = tmpModel;
		this.cells[pos2.y][pos2.x].setXY(pos2);
	}

	// 设置种类
	// TODO 改成乱序算法
	setCellTypeNum(num: number) {
		this.cellTypeNum = num;
		this.cellCreateType = [];
		let createTypeList = this.cellCreateType;
		for (let i = 1; i <= CELL_BASENUM; i++) {
			createTypeList.push(i);
		}
		for (let i = 0; i < createTypeList.length; i++) {
			let index = Math.floor(Math.random() * (CELL_BASENUM - i)) + i;
			//交换类型 
			createTypeList[i], createTypeList[index] =
				createTypeList[index], createTypeList[i]
		}
	}
	// 随要生成一个类型
	getRandomCellType(): number {
		let index = Math.floor(Math.random() * this.cellTypeNum);
		return this.cellCreateType[index];
	}
	// TODO bombModels去重
	processBomb(bombModels: CellModel[], cycleCount: number) {
		while (bombModels.length > 0) {
			let newBombModel: CellModel[] = [];
			let bombTime = ANITIME.BOMB_DELAY;
			for (let model of bombModels) {
				let x = model.x;
				let y = model.y;
				if (model.status == CELL_STATUS.LINE) {
					for (let i = 1; i <= GRID_WIDTH; i++) {
						if (this.cells[y][i]) {
							if (this.cells[y][i].status != CELL_STATUS.COMMON) {
								newBombModel.push(this.cells[y][i]);
							}
							this.crushCell(i, y, false, cycleCount);
						}
					}
					this.addRowBomb(this.curTime, model.position);
				}
				else if (model.status == CELL_STATUS.COLUMN) {
					for (let i = 1; i <= GRID_HEIGHT; i++) {
						if (this.cells[i][x]) {
							if (this.cells[i][x].status != CELL_STATUS.COMMON) {
								newBombModel.push(this.cells[i][x]);

							}
							this.crushCell(x, i, false, cycleCount);
						}
					}
					this.addColBomb(this.curTime, model.position);
				}
				else if (model.status == CELL_STATUS.WRAP) {
					for (let i = 1; i <= GRID_HEIGHT; i++) {
						for (let j = 1; j <= GRID_WIDTH; j++) {
							let delta = Math.abs(x - j) + Math.abs(y - i);
							if (this.cells[i][j] && delta <= 2) {
								if (this.cells[i][j].status != CELL_STATUS.COMMON) {
									newBombModel.push(this.cells[i][j]);
								}
								this.crushCell(j, i, false, cycleCount);
							}
						}
					}
				}
				else if (model.status == CELL_STATUS.BIRD) {
					let crushType = model.type
					if (bombTime < ANITIME.BOMB_BIRD_DELAY) {
						bombTime = ANITIME.BOMB_BIRD_DELAY;
					}
					if (crushType == CELL_TYPE.BIRD) {
						crushType = this.getRandomCellType();
					}
					for (let i = 1; i <= GRID_HEIGHT; i++) {
						for (let j = 1; j <= GRID_WIDTH; j++) {
							if (this.cells[i][j] && this.cells[i][j].type == crushType) {
								if (this.cells[i][j].status != CELL_STATUS.COMMON) {
									newBombModel.push(this.cells[i][j]);
								}
								this.crushCell(j, i, true, cycleCount);
							}
						}
					}
				}
			}
			if (bombModels.length > 0) {
				this.curTime += bombTime;
			}
			bombModels = newBombModel;
		}
	}

	addCrushEffect(playTime: ANITIME, pos: cc.Vec2, step: number) {
		this.effectsQueue.push({
			playTime: playTime,
			pos: pos,
			action: "crush",
			step: step
		});
	}

	addRowBomb(playTime: ANITIME, pos: cc.Vec2) {
		this.effectsQueue.push({
			playTime: playTime,
			pos: pos,
			action: "rowBomb"
		});
	}

	addColBomb(playTime: ANITIME, pos: cc.Vec2) {
		this.effectsQueue.push({
			playTime: playTime,
			pos: pos,
			action: "colBomb"
		});
	}

	// cell消除逻辑
	crushCell(x: number, y: number, needShake: boolean, step: number) {
		let model = this.cells[y][x];
		this.pushToChangeModels(model);
		if (needShake) {
			model.toShake(this.curTime)
		}
		let shakeTime = needShake ? ANITIME.DIE_SHAKE : 0;
		model.toDie(this.curTime + shakeTime);
		this.addCrushEffect(this.curTime + shakeTime, model.position, step);
		this.cells[y][x] = null;
	}
}