const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeMgr {
    private static mBoxNodePool: cc.NodePool = null;


    public static putBox(box: cc.Node){
        if(this.mBoxNodePool == null){
            this.mBoxNodePool = new cc.NodePool('boxs');
        }

        if(box != null){
            this.mBoxNodePool.put(box);
        } 
    }

    public static getBox(){
        if(this.mBoxNodePool != null && this.mBoxNodePool.size() > 0){
            let box = this.mBoxNodePool.get();
            box.stopAllActions();
            return box;
        }else{
            return null;
        }
    }
}
