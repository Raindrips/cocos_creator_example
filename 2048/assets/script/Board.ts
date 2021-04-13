import { Piece } from "./Piece";
import { GameScene } from "./GameScene";
import { DIR } from "./Constants";

const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
//@executeInEditMode
export class Board extends cc.Component {
    @property(cc.Integer)
    private Size: number = 4;
    // @property(cc.Graphics)
    // private graphics: cc.Graphics = null; // 用来画棋盘
    @property(cc.Prefab)
    private piecePrefab: cc.Prefab = null; // 画不了文字，只能用prefab了
    @property(cc.Node)
    private pieceLayer: cc.Node = null;

    private tileWidth: number = 0; // 一个方块的宽度
    private startX: number = 0; // 棋盘左下角
    private startY: number = 0;
    private boardWidth: number = 0; // 棋盘节点宽高
    private boardHeight: number = 0;
    public pieceMap: Array<Array<Piece>>;

    private Scene: GameScene = null;

    protected onLoad() {
        this.tileWidth = this.node.width / (this.Size + 1);
        this.startX = this.tileWidth / 2;
        this.startY = this.tileWidth / 2;
        this.boardWidth = this.tileWidth * this.Size;
        this.boardHeight = this.tileWidth * this.Size;
        // 画棋盘
        //this.graphics.clear();
        // this.graphics.strokeColor = cc.Color.BLACK;
        // for (let x = 0; x < this.colsSum + 1; x++) {
        //     this.graphics.moveTo(this.startX + x * this.tileWidth, this.startY);
        //     this.graphics.lineTo(this.startX + x * this.tileWidth, this.startY + this.boardHeight);
        //     this.graphics.stroke();
        // }
        // for (let y = 0; y < this.rowsSum + 1; y++) {
        //     this.graphics.moveTo(this.startX, this.startY + y * this.tileWidth);
        //     this.graphics.lineTo(this.startX + this.boardWidth, this.startY + y * this.tileWidth);
        //     this.graphics.stroke();
        // }
        // 初始化数字位置
        this.pieceMap = [];
        for (let x = 0; x < this.Size; x++) {
            this.pieceMap[x] = [];
            for (let y = 0; y < this.Size; y++) {
                let piece = cc.instantiate(this.piecePrefab).getComponent(Piece);
                piece.node.parent = this.pieceLayer;
                piece.node.x = this.startX + x * this.tileWidth + this.tileWidth / 2;
                piece.node.y = this.startY + y * this.tileWidth + this.tileWidth / 2;
                this.pieceMap[x][y] = piece;
                piece.init(x, x, 0);
            }
        }
    }

    public init(Scene: GameScene) {
        this.Scene = Scene;
        this.reset();
        this.addListeners();
    }

    public reset() {
        for (let x = 0; x < this.Size; x++) {
            for (let y = 0; y < this.Size; y++) {
                this.pieceMap[x][y].n = 0;
            }
        }
        for (let i = 0; i < 2; i++) {
            this.newPiece();
        }
    }

    newPiece() {
        let zeroPieces = [];
        for (let x = 0; x < this.Size; x++) {
            for (let y = 0; y < this.Size; y++) {
                if (this.pieceMap[x][y].n === 0) {
                    zeroPieces.push(this.pieceMap[x][y]);
                }
            }
        }
        let n = Math.floor(Math.random() * zeroPieces.length);
        zeroPieces[n].randomNumber();
    }

    judgeOver(): boolean {
        for (let y = 0; y < this.Size; y++) {
            for (let x = 0; x < this.Size; x++) {
                if (this.pieceMap[x][y].n === 0) {
                    return false;
                }
                if (x <= this.Size - 2 && this.pieceMap[x][y].n === this.pieceMap[x + 1][y].n) {
                    return false;
                }
                if (y <= this.Size - 2 && this.pieceMap[x][y].n === this.pieceMap[x][y + 1].n) {
                    return false;
                }
            }
        }
        return true;
    }

    getMaxNLabel(): string {
        let max = 2;
        let str = "2";
        for (let x = 0; x < this.Size; x++) {
            for (let y = 0; y < this.Size; y++) {
                if (this.pieceMap[x][y].n > max) {
                    max = this.pieceMap[x][y].n;
                    str = this.pieceMap[x][y].nLabel.string;
                }
            }
        }
        return str;
    }

    shideMerge(x: number, y: number, newX: number, newY): boolean {
        if (this.pieceMap[x][y].n === this.pieceMap[newX][newY].n) {
            this.pieceMap[x][y].n *= 2;
            this.pieceMap[newX][newY].n = 0;
            return true;
        }
        return false;
    }
    shildeMove(x: number, y: number, newX: number, newY) {
        this.pieceMap[x][y].n = this.pieceMap[newX][newY].n;
        this.pieceMap[newX][newY].n = 0;
    }

