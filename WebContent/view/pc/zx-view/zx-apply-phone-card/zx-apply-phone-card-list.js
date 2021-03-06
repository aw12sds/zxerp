var store;
var grid;
var lc_process_status_combo;
var zx_apply_phone_card_status;
Ext.onReady(function(){
	lc_process_status_combo = Ext.create('Ext.data.SimpleStore',{ 
        fields:['value','text'],  
        data:[["yes","同意"],["no","驳回"],["2","已关闭"]]
	});
	//状态下拉框数据
	zx_apply_phone_card_status = new Ext.data.Store({
		singleton:true, 
		proxy:new Ext.data.HttpProxy( { 
			url:'../xtDataDictionaryController/getXtDataDictionaryByKey?key=zx_apply_phone_card_status',
			reader:new Ext.data.JsonReader({
				root:'items',
				type:'json'
			})
		}),
		fields:['xt_data_dictionary_value', 'xt_data_dictionary_name'],
		autoLoad:true
	});
	store = getGridJsonStore('../zxApplyPhoneCardController/getZxApplyPhoneCardListByCondition',[]);
	grid = Ext.create('Ext.grid.Panel',{
		region:'center',
		xtype:'panel',
		store:store,
		title:'查询结果',
		columnLines:true,
		selType:'cellmodel',
		multiSelect:true,
		selType:'checkboxmodel',
		viewConfig:{
			emptyText:'暂无数据',
			stripeRows:true
		},
		loadMask:{
			msg:'正在加载...'
		},
		columns:[
			{
				header:'序号',
				width:77,
				xtype:'rownumberer'
			},
			{
				header:'申请电话卡编号',
				flex:1,
				hidden:true,
				dataIndex:'id'
			},
			{
				header:'申请人',
				flex:1,
				hidden:true,
				dataIndex:'apply_user_id'
			},
			{
				header:'申请时间',
				flex:1,
				dataIndex:'apply_time'
			},
			{
				header:'申请描述',
				flex:1,
				dataIndex:'description'
			},
			{
				header:'状态',
				flex:1,
				dataIndex:'status',
				renderer:function(value){
					return initComBoData(zx_apply_phone_card_status,value,'xt_data_dictionary_value', 'xt_data_dictionary_name');
				}
			},
			{
				header:'查看审批记录',
				align:'center',
				xtype:'widgetcolumn',
				widget:{
	                xtype:'button',
	                text:'审批记录',
	                handler:function(rec){	
	  					var id = rec.getWidgetRecord().data.id;
	  					var status = rec.getWidgetRecord().data.status;
	  					initLcApprovalWin(id,status);
				    }
	            }
			}
		],
		tbar:[
			 {
				text:'创建',
				tooltip:'创建',
				minWidth:tbarBtnMinWidth,
				cls:'addBtn',
				icon:addIcon,
				handler:function(){
					addZxApplyPhoneCard();
				}
			 }, 
			 {
				text:'编辑',
				tooltip:'编辑',
				minWidth:tbarBtnMinWidth,
				cls:'updateBtn',
				icon:editIcon,
				handler:function(){
					updateZxApplyPhoneCard();
				}
			 },
			 {
				text:'删除',
				tooltip:'删除',
				minWidth:tbarBtnMinWidth,
				cls:'delBtn',
				icon:delIcon,
				handler:function(){
					delZxApplyPhoneCard();
				}
			 },
			 {
				text:'刷新',
				tooltip:'刷新',
				minWidth:tbarBtnMinWidth,
				icon:refreshIcon,
				handler:function(){
					refreshGrid(grid);
				}
			 },
			 {
				text:'检索',
				minWidth:tbarBtnMinWidth,
				hidden:true,
				cls:'searchBtn',
				icon:searchIcon,
				handler:function(){
					search();
				}
			 },
			 {
				text:'重置',
				tooltip:'重置',
				hidden:true,
				minWidth:tbarBtnMinWidth,
				icon:clearSearchIcon,
				handler:function(){
					searchForm.reset();
				}
			 },
			 {
				text:'申请',
				tooltip:'申请',
				minWidth:tbarBtnMinWidth,
				cls:'addBtn',
				icon:addIcon,
				handler:function(){
					applyZxPhoneCard();
				}
			 },
			 grid_toolbar_moretext_gaps,
			 {
				 text:moretext,
				 tooltip:moretexttooltip,
				 icon:listIcon,
				 iconAlign:'left',
				 menu:[
				 {
					text:'明 细',
					tooltip:'明 细',
					glyph:0xf03b,
					handler:function(){
						detailZxApplyPhoneCard();
					}
				 },{
					text:'申请',
					tooltip:'申请',
					glyph:0xf078,
					handler:function(){
						applyZxPhoneCard();
					}
				 }
				 ]
			 }
		],
		bbar:getGridBBar(store),
		listeners:{
			'rowdblclick':function(grid, rowIndex, e){
				detailZxApplyPhoneCard();
			}
		}
	});
	Ext.create('Ext.Viewport',{
		layout:'border',
		xtype:'viewport',
		items:[searchForm,grid]
	});
	initRight();
});
/**初始化右键**/
function initRight(){
	var contextmenu = new Ext.menu.Menu({
		id:'theContextMenu',
		items:[{
			text:'申请',
			glyph:0xf0ea,
			id:'applyZxPhoneCardItem',
			handler:function(){applyZxPhoneCard();}
		},{
			text:'明 细',
			glyph:0xf03b,
			id:'detailZxPhoneCardItem',
			handler:function(){detailZxApplyPhoneCard(1);}
		}]
	});
	initrightgridcontextmenu(grid,contextmenu,['applyZxPhoneCardItem','detailZxPhoneCardItem']);
}
//申请
function applyZxPhoneCard() {
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要申请的行！');
		return;
	}else if(record.length > 1) {
		msgTishi('请不要选择多行！');
		return;
	} 
	var status = record.items[0].data.status;
	if(status != 1){
		msgTishi('请选择待申请状态的申请单');
		return;
	}
	var systemUID;
	if(systemUID == ""){
		systemUID = record.items[0].data.xt_userinfo_id;
	}else{
		systemUID = systemUID + "," + record.items[0].data.xt_userinfo_id;
	}
	Ext.Msg.confirm('提示','确定提出申请该行数据？',function(btn){
		if(btn == 'yes'){
			var id = record.items[0].data.id;
			var params = {id:id};
			ajaxRequest('../zxApplyPhoneCardController/applyZxApplyPhoneCard',grid,params,'正在执行操作中！请稍后...');
		}
	});
}
/**删除操作**/
function delZxApplyPhoneCard(){
	var model = grid.getSelectionModel();
	if(model.selected.length == 0){
		msgTishi('请选择后再删除');
		return;
	}
	var id;
	for(var i = 0; i < model.selected.length; i++){
		var status = model.selected.items[i].data.status;
		if(status != 1){
			msgTishi('只有待申请状态才可删除！');
			return;
		}
		if(null == id){
			id=model.selected.items[i].data.id;
		}else{
			id=id+","+model.selected.items[i].data.id;
		}
	}
	Ext.Msg.confirm('提示','确定删除该行数据？',function(btn){
		if(btn == 'yes'){
			var params = {id:id};
			ajaxRequest('../zxApplyPhoneCardController/delZxApplyPhoneCard',grid,params,'正在执行删除操作中！请稍后...');
		}
	});
}
/**
 * 审批记录
 */
