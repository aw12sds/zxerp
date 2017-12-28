Ext.onReady(function(){
	reGetWidthAndHeight();
	var xt_dbinfo_id_combo = new Ext.data.Store({
		singleton:true, 
		proxy:new Ext.data.HttpProxy({ 
			url:'../xtDbinfoController/getXtDbinfoListByCondition',
			reader:new Ext.data.JsonReader({
				root:'items',
				type:'json'
			})
		}),
		fields:['xt_dbinfo_id', 'xt_dbinfoName'],
		autoLoad:true 
	});
	var xtDbinfoPanel = Ext.create('Ext.FormPanel',{
		xtype:'form',
		headerPosition:'top',
		/**新方法使用结束**/
		bodyStyle:'background-color:#E6E6E6;',  
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5',
		    style:'background:#E6E6E6'
		},
		style:'padding:15px 5px 5px 15px',
		defaultType:'textfield',
		/**
		region:'center',
		layout:{
		    type:'hbox',
		    align:'middle ',
		    pack:'center'
		},
		**/
		title:'<font color="#ffffff">选择指定数据源</font>',
		/**自定义样式**/
		header:{
			cls:'x-panel-header-defined'
		},
		titleAlign:'left',
		width:500,
		closable:false,
		buttonAlign:'right',
		buttons:[{
			text:'确认',
			handler:function(){
				var xt_dbinfo_id = gValue('xt_dbinfo_id');
				if(null == xt_dbinfo_id || '' == xt_dbinfo_id){
					msgTishi("请选择数据库");
					return;
				}
				Ext.Msg.confirm('提示','确定要操作该数据？',function(btn){
					if(btn == 'yes'){
						window.location.href="../xtFlexSearchController/loadXtFlexSearch?xt_dbinfo_id="+xt_dbinfo_id;
					}
				});
			}
		}],
		items:[{
				allowBlank:false,
				msgTarget:'side',/**qtip、title、under、side、none**/
				emptyText:'请选择数据库',
				fieldLabel:'数&nbsp;据&nbsp;库',
				xtype:'combo',
				store:xt_dbinfo_id_combo,
				mode:'local',
				triggerAction:'all',
				editable:false,
				hiddenName:'xt_dbinfo_id',
				valueField:'xt_dbinfo_id',
				displayField:'xt_dbinfoName',
				id:'xt_dbinfo_id',
				name:'xt_dbinfo_id',
				anchor:'100%',
				pageSize:30,
				listeners:{
	                select:function(combo,records,options){
	                	sValue('ip',records.data.xt_dbinfoIp);
	                	sValue('port',records.data.xt_dbinfoPort);
	                	sValue('xt_dbinfoUName',records.data.xt_dbinfoUName);
	                	sValue('xt_dbinfoPwd',"xxx xxx");
	                	sValue('dbType',records.data.xt_dbinfoType);
	                }
	            }
			},
			{
				fieldLabel:'端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;口',
				id:'port',
				readOnly:true,
				anchor:'40%'
			},
			{
				fieldLabel:'类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型',
				id:'dbType',
				readOnly:true,
				anchor:'40%'
			},
			{
				fieldLabel:'地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址',
				id:'ip',
				readOnly:true,
				anchor:'60%'
			},
			{
				fieldLabel:'用&nbsp;户&nbsp;名',
				id:'xt_dbinfoUName',
				readOnly:true,
				anchor:'60%'
			},
			{
				fieldLabel:'密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码',
				id:'xt_dbinfoPwd',
				readOnly:true,
				anchor:'60%'
			}]
	})
	
	Ext.create('Ext.Viewport',{
		layout:'table',
		xtype:'viewport',
		items:xtDbinfoPanel
	});
});
