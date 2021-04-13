
const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Label)
	levelLabel: cc.Label = null;

	@property(cc.Label)
	timeLabel: cc.Label = null;

	@property(cc.Prefab)
	ballPrefab: cc.Prefab = null;

	@property(cc.Node)
	ctrlNode: cc.Node = null;

	level: number = 1;
	time: number = 10;
	now: number = 0;

	_ballNodeArr: cc.Node[] = null;

	onLoad() {
		this._ballNodeArr = [];
		this._ballNodeArr.length = this.level;
	}

	start() {
		this.initMap()
	}

	update(dt) {
		this.now -= dt;
		this.levelLabel.string = this.level.toString();
		if (this.isWin()) {
			this.level = this.level + 1;
			if (this.level > 4) {
				this.level = 4;
			}
			this.initMap();
		}
	}

	initMap() {
		this.node.removeAllChildren();
		for (let i = 0; i < this.level * 4; i++) {
			let ballNode = cc.instantiate(this.ballPrefab)
			this.node.addChild(ballNode)
		}
	}

	isWin(): boolean {
		let children = this.node.children;
		let id1 = children[0].getComponent('ball').id;
		for (let i = 1; i < children.length - 1; i++) {
			let id2 = children[i + 1].getComponent('ball').id;
			if (id1 != id2) {
				return false;
			}
		}
		return true;
	}
}
