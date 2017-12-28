var xtQuartzMessageWinAdd;
var xtQuartzMessageFormAdd;
function addXtQuartzMessage(){
	initXtQuartzMessageFormAdd();
	xtQuartzMessageWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
		height:400,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'添加信息',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:xtQuartzMessageFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(xtQuartzMessageFormAdd,'../xtQuartzMessageController/addXtQuartzMessage',grid,xtQuartzMessageWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtQuartzMessageWinAdd.show();
	
}
function initXtQuartzMessageFormAdd(){
	xtQuartzMessageFormAdd = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		/**新方法使用开始**/
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		/**新方法使用结束**/
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'发送人',
			xtype:'textfield',
			name:'from_user_id',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'接收人',
			xtype:'textfield',
			name:'to_user_id',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'任务运行时间',
			xtype:'datetimefield',
			format:'Y-m-d H:i:s',
			name:'execute_date',
			maxLength:19,
			anchor:'100%'
		},
		{
			fieldLabel:'任务描述',
			xtype:'textfield',
			name:'content',
			maxLength:256,
			anchor:'100%'
		},
		{
			fieldLabel:'创建时间',
			xtype:'datetimefield',
			format:'Y-m-d H:i:s',
			name:'create_date',
			maxLength:19,
			hidden:true,
			anchor:'100%'
		}
		]
	});
}
