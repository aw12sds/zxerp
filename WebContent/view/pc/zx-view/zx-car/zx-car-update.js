var zxCarWinEdit;
var zxCarFormEdit;
function updateZxCar(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要修改的一项！');
		return;
	}
	initZxCarFormEdit();
	zxCarWinEdit = Ext.create('Ext.Window',{
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
		items:zxCarFormEdit,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxCarFormEdit,'../zxCarController/updateZxCar',grid,zxCarWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxCarWinEdit.show();
	/**初始化附件右键菜单开始 参数4为1表示拥有上传和删除功能 即新增和编辑页面使用**/
	initFileRight('car_img','car_img_pic',1,1);
	/**初始化附件右键菜单结束**/

	/**配置附件回显方法开始**/
	var params = {xt_attachment_id:record.items[0].data.car_img,field_name:'car_img'};
	ajaxFilePathBackRequest('../xtCommonController/getAttachmentPathPP',params,1);
	/**配置附件回显方法结束**/
	loadFormData(zxCarFormEdit,'../zxCarController/getZxCarById?id='+ record.items[0].data.id);
}
function initZxCarFormEdit(){
	zxCarFormEdit = Ext.create('Ext.FormPanel',{
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
			fieldLabel:'Id',
			xtype:'textfield',
			hidden:true,
			name:'id',
			allowBlank:false,
			maxLength:32,
			hidden:true,
			anchor:'100%'
		},
		{
			fieldLabel:'状态',
			xtype:"combo",
			queryMode:'local', 
			store:zx_car_status,
			triggerAction:"all",
            editable:false,
			allowBlank:false,
            emptyText:'请选择',
            valueField:"xt_data_dictionary_value",
            displayField:"xt_data_dictionary_name",
			name:'state',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'车牌',
			xtype:'textfield',
			name:'car_no',
			allowBlank:false,
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'可乘坐人数',
			xtype:'numberfield',
			value:'0',
			name:'people_num',
			maxLength:10,
			anchor:'100%'
		},
		{
			fieldLabel:'型号',
			xtype:'textfield',
			name:'model',
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'品牌',
			xtype:'textfield',
			name:'brand',
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'汽车主图',
			xtype:'textfield',
			hidden:true,
			id:'car_img',
			name:'car_img',
			maxLength:255,
			anchor:'100%'
		},
		{
			title:'汽车主图',
			xtype:'fieldset',
			items:{
				xtype:'box', 
				width:80, 
				height:60, 
				id:'car_img_pic', 
				margin:'2 5 4 70', 
				autoEl:{
					tag:'img',
					/** 不采用右键时候直接用点击事件触发
					onclick:"optupload('car_img','car_img_pic',1)",
					**/
					src:bsdefimg
				}
			}
		},
		{
			fieldLabel:'简介',
			xtype:'textareafield',
			name:'summary',
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'购买时间',
			xtype:'datetimefield',
			format:'Y-m-d H:i:s',
			name:'buy_time',
			maxLength:19,
			anchor:'100%'
		}
		]
	});
}
