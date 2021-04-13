const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Node)
	blockNode: cc.Node = null;

	@property(cc.Node)
	top: cc.Node = null;

	@property(cc.Node)
	bottom: cc.Node = null;

	@property(cc.Label)
	scoreLabel:cc.Label=null;

	score:number=0;

	tween: cc.Tween<cc.Node>;

	canTouch:boolean=false;

	
	init(){
		this.resetBlock();
		this.resetWall();
		this.resetColor();
		this.canTouch=true;
	}

	onLoad() {
		this.init();
	}

	start() {

		this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
		this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);

	}

	// update (dt) {}

	touchStart(e: cc.Event.EventTouch) {
		if(this.canTouch){
			this.grow();
		}
	
	}

	touchEnd(e: cc.Event.EventTouch) {
		this.stop();
	}

	grow() {
		this.canTouch=false;
		this.tween = cc.tween(this.blockNode)
			.to(1, { scale: 4 })
			.call(() => {

			});
		this.tween.start();
	}

	stop() {
		this.tween.stop();
		let isGameOver: boolean = false;
		let top = this.top.children;
		let bottom = this.bottom.children;
		let distance =
			Math.abs(top[0].x - top[1].x + top[0].width)
		let distance2 =
			Math.abs(bottom[0].x - bottom[1].x + bottom[0].width)
		let blockSize = this.blockNode.width * this.blockNode.scaleX;
		let disY: number = 0;

		if (blockSize > distance) {
			isGameOver = true;
			disY = top[0].y + blockSize / 2 + top[0].height / 2;
		}
		else if (blockSize > distance2) {
			disY = bottom[0].y + blockSize / 2 + bottom[0].height / 2
		}
		else {
			isGameOver = true;
			disY = -cc.winSize.height;
		}

		let drop=cc.tween(this.blockNode)
			.to(0.2, { angle: 0 })
			// @ts-ignore
			.to(0.5, { position: { value: cc.v3(0, disY), easing: 'bounceOut' } })
		
		let next=cc.tween(this.blockNode)
			.call(()=>{
				if(isGameOver){
					this.gameOver();
				}
				else{
					this.init();
					this.bouns();
				}
			})
		cc.tween(this.blockNode)
		.then(drop)
		.then(next)
		.start();
	}

	bouns() {
		this.score++;
		this.scoreLabel.string=this.score.toString();
	}

	//
	gameOver() {
		this.scheduleOnce(()=>{
			this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
			cc.director.loadScene('1')
		},2);
	}
	placeWall(node:cc.Node,x:number){
		cc.tween(node)
		.to(0.5,{position:cc.v3(x,node.y)})
		.start();
	}

	resetWall() {
		let bottomGroup=250+Math.random()*100;
		let topGroup=bottomGroup+30+Math.random()*50;

		this.placeWall(this.top.children[0],-topGroup);
		this.placeWall(this.top.children[1],topGroup);
		this.placeWall(this.bottom.children[0],-bottomGroup);
		this.placeWall(this.bottom.children[1],bottomGroup);
	}

	resetBlock(){
		cc.tween(this.blockNode)
			.to(0.5,{angle:45,position:cc.v3(0,300),scale:1 })
			.start();
	}

	resetColor(){
		let colorArray:Array<string>=[
			"#9AC6A6","#99AACC6","#9C6AE9A","#9C69AA5","##9AC6C0"
		];
		let i=Math.random()*colorArray.length | 0;
		let c:cc.Color=cc.color();
		 c=cc.Color.fromHEX(c,colorArray[i]);
		cc.tween(this.node)
		.to(1,{color:c})
		.start()
	}
}
