var solrEntityWinAdd;
var solrEntityFormAdd;
function addSolrEntity(id,text){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要一项实例记录！');
		return;
	}
	initSolrEntityFormAdd(record.items[0].data.solr_document_id,id,text);
	reGetWidthAndHeight();
	solrEntityWinAdd = Ext.create('Ext.window.Window',{
		width:clientWidth,                    
		height:clientHeight, 
		maximized:true,
		maximizable:true,
		autoScroll:true,
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'创建实体',
		headerPosition:'top',
		items:solrEntityFormAdd,
		buttons:[{
			text:'保存',
			handler:function(button){
				if(getSolrIndexSqlJSON() == false){
					return;
				}
				if(getSolrIndexSqlFiledJSON() == false){
					return;
				}
				var params = {solrIndexSqlJSON:encodeURI(getSolrIndexSqlJSON()),solrIndexSqlFiledJSON:encodeURI(getSolrIndexSqlFiledJSON())}
				submitFormIncludeParams(solrEntityFormAdd,'../solrEntityController/addSolrEntity',grid,solrEntityWinAdd,false,true,params);
			}
		},{
			text:'关闭',
			handler:function(button){
				solrEntityWinAdd.close();
			}
		}]
	});
	solrEntityWinAdd.show();
}
function initSolrEntityFormAdd(solr_document_id,id,text){
	initSolrIndexSqlGrid(0);
	initSolrIndexSqlFiledGrid(0);
	solrEntityFormAdd = Ext.create('Ext.FormPanel',{
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:false,
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		title:'实体配置',
        scrollable:true,  
        scrollable:'x',
        scrollable:'y',
		items:[{
			fieldLabel:'文档编号',
			xtype:'textfield',
			name:'solr_document_id',
			id:'solr_document_id',
			allowBlank:false,
			maxLength:200,
			hidden:true,
			width:400
		},
		{
			fieldLabel:'转&nbsp;换&nbsp;&nbsp;器',
			xtype:'textfield',
			name:'solr_entity_transformer',
			id:'solr_entity_transformer',
			maxLength:200,
			hidden:true,
			width:400
		},
		{
			fieldLabel:'实体父编号',
			xtype:'textfield',
			name:'solr_entity_pid',
			id:'solr_entity_pid',
			allowBlank:false,
			maxLength:200,
			hidden:true,
			value:'0',
			width:400
		},
		{
			fieldLabel:'上级实体',
			xtype:'textfield',
			name:'text',
			id:'text',
			readOnly:true,
			allowBlank:false,
			maxLength:200,
			width:400
		},
		{
			fieldLabel:'实体名称',
			xtype:'textfield',
			name:'solr_entity_name',
			allowBlank:false,
			maxLength:200,
			width:400
		},
		{
			layout:"column",
			baseCls:'x-plain',
			xtype:'panel',
			items:[
			{
				 fieldLabel:'转&nbsp;换&nbsp;&nbsp;器',
				 xtype:'textareafield',
				 name:'solr_entity_transformer_text',
				 id:'solr_entity_transformer_text',
				 readOnly:true,
				 maxLength:200,
				 width:400
		    },
		    {
			   	 xtype:'button',
	             cls:'addBtn',
				 icon:addIcon,
	             tooltip:'选择格式转换器',
	             margin:'3 0 0 0',
				 handler:function(button){
					initSolrTransformer();
			 	 }
		    },
		 	{
			   	 xtype:'button',
	             tooltip:'清空选择',
	             cls:'delBtn',
				 icon:delIcon,
				 margin:'3 0 0 5',
				 handler:function(button){
					Ext.getCmp('solr_entity_transformer').setValue("");
					Ext.getCmp('solr_entity_transformer_text').setValue("");
				 }
		 	 }]
		},
		{
			fieldLabel:'备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注',
			xtype:'textareafield',
			id:'solr_entity_text',
			name:'solr_entity_text',
			maxLength:32,
			width:800
		}
		]
	});
	solrEntityFormAdd.add(solr_index_sql_grid);
	solrEntityFormAdd.add(solr_index_sql_filed_grid);
	Ext.getCmp('solr_document_id').setValue(solr_document_id);
	Ext.getCmp('text').setValue(text);
	Ext.getCmp('solr_entity_pid').setValue(id);
}