class btnIcon extends eui.Button implements  eui.UIComponent {
	public constructor() {
		super();
	}
	private imgTrue:eui.Image;
	public imgFalse:eui.Image;
	public lev_text:eui.Label;


	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
	public get btn_label(){
		return parseInt(this.lev_text.text);
	}

	public set btn_label(lev:number){
		this.lev_text.text = lev.toString()
	}


}