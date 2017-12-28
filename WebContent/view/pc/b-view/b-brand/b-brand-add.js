var bBrandWinAdd;
var bBrandFormAdd;
function addBBrand(){
	initBBrandFormAdd();
	bBrandWinAdd = Ext.create('Ext.Window',{
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
				win.collapse();
			}
		},
		items:bBrandFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(bBrandFormAdd,'../bBrandController/addBBrand',grid,bBrandWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	bBrandWinAdd.show();
}
function initBBrandFormAdd(){
	bBrandFormAdd = Ext.create('Ext.FormPanel',{
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
			fieldLabel:'品牌名称',
			xtype:'textfield',
			name:'b_brand_name',
			allowBlank:false,
			maxLength:200,
			anchor:'80%'
		},
		{
			fieldLabel:'状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态',
			name:'b_brand_status',
			xtype:"combo",
            store:[["0","可用"],["1","禁用"]],
            emptyText:"请选择",
            mode:"local",
            value:'0',
            triggerAction:"all",
            editable:false,
			hiddenName:'b_brand_status',
			anchor:'40%'
		},
		{
			fieldLabel:'类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型',
			xtype:"combo",
            store:[["0","国内"],["1","国外"]],
            emptyText:"请选择",
            mode:"local",
            value:'0',
            triggerAction:"all",
            editable:false,
			hiddenName:'b_brand_type',
			name:'b_brand_type',
			maxLength:2,
			anchor:'40%'
		},
		{
			fieldLabel:'排序编号',
			xtype:'numberfield',
			name:'b_brand_soft',
			allowBlank:false,
			maxLength:32,
			value:'0',
			anchor:'40%'
		}
		]
	});
}
