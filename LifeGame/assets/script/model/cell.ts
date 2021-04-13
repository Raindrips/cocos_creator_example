
const { ccclass, property } = cc._decorator;

enum CellState {
    black,
    white
}

@ccclass
export default class CellNode extends cc.Component {

    @property(cc.Node)
    colorNode: cc.Node = null;

    state: CellState = CellState.white;

    // onLoad () {}

    start() {

    }

    changeState() {
        switch (this.state) {
            case CellState.white:
                this.state = CellState.black;
                this.colorNode.color=cc.color(0,0,0);
                break;

            case CellState.black:
                this.state = CellState.white;
                this.colorNode.color=cc.color(255,255,255);
                break
        }
    }

    // update (dt) {}
}
