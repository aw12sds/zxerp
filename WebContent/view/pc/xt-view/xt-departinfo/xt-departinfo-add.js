var xtDepartinfoWinAdd;
var xtDepartinfoFormAdd;
function addXtDepartinfo(){
	initXtDepartinfoFormAdd();
	xtDepartinfoWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
		height:400,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'添加信息',
		items:xtDepartinfoFormAdd,
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
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(xtDepartinfoFormAdd,'../xtDepartinfoController/addXtDepartinfo',grid,xtDepartinfoWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtDepartinfoWinAdd.show();
}
function initXtDepartinfoFormAdd(){
	xtDepartinfoFormAdd = Ext.create('Ext.FormPanel',{
		xtype:'form',
		labelWidth:50,
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
	        labelWidth:70,
	        labelAlign:"left",
	        flex:1,
	        margin:'4 5 4 5'
	    },
		items:[
		{
			fieldLabel:'部门名称',
			xtype:'textfield',
			name:'xt_departinfo_name',
			allowBlank:false,
			maxLength:50,
			anchor:'40%'
		},
		{
			fieldLabel:'上级部门',
			xtype:'treepicker',
			displayField:'text',
			anchor:'40%',
			hiddenName:'xt_departinfo_parentId',
			name:'xt_departinfo_parentId',
			minPickerHeight:200,
			maxHeight:200,
			editable:false,
			store:Ext.create('Ext.data.TreeStore',{
				fields:['id','text'],
				root:{
					text:'一级部门',
					id:'0',
					expanded:true
				},
				proxy:{
					type:'ajax',
					url:'../xtDepartinfoController/getXtDepartinfoTree',
					reader:{
						type:'json'
					}
				}
			})
		},
		{
			fieldLabel:'联系电话',
			xtype:'textfield',
			name:'xt_departinfo_connectTelNo',
			maxLength:12,
			anchor:'40%'
		},
		{
			fieldLabel:'移动电话',
			xtype:'textfield',
			name:'xt_departinfo_connectMobileTelNo',
			maxLength:20,
			anchor:'40%'
		},
		{
			fieldLabel:'传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真',
			xtype:'textfield',
			name:'xt_departinfo_faxes',
			maxLength:50,
			anchor:'40%'
		},
		{
			fieldLabel:'部门信息',
			xtype:'textareafield',
			name:'xt_departinfo_desc',
			maxLength:200,
			anchor:'100%'
		},
		{
			fieldLabel:'立成时间',
			xtype:'datefield',
			format:'Y-m-d',
			name:'xt_departinfo_time',
			maxLength:20,
			anchor:'40%'
		},
		{
			fieldLabel:'部门性质',
			xtype:'textfield',
			name:'xt_departinfo_type',
			maxLength:200,
			anchor:'40%'
		}
		]
	});
}
