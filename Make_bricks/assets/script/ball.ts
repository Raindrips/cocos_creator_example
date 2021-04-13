const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    game: cc.Node =null;

    

    //onLoad () {}

    //start () {}

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider){
        let rig=this.node.getComponent(cc.RigidBody)   
        if(rig.linearVelocity.len()>1000){
            let div=rig.linearVelocity.len()/1000;
            rig.linearVelocity=rig.linearVelocity.divide(div);
        }

        switch(other.tag)
        {
            case 0:
                //球撞到墙
            break;
            case 1:
                //球撞到砖块
                other.node.destroy();
                this.game.emit('add');
            break;
            case 2:
                //球撞到底部地面
                this.gameOver();
            break;
            case 3:
                //球撞到托盘
            break;
            default:
                cc.log('撞到未知物体');
        }
       
        
       
        //cc.log(rig.linearVelocity.x+ ' ' + rig.linearVelocity.y);
    }

    gameOver(){
        this.schedule(()=>{
            cc.director.loadScene('1');
        },1);
    }
}
