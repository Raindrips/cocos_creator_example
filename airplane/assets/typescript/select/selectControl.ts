import {Global} from '../../Script/Global'
const {ccclass, property} = cc._decorator;


@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Button])
    plane: cc.Button[] = [];

    selectIndex:number=0;
    onLoad () {

    }

    // update (dt) {}

    choosePlane(e:cc.Event.EventCustom,index:number) {
        cc.log('index:'+index);
        //选择主角飞机形象
        if(this.selectIndex != index){
            this.plane[this.selectIndex].node.y=-60
            this.selectIndex = index
            this.plane[this.selectIndex].node.y=60;
        }
    }


    playGameButton(){        
        
        cc.director.loadScene("mainGame");
        Global.selectIndex = this.selectIndex
    }
}
