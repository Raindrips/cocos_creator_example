import { ILevelData } from "../utils/levelData";
import { IUserData } from "../utils/UserData";

const { ccclass, property } = cc._decorator;

export default class DataManager  {


    levelData: ILevelData
    userData: IUserData

    levelDataList: ILevelData[] = null;

    constructor(jsonData: any) {
        if (jsonData == null) {
            cc.error('level data is null');
            return;
        }
        this.levelDataList = jsonData;
        this.userData={currentLevel:0,life:0}
    }
    getLevelData(): ILevelData {
        return this.levelData;
    }
    
    getUserData():IUserData{
        return this.userData;
    }

    loadLevel(l: number) {
        this.levelData = this.levelDataList[l];
    }

    saveUserData() {
        cc.sys.localStorage.setItem('userData', JSON.stringify(this.userData));
    }
}
