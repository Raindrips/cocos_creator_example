
export default class Hanoi {
  //二维数组,分别存储塔和方块数量
  public countArr: number[][] = []

  public constructor(n: number) {
    this.countArr.length = n;
    for (let i = 0; i < this.countArr.length; i++) {
      this.countArr[i] = [];
    }
  }

  
  public place(oldI: number, newI: number): boolean {
    if (oldI >= this.countArr.length || oldI < 0) {
      cc.error('old index is empty ' + oldI)
      return false;
    }

    if (newI >= this.countArr.length || newI < 0) {
      cc.error('new index is empty' + oldI)
      return false;
    }

    let olen = this.countArr[oldI].length;
    let nlen = this.countArr[newI].length;

    let oldWidth = this.countArr[oldI][olen - 1];
    let newWidth = this.countArr[newI][nlen - 1];
    if (oldI == newI || oldWidth > newWidth) {
       	return false;
    }

    let wid=this.countArr[oldI].pop();
    this.countArr[newI].push(wid);
    return true;
  }

  public isWinGame():boolean{
    if(this.countArr[0].length>0){
      return false;
    }
    let count=0;
    for(let i=1;i<this.countArr.length;i++){
      let arr=this.countArr[i];
      if(arr.length==0){
        count++;
      }
    }
    return count==1;
  }
}