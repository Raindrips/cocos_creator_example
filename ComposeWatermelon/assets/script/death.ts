const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Node)
	backgarournd: cc.Node = null

	@property(cc.Node)
	deathNode: cc.Node = null

	onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
		if (other.node.group == "default") {
			this.backgarournd.off(cc.Node.EventType.TOUCH_START);
			this.deathNode.active = true;
		}
	}

	// update (dt) {}
}
