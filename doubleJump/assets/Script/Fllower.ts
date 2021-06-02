
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    target: cc.Node = null;

    // onLoad () {}

    start() {

    }

    update(dt) {
        if (this.node.y < this.target.y) {
            this.node.y = this.target.y;
        }
    }
}
