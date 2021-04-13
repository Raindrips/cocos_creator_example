import { CELL_TYPE, CELL_STATUS, ANITIME } from './typeModel'
import CmdInfo from './CmdInfo'

export default class CellModel {
    type: CELL_TYPE
    status: CELL_STATUS
    position: cc.Vec2
    start: cc.Vec2
    cmd: Array<CmdInfo>
    isDeath: boolean
    objecCount: number

    constructor(type: CELL_TYPE = null) {
        this.type = type;
        this.status = CELL_STATUS.COMMON;
        this.position = cc.v2(1, 1);
        this.start = cc.v2(1, 1);
        this.cmd = [];
        this.isDeath = false;
        this.objecCount = Math.floor(Math.random() * 1000);
    }

    isEmpty() {
        return this.type == CELL_TYPE.EMPTY;
    }

    setEmpty() {
        this.type = CELL_TYPE.EMPTY;
    }
    setXY(v2: cc.Vec2) {
        this.position = v2;
    }

    set x(_x) { this.position.x = _x; }
    get x() { return this.position.x; }
    set y(_y) { this.position.y = _y; }
    get y() { return this.position.y; }

    setStart(v2: cc.Vec2) {
        this.start = v2;
    }

    setStatus(status: CELL_STATUS) {
        this.status = status;
    }

    moveToAndBack(pos: cc.Vec2) {
        let srcPos = this.position;
        this.cmd.push({
            action: "moveTo",
            keepTime: ANITIME.TOUCH_MOVE,
            playTime: 0,
            pos: pos
        })
        this.cmd.push({
            action: "moveTo",
            keepTime: ANITIME.TOUCH_MOVE,
            playTime: ANITIME.TOUCH_MOVE,
            pos: srcPos
        })
    }

    moveTo(pos: cc.Vec2, playTime: ANITIME) {
        this.cmd.push({
            action: "moveTo",
            keepTime: ANITIME.TOUCH_MOVE,
            playTime: playTime,
            pos: pos
        });
        this.position = pos;

    }

    toDie(playTime: ANITIME) {
        this.cmd.push({
            action: "toDie",
            playTime: playTime,
            keepTime: ANITIME.DIE
        });
        this.isDeath = true;
    }

    toShake(playTime: ANITIME) {
        this.cmd.push({
            action: "toShake",
            playTime: playTime,
            keepTime: ANITIME.DIE_SHAKE
        });
    }

    setVisible(playTime: ANITIME, isVisible: boolean) {
        this.cmd.push({
            action: "setVisible",
            playTime: playTime,
            keepTime: 0,
            isVisible: isVisible
        });
    }
    isBird() {
        return this.type == CELL_TYPE.BIRD;
    }
}
