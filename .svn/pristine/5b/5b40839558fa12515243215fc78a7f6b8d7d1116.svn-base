var zxGoodsApplyWinEdit;
var zxGoodsApplyFormEdit;
var zxGoodsApplyFormEditFieldSet;
var zxGoodsApplyEditFormEditFieldSet;
function updateZxGoodsApply(){
	var record = grid.getSelectionModel().selected;
	if(record.length == 0){
		msgTishi('请选择要修改的一项！');
		return;
	}
	if(record.items[0].data.status != 0){
		msgTishi('只有待申请状态可以修改！');
		return;
	}
	initZxGoodsApplyFormEdit();
	zxGoodsApplyWinEdit = Ext.create('Ext.Window',{
		layout:'fit',
		width:1100,
		height:400,
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
		items:zxGoodsApplyFormEdit,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxGoodsApplyFormEdit,'../zxGoodsApplyController/updateZxGoodsApply',grid,zxGoodsApplyWinEdit,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxGoodsApplyWinEdit.show();
	Ext.getCmp('user_id').setValue(xt_userinfo_id);
	Ext.getCmp('user_name').setValue(sys_pt_user_name);
	Ext.getCmp('user_depart').setValue(sys_pt_departinfo_name);
	loadFormDataCallBack(zxGoodsApplyFormEdit,'../zxGoodsApplyController/getZxGoodsApplyById?apply_id='+ record.items[0].data.apply_id,callFnUpdate);
}
function initZxGoodsApplyFormEdit(){
	zxGoodsApplyFormEditFieldSet = Ext.create('Ext.form.FieldSet',{
		autoScroll:true,
		title:'基本信息',
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		items:[{
		 layout:"column",
		   items:[
		 {
			fieldLabel:'申请人id',
			xtype:'textfield',
			id:'user_id',
			name:'user_id',
			hidden:true,
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'申请人',
			xtype:'textfield',
			id:'user_name',
			name:'user_name',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'apply_id',
			xtype:'textfield',
			hidden:true,
			name:'apply_id',
			id:'apply_id',
			maxLength:255,
			anchor:'100%',
		    readOnly:true
		},
		{
					fieldLabel:'部门',
					xtype:'textfield',
					name:'user_depart',
					id:'user_depart',
					maxLength:255,
					anchor:'100%',
					readOnly:true
				}]},
				{
			fieldLabel:'标题',
			xtype:'textfield',
			name:'reason',
			maxLength:255,
			anchor:'100%'
		},
		{
			xtype:'numberfield',
			hidden:true,
			value:'0',
			itemId:'zxGoodsApplyEditFormNumber'
		},
		{
			xtype:'textfield',
			hidden:true,
			name:'zxGoodsApplyDetail_removed_flag',
			itemId:'zxGoodsApplyDetail_removed_flag'
		}
		]
	});
	zxGoodsApplyEditFormEditFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'用品申领详细表',
		items:[{	
			xtype:'button',
			text:'添加用品申领详细表',
			style:'float:left;margin-bottom:10px',
			labelAlign:"right", 
			listeners:{
				click:function(){
					addUpdatezxGoodsApplyEditFormEdit(null);
				}
			}
		}
		]
	});
	/*总panel*/
	zxGoodsApplyFormEdit = Ext.create('Ext.FormPanel',{
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
		/*基本信息*/
			zxGoodsApplyFormEditFieldSet,
			/*用品申领详细表*/
			zxGoodsApplyEditFormEditFieldSet
		]
	});
}
function callFnUpdate(form, action){
	var zxGoodsApplyEdit = action.result.data.zxGoodsApplyDetail;
	for(var i = 0; i < zxGoodsApplyEdit.length; i++){
		addUpdatezxGoodsApplyEditFormEdit(zxGoodsApplyEdit[i]);
	}
}
function addUpdatezxGoodsApplyEditFormEdit(data){
	var numbers = gfiValue(zxGoodsApplyFormEditFieldSet,'zxGoodsApplyEditFormNumber');
	sfiValue(zxGoodsApplyFormEditFieldSet,'zxGoodsApplyEditFormNumber',numbers+1);
	
	zxGoodsApplyEditFormEdit = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		autoScroll:true,
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		id:'zxGoodsApplyDetail['+numbers+']',
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
		layout:"column",
		itemId:'zxGoodsApplyDetail['+numbers+'].items',
		items:[
			{
			fieldLabel:'序列号',
			xtype:'textfield',
			hidden:true,
			name:'zxGoodsApplyDetail['+numbers+'].id',
			itemId:'zxGoodsApplyDetail['+numbers+'].id',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'用品id',
			xtype:'textfield',
			name:'zxGoodsApplyDetail['+numbers+'].goods_id',
			itemId:'zxGoodsApplyDetail['+numbers+'].goods_id',
			hidden:true,
			maxLength:32,
			anchor:'100%'
		},
		   {
			fieldLabel:'用品',
			xtype:'textfield',
			name:'zxGoodsApplyDetail['+numbers+'].office_name',
			itemId:'zxGoodsApplyDetail['+numbers+'].office_name',
			trigger1Cls:'x-form-ss-trigger',
			onTrigger1Click:function(){selectMaterial(numbers);},
			width:250
		   },
		   {
			fieldLabel:'补充数量',
			name:'zxGoodsApplyDetail['+numbers+'].amount',
			itemId:'zxGoodsApplyDetail['+numbers+'].amount',
			value:'1',
			xtype:'numberfield',
			minValue:0,
			maxValue:1000000,
			width:200
		   },
		   {
			fieldLabel:'用途',
			xtype:'textfield',
			name:'zxGoodsApplyDetail['+numbers+'].reason',
			itemId:'zxGoodsApplyDetail['+numbers+'].reason',
			width:520

		}
		]},

		{
			xtype:'button',
			text:'删除',
			cls:'delBtn',
			icon:delIcon,
			style:'background:#368ECE;border-color:#126DAF;float:right;margin-bottom:10px',
			labelAlign:'right',
			handler:function (){
				var _panel = this.ownerCt;
				var id =_panel.getComponent('zxGoodsApplyDetail['+numbers+'].items').getComponent('zxGoodsApplyDetail['+numbers+'].id').getValue();
				if(null != id && '' != id){
					Ext.Msg.confirm('提示','确定删除该行数据？',function(btn){
						if(btn == 'yes'){
							var params = {id:id};
							ajaxRequestCallFn('../zxGoodsApplyDetailController/delZxGoodsApplyDetail',null,params,'正在执行删除操作中！请稍后...',function(response, opts){
								var obj=Ext.decode(response.responseText);
								if(obj.responseFlag){
									zxGoodsApplyEditFormEditFieldSet.remove(_panel);
									var zxGoodsApplyEdit_removed_flag = gfiValue(zxGoodsApplyFormEditFieldSet,'zxGoodsApplyDetail_removed_flag');
									if(null == zxGoodsApplyEdit_removed_flag || zxGoodsApplyEdit_removed_flag == ''){
										sfiValue(zxGoodsApplyFormEditFieldSet,'zxGoodsApplyDetail_removed_flag',","+numbers+",");
									}else{
										sfiValue(zxGoodsApplyFormEditFieldSet,'zxGoodsApplyDetail_removed_flag',zxGoodsApplyEdit_removed_flag+numbers+',');
									}
									resetTitle(zxGoodsApplyEditFormEditFieldSet,true);
								}
							});
						}
					});
				}else{
					zxGoodsApplyEditFormEditFieldSet.remove(_panel);
					var zxGoodsApplyEdit_removed_flag = gfiValue(zxGoodsApplyFormEditFieldSet,'zxGoodsApplyDetail_removed_flag');
					if(null == zxGoodsApplyEdit_removed_flag || zxGoodsApplyEdit_removed_flag == ''){
						sfiValue(zxGoodsApplyFormEditFieldSet,'zxGoodsApplyDetail_removed_flag',","+numbers+",");
					}else{
						sfiValue(zxGoodsApplyFormEditFieldSet,'zxGoodsApplyDetail_removed_flag',zxGoodsApplyEdit_removed_flag+numbers+',');
					}
					resetTitle(zxGoodsApplyEditFormEditFieldSet,true);
				}
			}
		}
		]
	});
	zxGoodsApplyEditFormEditFieldSet.add(zxGoodsApplyEditFormEditFieldSet.items.getCount(),zxGoodsApplyEditFormEdit);
	if(null != data){
		//获取表单中所有字段与值（key/value）
		var zxGoodsApplyEditFormEditData = zxGoodsApplyEditFormEdit.getForm().getFieldValues();
		var zxGoodsApplyEditFormEditYFieldItem;
		for(var zxGoodsApplyEditFormEditField in zxGoodsApplyEditFormEditData){
			zxGoodsApplyEditFormEditYFieldItem=zxGoodsApplyEditFormEditField.split(".")[0]+".items";
		}
		//遍历表单中所有字段名称（key）
		for(var zxGoodsApplyEditFormEditField in zxGoodsApplyEditFormEditData){
			//获取表单中所有字段名称（key）并且截取对象后面的字段 目的与实体类中字段名称一致
			var zxGoodsApplyEditFormEditYField = zxGoodsApplyEditFormEditField.split(".")[1];
			//遍历服务器传递来的对象
			for(var dataKey in data){
				//判断当前字段是否等于服务器传过来的字段
				if(zxGoodsApplyEditFormEditYField == dataKey){
					//给表单每个字段赋值
					zxGoodsApplyEditFormEdit.getComponent(zxGoodsApplyEditFormEditYFieldItem).getComponent(zxGoodsApplyEditFormEditField).setValue(data[dataKey]);
					
				}
			}
		}
	}
	zxGoodsApplyEditFormEditFieldSet.afterLayout();
	resetTitle(zxGoodsApplyEditFormEditFieldSet,true);
	resetTitle(zxGoodsApplyEditFormEditFieldSet,true);
	
}

