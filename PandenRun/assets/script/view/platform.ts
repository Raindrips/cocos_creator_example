import { Data } from "../global/data";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



  onLoad() {
    // if(!this.goldGroup){
    //   cc.log('gold group is null');
    //   this.enabled=false;
    // }
  }

  
  start(){
    
  }


  // onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {

  //   if (other.node.group == "back") {
  //     // 重新生成
  //     //self.node.parent.emit('contact');
  //     //self.node.removeFromParent();
      
  //   }
  // }
}