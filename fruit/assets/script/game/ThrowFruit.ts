const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Prefab])
    fruitPrefab: cc.Prefab[] = [];

    @property(cc.Node)
    range: cc.Node = null;


    onLoad() { }

    start() {
        this.startGame();
    }

    startGame() {

        this.schedule(this.throwMore, 2.5);
    }

    throwMore() {
        let times = this.random(2, 4);
        // for (let i = 0; i < times; i++) {



        // }
        let interval = this.random(0.1, 0.25);
        this.schedule(() => {
            let fruit = this.spawnFruit();
            this.throwFruit(fruit);
        }, interval, times);

    }

    update(dt) { }

    spawnFruit() {
        let i = this.random(0, this.fruitPrefab.length) | 0;
        let fruit = cc.instantiate(this.fruitPrefab[i]);
        let wid = cc.winSize.width / 2
        fruit.x = this.random(-wid, wid)
        fruit.y = -cc.winSize.height / 2;
        fruit.parent = this.node;
        return fruit;

    }

    throwFruit(fruit: cc.Node) {
        let rigid = fruit.getComponent(cc.RigidBody);
        rigid.angularVelocity = Math.random() * 180 + 180;

        //抛射角度
        let target = cc.v3();
        let box = this.range.getBoundingBox();
        target.x = this.random(box.xMin, box.xMax);
        target.x += fruit.x;
        target.y = this.range.y;



        //抛射力度
        let dir = target.sub(fruit.position).normalize();
        let force = this.random(700, 800);
        //往中间方向扔水果
        if (target.x > 0) {
            dir.x = -Math.abs(dir.x)
        }
        else {
            dir.x = Math.abs(dir.x)
        }
        rigid.linearVelocity = cc.v2(dir.mul(force));
        cc.log(dir + '' + force)
    }

    random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
}
