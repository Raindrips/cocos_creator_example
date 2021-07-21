import Coins from './Coins';
import NumUp from './NumUp';
const { ccclass, property } = cc._decorator;

@ccclass
export default class CoinController extends cc.Component {

    @property(cc.Prefab)
    coinPlusPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    coinsPrefab: cc.Prefab = null;

    @property([cc.Sprite])
    number: cc.Sprite[] = []

    @property(cc.SpriteAtlas)
    timerAtlas: cc.SpriteAtlas = null;

    @property
    currentValue: number = 500;

    @property
    toValue: number = 0;

    coinUpPool: cc.NodePool;
    coinsPool: cc.NodePool;

    // +金币数字
    coin_up: cc.Node;

    // 获得金币
    oneCoin: cc.Node;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.coinUpPool = new cc.NodePool();
        this.coinsPool = new cc.NodePool();
        this.setValue(this.currentValue);
    }

    init() {
       
    }

    // 数字固定长度lenght，不够的补0
    prefixInteger(num: number, length: number) {
        return (Array(length).join('0') + num).slice(-length);
    }

    setValue(value: number) {
        let str = this.prefixInteger(value, 6);
        let nums = str.split('');
        for (let i = 0; i < this.number.length; i++) {
            this.number[i].spriteFrame = this.timerAtlas.getSpriteFrame(nums[i].toString())
        }
    }

    // 获取金币加数
    addCoins(value: number) {
        this.currentValue += value;
        this.setValue(this.currentValue);
    }

    // 发射子弹消耗金币
    reduceCoin(level: number): boolean {
        if (this.currentValue >= level) {
            this.setValue(this.currentValue -= level);
            return true;
        }

        return false;
    }

     //生成金币动画
    gainCoins(coinPos: cc.Vec3, coinnum: number) {
        // 上升的数字对象池
        if (this.coinUpPool.size() > 0) {
            this.coin_up = this.coinUpPool.get();
        } else {
            this.coin_up = cc.instantiate(this.coinPlusPrefab);
        }

        this.coin_up.getComponent(NumUp).init(coinPos, coinnum, this);

        // 金币对象池
        if (this.coinsPool.size() > 0) {
            this.oneCoin = this.coinsPool.get();
        } else {
            this.oneCoin = cc.instantiate(this.coinsPrefab);
        }
        this.oneCoin.getComponent(Coins).init(this);
        // 转为世界坐标
        let toPos = this.node.convertToWorldSpaceAR(this.number[3].node.position);
        this.oneCoin.getComponent(Coins).goDown(coinPos, this.number[3].node.position);
        this.addCoins(coinnum);
    }

    despawnCoins(coin: cc.Node) {
        this.coinsPool.put(coin);
    }

    despawnCoinup(nup: cc.Node) {
        this.coinUpPool.put(nup);
    }
}
