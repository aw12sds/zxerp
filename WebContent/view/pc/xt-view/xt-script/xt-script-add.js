var xtScriptWinAdd;
var xtScriptFormAdd;
function addXtScript(){
	initXtScriptFormAdd();
	xtScriptWinAdd = Ext.create('Ext.Window',{
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
		items:xtScriptFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(xtScriptFormAdd,'../xtScriptController/addXtScript',grid,xtScriptWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtScriptWinAdd.show();
}
function initXtScriptFormAdd(){
	xtScriptFormAdd = Ext.create('Ext.FormPanel',{
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
			fieldLabel:'标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题',
			xtype:'textfield',
			name:'xt_script_title',
			maxLength:100,
			anchor:'100%'
		},
		{
			fieldLabel:'描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述',
			xtype:'textareafield',
			name:'xt_script_content',
			maxLength:800,
			anchor:'100%'
		},
		{
			fieldLabel:'脚&nbsp;&nbsp;本&nbsp;键',
			xtype:'textfield',
			name:'xt_script_key',
			allowBlank:false,
			maxLength:200,
			anchor:'40%'
		},
		{
			fieldLabel:'脚本内容',
			xtype:'textareafield',
			name:'xt_script_text',
			maxLength:65535,
			height:200,
			anchor:'100%'
		},
		{
			fieldLabel:'脚本类型',
			name:'xt_script_type',
			xtype:"combo",
            store:[["1","javaScript"],["2","Sql"],["3","html"],["4","其他"]],
            emptyText:"请选择",
            mode:"local",
            triggerAction:"all",
            editable:false,
			anchor:'40%'
		},
		{
			fieldLabel:'状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态',
			name:'xt_script_status',
			xtype:"combo",
            anchor:'100%',
            store:[["0","正常"],["1","禁用"]],
            emptyText:"请选择",
            mode:"local",
            triggerAction:"all",
            editable:false,
			anchor:'40%'
		},
		{
			fieldLabel:'参与配置',
			name:'xt_script_search_filed',
			xtype:"combo",
            anchor:'100%',
            store:[["0","是"],["1","否"]],
            emptyText:"请选择",
            mode:"local",
            triggerAction:"all",
            editable:false,
			anchor:'40%'
		},
		{
			fieldLabel:'真&nbsp;&nbsp;实&nbsp;值',
			xtype:'textfield',
			name:'xt_script_valuefield',
			allowBlank:false,
			maxLength:200,
			anchor:'40%'
		},
		{
			fieldLabel:'显&nbsp;&nbsp;示&nbsp;值',
			xtype:'textfield',
			name:'xt_script_displayfield',
			allowBlank:false,
			maxLength:200,
			anchor:'40%'
		}
		]
	});
}