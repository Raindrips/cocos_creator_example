import Hanoi from "../model/Hanoi";

const { ccclass, property } = cc._decorator

@ccclass
export default class HanoiView extends cc.Component {

	@property(cc.Node)
	blockLayer: cc.Node = null

	@property(cc.Prefab)
	block: cc.Prefab = null

	@property(cc.AudioClip)
	hit: cc.AudioClip = null;


	@property
	level: number = 3;
	hannio: Hanoi = null

	onLoad() {
		this.level = this.level < 3 ? 3 : this.level;
		this.hannio = new Hanoi(this.level);
	}

	start() {
		
		this.initBlock(this.level);
	}

	// update (dt) {}

	initBlock(num: number) {
		for (let i = 0; i < num; i++) {
			let blockNode = cc.instantiate(this.block)
			blockNode.x = this.node.children[0].x
			blockNode.y = this.getY(i)
			blockNode.getComponent('Block').init(num - i)
			this.blockLayer.addChild(blockNode, 10)
			this.hannio.countArr[0].push(blockNode.width);
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
	//移动方块
	placeBlock(startPos: cc.Vec3, node: cc.Node) {
		let old = this.checkBlock(startPos);
		let index = this.checkBlock(node.position);
		if (index == -1 || old == -1) {
			return false
		}
		let bool = this.hannio.place(old, index);
		if (!bool) {
			return false
		}
		let baseNode = this.node.children[index]
		node.x = baseNode.x
		node.y = this.getY(this.hannio.countArr[index].length - 1);
		cc.audioEngine.play(this.hit, false, 1);
		return true;
	}
}
