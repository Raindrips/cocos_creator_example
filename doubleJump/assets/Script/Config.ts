
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        let physicsManage=cc.director.getPhysicsManager();
        physicsManage.enabled=true;
        physicsManage.gravity=cc.v2(0,-1280);
    }

    start () {
        
    }

    // update (dt) {}
}
