const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    up:cc.Node;
    down:cc.Node;
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.up=this.node.getChildByName('up');
        this.down=this.node.getChildByName('down');      
    }
    
    
}
