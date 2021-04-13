
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onPlay(){
        cc.director.loadScene("planeReady");
    }
}
