var store;
var grid;
var six_s_check_place;
var zx_dep;
var zx_sis_s_status;
Ext.onReady(function(){
	six_s_check_place = new Ext.data.Store({
		singleton:true, 
		proxy:new Ext.data.HttpProxy({ 
			url:'../xtDataDictionaryController/getXtDataDictionaryByKey?key=six_s_check_place',
			reader:new Ext.data.JsonReader({
				root:'items',
				type:'json'
			})
		}),
		fields:['xt_data_dictionary_id', 'xt_data_dictionary_name'],
		autoLoad:true 
	});
	zx_dep = xt_service_center_type_combo = Ext.create('Ext.data.TreeStore',{
		fields:['id','text'],
		root:{
			text:'一级分类',
			id:'0',
			expanded:false
		},
		proxy:{
			type:'ajax',
			url:'../xtDataAuthorityController/getXtDepartTree',
			reader:{
				type:'json'
			}
		},
		autoLoad:true 
	});
	zx_sis_s_status = xt_service_center_type_combo = Ext.create('Ext.data.SimpleStore',{ 
        fields:['value','text'],  
		data:[["","---请选择---"],["1","保存中"],["2","改善中"],["3","确认中"],["4","已完结"]]
	});
	/**查询区域可扩展**/
	var items = Ext.create('Ext.FormPanel',{
		xtype:'form',
		maxHeight:150,
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		layout:'column',
		items:[
			{
				fieldLabel:'标题',
				xtype:'textfield',
				labelWidth:70,
				id:'s_title',
				name:'title',
				anchor:'30%',
				columnWidth: 0.25,
				labelAlign:'left'
			},
			{
				fieldLabel:'状态',
				xtype:'combo',
				labelWidth:70,
				emptyText:'请选择',
				store:zx_sis_s_status,
				mode:'local',
				triggerAction:'all',
				editable:false,
				hiddenName:'status',
				valueField:'value',
				displayField:'text',
				name:'status',
				maxLength:32,
				columnWidth: 0.25,
				labelAlign:'left'
			}
		]
	});
	initSearchForm('north',items,false,'left');
	store = getGridJsonStore('../zxSixSController/getZxSixSListByCondition',[]);
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
				header:'ID',
				flex:1,
				hidden:true,
				dataIndex:'id'
			},
			{
				header:'编号',
				flex:1,
				hidden:true,
				dataIndex:'num'
			},
			{
				header:'标题',
				flex:1,
				dataIndex:'title'
			},
			{
				header:'检查日期',
				flex:1,
				dataIndex:'check_date',
				renderer:function(value){
					if(value != ''){
						return value.substring(0,10);
					}else{
						return '';
					}
				}
			},
			{
				header:'填写人',
				flex:1,
				dataIndex:'user_realname'
			},
			{
				header:'状态',
				flex:1,
				dataIndex:'status',
				renderer:function(value){
					if(value == '1'){
						return '保存中';
					}else if(value == '2'){
						return '改善中';
					}else if(value == '3'){
						return '确认中';
					}else if(value == '4'){
						return '已完结';
					}else{
						return '';
					}
				}
			},
			{
				header:'状态',
				flex:1,
				hidden:true,
				dataIndex:'state'
			},
			{
				header:'创建日期',
				flex:1,
				dataIndex:'create_date'
			}
		],
		tbar:[
			 {
				text:'添加',
				tooltip:'添加',
				minWidth:tbarBtnMinWidth,
				cls:'addBtn',
				icon:addIcon,
				handler:function(){
					addZxSixS();
				}
			 },
			 {
				text:'编辑',
				tooltip:'编辑',
				minWidth:tbarBtnMinWidth,
				cls:'updateBtn',
				icon:editIcon,
				handler:function(){
					updateZxSixS();
				}
			 },
			 {
				text:'删除',
				tooltip:'删除',
				minWidth:tbarBtnMinWidth,
				cls:'delBtn',
				icon:delIcon,
				handler:function(){
					delZxSixS();
				}
			 },
			 {
				text:'检索',
				minWidth:tbarBtnMinWidth,
				cls:'searchBtn',
				icon:searchIcon,
				handler:function(){
					search();
				}
			 },
			 {
				text:'重置',
				tooltip:'重置',
				minWidth:tbarBtnMinWidth,
				icon:clearSearchIcon,
				handler:function(){
					searchForm.reset();
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
					text:'事项明细',
					tooltip:'事项明细',
					glyph:0xf03b,
					handler:function(){
						var record = grid.getSelectionModel().selected;
						if(record.length == 0){
							msgTishi('请选择要查看的一项！');
							return;
						}
						initZxSixSContentList(record.items[0].data.id);
					}
				 },
				 {
					text:'复制一行并生成记录',
					tooltip:'复制一行并生成记录',
					glyph:0xf0ea,
					handler:function(){
						copyZxSixS();
					}
				 },
				 '-',
				 {
					text:'导 出',
					tooltip:'导 出',
					glyph:0xf1c3,
					handler:function(){
						exportZxSixS(grid,'../zxSixSController/exportZxSixS');
					}
				 },
				 {
					text:'打 印',
					tooltip:'打 印',
					glyph:0xf02f,
					handler:function(){
						printerGrid(grid);
					}
				 },
				 '-',
				 {
					text:'全 选',
					tooltip:'全 选',
					glyph:0xf046,
					handler:function(){selectAll(grid);}
				 },
				 {
					text:'反 选',
					tooltip:'反 选',
					glyph:0xf096,
					handler:function(){unSelectAll(grid);}
				 },
				 '-',
				 {
					text:'刷 新',
					tooltip:'刷 新',
					glyph:0xf021,
					handler:function(){
						grid.getStore().reload();
					}
				 },
				 {
					text:'检 索',
					tooltip:'检 索',
					glyph:0xf002,
					handler:function(){
						search();
					}
				 },
				 {
					text:'重 置',
					tooltip:'重 置',
					glyph:0xf014,
					handler:function(){
						searchForm.reset();
					}
				 }
				 ]
			 }
		],
		bbar:getGridBBar(store),
		listeners:{
			'rowdblclick':function(grid, rowIndex, e){
				var record = grid.getSelectionModel().selected;
				initZxSixSContentListView(record.items[0].data.id);
			}
		}
	});
	Ext.create('Ext.Viewport',{
		layout:'border',
		xtype:'viewport',
		items:[searchForm,grid]
	});
	/**调用右键**/
	initRight();
	store.on('beforeload',function(thiz, options){Ext.apply(thiz.proxy.extraParams,getParmas(store,searchForm));});
});
/**删除操作**/
function delZxSixS(){
	var model = grid.getSelectionModel();
	if(model.selected.length == 0){
		msgTishi('请选择后再删除');
		return;
	}
	var id;
	for(var i = 0; i < model.selected.length; i++){
		if(null == id){
			id=model.selected.items[i].data.id;
		}else{
			id=id+","+model.selected.items[i].data.id;
		}
	}
	Ext.Msg.confirm('提示','确定删除该行数据？',function(btn){
		if(btn == 'yes'){
			var params = {id:id};
			ajaxRequest('../zxSixSController/delZxSixS',grid,params,'正在执行删除操作中！请稍后...');
		}
	});
}
/**复制一行并生成记录**/
function copyZxSixS(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要复制的行！');
		return;
	}
	Ext.Msg.confirm('提示','确定要复制一行并生成记录？',function(btn){
		if(btn == 'yes'){
			var params = {id:record.items[0].data.id};
			ajaxRequest('../zxSixSController/copyZxSixS',grid,params,'正在执行复制一行并生成记录！请稍后...');
		}
	});
}
/**导出**/
function exportZxSixS(grid,url){
	exportExcel(grid,url);
}
/**初始化右键**/
function initRight(){
	var contextmenu = new Ext.menu.Menu({
		id:'theContextMenu',
		items:[{
			text:'事项明细',
			glyph:0xf03b,
			id:'detailZxSixSItem',
			handler:function(){
				var record = grid.getSelectionModel().selected;
				if(record.length == 0){
					msgTishi('请选择要查看的一项！');
					return;
				}
				initZxSixSContentList(record.items[0].data.id);
			}
		},{
			text:'发布',
			glyph:0xf016,
			id:'zxSixSSubmit',
			handler:function(button){
				var record = grid.getSelectionModel().selected;
				if(record.length == 0){
					msgTishi('请选择要发布的一项！');
					return;
				}
				var params = {id:record.items[0].data.id,status:2};
				ajaxRequest('../zxSixSController/fabuZxSixS',grid,params,'正在执行操作中！请稍后...');
			}
		},{
			text:'添 加',
			glyph:0xf016,
			id:'addZxSixSItem',
			handler:function(){addZxSixS();}
		},{
			text:'编 辑',
			glyph:0xf044,
			id:'updateZxSixSItem',
			handler:function(){updateZxSixS();}
		},{
			text:'删 除',
			glyph:0xf014,
			id:'delZxSixSItem',
			handler:function(){delZxSixS();}
		},'-',{
			text:'复制一行并生成记录',
			glyph:0xf0ea,
			id:'copyZxSixSItem',
			handler:function(){copyZxSixS();}
		},{
			text:'导 出',
			glyph:0xf1c3,
			handler:function(){
				exportZxSixS(grid,'../zxSixSController/exportZxSixS');
			}
		},{
			text:'打 印',
			glyph:0xf02f,
			handler:function(){printerGrid(grid);}
		},'-',{
			text:'全 选',
			glyph:0xf046,
			handler:function(){selectAll(grid);}
		},{
			text:'反 选',
			glyph:0xf096,
			handler:function(){unSelectAll(grid);}
		},'-',{
			text:'刷 新',
			glyph:0xf021,
			handler:function(){refreshGrid(grid);}
		}]
	});
	initrightgridcontextmenu(grid,contextmenu,['updateZxSixSItem','delZxSixSItem','copyZxSixSItem','detailZxSixSItem']);
}
/**查询操作**/
function search(){
	initSearch(store,'../zxSixSController/getZxSixSListByCondition',searchForm);
}
