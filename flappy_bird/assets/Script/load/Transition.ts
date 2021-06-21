
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // onLoad () {}

    start () {
        cc.tween(this.node)
        .to(2,{opacity:0})
        .call(()=>{
            cc.director.loadScene('gameRun');
        })
        .start();
    }

    // update (dt) {}
}
