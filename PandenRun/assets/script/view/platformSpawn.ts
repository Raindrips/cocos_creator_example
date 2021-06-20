import { Data } from '../global/data'
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property([cc.Prefab])
	platformPrefab: cc.Prefab[] = [];

	@property
	maxSpeed: number = 1000;

	@property(cc.Node)
	lastPlatform: cc.Node = null

	@property([cc.Prefab])
	goldList: cc.Prefab[] = []

	platformList: cc.Node[] = [];

	randomRange(max: number, min: number) {
		return Math.random() * (max - min) + min;
	}

	onLoad() {
		this.node.on('contact', this.platformSpawn, this);
		for (let i = 0; i < 10; i++) {
			this.platformSpawn();
		}
	}

	start() {

	}

	update(dt: number) {
		//平台移动速度变更
		if (Data.speed < this.maxSpeed) {
			Data.speed += 0.02;
		}
	}

	platformSpawn() {
		let index = Math.random() * this.platformPrefab.length | 0;
		let platform = cc.instantiate(this.platformPrefab[index]);
		let v2 = cc.v2(0, 0)
		if (this.lastPlatform == null) {
			return;
		}
		let right = this.lastPlatform.getBoundingBox();
		v2.x = right.xMax + platform.width / 2 + this.randomRange(120, 260);
		let height = cc.winSize.height;
		v2.y = this.randomRange(height * 0.2, height * 0.6) - height / 2;
		//防止太高,跳不上
		let offer_y = 80;
		if (v2.y > this.lastPlatform.y + offer_y) {
			v2.y = this.lastPlatform.y + offer_y;
		}
		platform.position = cc.v3(v2);
		let physics = platform.getComponent(cc.RigidBody);
		physics.linearVelocity = cc.v2(-Data.speed, 0);
		this.node.addChild(platform);
		this.platformList.push(platform)
		this.lastPlatform = platform;

		this.spawnGlod();
	}

	onEndContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
		cc.log('destory')
		if (other.node.group == "platform") {
			// 重新生成
			this.platformList.shift();
			this.platformSpawn();
			other.node.removeFromParent();

		}
	}

	//随机生成金币
	spawnGlod() {

		if (Math.random() <1) {
			let i = (Math.random() * this.goldList.length) | 0;
			let gold = cc.instantiate(this.goldList[i]);
			if (gold.children.length > 0) {
				for (let g of gold.children) {
					this.setGold(g);
				}
			}
			else {
				this.setGold(gold);
			}
			this.node.addChild(gold);

		}
	}

	setGold(gold: cc.Node) {
		let pos = this.lastPlatform.position;
		gold.x += pos.x;
		gold.y += pos.y + 100;
		let rigbody = gold.getComponent(cc.RigidBody);
		rigbody.linearVelocity = cc.v2(-Data.speed, 0);
	}
}

