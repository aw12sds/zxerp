var xtQuartzMessageWinDetail;
var xtQuartzMessageFormDetail;
function detailXtQuartzMessage(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initXtQuartzMessageFormDetail();
	xtQuartzMessageWinDetail = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
		height:400,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'明细信息',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:xtQuartzMessageFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtQuartzMessageWinDetail.show();
	
	loadFormData(xtQuartzMessageFormDetail,'../xtQuartzMessageController/getXtQuartzMessageById?id='+ record.items[0].data.id);
}
function initXtQuartzMessageFormDetail(){
	xtQuartzMessageFormDetail = Ext.create('Ext.FormPanel',{
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
			readOnly:true,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'ID',
			xtype:'textfield',
			hidden:true,
			name:'id',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'发送人',
			xtype:'textfield',
			name:'from_user_id',
			maxLength:32,
			hidden:true,
			anchor:'100%'
		},
		{
			fieldLabel:'接收人',
			xtype:'textfield',
			name:'to_user_name',
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
			xtype:'textareafield',
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
			anchor:'100%'
		}
		]
	});
}
