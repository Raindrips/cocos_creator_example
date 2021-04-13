import { WETERMELON_ARRAY, Global } from "./Global";

const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

	@property
	timer: number = 1;

	@property({ type: cc.Prefab, tooltip: "西瓜预制体" })
	watermelonPrefab: cc.Prefab = null

	@property(cc.Node)
	typeNode: cc.Node = null

	@property(cc.Node)
	deathNode: cc.Node = null

	@property(cc.Label)
	scoreLabel:cc.Label=null


	@property({ type: cc.SpriteAtlas, tooltip: "西瓜图片" })
	spriteAtlas: cc.SpriteAtlas = null

	isCanDown: boolean;

	onLoad() {
		this.node.on(cc.Node.EventType.TOUCH_START, this.watermelonDown, this);
		this.node.on('addScore',this.addScore,this);
	}

	start() {
		this.isCanDown = true;
		this.randomType();
	}

	onDestroy() {
		this.node.off(cc.Node.EventType.TOUCH_START, this.watermelonDown, this);
	}

	// update (dt) {}

	watermelonDown(event: cc.Event.EventTouch) {
		if (!this.isCanDown) {
			return;
		}
		this.isCanDown = false;
		this.scheduleOnce(() => {
			this.isCanDown = true;
		}, this.timer);

		let watermelon = cc.instantiate(this.watermelonPrefab);
		let pos = this.node.convertToNodeSpaceAR(event.getLocation());
		watermelon.x = pos.x
		watermelon.y = this.deathNode.y - 100
		WETERMELON_ARRAY.push(watermelon)
		this.node.addChild(watermelon)

		this.randomType();
	}

	//转换图片
	randomType() {
		let random = Math.floor(Math.random() * 5) | 0
		let sprite = this.typeNode.getComponent(cc.Sprite)
		sprite.spriteFrame = this.spriteAtlas.getSpriteFrames()[random]
		Global.WETERMELON_TYPE = random
	}

	addScore(){
		if(this.scoreLabel){
			this.scoreLabel.string=Global.SCORE.toString();
		}
		cc.sys.localStorage.setItem('score', Global.SCORE);
	}
}
