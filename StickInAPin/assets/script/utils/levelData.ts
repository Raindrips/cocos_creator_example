export let Utils={
    event:new cc.EventTarget()
}

export class LevelData{

    fileDir:string
    dataObj
    len
    constructor() {
        this.fileDir = "config/levelCfg";
    }

    initData(data) {
        if (!data) {
            return;
        }
        this.dataObj = data;
        this.len = this.dataObj.length;
        //this.dataObj = Utils.arrayToDict(this.dataObj, "level");
    }
}