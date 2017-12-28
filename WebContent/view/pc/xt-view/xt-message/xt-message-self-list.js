var store;
var grid;
var xt_message_combo;
Ext.onReady(function(){
	xt_message_combo = Ext.create('Ext.data.SimpleStore',{ 
        fields:['value','text'],  
		 data:[["0","未读"],["1","已读"]]
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
			fieldLabel:'是否已读',
			xtype:'combo',
			labelWidth:70,
			emptyText:'请选择',
			store:xt_message_combo,
			mode:'local',
			triggerAction:'all',
			editable:false,
			hiddenName:'isread',
			valueField:'value',
			displayField:'text',
			id:'isread',
			name:'isread',
			anchor:'30%',
			columnWidth: 0.25,
			labelAlign:'left'
		},
		{
			fieldLabel:'发送者',
			xtype:'textfield',
			labelWidth:70,
			id:'from_user_name_id',
			name:'from_user_name_id',
			anchor:'30%',
			columnWidth: 0.25,
			labelAlign:'left'
		}
		]
	});
	initSearchForm('north',items,false,'left');
	store = getGridJsonStore('../xtMessageController/getXtMessageSelfListByCondition',[]);
	grid = Ext.create('Ext.grid.Panel',{
		region:'center',
		xtype:'panel',
		store:store,
		title:'查询结果',
		columnLines:true,
		selType:'cellmodel',
		multiSelect:true,
		border:true,
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
				dataIndex:'xt_message_id'
			},
			{
				header:'发送者',
				flex:1,
				dataIndex:'fromName'
			},
			{
				header:'接收者',
				flex:1,
				dataIndex:'toName'
			},
			{
				header:'送发内容',
				flex:1,
				dataIndex:'xt_meesage_content'
			},
			{
				header:'是否已读',
				flex:1,
				dataIndex:'isread',
				renderer:function(value){
					if(value==0)return '<font color="red">' + initComBoData(xt_message_combo,value,'value','text') + '</font>';
					return initComBoData(xt_message_combo,value,'value','text');
				}
			},
			{
				header:'发送时间',
				flex:1,
				dataIndex:'ctime'
			},
			{
				header:'取读时间',
				flex:1,
				dataIndex:'readtime'
			}
		],
		tbar:[
			 {
				text:'标记为已读',
				tooltip:'标记为已读',
				minWidth:tbarBtnMinWidth,
				cls:'updateBtn',
				icon:editIcon,
				handler:function(){
					updateRead();
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
					text:'明 细',
					tooltip:'明 细',
					glyph:0xf03b,
					handler:function(){
						detailXtMessage();
					}
				 },
				 '-',
				 {
					text:'导 出',
					tooltip:'导 出',
					glyph:0xf1c3,
					handler:function(){
						exportXtMessage(grid,'../xtMessageController/exportXtMessage');
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
				detailXtMessage();
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
/**导出**/
function exportXtMessage(grid,url){
	exportExcel(grid,url);
}
/**初始化右键**/
function initRight(){
	var contextmenu = new Ext.menu.Menu({
		id:'theContextMenu',
		items:[{
			text:'标记为已读',
			glyph:0xf03b,
			id:'readXtMessageItem',
			handler:function(){
				updateRead();
			}
		 },{
			text:'明 细',
			glyph:0xf03b,
			id:'detailXtMessageItem',
			handler:function(){detailXtMessage();}
		},{
			text:'导 出',
			glyph:0xf1c3,
			handler:function(){
				exportXtMessage(grid,'../xtMessageController/exportXtMessage');
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
	initrightgridcontextmenu(grid,contextmenu,['copyXtMessageItem','detailXtMessageItem']);
}
/**查询操作**/
function search(){
	initSearch(store,'../xtMessageController/getXtMessageSelfListByCondition',searchForm); 
}
function updateRead(){
	var model = grid.getSelectionModel();
	if(model.selected.length == 0){
		msgTishi('请选择后在更改');
		return;
	}
	var id;
	for(var i = 0; i < model.selected.length; i++){
		if(null == id){
			id=model.selected.items[i].data.xt_message_id;
		}else{
			id=id+","+model.selected.items[i].data.xt_message_id;
		}
	}
	Ext.Msg.confirm('提示','确定要标记为已读么？',function(btn){
		if(btn == 'yes'){
			var params = {ids:id};
			ajaxRequest('../xtMessageController/updateReadByIds',grid,params,'正在执行操作中！请稍后...');
		}
	});
}