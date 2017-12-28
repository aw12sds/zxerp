var bProductColorWinDetail;
var bProductColorFormDetail;
function detailBProductColor(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initBProductColorFormDetail();
	bProductColorWinDetail = Ext.create('top.Ext.Window',{
		layout:'fit',
		width:800,
		height:400,
		maximized:true,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'明细信息',
		listeners:{
			minimize:function(win,opts){
				win.collapse();
			}
		},
		items:bProductColorFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	bProductColorWinDetail.show();
	/**初始化附件右键菜单开始 参数4为1表示不拥有上传和删除功能 即明细页面使用**/
	initTopFileRight('xt_attachment_id','xt_attachment_id_pic',1,2);
	/**初始化附件右键菜单结束**/

	/**配置附件回显方法开始**/
	var params = {xt_attachment_id:record.items[0].data.xt_attachment_id,field_name:'xt_attachment_id'};
	ajaxFilePathBackRequest('../xtCommonController/getAttachmentPathPP',params,2);
	/**配置附件回显方法结束**/
	loadFormData(bProductColorFormDetail,'../bProductColorController/getBProductColorById?b_product_color_id='+ record.items[0].data.b_product_color_id);
}
function initBProductColorFormDetail(){
	bProductColorFormDetail = Ext.create('top.Ext.FormPanel',{
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
			labelWidth:77,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'编号',
			xtype:'textfield',
			hidden:true,
			name:'b_product_color_id',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称',
			xtype:'textfield',
			name:'b_product_color_name',
			maxLength:100,
			anchor:'40%'
		},
		{
			fieldLabel:'图片宽度',
			xtype:'numberfield',
			value:'0',
			name:'b_product_color_width',
			maxLength:10,
			anchor:'40%'
		},
		{
			fieldLabel:'图片高度',
			xtype:'numberfield',
			value:'0',
			name:'b_product_color_height',
			maxLength:10,
			anchor:'40%'
		},
		{
			fieldLabel:'修改时间',
			xtype:'datefield',
			format:'Y-m-d H:i:s',
			name:'b_product_color_mtime',
			maxLength:19,
			anchor:'40%'
		},
		{
			fieldLabel:'创建时间',
			xtype:'datefield',
			format:'Y-m-d H:i:s',
			name:'b_product_color_ctime',
			maxLength:19,
			anchor:'40%'
		},
		{
			fieldLabel:'创&nbsp;&nbsp;建&nbsp;人',
			xtype:'textfield',
			name:'xt_userinfo_realName',
			maxLength:32,
			anchor:'40%'
		},
		{
			fieldLabel:'排序编号',
			xtype:'numberfield',
			value:'0',
			name:'b_product_color_sort',
			maxLength:10,
			anchor:'40%'
		},
		{
			fieldLabel:'状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态',
			xtype:'combo',
			emptyText:'请选择',
			store:B_PRODUCT_COLOR_STATUS_COMBO_STORE,
			mode:'local',
			triggerAction:'all',
			editable:false,
			hiddenName:'b_product_color_status',
			valueField:'value',
			displayField:'text',
			name:'b_product_color_status',
			maxLength:2,
			anchor:'40%'
		},
		{
			fieldLabel:'商户、卖家编号',
			xtype:'textfield',
			hidden:true,
			id:'b_seller_id',
			name:'b_seller_id',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'商户卖家',
			xtype:'textfield',
			name:'b_seller_name',
			id:'b_seller_name',
			maxLength:255,
			readOnly:true,
			allowBlank:false,
			anchor:'40%'
		},
		{
			fieldLabel:'附件编号',
			xtype:'textfield',
			hidden:true,
			id:'xt_attachment_id',
			name:'xt_attachment_id',
			maxLength:32,
			anchor:'100%'
		},
		{
			title:'上传图片颜色',
			xtype:'fieldset',
			items:{
				xtype:'box', 
				id:'xt_attachment_id_pic', 
				margin:'2 5 4 70', 
				autoEl:{
					tag:'img',
					src:bsdefimg
				}
			}
		},
		{
			fieldLabel:'商品编号',
			xtype:'textfield',
			id:'b_product_id',
			name:'b_product_id',
			maxLength:32,
			hidden:true,
			anchor:'100%'
		},
		{
			fieldLabel:'备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注',
			xtype:'textareafield',
			name:'b_product_color_remark',
			maxLength:200,
			anchor:'100%'
		}
		]
	});
}
