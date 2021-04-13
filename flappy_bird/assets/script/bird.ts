const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    overLabel: cc.Label = null;

    @property
    jumpHeigh: number =300;

    @property(cc.Node)
    canvas:cc.Node=null;

    
    firstStart:boolean=true;

    jump(){
        let rigid=this.node.getComponent(cc.RigidBody);
        rigid.linearVelocity=cc.v2(0,this.jumpHeigh);
    }
    onKeyDown(e:cc.Event.EventKeyboard){
        if(e.keyCode==cc.macro.KEY.space){
            if(this.firstStart){
                this.firstStart=false;
                this.startGame();
                this.canvas.emit('startGame');
            }
            this.jump();
        }
    }

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
     }

    startGame () {
        let rigid=this.getComponent(cc.RigidBody);
        rigid.gravityScale=5;  
           
    }
    gameover(){
        this.overLabel.node.active=true;
        cc.tween(this.overLabel.node)
        .to(1,{position:cc.v3(0,200)})
        .start();    
        cc.director.getPhysicsManager().enabled = false;
        let anim=this.node.getComponent(cc.Animation);
        anim.stop('bird');
    }

    onBeginContact (contact:cc.PhysicsContact, 
        selfCollider:cc.BoxCollider,
        otherCollider:cc.BoxCollider) 
    {
        this.gameover();
    }
}
