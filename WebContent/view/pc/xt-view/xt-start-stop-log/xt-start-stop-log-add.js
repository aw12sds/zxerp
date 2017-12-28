var xtStartStopLogWinAdd;
var xtStartStopLogFormAdd;
function addXtStartStopLog(){
	initXtStartStopLogFormAdd();
	xtStartStopLogWinAdd = Ext.create('Ext.Window',{
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
		items:xtStartStopLogFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(xtStartStopLogFormAdd,'../xtStartStopLogController/addXtStartStopLog',grid,xtStartStopLogWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtStartStopLogWinAdd.show();
}
function initXtStartStopLogFormAdd(){
	xtStartStopLogFormAdd = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'服务器启动时间',
			xtype:'textfield',
			name:'xt_start_stop_log_starttime',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'服务器停止时间',
			xtype:'textfield',
			name:'xt_start_stop_log_stoptime',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'是否出错0正常1错误',
			xtype:'textfield',
			name:'xt_start_stop_log_iserror',
			maxLength:1,
			anchor:'100%'
		},
		{
			fieldLabel:'加载内容',
			xtype:'textfield',
			name:'xt_start_stop_log_content',
			maxLength:65535,
			anchor:'100%'
		}
		]
	});
}
