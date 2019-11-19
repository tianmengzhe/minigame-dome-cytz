/**
 * 选关卡页
 * */ 
class ChooseLevels extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	public scroller:eui.Scroller;
	public lev_group:eui.Group;
	public img_up:eui.Image;
	public btn_return:eui.Button;


	private IconArr:Object[] = []
	public set_lv:number = 1

	// 单例
	private static shared:ChooseLevels
	public static Shared(){
		if(!ChooseLevels.shared){
			ChooseLevels.shared = new ChooseLevels()
		}
		return ChooseLevels.shared
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init()
	}

	public init(){
		this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnClick,this)
		this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF; //设置不允许横向滚动
		let len = levelDatamanager.Shared().levNumber;
		let progress = levelDatamanager.Shared().progress;
		
		let col = 10
		let row = 20
		let icon_w = this.width/col
		let icon_h = this.height/row

		let group:eui.Group = new eui.Group();
		this.lev_group.addChild(group);
		group.width = this.width;
		group.height = len * icon_h;

		// 填充背景图
		for(let i:number = 0; i < (group.height) / this.height ; i++){
			let img:eui.Image = new eui.Image("resource/assets/data/res/GameBG2.jpg");
			img.y = i*this.height;
			img.width = this.width;
			this.lev_group.addChildAt(img,0);//  img_up会显示 猜测第二个参数是设置层级
		}

	
		// let Icon:btnIcon = new btnIcon()
		// Icon.x = 100
		// Icon.y = 100
		// console.log("Icon:",Icon)
		
		// group.addChild(Icon)
		// Icon.btn_label = 20
		// console.log(Icon.btn_label)
		
		// 创建关卡图标
		for(let i:number = 0; i < len; i++){
			let Icon:btnIcon = new btnIcon()
			group.addChild(Icon);
			Icon.btn_label = i+1
			Icon.x = Math.sin(icon_h*i/2/180*Math.PI)*200 + group.width/2;
			Icon.y = group.height - icon_h*i - Icon.height
			Icon.enabled = i < progress // 关卡按钮是否可点击
			this.IconArr.push(Icon);
			Icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.IconClick,this)
		}	

		// 初始滚动位置
		this.lev_group.scrollV = group.height - this.height;

		// 进度位置处于屏幕最上面 （假如玩到 25关，让25关出现在最顶层）
		if(progress>20){
			this.lev_group.scrollV = group.height - progress*icon_h;
		}

		// 指示箭头图片位置 
		this.img_up.anchorOffsetX = this.img_up.width/2
		this.img_up.anchorOffsetY = this.img_up.height

		let curretIcon:any = this.IconArr[progress-1];
		this.img_up.x = curretIcon.x + curretIcon.width/2
		this.img_up.y = curretIcon.y

		// 显示在最上层
		this.lev_group.addChild(this.img_up)
		// 设置当前关卡
		this.set_lv = progress
	}

	private returnClick() {
		musicManager.getMusic().playBtnMusic()
		this.parent.removeChild(this)
	}

	private IconClick(e:egret.TouchEvent){
		musicManager.getMusic().playBtnMusic()
		var icon = <btnIcon>e.currentTarget;
		// 箭头跟随
		this.img_up.x = icon.x + icon.width/2;
		this.img_up.y = icon.y;

		// 设置单前选中关卡
		this.set_lv = icon.btn_label;

		// 跳转页面
		this.parent.addChild(gameScene.getInstance())
		this.parent.removeChild(this);
		gameScene.getInstance().initLvdata(this.set_lv)
	}
	
}