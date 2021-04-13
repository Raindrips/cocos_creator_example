const {ccclass, property} = cc._decorator;

@ccclass
export default class Plane extends cc.Component {

    @property(cc.Node)
    canvas:cc.Node=null;

    @property(cc.Prefab)
    bullet: cc.Prefab = null;

    isGameOver:boolean=true;
    gameover(){
        this.node.removeFromParent(true);
    }
    onLoad () {}

    start () {
		 this.schedule(this.spawnBullet,0.1)
    }

     //生成
     spawnBullet(){
        let bullet=cc.instantiate(this.bullet);
        bullet.position=this.node.position;
		this.canvas.addChild(bullet);
    }
    
    
    onCollisionEnter (other:cc.Collider, self:cc.Collider) {
        if(other.node.group=='enemy'){
            let animation=self.node.getComponent(cc.Animation)
            animation.play('player_down');
        }
       
    }
	
    // update (dt) {}
}
