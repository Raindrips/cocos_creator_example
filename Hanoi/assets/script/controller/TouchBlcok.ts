
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
		this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
		this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    }

    // update (dt) {}
    
	touchStart(e: cc.Event.EventTouch) {
		

	}
    touchMove(e: cc.Event.EventTouch) {
	

	}

	touchEnd(e: cc.Event.EventTouch) {

	}
}
