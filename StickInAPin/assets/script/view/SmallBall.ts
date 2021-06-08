
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    arrow: cc.Node = null;

    @property(cc.Label)
    numLabel: cc.Label = null;

    // onLoad () {}

    start() {

    }

    // update (dt) {}

    initSmallBall(num:number,showArrow:boolean) {
        this.numLabel.string = num.toString();
        this.arrow.active = showArrow;
    }

    /**
   * 当碰撞产生的时候调用
   * @param  {Collider} other 产生碰撞的另一个碰撞组件
   * @param  {Collider} self  产生碰撞的自身的碰撞组件
   */
    onCollisionEnter(other:cc.Collider, self:cc.Collider) {
        
        other.node.stopAllActions();
        self.node.stopAllActions();
        //zy.event.emit("gameover");
        cc.log('小球碰撞，游戏失败');
    }
}
