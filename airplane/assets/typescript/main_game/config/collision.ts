const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        let collision:cc.CollisionManager=cc.director.getCollisionManager();
        collision.enabled=true;
    }

    // update (dt) {}
}
