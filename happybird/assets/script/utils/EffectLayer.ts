import { CELL_WIDTH } from '../model/constValue';
import AudioUtils from '../utils/AudioUtils';
import EffectInfo from '../model/EffectInfo';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Prefab)
	bombWhite: cc.Prefab = null;

	@property(cc.Prefab)
	crushEffect: cc.Prefab = null;

	@property(AudioUtils)
	audioUtils: AudioUtils = null;

	playEffects(effectQueue: EffectInfo[]) {
		if (!effectQueue || effectQueue.length <= 0) {
			return;
		}
		 //防止重复播放
		let soundMap = new Map<string, boolean>();
		for (let effect of effectQueue) {
			let tween = cc.tween(this.node);
			tween.delay(effect.playTime);
			tween.call(() => {
				let instantEffect = null;
				let animation = null;
				if (effect.action == 'crush') {
					instantEffect = cc.instantiate(this.crushEffect);
					animation = instantEffect.getComponent(cc.Animation);
					animation.play('effect');
					if (!soundMap['crush' + effect.playTime]) {
						this.audioUtils.playEliminate(effect.step);
					}
					soundMap['crush' + effect.playTime] = true;
				}
				else if (effect.action == "rowBomb") {
					instantEffect = cc.instantiate(this.bombWhite);
					animation = instantEffect.getComponent(cc.Animation);
					animation.play("effect_line");
				}
				else if (effect.action == "colBomb") {
					instantEffect = cc.instantiate(this.bombWhite);
					animation = instantEffect.getComponent(cc.Animation);
					animation.play("effect_col");
				}

				instantEffect.x = CELL_WIDTH * (effect.pos.x - 0.5);
				instantEffect.y = CELL_WIDTH * (effect.pos.y - 0.5);
				this.node.addChild(instantEffect);
				animation.on("finished", () => {
					instantEffect.destroy();
				}, this);
			});
			tween.start();
		}
	}
}
