var xtUserinfoWinDetail;
var xtUserinfoFormDetail;
function detailXtUserinfo(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要查看明细的项！');
		return;
	}
	initXtUserinfoFormDetail();
	reGetWidthAndHeight();
	xtUserinfoWinDetail = Ext.create('top.Ext.Window',{
		layout:'fit',
		width:clientWidth*1.1,                    
		height:clientHeight, 
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'明细信息',
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
		items:xtUserinfoFormDetail,
		buttons:[{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtUserinfoWinDetail.show();
	/**初始化附件右键菜单开始 参数4为1表示不拥有上传和删除功能 即明细页面使用**/
	initFileRight('xt_userinfo_pic','xt_userinfo_pic_pic',2,2);
	/**初始化附件右键菜单结束**/

	/**配置附件回显方法开始**/
	var params = {xt_attachment_id:record.items[0].data.xt_userinfo_pic,field_name:'xt_userinfo_pic'};
	ajaxFilePathBackRequest('../xtCommonController/getAttachmentPathPP',params,2);
	loadFormData(xtUserinfoFormDetail,'../xtUserinfoController/getXtUserinfoById?xt_userinfo_id='+ record.items[0].data.xt_userinfo_id);
}

function initXtUserinfoFormDetail(){
	xtUserinfoFormDetail = Ext.create('top.Ext.FormPanel',{
		xtype:'fieldset',
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
			flex:1,
			readOnly:true,
			margin:'4 5 4 5'
		},
		items:[{
				xtype:'fieldset',
				title:'个人信息',
				items:[{
					layout:"column",
					baseCls:'x-plain',
					xtype:'panel',
					items:[
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'所属公司',
							xtype:'textfield',
							name:'xt_company_name',
							value:'准信科技自动化有限公司',
							maxLength:32,
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
					fieldLabel:'用&nbsp;户&nbsp;&nbsp;ID',
					xtype:'textfield',
					name:'xt_userinfo_id',
					allowBlank:false,
					maxLength:50,
					hidden:true,
					anchor:'100%'
				},
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
					name:'xt_company_id',
					maxLength:100,
					hidden:true,
					anchor:'100%'
				},
				{
					fieldLabel:'所属部门',
					xtype:'textfield',
					name:'xt_departinfo_id',
					maxLength:100,
					hidden:true,
					anchor:'100%'
				},
				{
					fieldLabel:'所属岗位',
					xtype:'textfield',
					name:'xt_post_id',
					maxLength:100,
					hidden:true,
					anchor:'100%'
				},
				{
					layout:"column",
					baseCls:'x-plain',
					xtype:'panel',
					items:[
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'用&nbsp;户&nbsp;&nbsp;名',
							xtype:'textfield',
							name:'xt_userinfo_name',
							allowBlank:false,
							maxLength:50,
							anchor:'20%'
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
							allowBlank:false,
							maxLength:20,
							anchor:'20%'
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
					baseCls:'x-plain',
					xtype:'panel',
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
					baseCls:'x-plain',
					xtype:'panel',
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
					xtype:'textareafield',
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
					baseCls:'x-plain',
					xtype:'panel',
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
							allowBlank:false,
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
							allowBlank:false,
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
					baseCls:'x-plain',
					xtype:'panel',
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
					},
					{
						columnWidth:.3,
						items:[{
							fieldLabel:'文化程度',
							xtype:"combo",
							queryMode:'local', 
							store:xtUserinfoHighestDegreeList,
							triggerAction:"all",
				            editable:false,
				            emptyText:'请选择',
				            valueField:"xt_data_dictionary_id",
				            displayField:"xt_data_dictionary_name",
							name:'xt_userinfo_highestDegree',
							allowBlank:false,
							maxLength:20,
							anchor:'100%'
						}]
					},
					{
						columnWidth:.4,
						items:[{
							fieldLabel:'工作年限',
							xtype:"combo",
							queryMode:'local', 
							store:xtUserinfoWorkYearList,
							triggerAction:"all",
				            editable:false,
				            emptyText:'请选择',
				            valueField:"xt_data_dictionary_id",
				            displayField:"xt_data_dictionary_name",
							name:'xt_userinfo_workYear',
							maxLength:20,
							anchor:'100%'
						}]
					}
					]
				}]
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
	});
}
