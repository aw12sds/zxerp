var zxTrainPlanWinEdit;
var zxTrainPlanFormEdit;
function updateZxTrainPlan(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要修改的一项！');
		return;
	}
	initZxTrainPlanFormEdit();
	zxTrainPlanWinEdit = Ext.create('Ext.Window',{
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
		items:zxTrainPlanFormEdit,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxTrainPlanFormEdit,'../zxTrainPlanController/updateZxTrainPlan',grid,zxTrainPlanWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxTrainPlanWinEdit.show();
	
	loadFormData(zxTrainPlanFormEdit,'../zxTrainPlanController/getZxTrainPlanById?id='+ record.items[0].data.id);
}
function initZxTrainPlanFormEdit(){
	zxTrainPlanFormEdit = Ext.create('Ext.FormPanel',{
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
			fieldLabel:'序列号',
			xtype:'textfield',
			hidden:true,
			name:'id',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'年度',
			xtype:'textfield',
			name:'year',
			maxLength:10,
			anchor:'100%'
		},
		{
			fieldLabel:'月份',
			xtype:'textfield',
			name:'month',
			maxLength:10,
			anchor:'100%'
		},
		{
			fieldLabel:'标题',
			xtype:'textfield',
			name:'caption',
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'部门',
			xtype:'textfield',
			name:'depart',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'备份',
			xtype:'textfield',
			name:'reason',
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'状态',
			xtype:'textfield',
			name:'status',
			maxLength:10,
			anchor:'100%'
		},
		{
			fieldLabel:'创建时间',
			xtype:'datetimefield',
			format:'Y-m-d H:i:s',
			name:'create_date',
			allowBlank:false,
			maxLength:19,
			anchor:'100%'
		}
		]
	});
}
