import CellNode from "./model/cell";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Prefab)
    cellPrefab:cc.Prefab=null

    @property(cc.Node)
    cellLayer:cc.Node=null

    private maxSize=20;
    private maxWCount:number;
    private maxHCount:number;

    private cellNodeGroup:cc.Node[][]=[]
    onLoad () {
        this.maxWCount=this.cellLayer.width/this.maxSize;
        this.maxHCount=this.cellLayer.height/this.maxSize;
        for(let i=0;i<this.maxHCount;i++){
            this.cellNodeGroup[i]=[];
            for (let j = 0; j < this.maxWCount; j++) {
               let cellNode=cc.instantiate(this.cellPrefab);
               cellNode.position=cc.v3(j*this.maxSize,i*this.maxSize);
               cellNode.parent=this.node;

               this.cellNodeGroup[i][j]=cellNode;
            }
        }
    }

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    }

    onTouchStart(e:cc.Event.EventTouch){
        let location=e.getLocation();
        let pos=this.cellLayer.convertToNodeSpaceAR(cc.v3(location));
        let y=(pos.y/this.maxSize)|0;
        let x=(pos.x/this.maxSize)|0;

        let cellNode=this.cellNodeGroup[y][x];
        let cellComp:CellNode= cellNode.getComponent(CellNode);
        cellComp.changeState();
    }

    lifeChange(){
        let nowStateMap:cc.Node[][]=[];
        let nextStateMap:cc.Node[][]=[];
        for(let y=0;y<this.maxHCount;y++){
            for(let x=0;x<this.maxWCount;x++){
                
            }
        }
    }

    // update (dt) {}
}
