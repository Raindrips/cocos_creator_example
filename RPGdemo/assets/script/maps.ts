const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property([cc.Node])
	mapNode: Array<cc.Node> = [];

	initNode(node: cc.Node) {
		let tiledMap = node.getComponent(cc.TiledMap)
		let tiledSize = tiledMap.getTileSize()
		let mapSize = tiledMap.getMapSize();
		let layer = tiledMap.getLayer('wall')
		let layerSize = layer.getLayerSize();
		let smogLayer = tiledMap.getLayer('smog');
		smogLayer.node.active = true;

		for (let y = 0; y < layerSize.height; y++) {
			for (let x = 0; x < layerSize.width; x++) {
				let wall = layer.getTiledTileAt(x, y, true)

				if (wall.gid != 0) {
					wall.node.group = 'wall'
					let body = wall.node.addComponent(cc.RigidBody)
					body.type = cc.RigidBodyType.Static
					let collider = wall.node.addComponent(cc.PhysicsBoxCollider)
					collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2)
					collider.size = tiledSize
					collider.apply()
				}
				//迷雾控制
				let smog = smogLayer.getTiledTileAt(x, y, true)
				if (smog.gid != 0) {
					smog.node.group='smog';
					let collider = smog.node.addComponent(cc.BoxCollider)
					collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2)
					collider.size = tiledSize
					//collider.apply()
				}
			}
		}
	}

	onLoad() {

	}

	start() {
		for (let child of this.mapNode) {
			this.initNode(child)
		}
	}

	// update (dt) {}
}
