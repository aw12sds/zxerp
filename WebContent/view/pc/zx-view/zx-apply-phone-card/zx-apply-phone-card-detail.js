var zxApplyPhoneCardWinDetail;
var zxApplyPhoneCardFormDetail;
function detailZxApplyPhoneCard(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initZxApplyPhoneCardFormDetail();
	zxApplyPhoneCardWinDetail = Ext.create('Ext.Window',{
		layout:'fit',
		width:650,
		height:300,
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
		items:zxApplyPhoneCardFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxApplyPhoneCardWinDetail.show();
	loadFormDataCallBack(zxApplyPhoneCardFormDetail,'../zxApplyPhoneCardController/getZxApplyPhoneCardById?id='+ record.items[0].data.id,callFnDetail);
}
function initZxApplyPhoneCardFormDetail(){
	zxApplyPhoneCardFormDetail = Ext.create('Ext.FormPanel',{
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
			readOnly:true,
			margin:'2 5 4 5'
		},
		layout:'column',
		items:[
		{
			fieldLabel:'申请电话卡编号',
			xtype:'textfield',
			hidden:true,
			name:'id',
			allowBlank:false,
			maxLength:32,
			width:350
		},
		{
			fieldLabel:'申请人',
			xtype:'textfield',
			id:'apply_user_id',
			hidden:true,
			maxLength:32,
			width:350
		},
		{
			fieldLabel:'申&nbsp;&nbsp;请&nbsp;&nbsp;人',
			xtype:'textfield',
			id:'apply_user_name',
			name:'apply_user_name',
			maxLength:32,
			width:160
		},
		{
			fieldLabel:'部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门',
			xtype:'textfield',
			id:'zxcardepart',
			maxLength:32,
			width:210
		},
		{
			fieldLabel:'职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务',
			xtype:'textfield',
			id :'apply_post_name',
			maxLength:32,
			width:220
		},
		{
			fieldLabel:'入职时间',
			xtype:'datetimefield',
			id :'entry_time',
			maxLength:32,
			width:300
		},
		{
			fieldLabel:'转正时间',
			xtype:'datetimefield',
			id :'positive_time',
			maxLength:32,
			width:300
		},
		{
			fieldLabel:'创建时间',
			xtype:'datetimefield',
			format:'Y-m-d H:i:s',
			name:'apply_time',
			maxLength:19,
			width:300
		},
		{
			fieldLabel:'申请状态',
			xtype:'combo',
			name:'status',
			valueField:"xt_data_dictionary_value",
		    displayField:"xt_data_dictionary_name",
			store:zx_apply_phone_card_status,
			readOnly:true,
			maxLength:32,
			width:300
		},
		{
			fieldLabel:'申请原因',
			xtype:'textfield',
			name:'description',
			maxLength:255,
			width:610
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
			    	   id:'radio1'
			       },
			       {
			    	   boxLabel:'出差',
			    	   name:'apply_matter',
			    	   inputValue:'2',
			    	   id:'radio2'
			       },
			       {
			    	   boxLabel:'申请调整',
			    	   name:'apply_matter',
			    	   inputValue:'3',
			    	   id:'radio3'
			       },
			       {
			    	   boxLabel:'加入集团网',
			    	   name:'apply_matter',
			    	   inputValue:'4',
			    	   id:'radio4'
			       },
			       {
			    	   boxLabel:'其他:',
			    	   name:'apply_matter',
			    	   inputValue:'5',
			    	   id:'radio5'
			       },
			       {
						fieldLabel:'',
						xtype:'textfield',
						name:'apply_matter',
						hidden:true,
						id :'other',
						maxLength:32,
						width:145
					}
			       ]
		}
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
