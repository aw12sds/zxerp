var zxBuyProgressWinDetail;
var zxBuyProgressFormDetail;
var zxBuyTimeFormDetail;
var zxBuyProgressFormDetailFieldSet;
var zxBuyProgressFormBuyEditFieldSet;
var zxBuyTimeFormDetailFieldSet;

function detailZxBuyProgressMaterial(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initZxBuyProgressFormDetail();
	reGetWidthAndHeight();
	zxBuyProgressWinDetail = Ext.create('Ext.Window',{
		layout:'fit',
		width:clientWidth*0.9,                    
		height:clientHeight*0.9, 
		maximizable:false,
		minimizable:false,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'物料跟单',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:zxBuyProgressFormDetail
	});
	zxBuyProgressWinDetail.show();
	loadFormDataCallBack(zxBuyProgressFormDetail,'../zxBuyProgressController/getZxBuyProgressById?id='+ record.items[0].data.id,callFnDetail);
}
function initZxBuyProgressFormDetail(){
	zxBuyProgressFormDetailFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'基本信息',
		items:[
       {
			layout:"column",
			items:[
			{
				fieldLabel:'ID',
				xtype:'textfield',
				name:'id',
				id:'id',
				hidden:true,
				maxLength:32,
				anchor:'20%'
			},
			{
				columnWidth:.25,
				fieldLabel:'项目号',
				xtype:'textfield',
				name:'project_num',
				id:'project_num',
				readOnly: true,
				maxLength:255
			},
			{
				columnWidth:.25,
				fieldLabel:'项目名称',
				xtype:'textfield',
				name:'project_name',
				id:'project_name',
				readOnly: true,
				maxLength:255
			},
			{
				columnWidth:.25,
				fieldLabel:'申请编号',
				xtype:'textfield',
				name:'apply_num',
				id:'apply_num',
				readOnly: true,
				maxLength:255
			},
			{
				columnWidth:.25,
				fieldLabel:'订单编号',
				xtype:'textfield',
				name:'order_num',
				id:'order_num',
				readOnly: true,
				maxLength:255
			}
			]
		},
       {
			layout:"column",
			items:[
			{
				columnWidth:.25,
				fieldLabel:'订单标题',
				xtype:'textfield',
				name:'order_name',
				id:'order_name',
				readOnly: true,
				maxLength:100
			},
			{
				columnWidth:.75,
				fieldLabel:'订单描述',
				xtype:'textfield',
				name:'description',
				id:'description',
				readOnly: true,
				maxLength:255,
				anchor:'100%'
			}
			]
		},
		{
			layout:"column",
			items:[
			{
				fieldLabel:'物料ID',
				xtype:'textfield',
				name:'material_id',
				id:'material_id',
				hidden:true,
				maxLength:32
			},
			{
				columnWidth:.25,
				fieldLabel:'物料编号',
				xtype:'textfield',
				name:'material_num',
				readOnly: true,
				id:'material_num',
				maxLength:255
			},
			{
				columnWidth:.25,
				fieldLabel:'物料名称',
				xtype:'textfield',
				name:'material_short_name',
				id:'material_short_name',
				readOnly:true,
				maxLength:100
			},
			{
				columnWidth:.25,
				fieldLabel:'型号',
				xtype:'textfield',
				name:'material_standard',
				id:'material_standard',
				maxLength:100,
				readOnly:true
			},
			{
				columnWidth:.25,
				fieldLabel:'采购数量',
				xtype:'textfield',
				name:'buy_amount',
				id:'buy_amount',
				maxLength:26,
				readOnly:true
			},
			{
				fieldLabel:'已到数量',
				xtype:'textfield',
				name:'real_amount',
				hidden:true
			},
			{
				fieldLabel:'入库数量',
				xtype:'textfield',
				name:'in_warehouse_amount',
				hidden:true
			},
			{
				fieldLabel:'出库数量',
				xtype:'textfield',
				name:'out_warehouse_amount',
				hidden:true
			}
			]
		},
		{
	       layout:"column",
	       items:[
			{
				columnWidth:.25,
				fieldLabel:'品牌',
				xtype:'textfield',
				name:'brand',
				maxLength:255,
				readOnly:true
			},
			{
				columnWidth:.25,
				fieldLabel:'材质',
				xtype:'textfield',
				name:'caizhi',
				readOnly:true,
				maxLength:255
			},
			{
				columnWidth:.25,
				fieldLabel:'需求日期',
				xtype:'datefield',
				format:'Y-m-d',
				readOnly:true,
				name:'need_time',
				id:'need_time',
				maxLength:19
			},
			{
				columnWidth:.25,
				fieldLabel:'清单下发时间',
				xtype:'datetimefield',
				format:'Y-m-d H:i:s',
				name:'send_draw_time',
				id:'send_draw_time',
				readOnly:true,
				maxLength:20
			}
			]
		},
		{
			layout:"column",
			items:[
			{
				columnWidth:.25,
				fieldLabel:'供应商',
				xtype:'textfield',
				name:'supplier_name',
				id:'supplier_name',
				readOnly: true,
				maxLength:255
			},
			{
				columnWidth:.25,
				fieldLabel:'承诺到货日期',
				xtype:'datefield',
				format:'Y-m-d',
				readOnly: true,
				name:'agree_time',
				id:'agree_time',
				maxLength:20
			},
			{
				columnWidth:.25,
				fieldLabel:'采购日期',
				xtype:'datefield',
				format:'Y-m-d',
				readOnly: true,
				name:'buy_time',
				id:'buy_time',
				maxLength:20
			},
			{
				fieldLabel:'供应商ID',
				xtype:'textfield',
				name:'suppier_id',
				id:'suppier_id',
				hidden:true,
				maxLength:32
			}
			]
		},
		{
			xtype:'numberfield',
			hidden:true,
			value:'0',
			itemId:'zxBuyTimeFormNumber'
		},
		{
			xtype:'textfield',
			hidden:true,
			name:'zxBuyTime_removed_flag',
			itemId:'zxBuyTime_removed_flag'
		}
	]
	});
	zxBuyProgressFormBuyEditFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'采购信息',
		items:[
		{
	       layout:"column",
	       items:[
			{
				columnWidth:.25,
				fieldLabel:'预计到货日期',
				xtype:'datefield',
				format:'Y-m-d',
				allowBlank: false,
				name:'plan_time',
				maxLength:20
			},
			{
				columnWidth:.75,
				fieldLabel:'备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注',
				xtype:'textfield',
				name:'remark',
				maxLength:65535
			}]
		}
		]
	});
	zxBuyTimeFormDetailFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'分批到货'
	});
	zxBuyProgressFormDetail = Ext.create('Ext.FormPanel',{
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
			margin:'2 0 4 5'
		},
		items:[
			zxBuyProgressFormDetailFieldSet,
			zxBuyProgressFormBuyEditFieldSet,
			zxBuyTimeFormDetailFieldSet
		]
	});
}

