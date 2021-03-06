var zxApplyPhoneCardWinEdit;
var zxApplyPhoneCardFormEdit;
function updateZxApplyPhoneCard(id){
	initZxApplyPhoneCardFormEdit();
	zxApplyPhoneCardWinEdit = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
		height:500,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'发放电话卡',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:zxApplyPhoneCardFormEdit,
		buttons:[{
			text:'发放',
			itemId:'save',
			handler:function(button){
				submitForm(zxApplyPhoneCardFormEdit,'../zxApplyPhoneCardController/updateZxApplyPhoneCardBySelective',null,zxApplyPhoneCardWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxApplyPhoneCardWinEdit.show();
	loadFormDataCallBack(zxApplyPhoneCardFormEdit,'../zxApplyPhoneCardController/getZxApplyPhoneCardById?id='+ id,callFnDetail);
}
function initZxApplyPhoneCardFormEdit(){
	ZxApplyPhoneCardFormDetailGrant = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'申请人信息',
		items:[
        {
			layout:"column",
			items:[
				{
					fieldLabel:'申请电话卡编号',
					xtype:'textfield',
					hidden:true,
					name:'id',
					allowBlank:false,
					maxLength:32,
					anchor:'100%'
				},
				{
					fieldLabel:'申请人',
					xtype:'textfield',
					hidden:true,
					name:'apply_user_id',
					maxLength:32,
					anchor:'100%'
				},
				{
					fieldLabel:'申&nbsp;&nbsp;请&nbsp;&nbsp;人',
					xtype:'textfield',
					readOnly:true,
					id :'apply_user_name',
					maxLength:32,
					width:350
				},
				{
					fieldLabel:'部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门',
					xtype:'textfield',
					readOnly:true,
					id :'zxcardepart',
					maxLength:32,
					width:350
				},
				{
					fieldLabel:'职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务',
					xtype:'textfield',
					id :'apply_post_name',
					readOnly:true,
					maxLength:32,
					width:350
				},
				{
					fieldLabel:'入职时间',
					xtype:'datetimefield',
					id :'entry_time',
					readOnly:true,
					width:350
				},
				{
					fieldLabel:'转正时间',
					xtype:'datetimefield',
					id :'positive_time',
					readOnly:true,
					width:350
				},
				{
					fieldLabel:'申请时间',
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					readOnly:true,
					name:'apply_time',
					id:'apply_time',
					width:350
				},
				{
					fieldLabel:'申请状态',
					xtype:'combo',
					name:'status',
					id:'status',
					valueField:"xt_data_dictionary_value",
				    displayField:"xt_data_dictionary_name",
					store:zx_apply_phone_card_status,
					readOnly:true,
					maxLength:32,
					width:350
				},
				{
					fieldLabel:'申请描述',
					xtype:'textfield',
					name:'description',
					readOnly:true,
					id:'description',
					maxLength:255,
					width:710
				},
				{
					fieldLabel:'申请事项',
					xtype:'fieldcontainer',
					defaultType: 'radiofield',
					layout:'hbox',
					items:[
					       {
					    	   boxLabel:'初次申请',
					    	   name:'apply_matter',
					    	   inputValue:'1',
					    	   readOnly:true,
					    	   id:'radio1'
					       },
					       {
					    	   boxLabel:'出差',
					    	   name:'apply_matter',
					    	   inputValue:'2',
					    	   readOnly:true,
					    	   id:'radio2'
					       },
					       {
					    	   boxLabel:'申请调整',
					    	   name:'apply_matter',
					    	   inputValue:'3',
					    	   readOnly:true,
					    	   id:'radio3'
					       },
					       {
					    	   boxLabel:'加入集团网',
					    	   name:'apply_matter',
					    	   inputValue:'4',
					    	   readOnly:true,
					    	   id:'radio4'
					       },
					       {
					    	   boxLabel:'其他:',
					    	   name:'apply_matter',
					    	   inputValue:'5',
					    	   readOnly:true,
					    	   id:'radio5'
					       },
					       {
								fieldLabel:'',
								xtype:'textfield',
								name:'apply_matter',
								readOnly:true,
								hidden:true,
								id :'other',
								maxLength:32,
								width:145
							}
					       ]
				}
			]
		}
	]
	});
	ZxApplyPhoneCardGrant = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'电话卡号',
		items:[
        {
			layout:"column",
			items:[
				{
					fieldLabel:'电话卡套餐',
					xtype:"combo",
					queryMode:'local', 
					store:zx_phone_card_group,
					triggerAction:"all",
				    editable:false,
					allowBlank:false,
				    emptyText:'请选择',
				    valueField:"xt_data_dictionary_value",
				    displayField:"xt_data_dictionary_name",
					name:'status',
					maxLength:32,
					width:320
				},
				{
					fieldLabel:'集团短号',
					xtype:'textfield',
					hideTrigger:true,
					allowblank:false,
					id:'phone_card',
					name:'phone_card',
					maxLength:32,
					width:250,
					listeners:{                 
						change:function(){  
							var zz= /^[1][3,4,5,7,8][0-9]{9}$/;
			        		var phone_card = Ext.getCmp("phone_card").getValue();
			        		if(zz.test(phone_card)){
			        			 Ext.getCmp("remind").hide();
			        		}else{
			        			Ext.getCmp("remind").show();
			        		}
			            }               
			        }
				},
				{
					xtype : 'displayfield',
					id:'remind',
					hidden:true,
					value :'<font color="red">请输入正确的手机号</font>'
				}
			]
		}
	]
	});
	zxApplyPhoneCardFormEdit = Ext.create('Ext.FormPanel',{
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
			ZxApplyPhoneCardFormDetailGrant,
			ZxApplyPhoneCardGrant  
		]
	});
}
function callFnDetail(form, action){
	var phoneApply = action.result.data.phoneApply;
	var apply_matter = action.result.data.apply_matter;
	if(null != phoneApply){
		Ext.getCmp('apply_user_name').setValue(phoneApply.xt_userinfo_realName);
		Ext.getCmp('zxcardepart').setValue(phoneApply.xt_departinfo_name);
		Ext.getCmp('apply_post_name').setValue(phoneApply.xt_post_name);
		Ext.getCmp('entry_time').setValue(phoneApply.xt_userinfo_intime);
	}
	var radio = apply_matter.substring(0,1);
	if(radio == "5"){
		Ext.getCmp('radio5').setValue(true);
		Ext.getCmp('other').setValue(apply_matter.substring(2,apply_matter.length));
		Ext.getCmp('other').show();
	}else if(radio =="1"){
		Ext.getCmp('radio1').setValue(true);
	}else if(radio =="2"){
		Ext.getCmp('radio2').setValue(true);
	}else if(radio =="3"){
		Ext.getCmp('radio3').setValue(true);
	}else{
		Ext.getCmp('radio4').setValue(true);
	}
}