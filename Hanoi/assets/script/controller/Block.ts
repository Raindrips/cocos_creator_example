const { ccclass, property } = cc._decorator;
import HanoiView from '../view/HanoiView'
@ccclass
export default class Block extends cc.Component {

	@property(cc.SpriteAtlas)
	colorAtlas: cc.SpriteAtlas = null

	hanoi: cc.Node = null;

	canMove: boolean = false;

	//游戏加载时调用的函数
	onLoad() {
		this.hanoi = cc.find('Canvas/Hanoi')
	}

	//节点启动时加载的
	start() {
		this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
		this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
		this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
	}

	// update (dt) {}

	init(n: number) {
		let width = this.node.width;
		for (let i = 0; i < n; i++) {
			this.node.getComponent(cc.Sprite).spriteFrame = this.colorAtlas.getSpriteFrame(i.toString());
			this.node.setContentSize(cc.size(width * (i + 1), width));
		}
	}
	tempPos: cc.Vec3 = cc.v3(0, 0);
	touchStart(e: cc.Event.EventTouch) {
		this.tempPos = this.node.position;

		let comp = this.hanoi.getComponent(HanoiView);
		let index = comp.checkBlock(this.node.position);
		let arr = comp.hannio.countArr;
		if (arr[index][arr[index].length - 1] == this.node.width) {
			this.canMove = true;
			this.node.opacity = 200;
		}

	}

	touchMove(e: cc.Event.EventTouch) {
		if (this.canMove) {
			let detla = cc.v3(e.getDelta()).add(this.node.position);
			this.node.position = detla;
		}

	}

	touchEnd(e: cc.Event.EventTouch) {
		let comp = this.hanoi.getComponent(HanoiView);
		if (!comp.placeBlock(this.tempPos, this.node)) {
			this.node.position = this.tempPos;
		}
		this.node.opacity = 255;
		this.canMove = false;

		if(comp.hannio.isWinGame()){
			cc.log('游戏胜利');
		}
	}

}
