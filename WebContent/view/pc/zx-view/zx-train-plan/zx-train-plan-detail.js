var zxTrainPlanWinDetail;
var zxTrainPlanFormDetail;
function detailZxTrainPlan(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initZxTrainPlanFormDetail();
	zxTrainPlanWinDetail = Ext.create('Ext.Window',{
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
		items:zxTrainPlanFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxTrainPlanWinDetail.show();
	
	loadFormData(zxTrainPlanFormDetail,'../zxTrainPlanController/getZxTrainPlanById?id='+ record.items[0].data.id);
}
function initZxTrainPlanFormDetail(){
	zxTrainPlanFormDetail = Ext.create('Ext.FormPanel',{
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
