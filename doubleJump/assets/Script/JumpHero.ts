import KeyMove from "./KeyMove";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ABC extends cc.Component {

    @property
    jumpHeight: number = 500;

    @property
    speed: number = 500;

    rigbody: cc.RigidBody = null;

    key: Map<number, boolean> = null;

    onLoad() {
        this.rigbody = this.node.getComponent(cc.RigidBody);
    }

    start() {

    }

    update(dt: number) {
        this.key = this.node.getComponent(KeyMove).Key;
        if (!this.key) {
            return;
        }
        let v: cc.Vec3 = cc.v3(0, 0);
        if (this.key.get(cc.macro.KEY.left) || this.key.get(cc.macro.KEY.a)) {
            v.x = -300;
        }
        if (this.key.get(cc.macro.KEY.right) || this.key.get(cc.macro.KEY.d)) {
            v.x = 300;
        }
        this.node.x += v.x * dt;
        if (this.node.x < -cc.winSize.width / 2) {
            this.node.x = cc.winSize.width / 2;
        }
        if (this.node.x > cc.winSize.width / 2) {
            this.node.x = -cc.winSize.width / 2;
        }
    }

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        if (self.tag == 2) {
            if (self.node.getBoundingBox().yMin < other.node.y) {
                contact.disabled = true;
                return;
            }
            let v = this.rigbody.linearVelocity;
            v.y = this.jumpHeight;
            this.rigbody.linearVelocity = v;
        }
    }
}
