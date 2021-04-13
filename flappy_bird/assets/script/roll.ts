const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    speed: number = 60;

    @property(cc.Node)
    n1:cc.Node=null;
    @property(cc.Node)
    n2:cc.Node=null;

    link(n1:cc.Node,n2:cc.Node){
        n1.x=n2.x+n2.getContentSize().width;
    }

    start () {
      
    }

    update (dt) {
        if(this.n1.position.x<-this.n1.getContentSize().width){
            this.link(this.n1,this.n2);
        }
        if(this.n2.position.x<-this.n2.getContentSize().width){
            this.link(this.n2,this.n1);
        }
        this.n1.x-=this.speed*dt;
        this.n2.x-=this.speed*dt;
    }
}
