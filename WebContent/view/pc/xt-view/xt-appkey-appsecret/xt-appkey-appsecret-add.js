var xtAppkeyAppsecretWinAdd;
var xtAppkeyAppsecretFormAdd;
function addXtAppkeyAppsecret(){
	initXtAppkeyAppsecretFormAdd();
	xtAppkeyAppsecretWinAdd = Ext.create('Ext.Window',{
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
		items:xtAppkeyAppsecretFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(xtAppkeyAppsecretFormAdd,'../xtAppkeyAppsecretController/addXtAppkeyAppsecret',grid,xtAppkeyAppsecretWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtAppkeyAppsecretWinAdd.show();
	
}
function initXtAppkeyAppsecretFormAdd(){
	xtAppkeyAppsecretFormAdd = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'right',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'名称',
			xtype:'textfield',
			name:'xt_appkey_appsecret_name',
			maxLength:255,
			anchor:'40%'
		},
		{
			fieldLabel:'态状',
			xtype:'combo',
			emptyText:'请选择',
			store:Xt_Appkey_AppSecret_STATUS_COMBO,
			mode:'local',
			triggerAction:'all',
			editable:false,
			hiddenName:'xt_appkey_appsecret_status',
			valueField:'value',
			displayField:'text',
			name:'xt_appkey_appsecret_status',
			maxLength:10,
			anchor:'40%'
		},
		{
			fieldLabel:'注备',
			xtype:'textareafield',
			name:'xt_appkey_appsecret_remark',
			maxLength:800,
			anchor:'100%'
		}
		]
	});
}
