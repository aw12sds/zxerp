var zxJudgeStandardWinAdd;
var zxJudgeStandardFormAdd;
function addZxJudgeStandard(){
	initZxJudgeStandardFormAdd();
	zxJudgeStandardWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:600,
		height:450,
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
		items:zxJudgeStandardFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxJudgeStandardFormAdd,'../zxJudgeStandardController/addZxJudgeStandard?type=2',grid,zxJudgeStandardWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxJudgeStandardWinAdd.show();
	
}
function initZxJudgeStandardFormAdd(){
	zxJudgeStandardFormAdd = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		/**新方法使用开始**/
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		/**新方法使用结束**/
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'考核项目',
			xtype:'combo',
			emptyText:'请选择',
			store:zx_judge_dic,
			mode:'local',
			triggerAction:'all',
			editable:false,
			hiddenName:'dic_id',
			valueField:'xt_data_dictionary_id',
			displayField:'xt_data_dictionary_name',
			name:'dic_id',
			maxLength:32,
			allowBlank:false,
			anchor:'60%'
		},
		{
			fieldLabel:'最高分',
			xtype:'numberfield',
			name:'total_score',
			maxLength:22,
			minValue:0,
			maxValue:100,
			allowBlank:false,
			anchor:'60%'
		},
		{
			fieldLabel:'评分部门',
			xtype:'treepicker',
			displayField:'text',
			anchor:'60%',
			hiddenName:'dep_id',
			name:'dep_id',
			minPickerHeight:200,
			maxHeight:200,
			editable:false,
			allowBlank:false,
			store:zx_dep,
			anchor:'60%'
		},
		{
			fieldLabel:'状态',
			xtype:'combo',
			emptyText:'请选择',
			store:zx_standard_state,
			mode:'local',
			triggerAction:'all',
			editable:false,
			hiddenName:'state',
			valueField:'value',
			displayField:'text',
			name:'state',
			maxLength:2,
			allowBlank:false,
			anchor:'60%'
		},
		{
			fieldLabel:'排序',
			xtype:'numberfield',
			name:'sort',
			maxLength:10,
        	minValue:0,
        	allowBlank:false,
			anchor:'60%'
		},
		{
			fieldLabel:'考核内容',
			xtype:'textareafield',
			name:'content',
			maxLength:256,
			allowBlank:false,
			anchor:'100%'
		},
		{
			fieldLabel:'备注',
			xtype:'textareafield',
			name:'remark',
			maxLength:256,
			anchor:'100%'
		}
		]
	});
}
