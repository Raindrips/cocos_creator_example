
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    speed:number=600;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // 开启重力感应事件
        cc.systemEvent.setAccelerometerEnabled(true);

        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this)
    }

    moveX:number=0;

    onDeviceMotionEvent(event) {
        cc.log(event.acc.x + " " + event.acc.y);
        this.moveX=event.acc.x;
    }

    update (dt) {
        this.node.x += this.moveX *this.speed* dt;
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }
}
