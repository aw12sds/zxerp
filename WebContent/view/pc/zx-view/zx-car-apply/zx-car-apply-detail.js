var zxCarApplyWinDetail;
var zxCarApplyFormDetail;
var zxCarApplyFormDetailFieldSet;
var zxCarInfoFormDetailFieldSet;
var zxCarBaseInfoFormDetailFieldSet;

function detailZxCarApply(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看的一项！');
		return;
	}
	initzxCarApplyFormDetail();
	zxCarApplyWinDetail = Ext.create('Ext.Window',{
		layout:'fit',
		width:1050,
		height:600,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
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
		items:zxCarApplyFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxCarApplyWinDetail.show();
	loadFormDataCallBack(zxCarApplyFormDetail,'../zxCarApplyController/getZxCarApplyById?id='+ record.items[0].data.id,callFnUpdate);
}
function initzxCarApplyFormDetail(){
	zxCarApplyFormDetailFieldSet = Ext.create('Ext.form.FieldSet',{
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
					readOnly:true,
					maxLength:255,
					width:320
				},
				{
					fieldLabel:'申请类型',
					xtype:"combo",
					queryMode:'local', 
					store:zx_car_apply_type,
					triggerAction:"all",
		            editable:false,
					readOnly:true,
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
	
	zxCarInfoFormDetailFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'车辆信息',
		items:[
        {
			layout:"column",
			items:[
				{
					fieldLabel:'车牌号',
					xtype:'textfield',
					name:'car_id',
					hidden:true,
					id:'car_id',
					maxLength:255,
					width:320
				},
				{
					fieldLabel:'车牌号',
					xtype:'textfield',
					id:'car_num',
					maxLength:255,
					width:320,
					readOnly:true
				},
				{
					fieldLabel:'可乘坐人数',
					xtype:'textfield',
					id:'people_num',
					maxLength:255,
					width:650,
					readOnly:true
				}
			]
		},
		{
			layout:"column",
			items:[
				{
					fieldLabel:'司机',
					xtype:'textfield',
					name:'driver_id',
					hidden:true,
					id:'driver_id',
					maxLength:255,
					width:320
				},
				{
					fieldLabel:'司机',
					xtype:'textfield',
					id:'driver_name',
					maxLength:255,
					width:320,
					readOnly:true
				},
				{
					fieldLabel:'司机驾龄',
					xtype:'textfield',
					name:'driver_age',
					maxLength:255,
					width:650,
					readOnly:true
				}
			]
		}
	]
	});
	
	zxCarBaseInfoFormDetailFieldSet = Ext.create('Ext.form.FieldSet',{
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
					maxLength:255,
					width:320,
					readOnly:true
				},
				{
					fieldLabel:'用车时间末',
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					name:'apply_time_end',
					maxLength:255,
					width:320,
					readOnly:true
				},
		        {
					fieldLabel:'用车事由',
					xtype:'textfield',
					name:'user_car_reason',
					maxLength:500,
					width:320,
					readOnly:true
				}
			]
		},{
			layout:"column",
			items:[
				{
					fieldLabel:'目的地',
					xtype:'textfield',
					name:'apply_car_address',
					readOnly:true,
					maxLength:255,
					width:320
				},
				{
					fieldLabel:'外出人员',
					xtype:'textfield',
					name:'user_car_person',
					readOnly:true,
					maxLength:255,
					width:650
				}
			]
		},{
			fieldLabel:'携带物品',
			xtype:'textareafield',
			name:'comment',
			readOnly:true,
			maxLength:255,
			width:980
		}
	]
	});
	
	zxCarApplyFormDetail = Ext.create('Ext.FormPanel',{
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
	       zxCarApplyFormDetailFieldSet,
	       zxCarInfoFormDetailFieldSet,
	       zxCarBaseInfoFormDetailFieldSet
		]
	});
}

function callFnUpdate(form, action){
	var applyCar = action.result.data.applyCar;
	var applyUser = action.result.data.applyUser;
	if(null != applyUser){
		Ext.getCmp('apply_user_name').setValue(applyUser.xt_userinfo_realName);
		Ext.getCmp('zxcardepart').setValue(applyUser.xt_departinfo_name);
	}
	var driverUser = action.result.data.applyDriver;
	if(null != driverUser){
		Ext.getCmp('driver_name').setValue(driverUser.xt_userinfo_realName);
	}
	Ext.getCmp('car_num').setValue(applyCar.car_no);
	Ext.getCmp('people_num').setValue(applyCar.people_num);
}