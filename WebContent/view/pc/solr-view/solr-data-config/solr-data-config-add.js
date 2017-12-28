var solrDataConfigWinAdd;
var solrDataConfigFormAdd;
function addSolrDataConfig(){
	initSolrDataConfigFormAdd();
	solrDataConfigWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
		height:400,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'添加信息',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:solrDataConfigFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(solrDataConfigFormAdd,'../solrDataConfigController/addSolrDataConfig',grid,solrDataConfigWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	solrDataConfigWinAdd.show();
	
}
function initSolrDataConfigFormAdd(){
	solrDataConfigFormAdd = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:110,
			labelAlign:'right',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'标题',
			xtype:'textfield',
			name:'solr_data_config_title',
			maxLength:200,
			anchor:'100%'
		},
		{
			fieldLabel:'数据源连接配置',
			xtype:'textfield',
			name:'solr_data_config_datasource',
			maxLength:800,
			anchor:'100%'
		},
		{
			fieldLabel:'状态',
			xtype:'combo',
			emptyText:'请选择',
			store:SOLR_DataConfig_COMBO_STORE,
			mode:'local',
			triggerAction:'all',
			editable:false,
			hiddenName:'solr_data_config_status',
			valueField:'value',
			displayField:'text',
			name:'solr_data_config_status',
			maxLength:20,
			anchor:'100%'
		},
		{
			fieldLabel:'配置内容',
			xtype:'textareafield',
			name:'solr_data_config_content',
			maxLength:65535,
			anchor:'100%'
		}
		]
	});
}
