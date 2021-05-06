import Piece from './Piece';
import { PieceState } from './type';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Prefab)
	public piecePrefab: cc.Prefab = null;

	@property(cc.Graphics)
	public pen: cc.Graphics = null;

	@property(cc.Integer)
	public num: number = 10;

	@property(cc.Integer)
	public pictureNum: number = 8;

	private spaceSize: number;
	private pieceMap: Piece[][] = null;
	private lastPiece: Piece = null;

	onLoad() {
		this.startGame();
		this.node.on('touch', this.touchEvent, this);
	}
	
	public startGame() {
		this.init();
		this.shuffle();
	}

	init() {
		this.spaceSize = this.node.width / this.num;
		this.pieceMap = [];
		for (let x = 0; x < this.num; x++) {
			this.pieceMap[x] = [];
			for (let y = 0; y < this.num; y++) {
				let pieceNode = cc.instantiate(this.piecePrefab);
				this.node.addChild(pieceNode);

				pieceNode.x = x * this.spaceSize;
				pieceNode.y = y * this.spaceSize;
				pieceNode.width = this.spaceSize;
				pieceNode.height = this.spaceSize;

				let piece = pieceNode.getComponent(Piece);
				this.pieceMap[x][y] = piece;
				// 最外一圈当作墙
				this.pieceMap[x][y].init(x, y, 0);
			}
		}
	}

	// update (dt) {}

	private touchEvent(piece: Piece) {
		if (piece.typeId === 0) {
			return;
		}
		switch (piece.state) {
			case PieceState.idle:
				if (this.lastPiece) {
					if (this.link(this.lastPiece, piece)) {
						this.lastPiece = null;
						this.judgeWin();
					} else {
						this.lastPiece.setState(PieceState.idle);
						piece.setState(PieceState.press);
						this.lastPiece = piece;
					}
				}
				else {
					piece.setState(PieceState.press);
					this.lastPiece = piece;
				}
				break;
			case PieceState.press:
				piece.setState(PieceState.idle);
				this.lastPiece = null;
				break;
		}
	}

	private link(piece1: Piece, piece2: Piece): boolean {
		if (piece1.typeId !== piece2.typeId) {
			return false;
		}
		let [pass, corners] = this.findCorner(piece1, piece2);
		if (pass) {
			this.drawLine([piece1].concat(corners).concat(piece2));
			piece1.setType(0);
			piece2.setType(0);
			return true;
		} else {
			return false;
		}
	}

	private drawLine(path: Piece[]) {
		let pos = this.getPieceCenterPosition(path[0]);
		this.pen.moveTo(pos.x, pos.y);
		for (let i = 1; i < path.length; i++) {
			pos = this.getPieceCenterPosition(path[i]);
			this.pen.lineTo(pos.x, pos.y);
		}
		this.pen.stroke();
		setTimeout(() => {
			this.clearLine();
		}, 1000);
	}

	private clearLine() {
		this.pen.clear();
	}

	private canDirectLink(piece1: Piece, piece2: Piece): boolean {
		if (piece1.x === piece2.x) {
			let minY = Math.min(piece1.y, piece2.y);
			let maxY = Math.max(piece1.y, piece2.y);
			for (let y = minY + 1; y < maxY; y++) {
				if (this.pieceMap[piece1.x][y].typeId !== 0) {
					return false
				}
			}
			return true;
		}
		if (piece1.y === piece2.y) {
			let minX = Math.min(piece1.x, piece2.x);
			let maxX = Math.max(piece1.x, piece2.x);
			for (let x = minX + 1; x < maxX; x++) {
				if (this.pieceMap[x][piece1.y].typeId !== 0) {
					return false
				}
			}
			return true;
		}
		return false;
	}

	private findCorner(piece1: Piece, piece2: Piece): [boolean, Piece[]] {
		let c1: Piece, c2: Piece;
		// 0折
		if (this.canDirectLink(piece1, piece2)) {
			return [true, []];
		}
		// 1折 找一个点
		c1 = this.pieceMap[piece1.x][piece2.y];
		if (c1.typeId === 0 && this.canDirectLink(c1, piece1) && this.canDirectLink(c1, piece2)) {
			return [true, [c1]];
		}
		c1 = this.pieceMap[piece2.x][piece1.y];
		if (c1.typeId === 0 && this.canDirectLink(c1, piece1) && this.canDirectLink(c1, piece2)) {
			return [true, [c1]];
		}
		// 2折 找一条线
		for (let x = 0; x < this.num; x++) {
			if (x === piece1.x || x === piece2.x) {
				continue;
			}
			c1 = this.pieceMap[x][piece1.y];
			c2 = this.pieceMap[x][piece2.y];
			if (c1.typeId === 0 && c2.typeId === 0
				&& this.canDirectLink(c1, c2)
				&& this.canDirectLink(c1, piece1)
				&& this.canDirectLink(c2, piece2)) {
				return [true, [c1, c2]];
			}
		}
		for (let y = 0; y < this.num; y++) {
			if (y === piece1.y || y === piece2.y) {
				continue;
			}
			c1 = this.pieceMap[piece1.x][y];
			c2 = this.pieceMap[piece2.x][y];
			if (c1.typeId === 0 && c2.typeId === 0
				&& this.canDirectLink(c1, c2)
				&& this.canDirectLink(c1, piece1)
				&& this.canDirectLink(c2, piece2)) {
				return [true, [c1, c2]];
			}
		}
		return [false, null];
	}

	private randomPop(arr: Array<any>) {
		let n = Math.random() * arr.length | 0;
		return arr.splice(n, 1)[0];
	}

	public judgeWin(): boolean {
		for (let x = 0; x < this.num; x++) {
			for (let y = 0; y < this.num; y++) {
				if (this.pieceMap[x][y].typeId !== 0) {
					return false;
				}
			}
		}
		return true;
	}

	private getPieceCenterPosition(piece: Piece): cc.Vec2 {
		let x = piece.x * this.spaceSize + this.spaceSize / 2;
		let y = piece.y * this.spaceSize + this.spaceSize / 2;
		cc.log(x, y);
		return cc.v2(x, y);
	}

	private shuffle() {
		let pictureList = [];
		for (let i = 1; i <= 78; i++) {
			pictureList.push(i);
		}
		let pending = [];
		for (let x = 1; x < this.num - 1; x++) {
			for (let y = 1; y < this.num - 1; y++) {
				pending.push(this.pieceMap[x][y]);
			}
		}
		let pieceNum = (this.num - 2) ** 2;
		let remenber = pieceNum / 2 % this.pictureNum; // 余数，重复的几对
		let coupleNum = (pieceNum / 2 - remenber) / this.pictureNum; // 相同的图片有多少对
		for (let i = 0; i < this.pictureNum; i++) {
			let picture = this.randomPop(pictureList);
			for (let j = 0; j < coupleNum * 2; j++) {
				let p: Piece = this.randomPop(pending);
				p.setType(picture);
				p.setState(PieceState.idle);
			}
			if (i < remenber) {
				for (let k = 0; k < 2; k++) {
					let p = this.randomPop(pending);
					p.setType(picture);
					p.setState(PieceState.idle);
				}
			}
		}
	}

	
}
