//表属性详情//
function getXtDbTableAttribute(rec){
	reGetWidthAndHeight();
	initXtDbTableAttributeForm();
	xtDbTableAttributeWin = new Ext.Window({
		layout:'fit',                    
		width:800,      
		height:400,
		modal:true,               
		closeAction:'close',                    
		plain:true,    
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},                
		title:'更多属性',
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		items:xtDbTableAttributeForm
	});
	xtDbTableAttributeWin.show();
	xtDbTableAttributeForm.getForm().loadRecord(rec);
}

function initXtDbTableAttributeForm(){
	xtDbTableAttributeForm = Ext.create('Ext.FormPanel',{
		labelWidth:210,
		region:'center',
		frame:true,
		autoScroll:true,
		waitMsgTarget:true,
		defaults:{ 
		   anchor:'100%',
		   labelAlign:'top'
		},
		defaultType:'textfield',
		items:[{
			    fieldLabel:'名称',
			    name:'name'
		   },{
		   		fieldLabel:'存储引擎',
		   		xtype:'textfield',
		   		name:'engine'
		   },{
		   		fieldLabel:'版本',
		   		xtype:'textfield',
		   		name:'version'
		   },{
		   		fieldLabel:'行存储格式(固定,动态,或压缩）',
		   		xtype:'textfield',
		   		name:'row_format'
		   },{
		   		fieldLabel:'行数量',
		   		xtype:'textfield',
		   		name:'rows'
		   },{
		   		fieldLabel:'平均行长度',
		   		xtype:'textfield',
		   		name:'avg_row_length'
		   },{
		   		fieldLabel:'数据文件长度',
		   		xtype:'textfield',
		   		name:'data_length'
		   },{
		   		fieldLabel:'数据文件最大长度',
		   		xtype:'textfield',
		   		name:'max_data_length'
		   },{
		   		fieldLabel:'索引大小',
		   		xtype:'textfield',
		   		name:'index_length'
		   },{
		   		fieldLabel:'已分配但未使用了字节数',
		   		xtype:'textfield',
		   		name:'data_free'
		   },{
		   		fieldLabel:'自动增长(+1)',
		   		xtype:'textfield',
		   		name:'auto_increment'
		   },{
		   		fieldLabel:'创建时间',
		   		xtype:'textfield',
		   		name:'create_time'
		   },{
		   		fieldLabel:'修改时间',
		   		xtype:'textfield',
		   		name:'update_time'
		   },{
		   		fieldLabel:'最后对表运行一个检查的时间',
		   		xtype:'textfield',
		   		name:'check_time'
		   },{
		   		fieldLabel:'列怎样在索引中被排序',
		   		xtype:'textfield',
		   		name:'collation'
		   },{
		   		fieldLabel:'主从复制事件校验',
		   		xtype:'textfield',
		   		name:'checksum'
		   },{
		   		fieldLabel:'与CREATE TABLE一起使用的额外选项',
		   		xtype:'textfield',
		   		name:'create_options'
		   },{
		   		fieldLabel:'备注',
		   		xtype:'textfield',
		   		name:'comment'
		   }]
	});
}
