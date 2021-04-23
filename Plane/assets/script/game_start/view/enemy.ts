import {Global} from '../model/global'
const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property
    speedMax:number=600;
    @property
    speedMin:number=300;

    @property
    life=1;

    @property
    score=100

    speed:number;

    start () {       
        this.speed=(Math.random()*(this.speedMax-this.speedMin)+this.speedMin);
    }

    update (dt) {
        this.node.y-=this.speed*dt;
    }

    removeThis(){    
        this.node.removeFromParent(true);
        Global.score+=this.score;
    }

    collision(){
        this.life--;
        if(this.life>0)
            return;
        this.node.getComponent(cc.Collider).enabled=false      
        let animation=this.node.getComponent(cc.Animation)
        let clipName=animation.getClips()[0].name;
        animation.play(clipName)
    }

     //碰撞回调
    onCollisionEnter (other:cc.Collider, self:cc.Collider) {
        this.collision()
    }

    //碰撞结束前调用
    onCollisionStay(other, self) {
        
    }
    
    //碰撞结束后调用
    onCollisionExit(other, self) {
        
    }
}
