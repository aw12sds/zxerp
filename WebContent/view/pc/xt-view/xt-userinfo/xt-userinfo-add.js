var xtUserinfoWinAdd;
var xtUserinfoFormAdd;
function addXtUserinfo(){
	initXtUserinfoFormAdd();
	reGetWidthAndHeight();
	xtUserinfoWinAdd = Ext.create('top.Ext.Window',{
		layout:'fit',
		width:clientWidth*1.1,                    
		height:clientHeight, 
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'添加信息',
		items:xtUserinfoFormAdd,
		headerPosition:'top',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		buttons:[{
			text:'选择组织机构',
			itemId:'selectOrg',
			handler:function(button){
				selectStaticDepartinfoAndPost();
			}
		},{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(xtUserinfoFormAdd,'../xtUserinfoController/addXtUserinfo',grid,xtUserinfoWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtUserinfoWinAdd.show();
	/**初始化附件右键菜单开始 参数4为1表示拥有上传和删除功能 即新增和编辑页面使用**/
	initFileRight('xt_userinfo_pic','xt_userinfo_pic_pic',2,1);
	/**初始化附件右键菜单结束**/
}
function initXtUserinfoFormAdd(){
	xtUserinfoFormAdd = Ext.create('top.Ext.FormPanel',{
		labelWidth:50,
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
			margin:'4 5 4 5'
		},
		items:[{
			xtype:'fieldset',
			title:'基础信息',
			items:[{
					layout:"column",
					items:[
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'所属公司',
							xtype:'textfield',
							name:'xt_company_name',
							maxLength:32,
							value:'准信科技自动化有限公司',
							readOnly:true,
							anchor:'100%'
						}]
					},
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'所属部门',
							xtype:'textfield',
							readOnly:true,
							id:'xt_departinfo_name',
							name:'xt_departinfo_name',
							maxLength:32,
							anchor:'100%'
						}]
					},
					{
						columnWidth:.4,
						items:[{
							fieldLabel:'所属岗位',
							xtype:'textfield',
							id:'xt_post_name',
							itemId:'xt_post_name',
							name:'xt_post_name',
							readOnly:true,
							maxLength:32,
							anchor:'100%'
						}]
					}
					]
				}]
			},{
			xtype:'fieldset',
			title:'个人信息',
			items:[
				{
					fieldLabel:'用户头像',
					xtype:'textfield',
					name:'xt_userinfo_image',
					maxLength:100,
					hidden:true,
					anchor:'100%'
				},
				{
					fieldLabel:'所属公司',
					xtype:'textfield',
					id:'xt_company_id',
					name:'xt_company_id',
					maxLength:100,
					hidden:true,
					anchor:'100%'
				},
				{
					fieldLabel:'所属部门',
					xtype:'textfield',
					id:'xt_departinfo_id',
					name:'xt_departinfo_id',
					maxLength:100,
					hidden:true,
					anchor:'100%'
				},
				{
					fieldLabel:'所属岗位',
					xtype:'textfield',
					id:'xt_post_id',
					name:'xt_post_id',
					maxLength:100,
					hidden:true,
					anchor:'100%'
				},
				{
					layout:"column",
					items:[
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'用&nbsp;户&nbsp;&nbsp;名',
							xtype:'textfield',
							name:'xt_userinfo_name',
							id:'xt_userinfo_name',
							allowBlank:false,
							maxLength:50,
							anchor:'20%',
							listeners:{
						  		'blur':function(obj) {
						  			Ext.Ajax.request({
										url:'../xtUserinfoController/validateUser',
										method:'post',  
										params:{
									        xt_userinfo_name:top.Ext.getCmp('xt_userinfo_name').getValue()
									    },
										success:function(response, opts) {
											var obj=Ext.decode(response.responseText); 
											if(obj.msg == 1){
												msgTishi('该用户名已经被注册，请重新输入!');
												top.Ext.getCmp("xt_userinfo_name").setValue("");  
												top.Ext.getCmp("xt_userinfo_name").focus();
											}
										},
										failure:function(response, opts) {
											var obj=Ext.decode(response.responseText); 
											msgTishi(obj.msg);
											Ext.getCmp("xt_userinfo_name").setValue("");  
											Ext.getCmp("xt_userinfo_name").focus();
										}
									});
								}
						  	}
						}]
					},
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别',
							xtype:"combo",
		            		queryMode:'local', 
							store:xtUserinfoSexList,
							name:'xt_userinfo_sex',
							triggerAction:"all",
				            editable:false,
				            emptyText:'请选择',
				            valueField:"xt_data_dictionary_id",
				            displayField:"xt_data_dictionary_name",
							anchor:'20%'
						}]
					},
					{
						columnWidth:.4,
						items:[{
							fieldLabel:'出生年月',
							xtype:'datefield',
							format:'Y-m-d',
							name:'xt_userinfo_birthday',
							maxLength:20,
							anchor:'20%'
						}]
					}
					]
				},
				{
					layout:"column",
					items:[
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'真实姓名',
							xtype:'textfield',
							name:'xt_userinfo_realName',
							maxLength:30,
							anchor:'100%'
						}]
					},
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'是否已婚',
							xtype:"combo",
							queryMode:'local', 
							store:xtUserinfoIsmarriedList,
							triggerAction:"all",
				            editable:false,
				            emptyText:'请选择',
				            valueField:"xt_data_dictionary_id",
				            displayField:"xt_data_dictionary_name",
							name:'xt_userinfo_ismarried',
							anchor:'100%'
						}]
					},
					{
						columnWidth:.4,
						items:[{
							fieldLabel:'身份证号',
							xtype:'textfield',
							name:'xt_userinfo_card',
							maxLength:20,
							anchor:'100%'
						}]
					}
					]
				},
				{
					layout:"column",
					items:[
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族',
							xtype:"combo",
							queryMode:'local', 
							store:xtUserinfoNationList,
							name:'xt_userinfo_nation',
							triggerAction:"all",
				            editable:false,
				            emptyText:'请选择',
				            valueField:"xt_data_dictionary_id",
				            displayField:"xt_data_dictionary_name",
							anchor:'20%'
						}]
					},
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯',
							xtype:'textfield',
							name:'xt_userinfo_origo',
							maxLength:20,
							anchor:'20%'
						}]
					},
					{
						columnWidth:.4,
						items:[{
							fieldLabel:'毕业学校',
							xtype:'textfield',
							name:'xt_userinfo_schoolName',
							maxLength:20,
							anchor:'25%'
						}]
					}
					]
				},
				{
					layout:"column",
					items:[
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'联系电话',
							xtype:'textfield',
							name:'xt_userinfo_phone',
							maxLength:30,
							anchor:'35%'
						}]
					},
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'个人手机',
							xtype:'textfield',
							name:'xt_userinfo_mobile',
							maxLength:20,
							anchor:'35%'
						}]
					},
					{
						columnWidth:.4,
						items:[{
							fieldLabel:'短号',
							xtype:'textfield',
							name:'xt_userinfo_ortherTel',
							maxLength:20,
							anchor:'35%'
						}]
					}
					]
				},
				{
					fieldLabel:'备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注',
					xtype:'textarea',
					name:'xt_userinfo_remark',
					maxLength:200,
					height:20,
					anchor:'100%'
				},
				{
					fieldLabel:'地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址',
					xtype:'textfield',
					name:'xt_userinfo_address',
					maxLength:500,
					anchor:'100%'
				},
				{
					layout:"column",
					items:[
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'入职时间',
							xtype:'datefield',
							format:'Y-m-d',
							name:'xt_userinfo_intime',
							maxLength:20,
							anchor:'100%'
						}]
					},
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'离职时间',
							xtype:'datefield',
							format:'Y-m-d',
							name:'xt_userinfo_outTime',
							maxLength:20,
							anchor:'100%'
						}]
					},
					{
						columnWidth:.4,
						items:[{
							fieldLabel:'到期时间',
							xtype:'datefield',
							format:'Y-m-d',
							name:'xt_userinfo_contractTime',
							maxLength:20,
							anchor:'100%'
						}]
					}
					]
				},
				{
					layout:"column",
					baseCls:'x-plain',
					xtype:'panel',
					items:[
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'QQ&nbsp;号码',
							xtype:'textfield',
							name:'xt_userinfo_qq',
							maxLength:12,
							anchor:'35%'
						}]
					},
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'电子邮件',
							xtype:'textfield',
							name:'xt_userinfo_email',
							maxLength:50,
							anchor:'35%'
						}]
					},
					{
						columnWidth:.4,
						items:[{
							fieldLabel:'状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态',
							xtype:"combo",
							queryMode:'local', 
							store:xtUserinfoStateListList,
							triggerAction:"all",
				            editable:false,
				            emptyText:'请选择',
				            valueField:"xt_data_dictionary_id",
				            displayField:"xt_data_dictionary_name",
							name:'xt_userinfo_state',
							anchor:'20%'
						}]
					}
					]
				}]
		},{
			xtype:'fieldset',
			title:'其他信息',
			items:[{
					layout:"column",
					items:[
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'政治面貌',
							xtype:'textfield',
							name:'xt_userinfo_politicalStatus',
							maxLength:20,
							anchor:'100%'
						}]
					}
					]
				},
				{
					fieldLabel:'附件编号',
					xtype:'textfield',
					hidden:true,
					id:'xt_userinfo_pic',
					name:'xt_userinfo_pic',
					maxLength:32,
					anchor:'100%'
				},
				{
					title:'图片信息',
					xtype:'fieldset',
					items:{
						xtype:'box', 
						id:'xt_userinfo_pic_pic', 
						margin:'2 5 4 70', 
						autoEl:{
							tag:'img',
							/** 不采用右键时候直接用点击事件触发
							onclick:"optupload('xt_userinfo_pic','xt_userinfo_pic_pic',1)",
							 **/
							src:bsdefimg
						}
					}
				}]
		}]
	});
}
