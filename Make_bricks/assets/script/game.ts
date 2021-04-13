const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    scoreLabel: cc.Label = null

    score: number = 0;

    onLoad () {
        this.node.on('add',this.addScore,this);
    }

    start() {
        this.scoreLabel.string = this.score.toString();
    }

    addScore(){
        this.score++;
        this.scoreLabel.string = this.score.toString();
    }

    init() {

    }

    // update (dt) {}
}
