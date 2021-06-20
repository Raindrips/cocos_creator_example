
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Component.EventHandler)
    handle:cc.Component.EventHandler=null;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
    }

    touchStart(ev:cc.Event.EventTouch){
        this.handle.emit([]);
    }

    keyDown(ev:cc.Event.EventKeyboard){
        this.handle.emit([]);
    }

    // update (dt) {}
}
