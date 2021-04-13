const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    moveNode: cc.Node = null;

    speed:number=300;
    // onLoad () {}

    isMove:boolean=false;
    pos:cc.Vec3=cc.v3();

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
    }

    touchStart(event:cc.Event.EventTouch){
        this.pos=cc.v3(event.getLocation());
        this.isMove=true
    }

    touchEnd(event:cc.Event.EventTouch){
        this.isMove=false
    }

    movePos(pos:cc.Vec3,dt:number){
        let oldPos= this.moveNode.position;
        //移动方向
        let dirction=pos.sub(oldPos).normalize();
        //偏移方向
        this.moveNode.position=oldPos.add(dirction.mul(this.speed*dt));
    }

    update (dt:number) {
        if(this.isMove){
            this.movePos(this.pos,dt);
        }
    }
}