function callFnDetail(form, action){
	var zxBuyTime = action.result.data.zxBuyTime;
	for(var i = 0; i < zxBuyTime.length; i++){
		addZxBuyTimeFormDetail(zxBuyTime[i]);
	}
}

function addZxBuyTimeFormDetail(data){
	var numbers = gfiValue(zxBuyProgressFormDetailFieldSet,'zxBuyTimeFormNumber');
	sfiValue(zxBuyProgressFormDetailFieldSet,'zxBuyTimeFormNumber',numbers+1);
	zxBuyTimeFormDetail = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		layout:"column",
		fieldDefaults:{
			labelWidth:100,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'ID',
			xtype:'textfield',
			name:'zxBuyTime['+numbers+'].id',
			itemId:'zxBuyTime['+numbers+'].id',
			maxLength:32,
			hidden:true,
			anchor:'100%'
		},
		{
			fieldLabel:'采购ID',
			xtype:'textfield',
			name:'zxBuyTime['+numbers+'].buy_id',
			itemId:'zxBuyTime['+numbers+'].buy_id',
			maxLength:32,
			hidden:true,
			anchor:'100%'
		},
		{
			fieldLabel:'计划交货时间',
			xtype:'datefield',
			format:'Y-m-d',
			name:'zxBuyTime['+numbers+'].plan_date',
			itemId:'zxBuyTime['+numbers+'].plan_date',
			maxLength:10,
			anchor:'100%'
		},
		{
			fieldLabel:'计划到货数量',
			xtype:'textfield',
			name:'zxBuyTime['+numbers+'].plan_amount',
			itemId:'zxBuyTime['+numbers+'].plan_amount',
			maxLength:20,
			anchor:'100%'
		},
		{
			fieldLabel:'实际交货时间',
			xtype:'datefield',
			format:'Y-m-d',
			name:'zxBuyTime['+numbers+'].real_date',
			itemId:'zxBuyTime['+numbers+'].real_date',
			maxLength:10,
			anchor:'100%'
		},
		{
			fieldLabel:'实际到货数量',
			xtype:'textfield',
			name:'zxBuyTime['+numbers+'].real_amount',
			itemId:'zxBuyTime['+numbers+'].real_amount',
			emptyText:'0',
			maxLength:20,
			anchor:'100%'
		},
		{
			fieldLabel:'排序',
			xtype:'numberfield',
			value:'0',
			name:'zxBuyTime['+numbers+'].time_sort',
			itemId:'zxBuyTime['+numbers+'].time_sort',
			maxLength:10,
			anchor:'100%'
		}
		]
	});
	zxBuyTimeFormDetailFieldSet.add(zxBuyTimeFormDetailFieldSet.items.getCount(),zxBuyTimeFormDetail);
	if(null != data){
		//获取表单中所有字段与值（key/value）
		var zxBuyTimeFormDetailData = zxBuyTimeFormDetail.getForm().getFieldValues();
		//遍历表单中所有字段名称（key）
		for(var zxBuyTimeFormDetailField in zxBuyTimeFormDetailData){
			//获取表单中所有字段名称（key）并且截取对象后面的字段 目的与实体类中字段名称一致
			var zxBuyTimeFormDetailYField = zxBuyTimeFormDetailField.split(".")[1];
			//遍历服务器传递来的对象
			for(var dataKey in data){
				//判断当前字段是否等于服务器传过来的字段
				if(zxBuyTimeFormDetailYField == dataKey){
					//给表单每个字段赋值
					sfiValue(zxBuyTimeFormDetail,zxBuyTimeFormDetailField,data[dataKey]);
				}
			}
		}
	}
	zxBuyTimeFormDetailFieldSet.afterLayout();
	resetTitle(zxBuyTimeFormDetailFieldSet,true);
}