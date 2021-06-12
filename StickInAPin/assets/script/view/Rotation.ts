const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    dir:number=0;

    speed:number=10
    
    onLoad () {
        this.node.on('setDir',this.setDir,this);
    }

    update (dt) {
        this.node.angle += this.dir * this.speed * dt;
    }

    setDir(dir:number,speed:number){
        this.dir=dir;
        this.speed=speed;
    }
}
