import {ANITIME } from './typeModel'
	/**
	 * 
	 * @param {开始播放的时间} playTime 
	 * @param {*cell位置} pos 
	 * @param {*第几次消除，用于播放音效} step 
   * @param {*消除次数}step?
	 */
export default interface EffectInfo{
  playTime:ANITIME,
  pos:cc.Vec2,
  action: string
  step?:number
}
