
const { ccclass, property } = cc._decorator;

enum eStatus {
    up = 'hero_up',
    down = 'hero_down',
    left = 'hero_left',
    right = 'hero_right',
}

@ccclass
export default class NewClass extends cc.Component {

    @property
    speed: number = 300;

    @property
    Input: Array<boolean> = [];

    status: eStatus;

    isMove: boolean = false;

    onKeyDown(e: cc.Event.EventKeyboard) {
        this.Input[e.keyCode] = true

        if (!this.isMove) {
            this.isMove=true;
            switch (e.keyCode) {
                case cc.macro.KEY.up:
                case cc.macro.KEY.w:
                    this.setStatus(eStatus.up)
                    break;
                case cc.macro.KEY.a:
                case cc.macro.KEY.left:
                    this.setStatus(eStatus.left)
                    break;
                case cc.macro.KEY.d:
                case cc.macro.KEY.right:
                    this.setStatus(eStatus.right)
                    break;
                case cc.macro.KEY.s:
                case cc.macro.KEY.down:
                    this.setStatus(eStatus.down)
                    break;
            }
        }
    }

    onKeyUp(e: cc.Event.EventKeyboard) {
        this.Input[e.keyCode] = false
        this.isMove=false;
        this.setStatus();
        
    }


    setStatus(status?: eStatus) {
        let anim = this.node.getComponent(cc.Animation);
        if(status){
            anim.play(status);
        }
        else{
            anim.stop();
        }
       
    }

    onLoad() {
        
    }

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }

    update(dt) {
        let animation = this.node.getComponent(cc.Animation);
        let scaleX = Math.abs(this.node.scaleX);
        let clip = null;
        let sp = cc.v2();

        //移动操作
        if (this.Input[cc.macro.KEY.a] || this.Input[cc.macro.KEY.left]) {
            sp.x = -1;
        }
        else if (this.Input[cc.macro.KEY.d] || this.Input[cc.macro.KEY.right]) {
            sp.x = 1
        }
        else if (this.Input[cc.macro.KEY.w] || this.Input[cc.macro.KEY.up]) {
            sp.y = 1
        }
        else if (this.Input[cc.macro.KEY.s] || this.Input[cc.macro.KEY.down]) {
            sp.y = -1
        }

        //移动
        if (sp.x != 0 || sp.y != 0) {
            let lv = this.node.position;
            lv.x += sp.x * this.speed * dt;
            lv.y += sp.y * this.speed * dt;
            this.node.position = lv;
        }
        // this.node.getComponent(cc.RigidBody).linearVelocity = lv
        // if(clip!=null&&this.heroAnim!=clip){
        //     this.heroAnim=clip;
        //     animation.play(clip);
        // }
    }
    

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }

    //碰撞回调
    onCollisionEnter(other:cc.Collider, self:cc.Collider) {
        // cc.log('collisionEnter');
        if(other.node.group=='smog'){
            other.node.active=false
            other.node.getComponent(cc.TiledTile).gid=0;
        }
    }
}
