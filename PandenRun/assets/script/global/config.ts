
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let physics=cc.director.getPhysicsManager();
        //physics.gravity=cc.v2(0,-6400);
        physics.enabled=true;

    }

    start () {

    }

    // update (dt) {}
}
