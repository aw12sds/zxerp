var zxProjectWinEdit;
var zxProjectFormEdit;
function updateZxProject(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要修改的一项！');
		return;
	}
	initZxProjectFormEdit();
	zxProjectWinEdit = Ext.create('Ext.Window',{
		layout:'fit',
		width:400,
		height:240,
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
		items:zxProjectFormEdit,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxProjectFormEdit,'../zxProjectController/updateZxProject',grid,zxProjectWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxProjectWinEdit.show();
	
	loadFormData(zxProjectFormEdit,'../zxProjectController/getZxProjectById?id='+ record.items[0].data.id);
}
function initZxProjectFormEdit(){
	zxProjectFormEdit = Ext.create('Ext.FormPanel',{
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
			labelWidth:100,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'项目ID',
			xtype:'textfield',
			hidden:true,
			name:'id',
			allowBlank:false,
			maxLength:32,
			hidden:true,
			anchor:'100%'
		},
		{
			fieldLabel:'项目名称',
			xtype:'textfield',
			name:'name',
			allowBlank: false,
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'项目号',
			xtype:'textfield',
			name:'num',
			allowBlank: false,
			maxLength:100,
			anchor:'100%'
		},
		{
			fieldLabel:'项目发货时间',
			xtype:'datefield',
			format:'Y-m-d',
			allowBlank: false,
			name:'ship_date',
			maxLength:10,
			anchor:'100%'
		}
		]
	});
}
