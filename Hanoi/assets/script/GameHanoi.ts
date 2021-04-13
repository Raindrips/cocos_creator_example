const { ccclass, property } = cc._decorator

@ccclass
export default class GameHanoi extends cc.Component {

	@property(cc.Node)
	blockLayer: cc.Node = null

	@property(cc.Prefab)
	block: cc.Prefab = null

	@property
	level: number = 3;

	countArr: Array<Array<number>> = []

	onLoad() {
		this.countArr.length = this.level;
		for (let i = 0; i < this.countArr.length; i++) {
			this.countArr[i] = [];
		}
	}

	start() {
		this.initBlock(this.level);
	}

	// update (dt) {}

	initBlock(num) {
		for (let i = 0; i < num; i++) {
			let blockNode = cc.instantiate(this.block)
			blockNode.x = this.node.children[0].x
			blockNode.y = this.getY(i)
			blockNode.getComponent('Block').init(num - i)
			this.countArr[0].push(blockNode.width)
			this.blockLayer.addChild(blockNode, 10)
		}
	}

	getY(index: number): number {
		return -270 + 44 * index;
	}

	checkBlock(pos: cc.Vec3): number {
		for (let i = 0; i < this.node.children.length; i++) {
			let node = this.node.children[i];
			if (node.getBoundingBox().contains(cc.v2(pos))) {
				return i;
			}
		}
		return -1;
	}

	placeBlock(startPos: cc.Vec3, node: cc.Node) {
		let startI = this.checkBlock(startPos);
		let index = this.checkBlock(node.position);
		if (index == -1 ||startI == -1) {
			return false
		}
		let wid1 = this.countArr[startI][this.countArr[startI].length - 1];
		let wid2 = this.countArr[index][this.countArr[index].length - 1];
		if (index == startI ||wid1 > wid2) {
			return false;
		}
		let baseNode = this.node.children[index]
		node.x = baseNode.x
		node.y = this.getY(this.countArr[index].length)
		let width = this.countArr[startI].pop();
		this.countArr[index].push(width);
		return true;
	}
}
