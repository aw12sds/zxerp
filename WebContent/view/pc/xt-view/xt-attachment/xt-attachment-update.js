var xtAttachmentWinEdit;
var xtAttachmentFormEdit;
function updateXtAttachment(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要修改的一项！');
		return;
	}
	initXtAttachmentFormEdit();
	xtAttachmentWinEdit = Ext.create('Ext.Window',{
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
		items:xtAttachmentFormEdit,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtAttachmentWinEdit.show();
	loadFormData(xtAttachmentFormEdit,'../xtAttachmentController/getXtAttachmentById?xt_attachment_id='+ record.items[0].data.xt_attachment_id);
}
function initXtAttachmentFormEdit(){
	xtAttachmentFormEdit = Ext.create('Ext.FormPanel',{
		xtype:'form',
		labelWidth:50,
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'right',
			flex:1,
			margin:'4 5 4 5'
		},
		items:[
		{
			fieldLabel:'附件编号',
			xtype:'textfield',
			hidden:true,
			name:'xt_attachment_id',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'原先名称',
			xtype:'textfield',
			name:'xt_attachmentTitle',
			maxLength:50,
			anchor:'100%'
		},
		{
			fieldLabel:'附件名称',
			xtype:'textfield',
			name:'xt_attachmentName',
			maxLength:50,
			anchor:'100%'
		},
		{
			fieldLabel:'件文类型',
			xtype:'textfield',
			name:'xt_attachmentType',
			maxLength:20,
			anchor:'100%'
		},
		{
			fieldLabel:'件文大小',
			xtype:'textfield',
			name:'xt_attachmentSize',
			maxLength:20,
			anchor:'40%'
		},
		{
			fieldLabel:'文件路径',
			xtype:'textfield',
			name:'xt_attachmentPath',
			maxLength:200,
			anchor:'100%'
		},
		{
			fieldLabel:'顺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序',
			xtype:'numberfield',
			value:'0',
			name:'xt_modules_order',
			anchor:'40%'
		},
		{
			fieldLabel:'上传时间',
			xtype:'textfield',
			name:'xt_attachmentCtime',
			maxLength:20,
			anchor:'40%'
		},
		{
			fieldLabel:'操&nbsp;&nbsp;作&nbsp;人',
			xtype:'textfield',
			name:'xt_userinfo_realName',
			maxLength:32,
			anchor:'40%'
		}
		]
	});
}
