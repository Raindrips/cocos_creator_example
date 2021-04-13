import { CELL_WIDTH, CELL_HEIGHT, } from '../model/constValue';
import { CELL_STATUS, ANITIME } from '../model/typeModel'
import CellModel from '../model/CellModel';

const { ccclass, property } = cc._decorator;

@ccclass
export default class CellView extends cc.Component {

    defaultFrame: cc.SpriteFrame = null;

    isSelect: boolean = false;
    model: CellModel = null;
    status: CELL_STATUS = CELL_STATUS.COMMON;

    onLoad() {
        this.defaultFrame = this.node.getComponent(cc.Sprite).spriteFrame;
    }
    initWithModel(model: CellModel) {
        this.model = model;
        let x = model.start.x;
        let y = model.start.y;
        this.node.x = CELL_WIDTH * (x - 0.5);
        this.node.y = CELL_HEIGHT * (y - 0.5);
        let animation = this.node.getComponent(cc.Animation);
        if (model.status == CELL_STATUS.COMMON) {
            animation.stop();
        }
        else {
            animation.play(model.status);
        }
    }

    // 执行移动动作
    updateView() {
        let cmd = this.model.cmd;
        if (cmd.length <= 0) {
            return;
        }
        let tween = cc.tween(this.node);
        let curTime = 0;
        for (let c of cmd) {
            if (c.playTime > curTime) {
                tween.delay(c.playTime - curTime);
            }
            if (c.action == "moveTo") {
                let x = (c.pos.x - 0.5) * CELL_WIDTH;
                let y = (c.pos.y - 0.5) * CELL_HEIGHT;

                tween.to(ANITIME.TOUCH_MOVE, { position: cc.v3(x, y) });
            }
            else if (c.action == "toDie") {
                if (this.status == CELL_STATUS.BIRD) {
                    let animation = this.node.getComponent(cc.Animation);
                    animation.play("effect");

                    tween.delay(ANITIME.BOMB_BIRD_DELAY);
                }
                tween.removeSelf();
            }
            else if (c.action == "setVisible") {
                let isVisible = c.isVisible;

                tween.call(() => {
                    this.node.opacity = isVisible ? 255 : 0;
                })
            }
            else if (c.action == "toShake") {
                let action = cc.tween(this.node)
                    .by(0.06, { angle: 30 })
                    .by(0.12, { angle: -60 })
                    .by(0.06, { angle: 30 });
                tween.repeat(2, action);
            }
            curTime = c.playTime + c.keepTime;
        }
        tween.start();

    }
    setSelect(flag: boolean) {
        let animation = this.node.getComponent(cc.Animation);
        if (flag == false && this.isSelect && this.model.status == CELL_STATUS.COMMON) {
            animation.stop();
            this.node.getComponent(cc.Sprite).spriteFrame = this.defaultFrame;
        }
        else if (flag && (this.model.status == CELL_STATUS.COMMON || this.model.status == CELL_STATUS.BIRD)) {
            animation.play(CELL_STATUS.CLICK);
        }
        else if (flag && this.model.status == CELL_STATUS.BIRD) {
            animation.play(CELL_STATUS.CLICK);
        }
        //bg.active = flag;
        this.isSelect = flag;
    }
}
