class word extends eui.Button implements  eui.UIComponent {
	public constructor() {
		super();
	}
	public lab_btn:eui.Label;
	public signboard:number //标识 

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		this.skinName = "resource/game/word.exml"
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	public set answertext(val:string){
		this.lab_btn.text = val
	}

	public get answertext(){
		return this.lab_btn.text
	} 
	
}