const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    initNode() {
        let tiledMap = this.node.getComponent(cc.TiledMap)
        let tiledSize = tiledMap.getTileSize()
        let layer = tiledMap.getLayer('wall')
        let layerSize=layer.getLayerSize();
        let smogLayer=tiledMap.getLayer('smog');
        smogLayer.node.active=true;

        for (let y = 0; y < layerSize.height; y++) {
            for (let x = 0; x < layerSize.width; x++) {
                let tiled = layer.getTiledTileAt(x, y, true)
                if (tiled.gid != 0) {
                    tiled.node.group = 'wall'
                    let body = tiled.node.addComponent(cc.RigidBody)
                    body.type = cc.RigidBodyType.Static
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider)
                    let mapSize=tiledMap.getMapSize();
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2)
                    collider.size = tiledSize
                    collider.apply()
                }
            }
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log('wall on Load');
        this.initNode();
    }

    start () {

    }
}
