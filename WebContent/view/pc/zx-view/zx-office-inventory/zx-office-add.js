var zxOfficeWinAdd;
var zxOfficeFormAdd;
function addZxOffice(){
	initZxOfficeFormAdd();
	zxOfficeWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:350,
		height:300,
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
		items:zxOfficeFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxOfficeFormAdd,'../zxOfficeController/addZxOffice',d3,zxOfficeWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxOfficeWinAdd.show();
	
}
function initZxOfficeFormAdd(){
	zxOfficeFormAdd = Ext.create('Ext.FormPanel',{
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
         {
	       fieldLabel:'分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类',
	       xtype:'treepicker',
			displayField:'text',
			anchor:'100%',
			hiddenName:'classify_id',
			name:'classify_id',
			minPickerHeight:200,
			maxHeight:200,
			editable:false,
			allowBlank:false,
			store:Ext.create('Ext.data.TreeStore',{
				fields:['id','text'],
				root:{
					text:'一级分类',
					id:'0',
					expanded:false
				},
				proxy:{
					type:'ajax',
					url:'../zxOfficeClassifyController/getZxOfficeClassifyTree',
					reader:{
						type:'json'
					}
				}
			})
        },
		
		{
			fieldLabel:'名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称',
			xtype:'textfield',
			name:'name',
			maxLength:100,
			allowBlank:false,
			anchor:'100%'
		},
		{
			fieldLabel:'编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号',
			xtype:'textfield',
			name:'num',
			hidden:true,
			maxLength:100,
			anchor:'100%'
		},
		{
			fieldLabel:'分类ID',
			hidden:true,
			xtype:'textfield',
			name:'classify_id',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位',
			xtype:'textfield',
			allowBlank: false,
			name:'unit',
			maxLength:10,
			anchor:'100%'
		},
		{
			fieldLabel:'规格型号',
			xtype:'textfield',
			allowBlank: false,
			name:'standard',
			maxLength:255,
			anchor:'100%'
		}
		]
	});
}

