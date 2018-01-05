var zxGoodsApplyDetailWinDetail;
var zxGoodsApplyDetailFormDetail;
function detailZxGoodsApplyDetail(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initZxGoodsApplyDetailFormDetail();
	zxGoodsApplyDetailWinDetail = Ext.create('Ext.Window',{
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
		items:zxGoodsApplyDetailFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxGoodsApplyDetailWinDetail.show();
	
	loadFormData(zxGoodsApplyDetailFormDetail,'../zxGoodsApplyDetailController/getZxGoodsApplyDetailById?id='+ record.items[0].data.id);
}
function initZxGoodsApplyDetailFormDetail(){
	zxGoodsApplyDetailFormDetail = Ext.create('Ext.FormPanel',{
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
			fieldLabel:'父id',
			xtype:'textfield',
			name:'parent_id',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'补充数量',
			xtype:'textfield',
			name:'amount',
			maxLength:20,
			anchor:'100%'
		},
		{
			fieldLabel:'用途',
			xtype:'textfield',
			name:'reason',
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'补充时间',
			xtype:'datetimefield',
			format:'Y-m-d H:i:s',
			name:'create_time',
			maxLength:19,
			anchor:'100%'
		}
		]
	});
}
