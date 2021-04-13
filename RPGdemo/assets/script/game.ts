const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        let manage=cc.director.getPhysicsManager();
        manage.enabled=true;
        //manage.debugDrawFlags=1;

        let collision=cc.director.getCollisionManager();
        collision.enabled=true;
        //collision.enabledDebugDraw=true;
        //collision.enabledDrawBoundingBox = true;
    }

    start () {
        
    }

    // update (dt) {}

    
}
