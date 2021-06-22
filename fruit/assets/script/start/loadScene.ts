
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  

    @property
    sceneName: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('apart', this.apart, this);
    }

    start () {

    }

    // update (dt) {}

    apart() {
        this.scheduleOnce(()=>{
            cc.director.loadScene(this.sceneName);
        },2)
    }

}
