class gameScene extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	private cur_lev:number
	private signboard:number //标识 
	public btn_return:eui.Button;
	public img:eui.Image;
	public gp_answer:eui.Group;
	public gp_select:eui.Group;
	public gp_win:eui.Group;
	public label_tip:eui.Label;
	public libel_content:eui.Label;
	public btn_next:eui.Button;
	public gp_message:eui.Group;
	public label_word:eui.Label;
	public btn_msg:eui.Button;



	private curData:any;
	public answerArr:any = [];
	public selectArr:any = [];

	// 单例
	private static shared:gameScene
	public static getInstance(){
		if(!gameScene.shared){
			gameScene.shared = new gameScene()
		}
		return gameScene.shared
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
	// 初始化
	public initLvdata(lev:number){
		console.log("lev:",lev)
		this.removeAnswerSelect()
		this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnreturn,this)
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnNext,this)
		this.btn_msg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnMsg,this)

		// 记录单前关卡
		this.cur_lev = lev
		// 获取数据
		this.curData = levelDatamanager.Shared().getLevelData(lev);
		console.log(this.curData)
		// 设置问题图片
		this.img.source = "resource/assets/data/" + this.curData.img
		// 设置问题字
		let words:string = this.curData.answer + this.curData.word
		// 拼接二十个字符 插入选择区域
		while(words.length == 10){
			let i = Math.floor(Math.random()*levelDatamanager.Shared().levNumber);
			if(i != lev){
				let random_levdata:any = levelDatamanager.Shared().getLevelData(i);
				words += random_levdata.answer + random_levdata.word
			}
		}

		let wordsArr = words.split('')
		this.setAnswer();
		this.setSelect(wordsArr);
		// this.gp_answer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.answerClick,this)
		
	}

	// 清空 答案区域、选择区域
	private removeAnswerSelect(){
		let anLen:number = 0;
		let seLen:number = 0;
		if(this.gp_answer.$children){
			anLen = this.gp_answer.$children.length;
		}
		if(this.gp_select.$children){
			seLen = this.gp_select.$children.length;
		}
		for(let i:number = anLen; i > 0; i--){
			this.gp_answer.removeChild(this.answerArr[i-1].word)
			delete this.answerArr[i-1]
		}
		for(let j:number = seLen; j > 0; j--){
			this.gp_select.removeChild(this.selectArr[j-1].word)
			delete this.selectArr[j-1]
		}
		this.answerArr = []
		this.selectArr = []
	}

	// 点击答案区 没有发现事件源对象 事件委托不了
	// private answerClick(e){//:egret.TouchEvent
	// 	console.log("answerClick",e)
	// }

	// 插入答案区域
	private setAnswer(){
		let arr:number[] = [2,97,192,287]
		for(let i:number=0; i < 4; i++){
			let wordEle:word = new word();
			wordEle.x = arr[i];
			
			this.gp_answer.addChild(wordEle)
			wordEle.answertext = '';//要在addChild后面
			wordEle.signboard = i;
			wordEle.addEventListener(egret.TouchEvent.TOUCH_TAP,this.answerClick,this)
			this.answerArr.push({
				word:wordEle,
				text:'',
				signboard:i,
				select:null
			})
		}
	}
	private answerClick(e:egret.TouchEvent){
		musicManager.getMusic().playBtnMusic()
		let word = <word>e.currentTarget;
		let obj:any = this.getAnswerWord(word.signboard)
		
		// 文字原路返回
		if(obj.sta && this.answerArr[obj.index].select){
			this.answerArr[obj.index].select.visible = true;
			this.answerArr[obj.index].select = null;
			this.answerArr[obj.index].text = '';
			word.answertext = '';
		}
	}

	// 辨别点击那个答案文字
	private getAnswerWord(num:number){
		let len:number = this.answerArr.length;
		for(let i:number = 0; i < len; i++){
			if(this.answerArr[i].signboard == num){
				return {sta:true,index:i}
			}
		}
		return {sta:false,index:null}
	}

	// 插入选择区域
	private setSelect(arr){
		let len:number = arr.length;
		let randomArr = this.radomNumber(len);
		let wordX:number = 0
		for(let i:number = 0; i < len; i++){
			let wordEle:word = new word();
			let num = i%5 
			if(num == 0){
				wordX++
			}
			wordEle.width = 77;
			wordEle.height = 77;
			wordEle.signboard = i
			wordEle.x = num * ((this.gp_select.width/5 - wordEle.width)*5/4 + wordEle.width);
			wordEle.y = wordX * ((this.gp_select.height/5 - wordEle.height)*5/4 +wordEle.height);
			this.gp_select.addChild(wordEle)
			wordEle.answertext = arr[randomArr[i]];//要在addChild后面
			wordEle.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectClick,this)
			this.selectArr.push({
				word:wordEle,
				select:false,
				AnswerArrIndex:null,
				signboard:i
			})
		}
	}

	private selectClick(e:egret.TouchEvent){
		musicManager.getMusic().playBtnMusic()
		let word = <word>e.currentTarget;
		
		let obj:any = this.getAnswerSelect();
		
		if(obj.sta){
			this.answerArr[obj.index].text = word.answertext
			this.answerArr[obj.index].word.answertext = word.answertext
			this.answerArr[obj.index].select = word;
			word.visible = false;
		}else{
			this.showWin()// 文字选择完毕 第5个字
		}
	}

	// 区分答案文字选到了第几个
	private getAnswerSelect(){
		let len:number = this.answerArr.length;
		for(let i:number = 0; i < len; i++){
			if(this.answerArr[i].select == null){
				return {sta:true,index:i}
			}
		}
		// 4个文字已选完
		return {sta:false,index:null}
	}

	// 获取选择的文字
	private getSelectText(){
		let len:number = this.answerArr.length;
		let str:string = "";
		for(let i:number = 0; i < len; i++){
			str += this.answerArr[i].text
		}
		return str
	}

	private showWin(){
		// console.log("文字选择完毕",this.getSelectText(),this.curData)
		if(this.getSelectText() === this.curData.answer){
			this.label_tip.text = this.curData.tip;
			this.libel_content = this.curData.content;
			this.gp_win.visible = true;
			musicManager.getMusic().playSucc_music()
		}else{
			this.label_word.text = this.curData.word;
			this.gp_message.visible = true;
			musicManager.getMusic().playErr_music()
		}
	}	

	// 产生20个不重复数字
	private radomNumber(len:number){
		let arr:number[] = [];
		for(let i:number = 0; i<len; i++){
			arr.push(i)
		}
		arr.sort(function(a,b){
			return Math.random()-0.5
		})
		return arr
	}

	// 返回
	private btnreturn() {
		musicManager.getMusic().playBtnMusic()
		this.parent.addChild(ChooseLevels.Shared())
		ChooseLevels.Shared().init()
		this.parent.removeChild(this)
	}

	// 关闭消息提示
	private btnMsg(){
		musicManager.getMusic().playBtnMusic()
		this.gp_message.visible = false;
	}

	// 下一关 刷新单前页面
	private btnNext(){
		musicManager.getMusic().playBtnMusic()
		this.gp_win.visible = false;

		// 单前游戏关卡 = 全局游戏进度 ->下一关 更新全局游戏进度
		if(this.cur_lev === levelDatamanager.Shared().progress){
			levelDatamanager.Shared().progress ++
		}
		this.initLvdata(this.cur_lev+1)
	}

	
}