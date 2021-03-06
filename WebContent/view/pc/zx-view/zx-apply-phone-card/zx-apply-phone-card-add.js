var zxApplyPhoneCardWinAdd;
var zxApplyPhoneCardFormAdd;
function addZxApplyPhoneCard(){
	initZxApplyPhoneCardFormAdd();
	zxApplyPhoneCardWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:650,
		height:300,
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
		items:zxApplyPhoneCardFormAdd,
		buttons:[{
			text:'创建',
			itemId:'save',
			handler:function(button){
				var apply_user_id = Ext.getCmp('apply_user_id').getValue();
				$.ajax({  
			        type : "post",  
			        url : "../zxApplyPhoneCardController/getZxApplyPhoneCardByUserId?apply_user_id="+apply_user_id,  
			        async : false,  
			        success : function(data){
			        	data = eval("(" + data + ")");  
			            var list = data.items;
			            if(list.length==0){
			            	submitForm(zxApplyPhoneCardFormAdd,'../zxApplyPhoneCardController/addZxApplyPhoneCard',grid,zxApplyPhoneCardWinAdd,false,true);
			            }else{
			            	msgTishi('你已有集团短号或者已创建申请，所以不能再创建');
			        		return;
			            }
			        }
			    });
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxApplyPhoneCardWinAdd.show();
	Ext.getCmp('apply_user_id').setValue(xt_userinfo_id);
	Ext.getCmp('apply_user_name').setValue(sys_pt_user_name);
	Ext.getCmp('zxcardepart').setValue(sys_pt_departinfo_name);
	Ext.getCmp('apply_post_name').setValue(sys_pt_post_name);
}
function initZxApplyPhoneCardFormAdd(){
	zxApplyPhoneCardFormAdd = Ext.create('Ext.FormPanel',{
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
		layout:'column',
		items:[
		{
			fieldLabel:'申请人',
			xtype:'textfield',
			name:'apply_user_id',
			id:'apply_user_id',
			hidden:true,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'申&nbsp;&nbsp;请&nbsp;&nbsp;人',
			xtype:'textfield',
			id :'apply_user_name',
			hidden:true,
			maxLength:32,
			width:160
		},
		{
			fieldLabel:'部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门',
			xtype:'textfield',
			id :'zxcardepart',
			hidden:true,
			maxLength:32,
			width:210
		},
		{
			fieldLabel:'职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务',
			xtype:'textfield',
			id :'apply_post_name',
			hidden:true,
			maxLength:32,
			width:220
		},
		{
			fieldLabel:'入职时间',
			xtype:'datetimefield',
			hidden:true,
			id :'entry_time',
			maxLength:32,
			width:300
		},
		{
			fieldLabel:'转正时间',
			xtype:'datetimefield',
			hidden:true,
			id :'positive_time',
			maxLength:32,
			width:300
		},
		{
			fieldLabel:'申请时间',
			xtype:'datetimefield',
			format:'Y-m-d H:i:s',
			hidden:true,
			name:'apply_time',
			editable:false,
			maxLength:19,
			width:300
		},
		{
			fieldLabel:'申请状态',
			xtype:"combo",
			queryMode:'local', 
			hidden:true,
			store:zx_apply_phone_card_status,
			triggerAction:"all",
			editable:false,
			emptyText:'请选择',
			valueField:"xt_data_dictionary_value",
			displayField:"xt_data_dictionary_name",
			name:'status',
			maxLength:32,
			width:610
		},
		{
			fieldLabel:'申请原因',
			xtype:'textareafield',
			name:'description',
			maxLength:255,
			defaultType: 'radiofield',
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
			    	   id:'radio5',
			    	   listeners:{                 
				        	  change:function(){     
				        		  var v = Ext.getCmp('radio5').getValue();
				        		  if(v==true){
				        			  Ext.getCmp('other').show();
				        		  }else{
				        			  Ext.getCmp('other').hide();
				        		  }
				              }               
				          }
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
