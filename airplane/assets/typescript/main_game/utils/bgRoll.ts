const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    other: cc.Node = null;

    @property
    speedY: number = 300;

    // onLoad () {}

    trggier: cc.Vec2 = cc.v2()
    start() {
        this.trggier = cc.v2(-cc.winSize.width, -cc.winSize.height);
    }

    moveUpDown(node: cc.Node,other:cc.Node) {
        if (node.y < this.trggier.y) {
            node.y = other.y+other.height;
        }
    }

    update(dt: number) {
        this.other.y += this.speedY * dt
        this.node.y += this.speedY * dt

        this.moveUpDown(this.node,this.other)
        this.moveUpDown(this.other,this.node)
    }
}
