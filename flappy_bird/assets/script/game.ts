const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    pumpPrefab: cc.Prefab = null;

    @property(cc.Node)
    startTag:cc.Node=null;

  
    @property
    maxPos:number=-100;
    @property
    minPos:number=-600;

    pumpArr:Array<cc.Node>=[];
    
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = 
        //     cc.PhysicsManager.DrawBits.e_shapeBit;   
        this.node.on('startGame',this.startGame,this);
    }

    startGame () {
        this.startTag.active=false;
        for(let i=0;i<6;i++){
            this.spawnPump(cc.winSize.width * 0.6 * i + cc.winSize.width)
        }
    }

    update (dt) {
        for(let i=0;i<this.pumpArr.length;i++){
            let e=this.pumpArr[i];   
            let child=e.children[0].position;
            let world=e.convertToWorldSpaceAR(child);

            if ( world.x < -cc.winSize.width/2)
            {
                this.pumpArr.shift();
                e.removeFromParent(true);
                let back=this.pumpArr[this.pumpArr.length-1];
                let child=back.getChildByName('up').position;    
                this.spawnPump(cc.winSize.width * 0.6 +child.x);
                return;
            }
        }
    }

    spawnPump(x:number){       
        let pump=cc.instantiate(this.pumpPrefab);       
        pump.y=Math.random()*(this.maxPos-this.minPos)+this.minPos;
        pump.children[0].x=x;
        pump.children[1].x=x;
        this.node.getChildByName('pump').addChild(pump);
        this.pumpArr.push(pump);
	}
	
	reset(){
		cc.director.loadScene('1');
	}

    // update (dt) {}
}