var lcApprovalWin;
function initLcApprovalWin(id,status){
	if(status == 1){
		msgTishi('审批中，暂无记录');
		return;
	}
	initLcApprovalGrid(id);
	reGetWidthAndHeight();
	lcApprovalWin = Ext.create('Ext.Window',{
		layout:'fit',
		width:900,                    
		height:480,
		headerPosition:'top',
		maximizable:false,
		minimizable:false,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'审批记录',
		items:lcApprovalGrid,
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		}
	});
	lcApprovalWin.show();
}
function initLcApprovalGrid(id){
	lcApprovalStore = getGridJsonStore('../lcApprovalController/getLcApprovalListByCondition?model_biz_id='+id,[]);
	lcApprovalGrid = Ext.create('Ext.grid.Panel',{
		region:'center',
		xtype:'panel',
		store:lcApprovalStore,
		columnLines:true,
		selType:'cellmodel',
		multiSelect:true,
		selType:'checkboxmodel',
		viewConfig:{
			emptyText:'暂无数据',
			stripeRows:true
		},
		loadMask:{
			msg:'正在加载...'
		},
		title:'审批列表',
		columns:[
			{
				header:'序号',
				width:77,
				xtype:'rownumberer'
			},
			{
				header:'批审状态',
				flex:1,
				dataIndex:'lc_status_id',
				renderer:function(value){
					return initComBoData(lc_process_status_combo,value,"value","text");
				}
			},
			{
				header:'审批内容',
				flex:1,
				dataIndex:'lc_approval_remark'
			},
			{
				header:'审批时间',
				flex:1,
				dataIndex:'lc_approval_time'
			},
			{
				header:'批审人',
				flex:1,
				dataIndex:'xt_userinfo_realName'
			}
		],
		bbar:getGridBBar(lcApprovalStore)
	});
}