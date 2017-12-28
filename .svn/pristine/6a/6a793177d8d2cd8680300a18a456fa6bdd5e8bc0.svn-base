var zxCarApplyWinEdit;
var zxCarApplyFormEdit;
var zxCarOutFieldSet;
var zxCarBackFieldSet;
function updateZxCarApply(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要修改的一项！');
		return;
	}
	if(record.items[0].data.status != '1'){
		msgTishi('只有待申请状态数据可修改！');
		return;
	}
	initZxCarApplyFormEdit("1");
	zxCarApplyWinEdit = Ext.create('Ext.Window',{
		layout:'fit',
		width:1050,
		height:600,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'编辑信息',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:zxCarApplyFormEdit,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxCarApplyFormEdit,'../zxCarApplyController/updateZxCarApply?systemUID='+record.items[0].data.apply_user_id,grid,zxCarApplyWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxCarApplyWinEdit.show();
	loadFormDataCallBack(zxCarApplyFormEdit,'../zxCarApplyController/getZxCarApplyById?id='+ record.items[0].data.id,callFnUpdate);
}
function carOut(id,status,apply_user_id){
	if(status != '3'){
		msgTishi('未审核通过不可出车！');
		return;
	}
	initZxCarApplyFormEdit(status);
	zxCarApplyWinEdit = Ext.create('Ext.Window',{
		layout:'fit',
		width:1050,
		height:600,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'出车信息',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:zxCarApplyFormEdit,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxCarApplyFormEdit,'../zxCarApplyController/carOut?systemUID=' + apply_user_id,grid,zxCarApplyWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxCarApplyWinEdit.show();
	loadFormDataCallBack(zxCarApplyFormEdit,'../zxCarApplyController/getZxCarApplyById?id=' + id,callFnUpdate);
}

function carBack(id,status,apply_user_id){
	if(status != '5'){
		msgTishi('未审核通过不可出车！');
		return;
	}
	initZxCarApplyFormEdit(status);
	zxCarApplyWinEdit = Ext.create('Ext.Window',{
		layout:'fit',
		width:1050,
		height:600,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'回司信息',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:zxCarApplyFormEdit,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxCarApplyFormEdit,'../zxCarApplyController/carBack?systemUID='+apply_user_id,grid,zxCarApplyWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxCarApplyWinEdit.show();
	loadFormDataCallBack(zxCarApplyFormEdit,'../zxCarApplyController/getZxCarApplyById?id='+ id,callFnUpdate);
}

function initZxCarApplyFormEdit(status){
	zxCarApplyFormEditFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'申请人信息',
		items:[
        {
			layout:"column",
			items:[
				{
					fieldLabel:'申请用车标识',
					xtype:'textfield',
					name:'id',
					hidden:true,
					id:'id',
					maxLength:255,
					width:320
				},
				{
					fieldLabel:'申请人',
					xtype:'textfield',
					name:'apply_user_id',
					hidden:true,
					id:'apply_user_id',
					maxLength:255,
					width:320
				},
				{
					fieldLabel:'申请人',
					xtype:'textfield',
					id:'apply_user_name',
					readOnly:true,
					maxLength:255,
					width:320
				},
				{
					fieldLabel:'部门',
					xtype:'textfield',
					name:'zxcardepart',
					id:'zxcardepart',
					maxLength:255,
					readOnly:true,
					width:320
				},
				{
					fieldLabel:'申请类型',
					xtype:"combo",
					queryMode:'local', 
					store:zx_car_apply_type,
					triggerAction:"all",
		            editable:false,
					allowBlank:false,
		            emptyText:'请选择',
		            valueField:"xt_data_dictionary_value",
		            displayField:"xt_data_dictionary_name",
					name:'apply_type',
					maxLength:32,
					width:320
				}
			]
		}
	]
	});
	zxCarBaseInfoFormEditFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'基础信息',
		items:[
        {
			layout:"column",
			items:[
				{
					fieldLabel:'用车时间始',
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					name:'apply_time_begin',
					allowBlank:false,
					maxLength:255,
					width:320,
					anchor:'100%'
				},
				{
					fieldLabel:'用车时间末',
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					name:'apply_time_end',
					allowBlank:false,
					maxLength:255,
					width:320,
					anchor:'100%'
				},
				{
					fieldLabel:'用车事由',
					xtype:'textfield',
					name:'user_car_reason',
					allowBlank:false,
					maxLength:255,
					width:320,
					anchor:'100%'
				}
			]
		},{
			layout:"column",
			items:[
				{
					fieldLabel:'目的地',
					xtype:'textfield',
					name:'apply_car_address',
					allowBlank:false,
					maxLength:255,
					width:320
				},
				{
					fieldLabel:'外出人员',
					xtype:'textfield',
					name:'user_car_person',
					allowBlank:false,
					maxLength:255,
					width:650,
					anchor:'100%'
				}
			]
		},{
			fieldLabel:'携带物品',
			xtype:'textareafield',
			name:'comment',
			maxLength:255,
			width:980
		}
	]
	});
	
	zxCarOutFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'出车信息',
		items:[
        {
			layout:"column",
			items:[
				{
					fieldLabel:'出车时间',
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					name:'usecar_outtime',
					allowBlank:false,
					maxLength:255,
					width:320
				},
				{
					fieldLabel:'出车里程',
					xtype:'textfield',
					name:'out_mileage',
					allowBlank:false,
					maxLength:255,
					width:320
				}
			]
		}
	]
	});
	zxCarBackFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'出车信息',
		items:[
        {
			layout:"column",
			items:[
				{
					fieldLabel:'回司时间',
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					name:'usercar_backtime',
					allowBlank:false,
					maxLength:255,
					width:320
				},
				{
					fieldLabel:'回司里程',
					xtype:'textfield',
					name:'back_mileage',
					allowBlank:false,
					maxLength:255,
					width:320
				}
			]
		}
	]
	});
	if(status == "3"){
		zxCarApplyFormEdit = Ext.create('Ext.FormPanel',{
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
		       zxCarApplyFormEditFieldSet,
		       zxCarBaseInfoFormEditFieldSet,
		       zxCarOutFieldSet
			]
		});
	}else if(status == "5"){
		zxCarApplyFormEdit = Ext.create('Ext.FormPanel',{
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
		       zxCarApplyFormEditFieldSet,
		       zxCarBaseInfoFormEditFieldSet,
		       zxCarOutFieldSet,
		       zxCarBackFieldSet
			]
		});
	}else{
		zxCarApplyFormEdit = Ext.create('Ext.FormPanel',{
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
		       zxCarApplyFormEditFieldSet,
		       zxCarBaseInfoFormEditFieldSet
			]
		});
	}
}

function callFnUpdate(form, action){
	var applyUser = action.result.data.applyUser;
	if(null != applyUser){
		Ext.getCmp('apply_user_name').setValue(applyUser.xt_userinfo_realName);
		Ext.getCmp('zxcardepart').setValue(applyUser.xt_departinfo_name);
	}
}