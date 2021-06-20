import { StatusRun } from '../status/runStatus'
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    scoreLabel:cc.Label=null

    score:number

    status: StatusRun
    onLoad() {
        this.status = StatusRun.run
        this.score=0;
    }

    update(dt: number) {
        let rigbody=this.node.getComponent(cc.RigidBody);
        let velocity=rigbody.linearVelocity;
        velocity.x=0;
        rigbody.linearVelocity=velocity;
    }

    //跳跃
    onJump() {
        let rigbody=this.node.getComponent(cc.RigidBody);
        cc.log(this.status)
        switch (this.status) {
            case StatusRun.run:
                rigbody.linearVelocity=cc.v2(0,800);
                this.statusChange(StatusRun.jump)
                break;
            case StatusRun.jump:
                rigbody.linearVelocity=cc.v2(0,800);
                this.statusChange(StatusRun.double_jump)
             
                break;
        }
    }
    //落地
    onFloor() {
        switch (this.status) {
            case StatusRun.jump:
            case StatusRun.double_jump:
                this.statusChange(StatusRun.run);
                break
        }
    }

    addScore(){
        this.score++;
        this.scoreLabel.string=this.score.toString();
    }

    statusChange(status: StatusRun) {
       
        if (this.status != status) {
            this.status = status;
            let animation = this.node.getComponent(cc.Animation);
            animation.play(status);
        }
    }

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        let box=self.node.getBoundingBox();
        let otherBox=other.node.getBoundingBox()
        if(box.yMin<otherBox.y||box.xMax<otherBox.xMin){
            contact.disabled=true;
            return;
        }
        if (other.node.group == 'platform') {
            this.onFloor();
        }  
        if(other.node.group == 'gold'){
            other.node.destroy();
            this.addScore();            
        }
    }

    onEndContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        if(other.node.group=='platform'){
            this.statusChange(StatusRun.jump);
        }
        if(other.node.group=='back'){
            this.gameOver();
        }
    }

    gameOver(){
        cc.log('game over');
    }
}
