var xtLoginLogsWinDetail;
var xtLoginLogsFormDetail;
function detailXtLoginLogs(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initXtLoginLogsFormDetail();
	xtLoginLogsWinDetail = Ext.create('Ext.Window',{
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
		items:xtLoginLogsFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtLoginLogsWinDetail.show();
	loadFormData(xtLoginLogsFormDetail,'../xtLoginLogsController/getXtLoginLogsById?xt_login_log_id='+ record.items[0].data.xt_login_log_id);
}
function initXtLoginLogsFormDetail(){
	xtLoginLogsFormDetail = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:80,
			labelAlign:'right',
			flex:1,
			readOnly:true,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'日志编号',
			xtype:'textfield',
			hidden:true,
			name:'xt_login_log_id',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'网&nbsp;络&nbsp;地&nbsp;址',
			xtype:'textfield',
			name:'xt_login_logIP',
			maxLength:20,
			anchor:'40%'
		},
		{
			fieldLabel:'登&nbsp;录&nbsp;时&nbsp;间',
			xtype:'textfield',
			name:'xt_login_logtime',
			maxLength:20,
			anchor:'40%'
		},
		{
			fieldLabel:'浏览器类型',
			xtype:'textfield',
			name:'xt_login_log_browser_type',
			maxLength:200,
			anchor:'40%'
		},
		{
			fieldLabel:'浏览器名称',
			xtype:'textfield',
			name:'xt_login_log_browser_name',
			maxLength:200,
			anchor:'40%'
		},
		{
			fieldLabel:'浏览器版本',
			xtype:'textfield',
			name:'xt_login_log_browser_version',
			maxLength:200,
			anchor:'40%'
		},
		{
			fieldLabel:'操&nbsp;作&nbsp;系&nbsp;统',
			xtype:'textfield',
			name:'xt_login_log_system',
			maxLength:200,
			anchor:'40%'
		},
		{
			fieldLabel:'登&nbsp;陆&nbsp;日&nbsp;志',
			xtype:'textareafield',
			name:'xt_login_logContent',
			maxLength:200,
			anchor:'100%'
		},
		{
			fieldLabel:'操&nbsp;&nbsp;&nbsp;&nbsp;作&nbsp;&nbsp;&nbsp;人',
			xtype:'textfield',
			name:'xt_userinfo_realName',
			maxLength:32,
			anchor:'40%'
		}
		]
	});
}
