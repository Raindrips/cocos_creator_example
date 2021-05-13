const { ccclass, property } = cc._decorator;

@ccclass
class GameScene extends cc.Component {

	@property(cc.Node)
	ballPanel: cc.Node = null

	@property(cc.Prefab)
	smallBallPF: cc.Prefab = null

	@property(cc.Prefab)
	bulletNode: cc.Prefab = null

	@property(cc.Node)
	bigBall: cc.Node = null

	@property(cc.Label)
	levelLabel: cc.Label = null



	@property(cc.Node)
	bgNode: cc.Node = null

	@property
	bigSpeed: number = 0
	@property
	bigDir: number = 0

	smallBalls: cc.Node[] = []
	tmpBalls: cc.Node[] = []
	curLevel: number;

	private _gameStart: boolean

	onLoad() {
		this.init({});
	}

	init(pargmas) {
		this.smallBalls = [];
		this.tmpBalls = [];         // 发射的尚未添加到大球上的小球
		this._gameStart = false;

		//this.curLevel = zy.dataMng.userData.curLevel;
		//this.curLevel = parseInt(this.curLevel);
		this.curLevel = 1;
	}

	start() {
		this.loadLevel(this.curLevel);
		this.startGame();
	}

	startGame() {

		let mng = cc.director.getCollisionManager();
		mng.enabled = true;
		// mng.enabledDebugDraw = true;
		// mng.enabledDrawBoundingBox = true;
		this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
		// zy.event.on("gameover", () => {
		// 	if (this._gameStart) {
		// 		this._gameStart = false;
		// 		this.bgNode.color = cc.Color.fromHEX(this.bgNode.color,"#7A3341");
		// 		//zy.ui.tip.show("游戏失败，即将重新开始");
		// 		this.scheduleOnce(() => {
		// 			this.loadLevel(this.curLevel);
		// 		}, 2);
		// 	}
		// }, this);
	}

	loadLevel(l: number) {
		//let data = zy.dataMng.levelData.getLevelData(l);
		//let data=1;
		//this._bigDir = data.dir == 0 ? (Math.random() < 0.5 ? 1 : -1) : data.dir;
		//this._bigSpeed = data.speed;
		this.levelLabel.string = "第 " + l + " 关";

		// 清空数据
		for (let b of this.tmpBalls) {
			b.destroy();
		}
		for (let b of this.smallBalls) {
			b.destroy();
		}
		this.tmpBalls.splice(0);
		this.smallBalls.splice(0);
		let data = { smallNum: 4 }
		for (let i = 0; i < data.smallNum; i++) {
			let ball = cc.instantiate(this.bulletNode);
			ball.parent = this.ballPanel;
			this.smallBalls.push(ball);
			ball.getComponentInChildren(cc.Label).string = (data.smallNum - i).toString();

		}

		this.bgNode.color = cc.Color.fromHEX(this.bgNode.color, "#436770");

		// this.loadBigBall(data.bigNum);
		this.loadBigBall(4);

		this.scheduleOnce(() => {
			this._gameStart = true;
		}, 0.1);
	}

	loadBigBall(counts: number) {
		this.bigBall.destroyAllChildren();
		let radius = this.bigBall.width / 2 - 2;
		let degree = 360 / counts;
		for (let i = 0; i < counts; i++) {
			let ball = cc.instantiate(this.smallBallPF);
			let radian = cc.misc.degreesToRadians(i * degree);
			let x = radius * Math.sin(radian);
			let y = radius * Math.cos(radian);
			ball.x = x;
			ball.y = y;
			ball.parent = this.bigBall;
			// // 计算旋转角度
			ball.angle = 180 - i * degree;
			ball.getChildByName("numLabel").active = false;
		}

	}

	onTouchStart(event: cc.Event) {

		if (!this._gameStart) {
			return;
		}

		if (this.smallBalls.length > 0) {

			let bullet = this.smallBalls.shift();
			let wordPos = bullet.parent.convertToWorldSpaceAR(bullet.getPosition());

			let ball = cc.instantiate(this.smallBallPF);
			ball.getComponentInChildren(cc.Label).string = bullet.getComponentInChildren(cc.Label).string;
			ball.parent = this.bigBall.parent;
			ball.position = cc.v3(this.bigBall.parent.convertToNodeSpaceAR(wordPos));
			this.tmpBalls.push(ball);
			bullet.destroy();

			let radius = this.bigBall.height / 2 - 2;
			let des = cc.v2(0, this.bigBall.y - radius);
			ball.runAction(cc.sequence(cc.moveTo(0.05, des).easing(cc.easeSineOut()), cc.callFunc(() => {
				this.tmpBalls.shift();
				ball.parent = this.bigBall;
				let angle = this.bigBall.angle;
				angle = angle % 360 + 180;
				let radian = cc.misc.degreesToRadians(angle);

				let x = radius * Math.sin(radian);
				let y = radius * Math.cos(radian);
				ball.x = x;
				ball.y = y;
				ball.angle = 180 - angle;

				this.scheduleOnce(this._checkPass.bind(this), 0);
			})));
			/* 
			cc.tween(ball)
				.to(0.05, { position: des })
				.call(() => {
					this.tmpBalls.shift();
					ball.parent = this.bigBall;
					let angle = this.bigBall.angle;
					angle = angle % 360 + 180;
					let radian = cc.misc.degreesToRadians(angle);

					let x = radius * Math.sin(radian);
					let y = radius * Math.cos(radian);
					ball.x = x;
					ball.y = y;
					ball.angle = 180 - angle;
				})
			*/
		}
	}

	_checkPass() {
		if (this._gameStart && this.smallBalls.length == 0) {
			this._gameStart = false;
			this.bgNode.color = cc.Color.fromHEX(this.bgNode.color, "#4C7043");
			let des = "恭喜过关，即将进入下一关";
			//const max = zy.dataMng.levelData.getMaxLevel();
			const max = 10;
			if (this.curLevel < max) {
				this.curLevel += 1;
			} else {
				des = "恭喜你通关了";
			}
			//zy.ui.tip.show(des);
			this.scheduleOnce(() => {
				this.loadLevel(this.curLevel);
			}, 2);
			//zy.dataMng.userData.curLevel = this.curLevel;
		}
	}
	update(dt: number) {
		if (!this._gameStart) {
			return;
		}
		this.bigBall.angle += this.bigDir * this.bigSpeed * dt;
	}

	lateUpdate(dt: number) {

	}
}