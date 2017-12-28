function initLeftPanel(){
	leftPanel = new Ext.Panel({
        region:'west',
        hideCollapseTool:hideCollapseToolFlag,
        title:'<font color=#ffffff>工作流设计器</font>',
        layout:'border',
        id:'leftPanel',
        split:false,
        width:180,
        collapsible:true,
        border:false,
        /**新方法使用开始**/  
        /*scrollable:true,  
        scrollable:'x',
        scrollable:'y',*/
        autoScroll:false,
        /**新方法使用结束**/ 
        layout:{
			type:'accordion',
			animate:true
		},
		header:{
        	titleAlign:'center',
        	cls:'x-panel-header-defined'
        },
		items:[
			  /**
			  {
				 header:{
	                  titleAlign:'center'
	             },
				 title:'连线选择',
				 html:'<div id="linebar" style="background:white; color:white;position:absolute;overflow:auto;height:100%;width:100%;padding-left:27px;cursor:pointer;"></div>'
			   },
			   **/
			   {
			   	 header:{
	                  titleAlign:'center'
	             },
				 title:'开始事件',
				 hideCollapseTool:false,
				 html:'<div id="starteventbar" style="background:white; color:white;position:absolute;overflow:auto;height:100%;width:100%;padding-left:27px;cursor:pointer;"></div>'
			   },
			   {
			   	 header:{
	                  titleAlign:'center'
	             },
				 title:'结束事件',
				 hideCollapseTool:false,
				 html:'<div id="endeventbar" style="background:white; color:white;position:absolute;overflow:auto;height:100%;width:100%;padding-left:27px;cursor:pointer;"></div>'
			   },
			   {
			     header:{
	                  titleAlign:'center'
	             },
				 title:'任务类型',
				 hideCollapseTool:false,
				 html:'<div id="taskbar" style="background:white; color:white;position:absolute;overflow:auto;height:100%;width:100%;padding-left:27px;cursor:pointer;"></div>'
			   },
			   {
			     header:{
	                  titleAlign:'center'
	             },
				 title:'容器管理',
				 hideCollapseTool:false,
				 html:'<div id="rqbar" style="background:white; color:white;position:absolute;overflow:auto;height:100%;width:100%;padding-left:27px;cursor:pointer;"></div>'
			   },
			   {
			     header:{
	                  titleAlign:'center'
	             },
				 title:'默认网关',
				 hideCollapseTool:false,
				 html:'<div id="defaultwebbar" style="background:white; color:white;position:absolute;overflow:auto;height:100%;width:100%;padding-left:27px;cursor:pointer;"></div> '
			   },
			   {
			     header:{
	                  titleAlign:'center'
	             },
				 title:'边界事件',
				 hideCollapseTool:false,
				 html:'<div id="bjwebbar" style="background:white; color:white;position:absolute;overflow:auto;height:100%;width:100%;padding-left:27px;cursor:pointer;"></div> '
			   },
			   {
			     header:{
	                  titleAlign:'center'
	             },
				 title:'中间事件',
				 hideCollapseTool:false,
				 html:'<div id="zjwebbar" style="background:white; color:white;position:absolute;overflow:auto;height:100%;width:100%;padding-left:27px;cursor:pointer;"></div> '
			   }]
   	});
}