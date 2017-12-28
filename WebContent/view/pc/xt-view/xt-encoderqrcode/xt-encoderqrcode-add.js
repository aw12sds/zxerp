var xtEncoderqrcodeWinAdd;
var xtEncoderqrcodeFormAdd;
function addXtEncoderqrcode(){
	initXtEncoderqrcodeFormAdd();
	xtEncoderqrcodeWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
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
		items:xtEncoderqrcodeFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(xtEncoderqrcodeFormAdd,'../xtEncoderqrcodeController/addXtEncoderqrcode',grid,xtEncoderqrcodeWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	xtEncoderqrcodeWinAdd.show();
}
function initXtEncoderqrcodeFormAdd(){
	xtEncoderqrcodeFormAdd = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题',
			xtype:'textfield',
			name:'xt_encoderqrcode_title',
			allowBlank:false,
			maxLength:200,
			anchor:'100%'
		},
		{
			fieldLabel:'链接地址',
			xtype:'textfield',
			name:'xt_encoderqrcode_url',
			allowBlank:false,
			maxLength:1000,
			anchor:'100%'
		},
		{
			fieldLabel:'备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注',
			xtype:'textareafield',
			name:'xt_encoderqrcode_content',
			maxLength:500,
			anchor:'100%'
		}
		]
	});
}
