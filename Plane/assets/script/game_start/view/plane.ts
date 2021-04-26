import { Global } from "../model/global";
import { ItemType } from "../type/Itemtype";

const { ccclass, property } = cc._decorator;

enum BulletType {
    one,
    double,
}

@ccclass
export default class Plane extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Prefab)
    bullet: cc.Prefab = null;



    public bulletType: BulletType = BulletType.one;


    isGameOver: boolean = false;

    onLoad() {
        this.node.on('getItem', this.getItem, this);
    }

    start() {
        this.schedule(this.spawnBullet, 0.1);
    }

    getItem(type: ItemType) {
        switch (type) {
            case ItemType.bomb:
                Global.bombSize++;
                break;

            case ItemType.fire:
                this.bulletType = BulletType.double;
                this.scheduleOnce(() => {
                    this.bulletType = BulletType.one;
                }, 8);
                break;
        }

    }

    //生成子弹
    spawnBullet() {
        if (this.isGameOver) {
            return
        }
        switch (this.bulletType) {
            case BulletType.one:
                let bullet = cc.instantiate(this.bullet);
                bullet.position = this.node.position;
                this.canvas.addChild(bullet);
                break;
            case BulletType.double:
                let bulletl = cc.instantiate(this.bullet);
                bulletl.position = this.node.position;
                bulletl.x += 30;
                this.canvas.addChild(bulletl);
                let bulletr = cc.instantiate(this.bullet);
                bulletr.position = this.node.position;
                bulletr.x -= 30;
                this.canvas.addChild(bulletr);
                break;
        }
    }

    //飞机碰撞
    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.node.group == 'enemy') {
            let collision = this.node.getComponent(cc.BoxCollider);
            collision.enabled = false;
            this.isGameOver = true;

            let animation = self.node.getComponent(cc.Animation)
            animation.play('player_down');
        }
        // if (other.node.group == 'UFO') {

        // }
    }

    gameover() {
        this.node.opacity = 0;
        this.unschedule(this.spawnBullet);
        cc.sys.localStorage.setItem('currentScore',Global.score);
        this.scheduleOnce(() => {
            cc.log("load scene restart");
            cc.director.loadScene('restart');
            this.node.removeFromParent(true);
        }, 1);
    }

    useBomb() {
        if (Global.bombSize > 0) {
            Global.bombSize--;
            this.node.parent.emit('destroyAllEnemy');
        }

    }

    // update (dt) {}
}
