
const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property
    speed:number=600;
    start () {
        
    }

    // 更新
    update (dt) {
        this.node.y+=this.speed*dt;
    }

    // 
    onCollisionEnter (other:cc.Collider, self:cc.Collider) {
        self.node.removeFromParent(true);
    }
}
