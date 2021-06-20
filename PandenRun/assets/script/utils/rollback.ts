const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    other: cc.Node = null;

    @property
    speed: number = 0;

    onLoad () {
        if(this.other==null){
            cc.log('roll other is null');
            this.enabled=false;
        }
    }

    update (dt:number) {
        let trigger=this.node.width;

        if(this.node.x<-trigger){
            this.node.x=this.other.x+trigger;
        }
        if(this.other.x<-trigger){
            this.other.x=this.node.x+trigger;
        }
        this.node.x-=this.speed*dt;
        this.other.x-=this.speed*dt;
    }
}
