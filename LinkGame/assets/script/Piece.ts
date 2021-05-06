import { PieceState } from "./type";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Piece extends cc.Component {

	@property(cc.SpriteAtlas)
	herosAtlas: cc.SpriteAtlas = null;

	sprite: cc.Sprite = null;

	public x: number = 0;
	public y: number = 0;
	public typeId: number = 0;
	public state: PieceState = PieceState.idle;

	onLoad() {
		this.sprite = this.node.getComponent(cc.Sprite);
		this.node.on(cc.Node.EventType.TOUCH_END, this.touch, this);
	}

	public init(x: number, y: number, type: number, state = PieceState.idle) {
		this.x = x;
		this.y = y;
		this.setType(type);
		this.setState(state);
	}

	public setType(type: number) {
		this.typeId = type;
		if (type === 0) {
			this.sprite.spriteFrame.decRef();
			this.sprite.spriteFrame = null;
		} else {
			this.sprite.spriteFrame = this.herosAtlas.getSpriteFrame("hero_" + type);
		}
	}

	public setState(state: PieceState) {
		if (state === this.state) {
			return;
		}
		this.state = state;
		if (state === PieceState.idle) {
			this.node.color = cc.Color.WHITE;
		}
		else if (state === PieceState.press) {
			this.node.color = cc.Color.GRAY;
		}
	}

	touch(e: cc.Event.EventTouch) {
		this.node.parent.emit('touch', this);
	}

}
