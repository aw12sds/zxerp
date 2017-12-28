var bOrderWinAdd;
var bOrderFormAdd;
function addBOrder(){
	initBOrderFormAdd();
	reGetWidthAndHeight();
	bOrderWinAdd = Ext.create('top.Ext.Window',{
		layout:'fit',
		width:clientWidth,                    
		height:clientHeight,
//		maximized:true,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		closeToolText:'关闭窗体',
		collapseToolText:'收缩',
		headerPosition:'top',
		title:'添加信息',
		hideCollapseTool:true,
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:bOrderFormAdd,
		header:{
			hide:true
		},
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				if(getBOrderDetailJSON() == false){
					return;
				}
				var params = {bCartDetailJSON:encodeURI(getBOrderDetailJSON())}
				submitFormIncludeParams(bOrderFormAdd,'../bOrderController/addBOrder',grid,bOrderWinAdd,false,true,params);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	bOrderWinAdd.show();
	top.Ext.getCmp('b_order_sessionid').setValue(JSESSIONID);
}
function initBOrderFormAdd(){
	initBOrderDetailGrid();
	var addTab = Ext.create('top.Ext.TabPanel',{
		activeTab:0,
		region:'center',
		tabPosition:'left',
		title:'添加订单信息',
		layout:'fit',
		items:[
		{
			title:'基础信息',
			autoScroll:true,
			items:[{
					xtype:'fieldset',
					title:'基本信息',
					items:[{
						fieldLabel:'会&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员',
						store:b_memberList,
						xtype:"combo",
						id:'b_member_id',
						name:'b_member_id',
						pageSize:10, 
			            emptyText:'请选择',  
			            mode:'local',  
			            triggerAction:'all',  
			            valueField:'b_member_id',  
			            displayField:'b_member_name',  
			            editable:false, 
						allowBlank:false,
						maxLength:32,
						anchor:'40%',
						listeners:{
		                select:function(combo,records,options){
		                		initBInvoiceWin(this.value);
			                 }
			             }
					},
					{
						fieldLabel:'订单金额',
						xtype:'numberfield',
						value:'0',
						id:'b_order_total_price',
						name:'b_order_total_price',
						anchor:'40%'
					},
					{
						fieldLabel:'订单名称',
						xtype:'textfield',
						name:'b_order_name',
						maxLength:200,
						anchor:'40%'
					},
					{
						fieldLabel:'订单单号',
						xtype:'textfield',
						name:'b_order_key',
						maxLength:16,
						hidden:true,
						anchor:'100%'
					},
					{
						fieldLabel:'来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源',
						xtype:"combo",
			            store:[["0","普通订单"],["1","团购订单"],["2","其他"]],
			            emptyText:"请选择",
			            mode:"local",
			            value:'0',
			            triggerAction:"all",
			            editable:false,
			            id:'b_order_from',
			            name:'b_order_from',
						hiddenName:'b_order_from',
						allowBlank:false,
						anchor:'40%'
					},
					{
						fieldLabel:'sessionid',
						xtype:'textfield',
						name:'b_order_sessionid',
						id:'b_order_sessionid',
						maxLength:255,
						hidden:true,
						readOnly:true,
						anchor:'40%'
					},
					{
						fieldLabel:'订单备注',
						xtype:'textareafield',
						name:'b_order_remark',
						maxLength:200,
						anchor:'100%'
					},
					{
						fieldLabel:'购买总数',
						xtype:'numberfield',
						value:'0',
						id:'b_order_total_number',
						name:'b_order_total_number',
						anchor:'40%'
					},
					{
						layout:"column",
						items:[{
								columnWidth:.3,
								xtype:'panel',
								fieldLabel:'发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;票',
								xtype:'textfield',
								name:'b_invoice_name',
								id:'b_invoice_name',
								maxLength:255,
								readOnly:true,
								allowBlank:false,
								anchor:'100%'
						},
						{
							xtype:'button',
							text:'快速选择发票信息',
							style:'margin:2px 0px 0px 0px;',
							handler:function(button){
								initBInvoiceWin(top.Ext.getCmp('b_member_id').getValue());
							}
						}]
					},
					{
						fieldLabel:'卖家编号',
						xtype:'textfield',
						hidden:true,
						name:'b_seller_id',
						id:'b_seller_id',
						maxLength:255,
						readOnly:true,
						anchor:'40%'
					},
					{
						fieldLabel:'发票编号',
						xtype:'textfield',
						hidden:true,
						name:'b_invoice_id',
						id:'b_invoice_id',
						maxLength:255,
						readOnly:true,
						anchor:'40%'
					},
					{
						fieldLabel:'配送地址编号',
						xtype:'textfield',
						hidden:true,
						name:'b_cart_order_address_id',
						maxLength:32,
						anchor:'100%'
					},
					{
						fieldLabel:'订单类型',
						name:'b_order_type',
						xtype:"combo",
			            store:[["0","待支付"],["1","已支付"],["2","支付部分金额"]],
			            emptyText:"请选择",
			            mode:"local",
			            value:'0',
			            triggerAction:"all",
			            editable:false,
						hiddenName:'b_order_type',
						allowBlank:false,
						anchor:'40%'
					},
					{
						fieldLabel:'状态',
						xtype:'textfield',
						hidden:true,
						value:'0',
						name:'b_order_status',
						maxLength:2,
						anchor:'100%'
					}
					]
				},
				{
					xtype:'fieldset',
					title:'配送地址信息',
					items:[
						{
						fieldLabel:'省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份',
						id:'xt_provinceID',
						name:'xt_provinceID',
						xtype:"combo",
						store:xtProvinceList, 
			            emptyText:'请选择',  
			            mode:'local',  
			            triggerAction:'all',  
			            valueField:'ID',  
					    displayField:'NAME',  
			            editable:false, 
						allowBlank:false,
						maxLength:32,
						anchor:'60%',
						listeners:{
			                 select:function(combo,records,options){
			                	top.Ext.getCmp('xt_cityID').setValue("");
			                	top.Ext.getCmp('xt_districtID').setValue("");
					            xtCityList.load({params:{parentId:this.value}});
					            parms = {parentId:this.value};
					    	    beforeloadstoreByStore(xtCityList,parms);
					            xtDistrictList.load();
					            parms = {parentId:null};
					    	    beforeloadstoreByStore(xtDistrictList,parms);
			                    /**设置默认选中第一行的值
			                    xtCityList.on('load',function(store,record,opts){                                    
			                     var xt_cityID = record[0].data.xt_cityID;
			                     var xt_cityName=record[0].data.xt_cityName;
			                     xtCityList.setValue(xt_cityID);
			                     xtCityList.setDisplayValue(xt_cityName);
			                    });
			                    **/
			                 }
			             }
					},
					{
						fieldLabel:'城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市',
						id:'xt_cityID',
						name:'xt_cityID',
						xtype:"combo",
						store:xtCityList, 
			            emptyText:'请选择',  
			            mode:'local',  
			            triggerAction:'all',  
			            valueField:'ID',  
					    displayField:'NAME',  
			            editable:false, 
						allowBlank:false,
						maxLength:32,
						anchor:'60%',
						listeners:{
			                 select:function(combo,records,options){
			                	top.Ext.getCmp('xt_districtID').setValue("");
					            xtDistrictList.load({params:{parentId:this.value}});
					            parms = {parentId:this.value};
					    	    beforeloadstoreByStore(xtDistrictList,parms);
			                 }
			             }
					},
					{
						fieldLabel:'区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;县',
						xtype:'textfield',
						id:'xt_districtID',
						name:'xt_districtID',
						xtype:"combo",
						store:xtDistrictList, 
			            emptyText:'请选择',  
			            mode:'local',  
			            triggerAction:'all',  
			            valueField:'ID',  
					    displayField:'NAME',  
			            editable:false, 
						maxLength:32,
						anchor:'60%'
					},
					{
						fieldLabel:'详细地址',
						xtype:'textfield',
						id:'b_cart_order_address_address',
						name:'b_cart_order_address_address',
						maxLength:200,
						allowBlank:false,
						anchor:'100%'
					},
					{
						layout:"column",
						items:[{
								columnWidth:.3,
								baseCls:'x-plain',
								xtype:'panel',
								fieldLabel:'状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态',
								name:'b_cart_order_address_status',
								xtype:"combo",
					            store:[["0","正常"],["1","已作废"]],
					            emptyText:"请选择",
					            mode:"local",
					            value:'0',
					            triggerAction:"all",
					            editable:false,
								hiddenName:'b_cart_order_address_status',
								allowBlank:false,
								anchor:'100%'
						},
						{
								xtype:'button',
								text:'快速选择常用收货地址',
								style:'margin:2px 0px 0px 0px;',
								handler:function(button){
									initBMemberAddressWin(top.Ext.getCmp('b_member_id').getValue());
								}
						}]
					}]
				}]
		},
		{
			title:'出售商品信息',
			autoScroll:true,
			layout:'fit',
			items:[b_order_detail_grid]
		}
		]
	});
	bOrderFormAdd = Ext.create('top.Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		layout:'fit',
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:addTab
	});
}