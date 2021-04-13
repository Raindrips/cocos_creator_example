
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    pumple: cc.Prefab = null;

    // onLoad () {}

    start () {
        
    }

    // update (dt) {}

    spawnPumple(){
        let pumple=cc.instantiate(this.pumple);
        let pumpleLayer=this.node.getChildByName('pumpleLayer');
        pumpleLayer.addChild(pumple);
        pumple.emit('init')
    }

    startGame(){
        this.schedule(this.spawnPumple,1.2);
    }
}
