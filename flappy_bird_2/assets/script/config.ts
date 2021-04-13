const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    grivate: number = -320;


    onLoad() {
        let physicsMagage = cc.director.getPhysicsManager();
        physicsMagage.enabled = true;
        physicsMagage.gravity = cc.v2(0, this.grivate);
    }

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.enabledDebug, this)
    }

    // update (dt) {}

    enabledDebug(e: cc.Event.EventKeyboard) {
        let physicsMagage = cc.director.getPhysicsManager();
        if (e.keyCode == cc.macro.KEY.f8) {
            if (physicsMagage.debugDrawFlags == 0) {
                physicsMagage.debugDrawFlags =
                    cc.PhysicsManager.DrawBits.e_aabbBit |
                    cc.PhysicsManager.DrawBits.e_jointBit |
                    cc.PhysicsManager.DrawBits.e_shapeBit;

            }
            else{
                physicsMagage.debugDrawFlags=0;
            }
        }
    }
}
