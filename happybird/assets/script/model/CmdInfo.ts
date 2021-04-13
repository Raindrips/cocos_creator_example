import {ANITIME } from './typeModel'

export default interface CmdInfo{
  action:string;                 // 动作
  keepTime: ANITIME;             //
  playTime: ANITIME;             //  
  pos?: cc.Vec2;
  isVisible?:boolean;
}