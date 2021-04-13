const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioUtils extends cc.Component {

    @property(cc.AudioClip)
    swap: cc.AudioClip = null;

    @property(cc.AudioClip)
    click: cc.AudioClip = null;

    @property([cc.AudioClip])
    eliminate: cc.AudioClip[] = [];

    @property([cc.AudioClip])
    continuousMatch: cc.AudioClip[] = [];

    // onLoad () {}

    playClick() {
        cc.audioEngine.play(this.click, false, 1);
    }
    playSwap() {
        cc.audioEngine.play(this.swap, false, 1);
    }
    playEliminate(step: number) {
        step = Math.min(this.eliminate.length - 1, step);
        cc.audioEngine.play(this.eliminate[step], false, 1);
    }
    playContinuousMatch(step: number) {
        step = Math.min(step, 11);
        if (step < 2) {
            return
        }
        cc.audioEngine.play(this.continuousMatch[Math.floor(step / 2) - 1], false, 1);
    }

    // update (dt) {}
}
