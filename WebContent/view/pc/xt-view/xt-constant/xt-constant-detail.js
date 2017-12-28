var xtConstantWinDetail;
var xtConstantFormDetail;
function detailXtConstant(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initXtConstantFormDetail();
	xtConstantWinDetail = Ext.create('Ext.Window',{
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
		items:xtConstantFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtConstantWinDetail.show();
	loadFormData(xtConstantFormDetail,'../xtConstantController/getXtConstantById?xt_constant_id='+ record.items[0].data.xt_constant_id);
}
function initXtConstantFormDetail(){
	xtConstantFormDetail = Ext.create('Ext.FormPanel',{
		xtype:'form',
		labelWidth:50,
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			readOnly:true,
			margin:'4 5 4 5'
		},
		items:[
		{
			fieldLabel:'编号',
			xtype:'textfield',
			hidden:true,
			name:'xt_constant_id',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'常量名称',
			xtype:'textfield',
			name:'xt_constantName',
			maxLength:255,
			anchor:'40%'
		},
		{
			fieldLabel:'常&nbsp;&nbsp;量&nbsp;值',
			xtype:'textfield',
			name:'xt_constantValue',
			maxLength:255,
			anchor:'40%'
		},
		{
			fieldLabel:'类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型',
			name:'xt_constantType',
			anchor:'40%',
			name:"xt_constantType",
            hiddenName:'xt_constantType',
            xtype:"combo",
            store:[["1","平台常量"],["2","业务常量"],["3","工作流常量"]],
            emptyText:"请选择",
            mode:"local",
            triggerAction:"all",
            editable:false
		},
		{
			fieldLabel:'述&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;描',
			xtype:'textarea',
			name:'xt_constantRemark',
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'URL地址',
			xtype:'textfield',
			name:'xt_constantURL',
			maxLength:800,
			anchor:'100%'
		}
		]
	});
}
