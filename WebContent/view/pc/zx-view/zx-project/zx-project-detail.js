var zxProjectWinDetail;
var zxProjectFormDetail;
function detailZxProject(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initZxProjectFormDetail();
	zxProjectWinDetail = Ext.create('Ext.Window',{
		layout:'fit',
		width:400,
		height:240,
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
		items:zxProjectFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxProjectWinDetail.show();
	
	loadFormData(zxProjectFormDetail,'../zxProjectController/getZxProjectById?id='+ record.items[0].data.id);
}
function initZxProjectFormDetail(){
	zxProjectFormDetail = Ext.create('Ext.FormPanel',{
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
			readOnly:true,
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
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'项目号',
			xtype:'textfield',
			name:'num',
			maxLength:100,
			anchor:'100%'
		},
		{
			fieldLabel:'项目发货时间',
			xtype:'datefield',
			format:'Y-m-d',
			name:'ship_date',
			maxLength:10,
			anchor:'100%'
		}
		]
	});
}
