import CoinController from './CoinController'
const { ccclass, property } = cc._decorator;

@ccclass
export default class Coins extends cc.Component {
    @property(cc.Animation)
    anim: cc.Animation = null;

    cointroller: CoinController;


    init(ctr: CoinController) {
        this.cointroller = ctr;
        this.anim.play('gold_down');
    }

    goDown(pos: cc.Vec3, toPos?: cc.Vec3) {
        this.node.parent = cc.director.getScene()
        this.node.position = pos;
        let spawn = cc.spawn(cc.moveTo(0.8, cc.v2(toPos)), cc.scaleTo(0.8, 0.5));
        let cb = cc.callFunc(this.despawnCoin, this);
        let acf = cc.sequence(spawn, cb);
        //this.node.runAction(acf);
        cc.tween(this.node)
            .to(0.8, { position: toPos, scale: 0.5 })
            .call(this.despawnCoin)
            .start()
    }

    despawnCoin() {
        //this.cointroller.despawnCoins(this.node);
    }

}
