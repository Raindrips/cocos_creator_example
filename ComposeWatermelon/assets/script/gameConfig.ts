const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        let getPhysicsManager= cc.director.getPhysicsManager()
        getPhysicsManager.enabled = true; // 开启物理系统
        getPhysicsManager.gravity = cc.v2(0, -1000);
        
        //let manager = cc.director.getCollisionManager();
        //manager.enabled = true; //开启碰撞检测系统
        // manager.enabledDebugDraw = true; //开启 debug 绘制：
        // manager.enabledDrawBoundingBox = true;
    }

    // update (dt) {}
}