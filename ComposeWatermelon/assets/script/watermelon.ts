import { WETERMELON_ARRAY, Global } from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteAtlas)
    atlas: cc.SpriteAtlas = null;

    @property([cc.SpriteFrame])
    BoomFrame: cc.SpriteFrame[] = []

    onLoad() {
        this.changeType(Global.WETERMELON_TYPE);
    }

    changeType(type: number) {
        type = this.checkType(type);
        let sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = this.atlas.getSpriteFrames()[type];

        let physics = this.node.getComponent(cc.PhysicsCircleCollider);
        physics.tag = type;
        if (type == 0) {
            physics.radius = (54 / 2 + 5);
        } else if (type == 1) {
            physics.radius = (80 / 2);
        } else if (type == 2) {
            physics.radius = (110 / 2);
        } else if (type == 3) {
            physics.radius = (122 / 2);
        } else if (type == 4) {
            physics.radius = (154 / 2);
        } else if (type == 5) {
            physics.radius = (186 / 2);
        } else if (type == 6) {
            physics.radius = (188 / 2);
        } else if (type == 7) {
            physics.radius = (260 / 2);
        } else if (type == 8) {
            physics.radius = (310 / 2);
        } else if (type == 9) {
            physics.radius = (304 / 2);
        } else if (type == 10) {
            physics.radius = (406 / 2);
        }
        physics.apply();

        this.node.width = physics.radius * 2;
        this.node.height = physics.radius * 2;
    }

    checkType(type: number): number {
        if (type < 0) {
            return 0;
        }
        const length = this.atlas.getSpriteFrames().length;
        if (type >= length) {
            return length - 1;
        }
        return type;
    }

    // update (dt) {}

    onBeginContact(
        contact: cc.PhysicsContact,
        self: cc.PhysicsCollider,
        other: cc.PhysicsCollider) {
        if (other.node.group != "default") {
            return;
        }
        if (self.tag == other.tag && other.tag != 10) {
            if (self.node.y < other.node.y) {
                console.log("碰撞", other.tag)
                other.node.destroy();
                this.watermelonBoom(self.tag);
            } else {
                this.node.destroy();

                return;
            }
        }
    }

    //西瓜爆炸
    watermelonBoom(type: number) {
        let sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = this.BoomFrame[type];
        let physics = this.node.getComponent(cc.PhysicsCircleCollider);
        physics.tag = type;
        physics.apply();

        this.scheduleOnce(() => {
            this.changeType(type + 1);
            Global.SCORE += (type + 1) * 2
            this.node.parent.emit('addScore');
        }, 0.2);

        // 播放音乐
        this.node.getComponent(cc.AudioSource).play();
    }
}
