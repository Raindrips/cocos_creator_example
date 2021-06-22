
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteFrame)
    default: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    left: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    right: cc.SpriteFrame = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('apart', this.apart, this);
        let rigid = this.node.getComponent(cc.RigidBody);
        //rigid.gravityScale=2;
    }

    start() {
        //this.scheduleOnce(this.apart,2);
    }



    update(dt) {
        this.drop();
    }

    //切开
    apart() {
        this.node.group='default';
        //关闭碰撞组件
        let polyon = this.node.getComponent(cc.PhysicsPolygonCollider)
        polyon.enabled = false;
        polyon.destroy();

        let right = cc.instantiate(this.node);
        right.parent = this.node.parent

        let left = this.node;
        let leftSprite = left.getComponent(cc.Sprite);
        leftSprite.spriteFrame = this.left;
        this.addForce(left, -1);

        let rightSprite = right.getComponent(cc.Sprite);
        rightSprite.spriteFrame = this.right;
        this.addForce(right, 1);

    }

    addForce(furit: cc.Node, dirction: number) {
        let rigid = furit.getComponent(cc.RigidBody);
        let force = cc.v2(dirction, -0.3);
        rigid.linearVelocity = cc.v2(force.mul(300));
        rigid.angularVelocity = Math.random() * 100
    }

    //
    drop() {
        if (this.node.y <= -cc.winSize.height) {

            if (this.node.group == 'fruit') {
                cc.log('水果掉落');
                let canvas= cc.Canvas.instance
                canvas.node.emit('dropFruit');
            }
            this.node.destroy();
        }
    }
}
