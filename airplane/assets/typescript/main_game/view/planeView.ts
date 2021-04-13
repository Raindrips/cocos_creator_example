
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    explodePrefab: cc.Prefab = null;

    lj: cc.Node = null;
    chi1: cc.Node = null;

    onLoad() {
        this.lj = this.node.getChildByName('lj')
        this.chi1 = this.node.getChildByName('chi1')
    }

    start() {
        this.schedule(this.spawnBullet,3,0,3);
    }

    spawnBullet(){
        let bullet =cc.instantiate(this.bulletPrefab);
        this.node.parent.addChild(bullet);
    }

    // update (dt) {}
}
