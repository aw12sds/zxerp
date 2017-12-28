var bCategoryWinEdit;
var bCategoryFormEdit;
function updateBCategory(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要修改的一项！');
		return;
	}
	initBCategoryFormEdit();
	bCategoryWinEdit = Ext.create('Ext.Window',{
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
				win.collapse();
			}
		},
		items:bCategoryFormEdit,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(bCategoryFormEdit,'../bCategoryController/updateBCategory',grid,bCategoryWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	bCategoryWinEdit.show();
	loadFormData(bCategoryFormEdit,'../bCategoryController/getBCategoryById?b_category_id='+ record.items[0].data.id);
}
function initBCategoryFormEdit(){
	bCategoryFormEdit = Ext.create('Ext.FormPanel',{
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
			fieldLabel:'分类编号',
			xtype:'textfield',
			hidden:true,
			name:'b_category_id',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'分类深度',
			xtype:'textfield',
			hidden:true,
			name:'b_category_path',
			maxLength:65535,
			anchor:'100%'
		},
		{
			fieldLabel:'分类父级编号',
			xtype:'textfield',
			hidden:true,
			name:'b_category_pid',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'分类名称',
			xtype:'textfield',
			name:'b_category_name',
			allowBlank:false,
			maxLength:200,
			anchor:'100%'
		},
		{
			fieldLabel:'状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态',
			xtype:"combo",
            store:[["0","可用"],["1","禁用"]],
            emptyText:"请选择",
            mode:"local",
            value:'0',
            triggerAction:"all",
            editable:false,
			hiddenName:'b_category_status',
			name:'b_category_status',
			anchor:'100%'
		},
		{
			fieldLabel:'创建时间',
			xtype:'displayfield',
			name:'b_category_ctime',
			allowBlank:false,
			readOnly:true,
			anchor:'100%'
		}
		]
	});
}
