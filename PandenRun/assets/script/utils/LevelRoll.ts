const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    speed: number = 0;

    @property(cc.Node)
    level:cc.Node=null

    target:cc.Node=null

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.target=cc.instantiate(this.level);
        this.target.parent=this.level.parent;
        this.target.x=this.level.x=this.level.width;
    }

    start () {
        
    }

    update (dt:number) {
        let trigger=this.level.width;

        if(this.level.x<-trigger){
            this.level.x=this.target.x+trigger;
        }
        if(this.target.x<-trigger){
            this.target.x=this.level.x+trigger;
        }
        this.level.x-=this.speed*dt;
        this.target.x-=this.speed*dt;
    }
}
