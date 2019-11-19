/**
 * 开始页
 * */ 
class Begin extends eui.Component implements  eui.UIComponent {
	// 单例 调用打开此页面
	private static shared:Begin
	public static Shared(){
		if(!Begin.shared){
			Begin.shared = new Begin()
		}
		return Begin.shared
	}

	public btn_open:eui.Button;
	public btn_set:eui.Button;
	public bg:eui.Image;
	
	public constructor() {
		super();
	}

	// 添加皮肤时会自动调用该函数
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	// 组件加载完毕之后调用
	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init()
	}
	
	private init() {
		musicManager.getMusic().playBgMusic()

		// 绑定事件
		this.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openClick,this)
		this.btn_set.addEventListener(egret.TouchEvent.TOUCH_TAP,this.setClick,this)
		this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bgClick,this)
		
	}

	private bgClick() {
		// 关闭弹窗
		// this.parent.removeChild(ChooseLevels.Shared())
	}

	private openClick() {
		musicManager.getMusic().playBtnMusic()		
		let parent:egret.DisplayObjectContainer = this.parent; // 设置所有场景所在的舞台
		// parent.removeChild(this) //关闭当前页面
		parent.addChild(ChooseLevels.Shared())


		// 打开选关卡页方式
		// this.parent.addChild(ChooseLevels.Shared())
		// this.addChild(ChooseLevels.Shared())
		// this.parent.addChild(new ChooseLevels)

		// SoundManager.getInstance().playClick()
		// let parent:egret.DisplayObjectContainer = this.parent;  
		// parent.removeChild(this) //关闭当前页面
		// parent.addChild(ChooseLevels.Shared())
		
	}

	private setClick() {
		musicManager.getMusic().playBtnMusic()
		// 打开设置页
		let parent:egret.DisplayObjectContainer = this.parent; // 设置所有场景所在的舞台
		// parent.removeChild(this) //关闭当前页面
		parent.addChild(SetGame.Shared())

	}
}