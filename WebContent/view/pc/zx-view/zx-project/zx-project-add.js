var zxProjectWinAdd;
var zxProjectFormAdd;
function addZxProject(){
	initZxProjectFormAdd();
	zxProjectWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:400,
		height:240,
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
		items:zxProjectFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxProjectFormAdd,'../zxProjectController/addZxProject',grid,zxProjectWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxProjectWinAdd.show();
	
}
function initZxProjectFormAdd(){
	zxProjectFormAdd = Ext.create('Ext.FormPanel',{
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
			labelWidth:100,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'项目名称',
			xtype:'textfield',
			name:'name',
			allowBlank: false,
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'项目号',
			xtype:'textfield',
			name:'num',
			allowBlank: false,
			maxLength:100,
			anchor:'100%'
		},
		{
			fieldLabel:'项目发货时间',
			xtype:'datefield',
			format:'Y-m-d',
			allowBlank: false,
			name:'ship_date',
			maxLength:10,
			anchor:'100%'
		}
		]
	});
}
