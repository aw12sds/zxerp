var xtPathWinEdit;
var xtPathFormEdit;
function updateXtPath(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要修改的一项！');
		return;
	}
	initXtPathFormEdit();
	xtPathWinEdit = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
		height:400,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'编辑信息',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:xtPathFormEdit,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(xtPathFormEdit,'../xtPathController/updateXtPath',grid,xtPathWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtPathWinEdit.show();
	loadFormData(xtPathFormEdit,'../xtPathController/getXtPathById?xt_path_id='+ record.items[0].data.xt_path_id);
}
function initXtPathFormEdit(){
	xtPathFormEdit = Ext.create('Ext.FormPanel',{
		xtype:'form',
		labelWidth:50,
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'4 5 4 5'
		},
		items:[
		{
			fieldLabel:'ID',
			xtype:'textfield',
			hidden:true,
			name:'xt_path_id',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'常量名称',
			xtype:'textfield',
			name:'xt_path_name',
			allowBlank:false,
			maxLength:50,
			anchor:'100%'
		},
		{
			fieldLabel:'常量路径',
			xtype:'textfield',
			name:'xt_path',
			allowBlank:false,
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'常&nbsp;量&nbsp;&nbsp;键',
			xtype:'textfield',
			name:'xt_value',
			allowBlank:false,
			maxLength:50,
			anchor:'40%'
		},
		{
			fieldLabel:"类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型",
            name:"xt_type",
            hiddenName:'xt_type',
            xtype:"combo",
            anchor:'40%',
            store:[["1","平台模块"],["2","业务模块"]],
            emptyText:"请选择",
            mode:"local",
            triggerAction:"all",
            editable:false
		},
		{
			fieldLabel:'建创时间',
			xtype:'datetimefield',
			format:'Y-m-d H:i:s',
			name:'xt_time',
			hidden:true,
			allowBlank:false,
			anchor:'40%'
		}
		]
	});
}
