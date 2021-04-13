const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    onBack(){
        cc.director.loadScene('startMenu');
    }

    start () {

    }

    // update (dt) {}
}
