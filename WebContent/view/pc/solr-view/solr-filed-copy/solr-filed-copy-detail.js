var solrFiledCopyWinDetail;
var solrFiledCopyFormDetail;
function detailSolrFiledCopy(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initSolrFiledCopyFormDetail();
	solrFiledCopyWinDetail = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
		height:400,
		maximizable:true,
		minimizable:true,
		animateTarget:top.document.body,
		plain:true,
		modal:true,
		title:'明细信息',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:solrFiledCopyFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	solrFiledCopyWinDetail.show();
	
	loadFormData(solrFiledCopyFormDetail,'../solrFiledCopyController/getSolrFiledCopyById?solr_filed_copy_id='+ record.items[0].data.solr_filed_copy_id);
}
function initSolrFiledCopyFormDetail(){
	solrFiledCopyFormDetail = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:90,
			labelAlign:'right',
			flex:1,
			readOnly:true,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'主键编号',
			xtype:'textfield',
			hidden:true,
			name:'solr_filed_copy_id',
			allowBlank:false,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'索引字段源',
			xtype:'textfield',
			name:'solr_filed_copy_source_id',
			xtype:'combo',
			emptyText:'请选择',
			store:solrsourceIndexList,
			mode:'local',
			triggerAction:'all',
			editable:false,
			hiddenName:'solr_filed_copy_source_id',
			valueField:'solr_index_id',
			displayField:'solr_index_name',
			anchor:'100%'
		},
		{
			fieldLabel:'目标字段索引',
			xtype:'textfield',
			name:'solr_filed_copy_dest_id',
			xtype:'combo',
			emptyText:'请选择',
			store:solrdestIndexList,
			mode:'local',
			triggerAction:'all',
			editable:false,
			hiddenName:'solr_filed_copy_dest_id',
			valueField:'solr_index_id',
			displayField:'solr_index_name',
			anchor:'100%'
		},
		{
			fieldLabel:'备注',
			xtype:'textfield',
			name:'solr_filed_copy_remark',
			maxLength:200,
			anchor:'100%'
		},
		{
			fieldLabel:'创建时间',
			xtype:'datefield',
			format:'Y-m-d',
			name:'solr_filed_copy_ctime',
			maxLength:10,
			anchor:'40%'
		},
		{
			fieldLabel:'修改时间',
			xtype:'datefield',
			format:'Y-m-d',
			name:'solr_filed_copy_mtime',
			maxLength:10,
			anchor:'40%'
		},
		{
			fieldLabel:'创&nbsp;&nbsp;建&nbsp;&nbsp;人',
			xtype:'textfield',
			name:'xt_userinfo_realName',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'实例编号',
			xtype:'textfield',
			name:'solr_core_id',
			maxLength:32,
			hidden:true,
			anchor:'100%'
		}
		]
	});
}
