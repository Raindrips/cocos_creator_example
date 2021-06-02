
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    platformPrefab: cc.Prefab = null;

    @property(cc.Node)
    camera: cc.Node = null

    patfromPoll: cc.NodePool = null;

    @property(cc.Node)
    lastNode: cc.Node = null

    onLoad() {
        this.patfromPoll = new cc.NodePool();
        for (let i = 0; i < 20; i++) {
            let platform = cc.instantiate(this.platformPrefab);

            this.patfromPoll.put(platform);
        }


    }

    start() {
        while (this.patfromPoll.size() > 0) {
            this.spawnPlatform();
        }
    }

    update(dt) {
        let n = this.node.children[0];
        if (n.y < this.camera.y - cc.winSize.height/2) {
            this.patfromPoll.put(n);
            cc.log('刷新节点');
            this.spawnPlatform();
        }
    }

    spawnPlatform() {
        let platform = this.patfromPoll.get()
        platform.x = Math.random() * cc.winSize.width-cc.winSize.width/2;
        platform.y = this.lastNode.y + Math.random() * 100+50;
        this.lastNode = platform;
        this.node.addChild(platform);
     
    }
}
