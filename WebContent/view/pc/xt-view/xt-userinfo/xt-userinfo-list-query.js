var store;
var grid;
var expander;
var xtUserinfoSexList;
var xtUserinfoNationList;
var xtUserinfoHighestDegreeList;
var xtUserinfoIsmarriedList;
var xtUserinfoWorkYearList;
Ext.onReady(function(){
	//读取性别下拉框数据
	xtUserinfoSexList = new Ext.data.Store({
		singleton:true, 
		proxy:new Ext.data.HttpProxy( { 
			url:'../xtUserinfoController/getXtUserinfoSexList',
			reader:new Ext.data.JsonReader({
				root:'items',
				type:'json'
			})
		}),
		fields:['xt_data_dictionary_id', 'xt_data_dictionary_name'],
		autoLoad:true 
	});
	//读取名族下拉框数据
	xtUserinfoNationList = new Ext.data.Store({
		singleton:true, 
		proxy:new Ext.data.HttpProxy( { 
			url:'../xtUserinfoController/getXtUserinfoNationList',
			reader:new Ext.data.JsonReader({
				root:'items',
				type:'json'
			})
		}),
		fields:['xt_data_dictionary_id', 'xt_data_dictionary_name'],
		autoLoad:true 
	});
	//读取文化程度下拉框数据
	xtUserinfoHighestDegreeList = new Ext.data.Store({
		singleton:true, 
		proxy:new Ext.data.HttpProxy( { 
			url:'../xtUserinfoController/getXtUserinfoHighestDegreeList',
			reader:new Ext.data.JsonReader({
				root:'items',
				type:'json'
			})
		}),
		fields:['xt_data_dictionary_id', 'xt_data_dictionary_name'],
		autoLoad:true 
	});
	//读取工作年限下拉框数据
	xtUserinfoWorkYearList = new Ext.data.Store({
		singleton:true, 
		proxy:new Ext.data.HttpProxy( { 
			url:'../xtUserinfoController/getXtUserinfoWorkYearList',
			reader:new Ext.data.JsonReader({
				root:'items',
				type:'json'
			})
		}),
		fields:['xt_data_dictionary_id', 'xt_data_dictionary_name'],
		autoLoad:true 
	});
	//读取是否已婚下拉框数据
	xtUserinfoIsmarriedList = new Ext.data.Store({
		singleton:true, 
		proxy:new Ext.data.HttpProxy( { 
			url:'../xtUserinfoController/getXtUserinfoIsmarriedList',
			reader:new Ext.data.JsonReader({
				root:'items',
				type:'json'
			})
		}),
		fields:['xt_data_dictionary_id', 'xt_data_dictionary_name'],
		autoLoad:true 
	});
	//读取用户状态下拉框数据
	xtUserinfoStateListList = new Ext.data.Store({
		singleton:true, 
		proxy:new Ext.data.HttpProxy( { 
			url:'../xtUserinfoController/getXtUserinfoStateList',
			reader:new Ext.data.JsonReader({
				root:'items',
				type:'json'
			})
		}),
		fields:['xt_data_dictionary_id', 'xt_data_dictionary_name'],
		autoLoad:true 
	});
	
	for(var i = 0; i < xtUserinfoSexList.getCount();i++){
		console.info(xtUserinfoSexList.getAt(i));
	}
	//console.info(xtUserinfoSexList.proxy.reader);
	//console.info(xtUserinfoSexList.data.items);
	/**查询区域可扩展**/
	var items = Ext.create('Ext.FormPanel',{
		xtype:'form',
		maxHeight:220,
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:40,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			layout:'table',
			xtype:'form',
			anchor:'100%',
			items:[
			{
				fieldLabel:'部门',
				xtype:'textfield',
				name:'xt_departinfo_name',
				width:220
			},
			{
				fieldLabel:'岗位',
				xtype:'textfield',
				name:'xt_post_name',
				width:220
			},
			{
				fieldLabel:'账户',
				xtype:'textfield',
				name:'xt_userinfo_name',
				width:220
			},
			{
				fieldLabel:'姓名',
				xtype:'textfield',
				name:'xt_userinfo_realName',
				width:220
			}
			]
		}
		]
	});
	initSearchForm('north',items,false,'left');
	store = getGridJsonStore('../xtUserinfoController/getXtUserinfoListByCondition',[{}]);
	expander = new Ext.ux.RowExpander({
	    rowBodyTpl:new Ext.XTemplate(
	    	'<table border="1" width="100%" style="border-collapse: collapse; border-color:#f5f5f5;">',
	             '<tr><td width="90"><b>照&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片</b></td><td><img src="../deng/images/img/552cd6d7b8ec1_32.png"/></td></tr>',
	             /**'<tr><td><b>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历</b></td><td>{xt_userinfo_highestDegree}</td></tr>',**/
	             '<tr><td><b>出生年月</td><td>{xt_userinfo_birthday}</b></td></tr>',
	             '<tr><td><b>政治面貌</td><td>{xt_userinfo_politicalStatus}</b></td></tr>',
	             '<tr><td><b>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</td><td>{xt_userinfo_mobile}</b></td></tr>',
	             '<tr><td><b>入职时间</td><td>{xt_userinfo_intime}</b></td></tr>',
	             '<tr><td><b>电子邮件</td><td>{xt_userinfo_email}</b></td></tr>',
	             '<tr><td><b>毕业学校</td><td>{xt_userinfo_schoolName}</b></td></tr>',
	             '<tr><td><b>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</td><td>{xt_userinfo_remark}</b></td></tr>',
            '</table>'
	    )
	});
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
		plugins:expander,
		columns:[
			{
				header:'序号',
				width:77,
				xtype:'rownumberer'
			},
			{
				header:'用户名',
				locked:true,
				dataIndex:'xt_userinfo_name'
			},
			{
				header:'真实姓名',
				locked:true,
				dataIndex:'xt_userinfo_realName'
			},
			{
				header:'性别',
				width:50,
				dataIndex:'xt_userinfo_sex',
				renderer:function(value){
					return initData(xtUserinfoSexList,value);
				}
			},
			{
				header:'是否已婚',
				width:80,
				dataIndex:'xt_userinfo_ismarried',
				renderer:function(value){
					return initData(xtUserinfoIsmarriedList,value);
				}
			},
			{
				header:'籍贯',
				dataIndex:'xt_userinfo_origo',
				renderer:function(value){
					if(value == ''){
						return '∨'
					}else{
						return value;
					}
				}
			},
			{
				header:'入职时间',
				dataIndex:'xt_userinfo_intime',
				renderer:function(value){
					if(value == ''){
						return '∨'
					}else{
						return value;
					}
				}
			},
			{
				header:'到期时间',
				dataIndex:'xt_userinfo_contractTime',
				renderer:function(value){
					if(value == ''){
						return '∨'
					}else{
						return value;
					}
				}
			},
			{
				header:'岗位',
				dataIndex:'xt_post_name'
			},
			{
				header:'部门',
				flex:1,
				dataIndex:'xt_departinfo_name'
			},
			{
				header:'状态',
				dataIndex:'xt_userinfo_isDelete',
				renderer:function(value){
					if(value == 0){
						return '在职'
					}else{
						return '离职'
					}
				}
			}
		],
		tbar:[
			 {
				text:'检 索',
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

//展开符合某个条件的行 
function expendRowFrist(){ 
	var i;//循环临时变量 
	var arr = [];//要展开的行的数组 
	//store是gridpanel的数据源 
	for(i=0;i<store.data.length;i++){ 
		var record = store.getAt(i);//循环遍历每一行 
		//符合我的条件则写入数组中 
		/**
		if(record.data.xt_userinfo_name=='10002'){
			arr.push(i); 
		} 
		**/
		/**暂时注释掉初始化展开状态 知道该方法即可 邓纯杰
		expander.toggleRow(i,record);
		break;
		**/
	} 
} 
function expendRow(){ 
	var i;//循环临时变量 
	var arr = [];//要展开的行的数组 
	//store是gridpanel的数据源 
	for(i=0;i<store.data.length;i++){ 
		var record = store.getAt(i);//循环遍历每一行 
		if(record.data.xt_userinfo_name=='10002'){
			//符合我的条件则写入数组中 
			arr.push(i); 
		} 
		expander.toggleRow(i,record)
	} 
} 

//选择部门及岗位树
var staticDepartinfoAndPostWin;
var staticDepartinfoAndPostTreeGrid;
var staticDepartinfoAndPostStore;
function selectStaticDepartinfoAndPost(){
	initStaticDepartinfoAndPostTreeGrid();
	staticDepartinfoAndPostWin = Ext.create('top.Ext.Window',{
		layout:'fit',
		width:clientWidth*0.6,                    
		height:clientHeight*0.8, 
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'选择部门与岗位信息----请双击性质为岗位才可设置',
		items:staticDepartinfoAndPostTreeGrid
	});
	staticDepartinfoAndPostWin.show();
}
function initStaticDepartinfoAndPostTreeGrid(){
	staticDepartinfoAndPostStore = Ext.create('Ext.data.TreeStore',{
    	root:{
			name:'一级',
			id:'0',
			expanded:true
		},
		/**此处一定要设置否则全部展开节点无效**/
		autoLoad:true,
        proxy:{
            type:'ajax',
            method:'post',
			url:'../xtOrgController/getStaticDepartinfoAndPostTreeGrid',
			reader:{
				type:'json'
			},
			extraParams:{id:'0',type:encodeURI('部门')}
        },
        lazyFill:true
    });
    staticDepartinfoAndPostTreeGrid = Ext.create('top.Ext.tree.Panel', {
        reserveScrollbar:true,
        collapsible:false,
        loadMask:true,
        useArrows:false,
        rootVisible:false,
        store:staticDepartinfoAndPostStore,
        animate:false,
        columnLines:true,
        frame:true,
        listeners:{ 
            itemclick:function(node,optd){
            	var leaf = optd.data.leaf;
            	if(leaf == true){
            		
            	}
            }
        },
        viewConfig:{
			emptyText:'暂无数据',
			stripeRows:true
		},
		listeners:{
			'rowdblclick':function(grid, rowIndex, e){
				var id = staticDepartinfoAndPostTreeGrid.getSelectionModel().selected.items[0].data.id;
				var text = staticDepartinfoAndPostTreeGrid.getSelectionModel().selected.items[0].data.text;
				var tempObject = staticDepartinfoAndPostTreeGrid.getSelectionModel().selected.items[0].data.tempObject;
				var integerappend = staticDepartinfoAndPostTreeGrid.getSelectionModel().selected.items[0].data.integerappend;
				if(tempObject == '岗位'){
					var xt_departinfo_name = integerappend.substring(33,integerappend.length);
					var xt_departinfo_id = integerappend.substring(0,32);
					var dpStr = "[<font color=red><br>部门:"+xt_departinfo_name+"<br>"+"岗位:"+text+"<br></font>]";
					top.Ext.Msg.confirm('提示','确定要选择:<br>'+dpStr+'？',function(btn){
						if(btn == 'yes'){
							top.Ext.getCmp('xt_departinfo_name').setValue(xt_departinfo_name);
							top.Ext.getCmp('xt_departinfo_id').setValue(xt_departinfo_id);
							top.Ext.getCmp('xt_post_name').setValue(text);
							top.Ext.getCmp('xt_post_id').setValue(id);
							staticDepartinfoAndPostWin.close();
						}
					});
				}
			}
		},
        columns:[{
            text:'ID',
            flex:2,
            hideable:false,
            hidden:true,
            sortable:true,
            dataIndex:'id'
        },{
            xtype:'treecolumn',
            text:'名称',
            flex:1,
            sortable:true,
            dataIndex:'text'
        },{
            text:'性质',
            dataIndex:'tempObject',
            sortable:true,
            renderer:function(value){
				if(value == '部门'){
					return '部门'
				}else{
					return '<font color=red>岗位</font>'
				}
			}
        },{
            text:'备注',
            flex:1,
            dataIndex:'content',
            renderer:function(value){
            	return value;
            }
        }]
    });
}
function search(){
	initSearch(store,'../xtUserinfoController/getXtUserinfoListByCondition',searchForm); 
}
