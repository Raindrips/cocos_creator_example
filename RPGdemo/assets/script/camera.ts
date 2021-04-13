const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player:cc.Node=null
    
    onLoad () {
       
    }

    start () {

    }

    update (dt) {
        if(this.player==null) return
        
        //摄像机跟随人物移动
        let w_pos=this.player.convertToWorldSpaceAR(cc.v2(0,0));
        let n_pos=this.node.parent.convertToNodeSpaceAR(w_pos);
        this.node.setPosition(n_pos)
    }
}
