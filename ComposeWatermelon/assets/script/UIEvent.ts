
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    backToStart(){
        cc.director.loadScene("game_start");
    }

    resetGame(){
        cc.director.loadScene("game_run");
    }

    onLoad () {
        this.node.on('backToStart',this.backToStart,this);
        this.node.on('resetGame',this.resetGame,this);
    }

    // start () {

    // }

    // update (dt) {}
}
