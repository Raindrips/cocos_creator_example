import {Global} from './global'
const {ccclass, property} = cc._decorator;



@ccclass
export default class Game extends cc.Component {

    @property(cc.Node)
    play: cc.Node = null;

    @property([cc.Prefab])
    enemy: Array<cc.Prefab> = [];

    @property(cc.Label)
    label:cc.Label=null

    @property(cc.Node)
    enemyGroup:cc.Node=null

    @property(cc.Node)
    bulletGroup:cc.Node=null
    

    onLoad () {
        let manager = cc.director.getCollisionManager();
        //默认碰撞检测系统是禁用的
        manager.enabled = true;
        //默认碰撞检测系统的 debug 绘制是禁用的
        //manager.enabledDebugDraw = true;
        //显示碰撞包围盒
        //manager.enabledDrawBoundingBox = true;
    }

    start () {
       
        this.schedule(this.spawnEnemy,1)
    }

    update (dt) {
        if(this.label){
            let num=parseInt(this.label.string);
            this.label.string=Global.score.toString();
        }
    }

   
    
    //生成敌机
    spawnEnemy(){       
        let r:number= parseInt((Math.random()*this.enemy.length).toString())   
        let enemy=cc.instantiate(this.enemy[r])
        enemy.position=this.node.position
        enemy.x=Math.random()*cc.winSize.width-(cc.winSize.width/2);
		this.enemyGroup.addChild(enemy)
    }

   
}
