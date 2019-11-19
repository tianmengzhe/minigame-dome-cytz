class press extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}
	public press_val:eui.Rect;
	public rect:eui.Rect;
	public lab_text:eui.Label;
	public basew:number

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.basew = this.rect.width/100
	}

	// 设置背景宽度
	public set pressw(val:number){
		this.press_val.width = val*this.basew;
	}

	// 设置百分比文字
	public preetext(start:number,end:number,type:string){
		if(type == '%'){
			this.lab_text.text = (start/end*100).toFixed(2) +'%'
		}else{
			this.lab_text.text = start +'/'+ end
		}
	}
	
}