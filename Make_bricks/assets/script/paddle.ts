
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start () {
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE,this.touchStart,this);
    }

    touchStart(e:cc.Event.EventTouch){
        let pos=this.node.parent.convertToNodeSpaceAR(e.getLocation());
        this.node.x=pos.x;
    }

    // update (dt) {}
}
