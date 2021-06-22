const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    labelScore: cc.Label = null;

    @property(cc.Node)
    overNode: cc.Node = null;

    @property(cc.Node)
    healthBar: cc.Node = null

    @property(cc.Node)
    spartBoom: cc.Node = null

    @property(cc.AudioClip)
    boomAudio: cc.AudioClip = null

    @property(cc.AudioClip)
    overAudio: cc.AudioClip = null;

    socre: number = 0;

    dropTimes: number = 0;

    onLoad() {
        this.node.on('addSocre', this.addSocre, this);
        this.node.on('dropFruit', this.dropFruit, this);
        this.node.on('gameover', this.gameover, this);
        this.node.on('boomlight', this.boomlight, this);
    }

    start() {

    }

    // update (dt) {}

    addSocre() {
        this.socre++;
        this.labelScore.string = this.socre.toString();
    }

    dropFruit() {

        let xx = this.healthBar.children[this.dropTimes]
        xx.children[0].active = true;

        this.dropTimes++;
        if (this.dropTimes >= 3) {
            cc.audioEngine.playEffect(this.overAudio, false);
            this.gameover();
            return;
        }
    }

    gameover() {
        this.overNode.active = true;
        this.scheduleOnce(() => {
            cc.director.loadScene('start');
        }, 3)
    }

    boomlight() {
        cc.audioEngine.playEffect(this.boomAudio, false);
        let animation = this.spartBoom.getComponent(cc.Animation);
        animation.play();
        this.scheduleOnce(() => {
            this.gameover();
        }, 1.5)
    }
}
