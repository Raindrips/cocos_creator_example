import {iRole,DialogData} from './data/data'

const {ccclass, property} = cc._decorator;



@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    role: cc.Node=null;

    @property(cc.Label)
    role_name: cc.Label = null;

    @property(cc.Label)
    text: cc.Label = null;

    @property(cc.SpriteFrame)
    role_1:cc.SpriteFrame=null

    @property(cc.SpriteFrame)
    role_2:cc.SpriteFrame=null

  
    message:Array<iRole>;

    roleMap:Array<DialogData>;

    index=0;
    onLoad(){

        this.roleMap=[
            {name:'勇着',frame:this.role_1},
            {name:'魔王',frame:this.role_2}
        ]

        this.node.active=true;
        this.message=[
            {id:0,text:'hello'},
            {id:0,text:'你好,说句话呀'},
            {id:1,text:'额,我是魔王'},
            {id:1,text:'你来打我呀'},
            {id:0,text:'小子,你过来,我保证不打死你'},
            {id:1,text:'溜了~溜了~'},
            
        ]
    }

    start () {       
        this.next();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    onKeyDown(e:cc.Event.EventKeyboard){
        switch(e.keyCode){
            case cc.macro.KEY.space:
                this.next();
            break
        }
    }
    

    next(){  
        if(this.index<this.message.length){
            this.setText(this.index);           
        }
        else{
            this.node.active=false
        }
        this.index++;
    }

    setText(i:number){
        cc.log(i)
        this.text.string=this.message[i].text;       

        this.role.getComponent(cc.Sprite).spriteFrame
            =this.roleMap[this.message[i].id].frame
    }

    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    }
}
