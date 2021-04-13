import { Global } from '../../Global'
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Prefab])
    planePres: cc.Prefab[] = []

    @property([cc.Prefab])
    enemyPres: cc.Prefab[] = []

    @property(cc.Node)
    heroLayer: cc.Node = null

    @property(cc.Node)
    enemyLayer: cc.Node = null

    @property(cc.Node)
    gameOver: cc.Node = null

    onLoad() {

    }

    start() {
        this.spawnHero()
        this.schedule(this.spawnEnemy,2)
    }

    // update (dt) {}

    spawnHero() {
        let plane = cc.instantiate(this.planePres[Global.selectIndex]);
        plane.position = this.node.position;
        this.heroLayer.addChild(plane);
    }

    //生成敌机
    spawnEnemy() {
        let r: number = parseInt((Math.random() * this.enemyPres.length).toString())
        let enemy = cc.instantiate(this.enemyPres[r])
        enemy.y=-this.enemyLayer.height;
        enemy.x = Math.random() * cc.winSize.width - (cc.winSize.width / 2)
        this.enemyLayer.addChild(enemy)
    }
}
