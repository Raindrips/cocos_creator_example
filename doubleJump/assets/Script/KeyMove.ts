
const { ccclass, property } = cc._decorator;

enum Dir {
    left,
    right
}

@ccclass
export default class KeyMove extends cc.Component {

    public get Key(){
        return this.key;
    }  
    private key:Map<number,boolean>=null;
    onLoad () {
        this.key=new Map<number,boolean>();
    }

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this)
    }
   
  

    // update(dt:number) {
        
    // }


    keyDown(e: cc.Event.EventKeyboard) {
        this.key.set(e.keyCode,true)
    }

    keyUp(e: cc.Event.EventKeyboard) {
        this.key.set(e.keyCode,false)
    }
}
