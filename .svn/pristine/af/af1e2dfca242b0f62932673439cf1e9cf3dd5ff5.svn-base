var store;
var grid;
Ext.onReady(function(){
	/**查询区域可扩展**/
	var items = Ext.create('Ext.FormPanel',{
		xtype:'form',
		maxHeight:150,
		waitMsgTarget:true,
		autoScroll:true,
		defaultType:'textfield',
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'岗位名称',
			xtype:'textfield',
			labelWidth:70,
			id:'xt_post_name',
			name:'xt_post_name',
			anchor:'30%',
			labelAlign:'left'
		}
		]
	});
	initSearchForm('north',items,false,'left');
	store = getGridJsonStore('../xtPostController/getXtPostListByCondition',[]);
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
				header:'部门',
				flex:1,
				dataIndex:'xt_departinfo_name'
			},
			{
				header:'上级岗位',
				flex:1,
				dataIndex:'xt_post_parentId',
				renderer:function(value){
					if(value == 0){
						return "√";
					}
				}
			},
			{
				header:'岗位名称',
				flex:1,
				dataIndex:'xt_post_name'
			},
			{
				header:'岗位描述',
				flex:1,
				dataIndex:'xt_post_desc'
			},
			{
				header:'岗位最大人数',
				flex:1,
				dataIndex:'xt_post_maxNum'
			},
			{
				header:'岗位级别',
				flex:1,
				dataIndex:'xt_post_grade'
			}
		],
		tbar:[
			 {
				text:'检索',
				tooltip:'检索',
				minWidth:tbarBtnMinWidth,
				cls:'searchBtn',
				icon:searchIcon,
				handler:function(){
					search();
				}
			 }
		],
		bbar:getGridBBar(store)
	});
	Ext.create('Ext.Viewport', {
		layout:'border',
		xtype:'viewport',
		items:[searchForm,grid]
	});
	store.on('beforeload',function(thiz, options){Ext.apply(thiz.proxy.extraParams,getParmas(store,searchForm));});
});

/**查询操作**/
function search(){
	initSearch(store,'../xtPostController/getXtPostListByCondition',searchForm); 
}
