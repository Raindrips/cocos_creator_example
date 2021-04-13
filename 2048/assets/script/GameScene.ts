import { Board } from "./Board";
import { DIR, STATE } from "./Constants";

const { ccclass, property } = cc._decorator;

@ccclass
export class GameScene extends cc.Component {
    @property(Board)
    private board: Board = null;

    public state: STATE = STATE.NONE;

    start() {
        this.board.init(this);
        this.startGame();
    }

    startGame() {
        this.state = STATE.START;
        this.board.reset();
    }

    overGame() {
        let max = this.board.getMaxNLabel();
    }

    onBoardSlid(dir: DIR) {
        let isMove = false;
        switch (dir) {
            case DIR.LEFT:
                isMove = this.board.slideLeft();
                break;
            case DIR.RIGHT:
                isMove = this.board.slideRight();
                break;
            case DIR.UP:
                isMove = this.board.slideUp();
                break;
            case DIR.DOWN:
                isMove = this.board.slideDown();
                break;
            default:
                cc.error("方向错误");
                break;
        }
        if (isMove) {
           
            if (this.board.judgeOver()) {
                this.overGame();
            }
             //有tile移动才添加新的tile
            this.board.newPiece();

        }
    }
}
