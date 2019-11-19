/**
 * 关卡数据管理类
 * 
 * 获取关卡数据
 * 获取设置当前游戏进度
*/
class levelDatamanager {

	// 单例
	private static shared:levelDatamanager
	public static Shared(){
		if(!levelDatamanager.shared){
			levelDatamanager.shared = new levelDatamanager()
		}
		return levelDatamanager.shared
	}

	// private items:levelDataItem[] = [];
	// private items:levelDatamanager[] = [];
	private items:levelDatamanager[] = [];//保存所有的关卡数据
	public levNumber:number; //总关卡数

	public constructor() {
		this.items = RES.getRes("questions_json"); 
		this.levNumber = this.items.length
	}


	// 获取对应关卡数据
	public getLevelData(level:number){
		return this.items[level]
	}

	// 获取游戏进度
	public get progress(){
		let gress = egret.localStorage.getItem('progress')
		if(gress == null || gress == ""){
			return 1
		}else{
			return parseInt(gress)
		}
	}

	// 设置游戏进度
	public set progress(level:number){
		console.log('游戏进度 第'+ level +'关');
		egret.localStorage.setItem('progress',level.toString())
	}
}