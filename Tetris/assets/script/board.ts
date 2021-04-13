import { BlockType, Data } from "./type";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Node)
	nextNode: cc.Node = null;

	@property(cc.Prefab)
	blockPrefab: cc.Prefab = null;

	@property(cc.JsonAsset)
	jsonData: cc.JsonAsset = null;

	@property
	public frameTime: number = 1;
	@property
	public colsNum: number = 0;
	@property
	public rowsNum: number = 0;

	private isStart: boolean = false;			//	
	private gridWidth: number = 0;				//格子宽度

	private pieceMap: cc.Node[][];
	private arena: number[][];
	private nextMap: cc.Node[][];

	private matrix: number[][];
	private pos: cc.Vec2;

	private nextBlock: BlockType;

	public onLoad() {
		this.init();
		this.playerReset();

		this.node.on('move', this.playerMove, this);
		this.node.on('rotate', this.playerRotate, this);
		this.node.on('drop', this.playerDrop, this);
		this.node.on('reset', this.resetGame, this);
	}

	public start() {
		this.schedule(this.playerDrop, this.frameTime);
	}

	private init() {
		this.initView();
		this.initData();
		this.initPlayer();
	}

	private initView() {
		this.gridWidth = this.node.width / this.colsNum;
		this.pieceMap = [];
		for (let y = 0; y < this.rowsNum; y++) {
			this.pieceMap[y] = [];
			for (let x = 0; x < this.colsNum; x++) {
				let node = this.createNode(x, y)
				this.pieceMap[y][x] = node;
				this.node.addChild(node);
			}
		}
		this.nextMap = [];
		for (let y = 0; y < 4; y++) {
			this.nextMap[y] = [];
			for (let x = 0; x < 4; x++) {
				let node = this.createNode(x, y)
				this.nextMap[y][x] = node;
				this.nextNode.addChild(node);
			}
		}
		this.clear();
	}

	private createNode(x: number, y: number) {
		let pieceNode = cc.instantiate(this.blockPrefab);

		pieceNode.width = this.gridWidth;
		pieceNode.height = this.gridWidth;
		pieceNode.x = x * this.gridWidth;
		pieceNode.y = y * this.gridWidth;
		return pieceNode;
	}

	private initData() {
		let w: number = this.colsNum, h: number = this.rowsNum;
		const matrix = [];
		while (h--) {
			matrix.push(new Array(w).fill(0));
		}
		this.arena = matrix;
	}

	private initPlayer() {
		this.pos = cc.v2(0, 0);
		this.matrix = [];
		this.nextBlock = this.randomBlock();
	}

	private drawView() {
		this.clear();
		this.drawMatrix(this.arena);
		this.drawMatrix(this.matrix, this.pos);
		this.drawNext();
	}

	private drawMatrix(matrix: number[][], v2: cc.Vec2 = cc.v2()) {
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					this.setColor(this.pieceMap[y + v2.y][x + v2.x], value);
					this.pieceMap[y + v2.y][x + v2.x].active = true;
				}
			});
		});
	}
	private drawNext() {
		let next = this.createBlock(this.nextBlock);
		next.forEach((row, y) => {
			row.forEach((value, x) => {

				this.setColor(this.nextMap[y][x], value);
				this.nextMap[y][x].active = true;
			});
		});
	}

	private setColor(node: cc.Node, index: number) {
		let colorString = this.jsonData.json[index.toString()];
		let color = cc.Color.fromHEX(node.color, colorString)
		node.color = color;
	}

	private clear() {
		for (let y = 0; y < this.rowsNum; y++) {
			for (let x = 0; x < this.colsNum; x++) {
				this.pieceMap[y][x].active = false;
			}
		}

		for (let y = 0; y < 4; y++) {
			for (let x = 0; x < 4; x++) {
				this.nextMap[y][x].active = false;
			}
		}
	}

	//重新生成方块
	private playerReset() {
		//游戏结束
		if (this.collide()) {
			this.unschedule(this.playerDrop);
		}
		this.isStart = true;
		this.matrix = this.createBlock(this.nextBlock)
		this.pos.y = this.rowsNum - this.matrix.length;
		this.pos.x = (this.arena[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);
		this.nextBlock = this.randomBlock();
	}

	private randomBlock() {
		const blocks = 'TJLOSZI';
		return blocks[blocks.length * Math.random() | 0] as BlockType;
	}

	private resetGame() {

		this.initData();
		this.playerReset();
		this.clear();
		this.drawView();
		this.isStart = true;

	}

	private createBlock(type: BlockType): number[][] {
		return Data.get(type);
	}

	private collide(): boolean {
		const m = this.matrix;
		const o = this.pos;
		for (let y = 0; y < m.length; y++) {
			for (let x = 0; x < m[y].length; x++) {
				if (m[y][x] !== 0 &&
					(this.arena[y + o.y] &&
						this.arena[y + o.y][x + o.x]) !== 0) {
					return true;
				}
			}
		}
		return false;
	}

	//合并玩家操作的数据和地图的数据
	private merge() {
		this.matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					this.arena[y + this.pos.y][x + this.pos.x] = value;
				}
			});
		});
	}

	private rotate(matrix: number[][], dir: number) {
		for (let y = 0; y < matrix.length; y++) {
			for (let x = 0; x < y; x++) {
				[
					matrix[x][y],
					matrix[y][x]
				] = [
						matrix[y][x],
						matrix[x][y]
					];
			}
		}
		if (dir > 0) {
			matrix.forEach(row => row.reverse());
		} else {
			matrix.reverse();
		}
	}

	//将玩家的数组进行交换
	private arenaSweep() {
		let rowCount = 1;
		outer: for (let y = 0; y < this.arena.length - 1; y++) {
			for (let x = 0; x < this.arena[y].length; x++) {
				if (this.arena[y][x] === 0) {
					continue outer;
				}
			}
			const row = this.arena.splice(y, 1)[0].fill(0);
			this.arena.push(row);
			y--;
			rowCount *= 2;
		}
	}

	public playerDrop() {
		this.pos.y--;
		if (this.collide()) {
			this.pos.y++;
			this.merge();
			this.playerReset();
			this.arenaSweep();
		}
		this.drawView();
	}

	public playerRotate(dir: number) {
		const pos = this.pos.x;
		let offset = 1;
		this.rotate(this.matrix, -dir);
		while (this.collide()) {
			this.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));
			if (offset > this.matrix.length) {
				this.rotate(this.matrix, dir);
				this.pos.x = pos;
				return;
			}
		}
		this.drawView();
	}

	public playerMove(offset: number) {
		this.pos.x += offset;
		if (this.collide()) {
			this.pos.x -= offset;
		}
		this.drawView();
	}
}
