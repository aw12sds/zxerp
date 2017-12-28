Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tip.*',
    'Ext.tree.*'
]);
var grid;
var store;
Ext.onReady(function() {
    store = Ext.create('Ext.data.TreeStore',{
    	root:{
			name:'准信集团',
			id:'0',
			expanded:true
		},
		/**此处一定要设置否则全部展开节点无效**/
		autoLoad:true,
        proxy:{
            type:'ajax',
            method:'post',
			url:'../xtOrgController/getXtOrgTree',
			reader:{
				type:'json'
			},
			extraParams:{id:'0',type:encodeURI('部门')}
        },
        lazyFill:true
    });
    grid = Ext.create('Ext.tree.Panel', {
        renderTo:Ext.getBody(),
        reserveScrollbar:true,
        loadMask:true,
        useArrows:true,
        rootVisible:false,
        store:store,
        id:'treeGrid',
        animate:true,
        columnLines:true,
        frame:true,
        listeners:{  
            beforeitemexpand:function(node,optd){
                var id=node.data.id; 
                var type=node.data.type; 
                store.setProxy({   
		       	   //异步从服务器上加载数据extjs会自动帮我们解析  
		           type:'ajax',  
		           url:'../xtOrgController/getXtOrgTree',  
		           extraParams:{id:id,type:encodeURI(type)}
		        });  
            },
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
		bbar:[
			 '->',
			 {
			   width:260,
			   xtype:'triggerfield',
			   emptyText:'请输入关键字（如研发部、技术总监等）',
		       triggerCls:'x-form-clear-trigger',
		       onTriggerClick:function(){
		           this.reset();
		       },
		       listeners:{
		           change:function(){
		           	filterBy(grid,this.getValue(),'name');
		           },
		           buffer:250
		       }
			 }
		],
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
            dataIndex:'name'
        },{
            text:'性质',
            dataIndex:'type',
            sortable:true,
            renderer:function(value){
            	if(value == '部门'){
            		return value;
            	}else{
            		return "<font color='red'>"+value+"</font>";
            	}
            }
        },/**{
            text:'上级名称',
            flex:1,
            dataIndex:'upname'
        },**/{
            text:'备注',
            flex:1,
            dataIndex:'remark',
            renderer:function(value){
            	return value;
            }
        }]
    });
    grid.on('beforeload',function(treeloader,node) { 
   		/**
   		如果node为一个参数情况下取属性值如下:
   		var id = node.data.items[0].data.id;
           var type = node.data.items[0].data.type;
   		**/
   		/**
   		如果node为第二个参数情况下取属性值如下:
   		var id = node.node.data.id;
           var type = node.node.data.type;
   		**/
        var id = node.node.data.id;
        var type = node.node.data.type;
        store.setProxy({   
       	   //异步从服务器上加载数据extjs会自动帮我们解析  
           type:'ajax',  
           url:'../xtOrgController/getXtOrgTree',  
           extraParams:{id:id,type:encodeURI(type)}
        });
    });
    //grid.expandAll();
    Ext.create('Ext.Viewport',{
		layout:'fit',
		xtype:'viewport',
		items:grid
	});
	showWaitMsg("正在展开数据...");
	new Ext.util.DelayedTask(function(){  
       grid.expandAll();
       hideWaitMsg();
    }).delay(1000);
});