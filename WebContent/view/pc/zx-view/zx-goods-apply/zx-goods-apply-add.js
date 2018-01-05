var zxGoodsApplyWinAdd;
var zxGoodsApplyFormAdd;
var zxGoodsApplyFormAddFieldSet;
var zxGoodsApplyDetailFormAddFieldSet;
function addZxGoodsApply(){
	initZxGoodsApplyFormAdd();
	zxGoodsApplyWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:1100,
		height:400,
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
		items:zxGoodsApplyFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxGoodsApplyFormAdd,'../zxGoodsApplyController/addZxGoodsApply',grid,zxGoodsApplyWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxGoodsApplyWinAdd.show();
	Ext.getCmp('user_id').setValue(xt_userinfo_id);
	Ext.getCmp('user_name').setValue(sys_pt_user_name);
	Ext.getCmp('user_depart').setValue(sys_pt_departinfo_name);
	
}
function initZxGoodsApplyFormAdd(){
	zxGoodsApplyFormAddFieldSet = Ext.create('Ext.form.FieldSet',{
		autoScroll:true,
		title:'基本信息',
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		items:[
		{
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
			itemId:'zxGoodsApplyDetailFormNumber'
		},
		{
			xtype:'textfield',
			hidden:true,
			name:'zxGoodsApplyDetail_removed_flag',
			itemId:'zxGoodsApplyDetail_removed_flag'
		}
		]
	});
	zxGoodsApplyDetailFormAddFieldSet = Ext.create('Ext.form.FieldSet',{
		anchor:'100%',
		title:'用品申领详细表',
		items:[{	
			xtype:'button',
			text:'添加用品申领详细表',
			style:'float:left;margin-bottom:10px',
			labelAlign:"right", 
			listeners:{
				click:function(){
					addZxGoodsApplyDetailFormAdd();
				}
			}
		}
		]
	});
	zxGoodsApplyFormAdd = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
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
			zxGoodsApplyFormAddFieldSet,
			zxGoodsApplyDetailFormAddFieldSet
		]
	});
}
function addZxGoodsApplyDetailFormAdd(){
	var numbers = gfiValue(zxGoodsApplyFormAddFieldSet,'zxGoodsApplyDetailFormNumber');
	sfiValue(zxGoodsApplyFormAddFieldSet,'zxGoodsApplyDetailFormNumber',numbers+1);
	
	zxGoodsApplyDetailFormAdd = Ext.create('Ext.FormPanel',{
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
				zxGoodsApplyDetailFormAddFieldSet.remove(_panel); 
				var zxGoodsApplyDetail_removed_flag = gfiValue(zxGoodsApplyFormAddFieldSet,'zxGoodsApplyDetail_removed_flag');
				if(null == zxGoodsApplyDetail_removed_flag || zxGoodsApplyDetail_removed_flag == ''){
					sfiValue(zxGoodsApplyFormAddFieldSet,'zxGoodsApplyDetail_removed_flag',","+numbers+",");
				}else{
					sfiValue(zxGoodsApplyFormAddFieldSet,'zxGoodsApplyDetail_removed_flag',zxGoodsApplyDetail_removed_flag+numbers+',');
				}
				resetTitle(zxGoodsApplyDetailFormAddFieldSet,true);
			}
		}/*]}*/
		]
	});
	zxGoodsApplyDetailFormAddFieldSet.add(zxGoodsApplyDetailFormAddFieldSet.items.getCount(),zxGoodsApplyDetailFormAdd);
	zxGoodsApplyDetailFormAddFieldSet.afterLayout();
	resetTitle(zxGoodsApplyDetailFormAddFieldSet,true);
	
}
