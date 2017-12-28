var xtCompanyWinEdit;
var xtCompanyFormEdit;
function updateXtCompany(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要修改的一项！');
		return;
	}
	initXtCompanyFormEdit();
	xtCompanyWinEdit = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
		height:400,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'公司信息',
		items:xtCompanyFormEdit,
		buttons:[{
			text:'保存',
			itemId:'save',
			glyph:0xf0c7,
			handler:function(button){
				submitForm(xtCompanyFormEdit,'../xtCompanyController/updateXtCompany',grid,xtCompanyWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			glyph:0xf148,
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtCompanyWinEdit.show();
	loadFormData(xtCompanyFormEdit,'../xtCompanyController/getXtCompanyById?xt_company_id='+ record.items[0].data.xt_company_id);
}
function initXtCompanyFormEdit(){
	xtCompanyFormEdit = Ext.create('Ext.FormPanel',{
		xtype:'form',
		labelWidth:50,
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
	        labelWidth:70,
	        labelAlign:"left",
	        flex:1,
	        margin:'4 5 4 5'
	    },
		items:[
		{
			fieldLabel:'公司ID',
			xtype:'textfield',
			hidden:true,
			name:'xt_company_id',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'公司名称',
			xtype:'textfield',
			name:'xt_company_name',
			allowBlank:false,
			maxLength:50,
			anchor:'100%'
		},
		{
			fieldLabel:'公司电话',
			xtype:'textfield',
			name:'xt_company_tel',
			maxLength:20,
			anchor:'100%'
		},
		{
			fieldLabel:'公司简介',
			xtype:'textfield',
			name:'xt_company_remark',
			maxLength:500,
			anchor:'100%'
		},
		{
			fieldLabel:'联&nbsp;系&nbsp;&nbsp;人',
			xtype:'textfield',
			name:'xt_company_userName',
			maxLength:20,
			anchor:'100%'
		},
		{
			fieldLabel:'公司地址',
			xtype:'textfield',
			name:'xt_company_address',
			maxLength:200,
			anchor:'100%'
		},
		{
			fieldLabel:'公司性质',
			xtype:'textfield',
			name:'xt_company_type',
			maxLength:20,
			anchor:'100%'
		},
		{
			fieldLabel:'成立时间',
			xtype:'datefield',
			format:'Y-m-d',
			name:'xt_company_upTime',
			maxLength:20,
			anchor:'100%'
		},
		{
			fieldLabel:'总负责人',
			xtype:'textfield',
			name:'xt_company_ceo',
			maxLength:20,
			anchor:'100%'
		}
		]
	});
}
