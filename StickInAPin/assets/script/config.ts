
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad() {

    }

    start() {
        let mng = cc.director.getCollisionManager();
        mng.enabled = true;
        // mng.enabledDebugDraw = true;
        // mng.enabledDrawBoundingBox = true;
    }

    // update (dt) {}
}
