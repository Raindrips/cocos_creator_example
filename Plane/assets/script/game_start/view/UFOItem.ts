import { ItemType } from "../type/Itemtype";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UFOItem extends cc.Component {

	@property(cc.SpriteFrame)
	bomb: cc.SpriteFrame = null

	@property(cc.SpriteFrame)
	fire: cc.SpriteFrame = null

	public itemType: ItemType = ItemType.bomb;

	onLoad() {

	}

	start() {
		let type: ItemType = Math.random() > 0.5 ? ItemType.bomb : ItemType.fire
		let sprite = this.node.getComponent(cc.Sprite)
		this.itemType = type;
		switch (type) {
			case ItemType.bomb:
				sprite.spriteFrame = this.bomb
				break
			case ItemType.fire:
				sprite.spriteFrame = this.fire

				break
		}
	}

	// update (dt) {}

	onCollisionEnter(other: cc.Collider, self: cc.Collider) {
		if (other.node.group == 'player') {
			other.node.emit('getItem', this.itemType);
			self.node.parent.emit('collision');
			self.node.destroy();
		}
	}
}
