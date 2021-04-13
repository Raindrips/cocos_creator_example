const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    touchNode: cc.Node = null;

    @property(cc.Animation)
    gameOverLabel:cc.Animation=null

    @property(cc.Button)
    startButton: cc.Button = null

    @property(cc.Label)
    scoreLabel:cc.Label=null;

    @property
    height: number = 800;

    @property
    grivate: number = 1.2;

    isGameStart: boolean = false;
    isGameOver:boolean=false;

    score:number=0;


    // onLoad () {}

    start() {
        //触摸事件
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.flying, this);
        //键盘事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.flying, this)

        this.node.on('score',this.addScore,this);
    }

    // update (dt) {}

    flying() {
        if (!this.isGameStart) {
            this.startGame()
        }
        if(this.isGameOver){
            return;
        }
        if(this.node.y>cc.winSize.height/2){
            //不允许飞出屏幕外
            return
        }
        let rigid = this.node.getComponent(cc.RigidBody);
        rigid.linearVelocity = cc.v2(0, this.height);
    }

    startGame() {
        let rigid = this.node.getComponent(cc.RigidBody);
        rigid.gravityScale = this.grivate;
        this.isGameStart = true;
        this.startButton.clickEvents[0].emit([])
        this.startButton.node.active = false;


    }

    gameOver(){
        this.gameOverLabel.node.active=true;
        this.gameOverLabel.play();

        this.isGameOver=true;

        let rigid = this.node.getComponent(cc.RigidBody);
        rigid.angularVelocity = -360;

        let anim=this.node.getComponent(cc.Animation);
        anim.stop();
        
        this.scheduleOnce(()=>{
            cc.director.loadScene('gameRun');
        },3);
    }

    addScore(){
        this.score++;
        this.scoreLabel.string=this.score.toString();
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        // cc.log('撞到了');
        if(this.isGameOver){
            return;
        }
        this.gameOver();
    }

}
