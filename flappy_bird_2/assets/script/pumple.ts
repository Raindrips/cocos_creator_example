const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   

    @property
    maxPos: number = 700;

    @property
    minPos: number = 300;

    up:cc.Node=null
    down:cc.Node=null
    concat:cc.Node=null;

    isScore:boolean=false;

    birdNode:cc.Node=null;

    onLoad () {
        this.node.on('init',this.init,this);
        this.up=this.node.getChildByName('up');
        this.down=this.node.getChildByName('down');
    }

    start () {
        this.birdNode=cc.find('Canvas/player/bird');
    }

    init(e:cc.Event.EventCustom){   
        let x=cc.winSize.width;
        let y=Math.random()*(this.maxPos-this.minPos)+this.minPos;

        this.up.y+=y;
        this.down.y+=y;

        this.up.x=x;
        this.down.x=x;
    }

    update (dt) {
        if(this.up.x<-cc.winSize.width){
            this.node.destroy();
            // //获取父亲节点
            // let layer=this.node.parent;
            // cc.log('水管被消耗了 当前水管组:'+layer.childrenCount);
        }

        if(!this.isScore&&this.up.x<this.birdNode.x){
            this.isScore=true;
            this.birdNode.emit('score');
        }
    }
}
