
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Color)
    color: cc.Color = null;

    @property(cc.AudioClip)
    apart: cc.AudioClip = null;

    attack: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.color = this.color;
    }

    start() {
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    update(dt: number) {
    }

    startPos: cc.Vec2;
    onTouchStart(e: cc.Event.EventTouch) {
        let motion = this.node.getComponent(cc.MotionStreak);

        motion.reset();
        this.startPos = e.getLocation();
        this.node.position = cc.v3(this.node.parent.convertToNodeSpaceAR(e.getLocation()));
    }

    onTouchMove(e: cc.Event.EventTouch) {
        let v2 = this.node.parent.convertToNodeSpaceAR(e.getLocation())
        this.node.x = v2.x
        this.node.y = v2.y
        let len = e.getLocation().sub(this.startPos).len();
        if (len > 50) {
            this.attack = true;
        }
    }

    onTouchEnd(e: cc.Event.EventTouch) {
        this.attack = false;
    }
    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {

        if (!this.attack) {
            return
        }
        //获取游戏画布
        let canvas = cc.Canvas.instance
        if (other.node.group == 'fruit') {
            other.node.emit('apart');
            cc.audioEngine.playEffect(this.apart, false);
            canvas.node.emit('addSocre');
        }
        else if (other.node.group == 'boom') {
            canvas.node.emit('boomlight');
            this.node.active = false;
        }
    }


}
