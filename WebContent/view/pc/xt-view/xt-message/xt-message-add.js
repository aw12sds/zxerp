var xtMessageWinAdd;
var xtMessageFormAdd;
function addXtMessage(){
	initXtMessageFormAdd();
	reGetWidthAndHeight();
	xtMessageWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:600,                    
		height:300, 
		maximizabled:true,
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
		items:xtMessageFormAdd,
		buttons:[{
			text:'发送',
			itemId:'chooseperson',
			handler:function(button){
				if(Ext.getCmp("xt_meesage_content").getValue() == ''){
					msgTishi('请填写消息内容！');
					return;
				}
				submitForm(xtMessageFormAdd,'../xtMessageController/addXtMessage',grid,xtMessageWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtMessageWinAdd.show();
	
}
function initXtMessageFormAdd(){
	reGetWidthAndHeight();
	xtMessageFormAdd = Ext.create('Ext.FormPanel',{
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
			fieldLabel:'接&nbsp;&nbsp;收&nbsp;&nbsp;者',
			xtype:'textfield',
			name:'to_id',
			id:'to_id',
			hidden:true,
			allowBlank:false,
			maxLength:32,
			anchor:'40%'
		},
		{
			fieldLabel:'接&nbsp;&nbsp;收&nbsp;&nbsp;者',
			xtype:'textfield',
			name:'to_name',
			id:'to_name',
			allowBlank:false,
			trigger1Cls:'x-form-userselect-trigger',
			onTrigger1Click:function(){showUserWin();},
			maxLength:32,
			anchor:'40%'
		},
		{
			fieldLabel:'是否已读',
			xtype:'combo',
			emptyText:'请选择',
			store:xt_message_combo,
			mode:'local',
			triggerAction:'all',
			editable:false,
			hiddenName:'isread',
			valueField:'value',
			displayField:'text',
			name:'isread',
			maxLength:4,
			anchor:'40%'
		},
		{
			fieldLabel:'送发内容',
			xtype:'textareafield',
			id:'xt_meesage_content',
			name:'xt_meesage_content',
			allowBlank:false,
			maxLength:65535,
			anchor:'100%'
		}
		]
	});
}
