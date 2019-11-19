/**
 * 设置游戏页
 */
class SetGame extends eui.Component implements  eui.UIComponent {
	// 单例
	private static shared:SetGame
	public static Shared(){
		if(!SetGame.shared){
			SetGame.shared = new SetGame()
		}
		return SetGame.shared
	}

	public btn_music:eui.Button;
	public img_music:eui.Image;
	public btn_bgMusic:eui.Button;
	public img_bgMusic:eui.Image;
	public btn_yes:eui.Button;


	public constructor() {
		super();
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
	
	private init() {
		if(!musicManager.getMusic().isMusic){
			this.img_music.visible = true
		} 
		if(!musicManager.getMusic().isBgMusic){
			this.img_bgMusic.visible = true
		}

		this.btn_bgMusic.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bgMusic,this)
		this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP,this.music,this)
		this.img_bgMusic.addEventListener(egret.TouchEvent.TOUCH_TAP,this.open_bgMusic,this)
		this.img_music.addEventListener(egret.TouchEvent.TOUCH_TAP,this.open_music,this)
		this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.yes,this)
	}

	private bgMusic() {
		this.img_bgMusic.visible = true;
		musicManager.getMusic().playBtnMusic()
		musicManager.getMusic().isBgMusic = false;//关闭背景音乐
	}

	private music() {
		musicManager.getMusic().playBtnMusic()
		this.img_music.visible = true;
		musicManager.getMusic().isMusic = false;//关闭音效
	}

	private open_bgMusic() {
		musicManager.getMusic().playBtnMusic()
		this.img_bgMusic.visible = false;
		musicManager.getMusic().isBgMusic = true;//打开背景音乐
	}

	private open_music() {
		musicManager.getMusic().playBtnMusic()
		this.img_music.visible = false;
		musicManager.getMusic().isMusic = true;//打开音效
	}

	private yes() {
		musicManager.getMusic().playBtnMusic()
		this.parent.removeChild(this)
	}
}