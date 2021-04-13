import GameModel from "../model/GameModel";
import AudioUtils from "../utils/AudioUtils";
import GridView from "../view/GridView";
import CellView from "../view/CellView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

	@property(cc.Node)
	grid: cc.Node = null;

	audioUtils: AudioUtils = null;

	cellViews: CellView[] = [];

	lastTouchPos: cc.Vec2;
	isCanMove: boolean = true;
	isInPlayAni: boolean = false;

	gameModel: GameModel = null;

	onLoad() {
		this.gameModel = new GameModel();
		this.gameModel.init(6);
		let gridview: GridView = this.grid.getComponent("GridView");
		gridview.setController(this);
		gridview.initWithCellModels(this.gameModel.getCells());
	}

	selectCell(pos: cc.Vec2) {
		return this.gameModel.selectCell(pos);
	}

	cleanCmd() {
		this.gameModel.cleanCmd();
	}
}
