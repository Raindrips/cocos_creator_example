const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    brickPrefab: cc.Prefab = null;

    @property
    brickNum: number = 0;

    start() {
        this.initBricksLayout();
        this.node.removeAllChildren();
        for (let i = 0; i < this.brickNum; i++) {
            let brickNode = cc.instantiate(this.brickPrefab);
            this.node.addChild(brickNode);

        }

        //延迟一秒执行
        this.scheduleOnce(() => { 
            //表格布局完成之后关闭自动布局
            let layout = this.node.getComponent(cc.Layout);
            layout.type = cc.Layout.Type.NONE;
        }, 0.5)
    }
    // update (dt) {}

    initBricksLayout(){
        let levelInfo:LevelType = JSON.parse(cc.sys.localStorage.getItem('currentLevelInfo'));
        // 设置bricksLayout相关属性
        let layout=this.getComponent(cc.Layout)
        layout.spacingX = levelInfo.spaceX;
        layout.spacingY = levelInfo.spaceY;
        layout.cellSize.width = levelInfo.brickWidth;
        layout.cellSize.height = levelInfo.brickHeight;
        //this.node.width = this.col*this.brickWidth + (this.col-1)*levelInfo.spaceX;
        //this.node.height = this.row*this.brickHeight + (this.row-1)*levelInfo.spaceY;
    }
}
