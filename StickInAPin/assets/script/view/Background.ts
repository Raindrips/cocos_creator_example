
const { ccclass, property } = cc._decorator;

export enum State {
    StartGame,
    GameOver,
    NextLevel,
}

@ccclass
export default class NewClass extends cc.Component {

    setState(state: State) {
        switch (state) {
            case State.StartGame:
                cc.tween(this.node)
                    .to(0.5, { color: cc.color(200, 200, 200) })
                    .start();
                break;
            case State.GameOver:
                // cc.tween(this.node)
                //     .to(0.5, { color: cc.color(255, 136, 142) })
                //     .start();
                cc.tween(this.node)
                    .to(0.5, { color: cc.color(142, 64, 99) })
                    .start();
                break;

            case State.NextLevel:
                cc.tween(this.node)
                    .to(0.5, { color: cc.color(64, 64, 142) })
                    .start();
                break;
        }
    }


    onLoad() {
        this.node.on('setState', this.setState, this);
    }

    // start() {

    // }

    // update (dt) {}
}
