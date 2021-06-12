
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    arrow: cc.Node = null;

    @property(cc.Label)
    numLabel: cc.Label = null;

    onLoad() {
        this.node.on('setText', this.setText, this);
    }

    start() {

    }

    // update (dt) {
    //     //this.node.y+=300*dt;
    // }

    setText(num: number) {
        cc.log('setText', +num)
        if (num <= 0) {
            this.numLabel.enabled = false;
        }
        this.numLabel.string = num.toString();
    }

    /**
   * 当碰撞产生的时候调用
   * @param  {Collider} other 产生碰撞的另一个碰撞组件
   * @param  {Collider} self  产生碰撞的自身的碰撞组件
   */
    onCollisionEnter(other: cc.Collider, self: cc.Collider) {

        if (other.node.group == 'big_ball') {

        }
        else if (other.node.group == 'small_ball') {
            other.node.stopAllActions();
            self.node.stopAllActions();
            //zy.event.emit("gameover");
            cc.log('小球碰撞，游戏失败');
        }

    }
}
