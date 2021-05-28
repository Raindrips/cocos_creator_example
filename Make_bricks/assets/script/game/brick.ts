const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteAtlas)
    spriteAltas: cc.SpriteAtlas = null;

    // onLoad () {}

    start() {
        let n = 'brick' + (Math.random() * 4 | 0);
        cc.log('random:' + n)

        let sp = this.node.getComponent(cc.Sprite);
        sp.spriteFrame = this.spriteAltas.getSpriteFrame(n)
    }

    
}
