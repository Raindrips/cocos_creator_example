const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    onLoad () {
         /**
         * 更新包之后，删除热更新目录和记录
         */

        //   if (cc.sys.isNative) {
        //     let baseLocalVersion = cc.sys.localStorage.getItem('BASE_LOCAL_VERSION');
        //     // 写本地版本记录
        //     cc.sys.localStorage.setItem('BASE_LOCAL_VERSION', BASE_LOCAL_VERSION);
        //     if (baseLocalVersion != '' && baseLocalVersion != BASE_LOCAL_VERSION) {
        //         // 大版本更新，需要删除之前热更新版本内容
        //         let path = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + HOT_UPDATE_SUB_PATH);
        //         jsb.fileUtils.removeDirectory(path);
        //         cc.log("大版本更新，path: " + path);
        //         // 重启
        //         cc.game.restart();
        //     } else {
        //         this.init();
        //     }
        // } else {
        //     this.init();
        // }

        //隐藏左下方测试信息
        //cc.debug.setDisplayStats(DEBUG_OPEN); 
    }

    start () {
        
    }



    // update (dt) {}

    init(){
        
    }
}
