/**
 * 游戏音乐音效管理类
*/
class musicManager {

	// 背景音乐
	private bg_music: egret.Sound;
	// 点击按钮音效
	private btn_music: egret.Sound;
	// 回答正确音效
	private succ_music: egret.Sound;
	// 回答错误音效
	private err_music: egret.Sound;
	// 文字点击音效
	private word_music: egret.Sound;

	// 音轨 控制音乐播放
	private soundChannel: egret.SoundChannel;

	// 单例
	private static shared:musicManager
	public static getMusic(){
		if(!musicManager.shared){
			musicManager.shared = new musicManager()
		}
		return musicManager.shared
	}
	public constructor() { 
		// 加载音乐
		this.bg_music = new egret.Sound();
		this.bg_music.load('resource/assets/data/sound/Music.mp3');
		this.bg_music.addEventListener(egret.Event.COMPLETE,()=>{ //加载完成调用
			console.log('Music加载完成调用')
			// this.playBgMusic()
		},this)

		this.btn_music = new egret.Sound();
		this.btn_music.load('resource/assets/data/sound/buttonclick.mp3');

		this.succ_music = new egret.Sound();
		this.succ_music.load('resource/assets/data/sound/right.mp3');

		this.err_music = new egret.Sound();
		this.err_music.load('resource/assets/data/sound/wrong.mp3');

		this.word_music = new egret.Sound();
		this.word_music.load('resource/assets/data/sound/type_word.mp3');
	}

	

	// 播放背景音乐
	public playBgMusic(){
		if(this.bg_music && this.isBgMusic){
			this.soundChannel = this.bg_music.play(0,0)  //play(播放开始位置，循环次数) 0无限播放
		}
	}

	// 停止播放背景音乐
	public stopBgMusic(){
		if(this.soundChannel){
			this.soundChannel.stop()
		}
	}

	// 播放点击按钮音效
	public playBtnMusic(){
		if(this.btn_music && this.isMusic){
			this.btn_music.play(0,1)
		}
	}
	// 播放回答正确音效
	public playSucc_music(){
		if(this.succ_music && this.isMusic){
			this.succ_music.play(0,1)
		}
	}
	// 播放回答失败音效
	public playErr_music(){
		if(this.err_music && this.isMusic){
			this.err_music.play(0,1)
		}
	}
	// 播放点击文字音效
	public playWord_music(){
		if(this.word_music && this.isMusic){
			this.word_music.play(0,1)
		}
	}
	

	// 设置/获取 背景音乐是否允许播放
	public set isBgMusic(val){
		if(val){
			egret.localStorage.setItem('isBgMusic','1')
			this.playBgMusic()
		}else{
			egret.localStorage.setItem('isBgMusic','0')
			this.stopBgMusic()
		}
	}

	public get isBgMusic(){
		let ret = egret.localStorage.getItem('isBgMusic');
		if(ret == null || ret == '' || ret == '1'){
			return true
		}else{
			return false
		}
	}

	// 设置/获取 音效是否允许播放
	public set isMusic(val){
		if(val){
			egret.localStorage.setItem('isMusic','1')
		}else{
			egret.localStorage.setItem('isMusic','0')
		}
	}

	public get isMusic(){
		let ret = egret.localStorage.getItem('isMusic');
		if(ret == null || ret == '' || ret == '1'){
			return true
		}else{
			return false
		}
	}
}