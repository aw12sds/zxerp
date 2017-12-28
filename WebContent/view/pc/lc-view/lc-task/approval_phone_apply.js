var taskForm;
var approvalFieldSet;
var taskFieldSet;
Ext.onReady(function(){
	initTaskForm();
	Ext.create('Ext.container.Viewport',{
		layout:'border',
		xtype:'viewport',
		items:taskForm
	});
	Ext.getCmp('task_id').setValue($("#taskId").val());
	Ext.getCmp('task_name').setValue($("#taskName").val());
	Ext.getCmp('task_type').setValue($("#taskType").val());
	loadFormDataCallBack(taskForm,'../zxApplyPhoneCardController/getZxApplyPhoneCardById?id='+ $("#phoneCardApplyId").val(),callFnUpdate);
});
function initTaskForm(){
	taskFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'任务信息',
		items:[
       {
			layout:"column",
			items:[
			{
				fieldLabel:'任务ID',
				xtype:'textfield',
				name:'task_id',
				id:'task_id',
				hidden:true
			},
			{
				fieldLabel:'任务名称',
				xtype:'textfield',
				name:'task_name',
				id:'task_name',
				maxLength:100,
				readOnly:true,
				width:485
			},
			{
				fieldLabel:'任务类型',
				xtype:'textfield',
				name:'task_type',
				id:'task_type',
				readOnly:true,
				width:485
			}
			]
		},
		{
			layout:"column",
			items:[
				{
					fieldLabel:'申请人',
					xtype:'textfield',
					id:'apply_user_name',
					readOnly:true,
					width:485
				},
				{
					fieldLabel:'部门',
					xtype:'textfield',
					id:'zxcardepart',
					readOnly:true,
					width:485
				}
			]
		},
		{
			layout:"column",
			items:[
				{
					fieldLabel:'申请时间',
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					name:'apply_time',
					readOnly:true,
					width:485
				}
			]
		},
		{
			layout:"column",
			items:[
				{
					fieldLabel:'申请描述',
					xtype:'textareafield',
					name:'description',
					readOnly:true,
					width:980
				}
			]
		}
	]
	});
	
	approvalFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'审批信息',
		items:[{
			fieldLabel:'批注',
			xtype:'textareafield',
			name:'remark',
			id:'remark',
			maxLength:65536,
			width:980
		},{
			fieldLabel:'审批结果',
			xtype:'textfield',
			name:'task_status',
			id:'task_status',
			hidden:true
		},{
			layout:"column",
			items:[
				{
					xtype:'button',
					text:'驳回',
					style:'float:right;margin:10px 30px 10px 0px',
					labelAlign:"right", 
					listeners:{
						click:function(){
							approvalSubmit("no");
						}
					}
				},{
					xtype:'button',
					text:'同意',
					style:'float:right;margin:10px',
					labelAlign:"right", 
					listeners:{
						click:function(){
							approvalSubmit("yes");
						}
					}
				}
			]
		}]
	});
	taskForm = Ext.create('Ext.FormPanel',{
		xtype:'form',
		width:1050,
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		/**新方法使用开始**/
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		/**新方法使用结束**/
		fieldDefaults:{
			labelWidth:100,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		    taskFieldSet,
		    approvalFieldSet
		]
	});
}

function callFnUpdate(form, action){
	var phoneApply = action.result.data.phoneApply;
	if(null != phoneApply){
		Ext.getCmp('apply_user_name').setValue(phoneApply.xt_userinfo_realName);
		Ext.getCmp('zxcardepart').setValue(phoneApply.xt_departinfo_name);
	}
}
function callFnSubmit(form, action){
	var approvalFormWin = parent.Ext.getCmp('approvalFormWin');  
	approvalFormWin.close();
	var grid = parent.Ext.getCmp('grid');  
	grids.getStore().reload();
}

function approvalSubmit(status){
	if(taskForm.form.isValid()){   
		top.Ext.Msg.confirm('提示','确定要提交当前表单信息内容？',function(btn){
			var params = {task_id:Ext.getCmp('task_id').getValue(),task_status:status,remark:Ext.getCmp('remark').getValue()};
			ajaxRequestCallFn('../zxApplyPhoneCardController/approvalPhoneCard',null,params,"审批中，请稍等....",callFnSubmit);
		});
	}else { 
		msgTishi('请输入必填项');
	}
}
