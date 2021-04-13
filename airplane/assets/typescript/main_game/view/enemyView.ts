const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

  // 
  @property(cc.Prefab)
  explodePrefab: cc.Prefab = null

  onLoad() {

  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    let exp = cc.instantiate(this.explodePrefab)
    self.node.addChild(exp)
  }

  removeThis() {
    this.node.removeFromParent(true);
    //Global.score+=this.score;
  }

  update(dt: number) {
      
  }
}