    //左滑F
    slideLeft(): boolean {
        let isMove = false;
        for (let y = 0; y < this.Size; y++) {
            for (let x = 0; x < this.Size; x++) {
                if (this.pieceMap[x][y].n === 0) {
                    //移动
                    for (let x0 = x + 1; x0 < this.Size; x0++) {
                        if (this.pieceMap[x0][y].n == 0) {
                            continue;
                        }
                        this.shildeMove(x, y, x0, y);
                        isMove = true;
                        break;
                    }
                }
                else {
                    //合并
                    for (let x0 = x + 1; x0 < this.Size; x0++) {
                        if (this.pieceMap[x0][y].n == 0) {
                            continue;
                        }
                        isMove = this.shideMerge(x, y, x0, y);
                        break;
                    }
                }
            }
        }
        return isMove;
    }
    //右滑
    slideRight(): boolean {
        let isMove = false;
        for (let y = 0; y < this.Size; y++) {
            for (let x = this.Size - 1; x >= 0; x--) {
                if (this.pieceMap[x][y].n === 0) {
                    //移动
                    for (let x0 = x - 1; x0 >= 0; x0--) {
                        if (this.pieceMap[x0][y].n == 0) {
                            continue;
                        }
                        this.shildeMove(x, y, x0, y);
                        isMove = true;
                        break;
                    }
                }
                else {
                    //合并
                    for (let x0 = x - 1; x0 >= 0; x0--) {
                        if (this.pieceMap[x0][y].n == 0) {
                            continue;
                        }
                        isMove = this.shideMerge(x, y, x0, y);
                        break;
                    }
                }
            }
        }
        return isMove;
    }

    //下滑
    slideDown(): boolean {
        let isMove:boolean=false;
        for (let y = 0; y < this.Size; y++) {
            for (let x = this.Size - 1; x >= 0; x--) {
                if (this.pieceMap[x][y].n === 0) {
                    //移动
                    for (let y0 = y + 1; y0 < this.Size; y0++) {
                        if (this.pieceMap[x][y0].n == 0) {
                            continue;
                        }
                        this.shildeMove(x, y, x, y0);
                        isMove = true;
                        break;
                    }
                }
                else {
                    //合并
                    for (let y0 = y + 1; y0 < this.Size; y0++) {
                        if (this.pieceMap[x][y0].n == 0) {
                            continue;
                        }
                        isMove = this.shideMerge(x, y, x, y0);
                        break;
                    }
                }
            }
        }
        
        return isMove;
    }

    slideUp(): boolean {
        //上滑
        let isMove = false;
        for (let y = 0; y < this.Size; y++) {
            for (let x = this.Size - 1; x >= 0; x--) {
                if (this.pieceMap[x][y].n === 0) {
                    //移动
                    for (let y0 = y - 1; y0 >= 0; y0--) {
                        if (this.pieceMap[x][y0].n == 0) {
                            continue;
                        }
                        this.shildeMove(x, y, x, y0);
                        isMove = true;
                        break;
                    }
                }
                else {
                    //合并
                    for (let y0 = y - 1; y0 >= 0; y0--) {
                        if (this.pieceMap[x][y0].n == 0) {
                            continue;
                        }
                        isMove = this.shideMerge(x, y, x, y0);
                        break;
                    }
                }
            }
        }
        return isMove;
    }

    private onTouched(event: cc.Event.EventTouch) {
        let startPos = event.getStartLocation();
        let endPos = event.getLocation();
        let offsetX = endPos.x - startPos.x;
        let offsetY = endPos.y - startPos.y;
        if (Math.abs(offsetX) > Math.abs(offsetY)) {
            if (offsetX > 40) {
                this.Scene.onBoardSlid(DIR.RIGHT);
            } else if (offsetX < -40) {
                this.Scene.onBoardSlid(DIR.LEFT);
            }
        } else {
            if (offsetY > 40) {
                this.Scene.onBoardSlid(DIR.UP);
            } else if (offsetY < -40) {
                this.Scene.onBoardSlid(DIR.DOWN);
            }
        }
    }

    private onKey(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                this.Scene.onBoardSlid(DIR.UP);
                break;
            case cc.macro.KEY.down:
            case cc.macro.KEY.s:
                this.Scene.onBoardSlid(DIR.DOWN);
                break;
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.Scene.onBoardSlid(DIR.LEFT);
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.Scene.onBoardSlid(DIR.RIGHT);
                break;
        }
    }

    private addListeners() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouched, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKey, this);
    }

    private removeListeners() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKey, this);
    }
}
