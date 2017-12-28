var zxMeetingHouseWinAdd;
var zxMeetingHouseFormAdd;
function addZxMeetingHouse(){
	initZxMeetingHouseFormAdd();
	zxMeetingHouseWinAdd = Ext.create('Ext.Window',{
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
		items:zxMeetingHouseFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxMeetingHouseFormAdd,'../zxMeetingHouseController/addZxMeetingHouse',grid,zxMeetingHouseWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxMeetingHouseWinAdd.show();
	
}
function initZxMeetingHouseFormAdd(){
	zxMeetingHouseFormAdd = Ext.create('Ext.FormPanel',{
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
			fieldLabel:'会议室名称',
			xtype:'textfield',
			name:'house_name',
			maxLength:100,
			allowBlank:false,
			anchor:'100%'
		},
		{
			fieldLabel:'容纳人数',
			xtype:'numberfield',
			value:'0',
			name:'max_num',
			maxLength:10,
			allowBlank:false,
			anchor:'30%'
		},
		{
			fieldLabel:'状态',
			xtype:'combo',
			emptyText:'请选择',
			store:zx_meeting_house,
			mode:'local',
			triggerAction:'all',
			editable:false,
			hiddenName:'status',
			valueField:'xt_data_dictionary_id',
			displayField:'xt_data_dictionary_name',
			name:'status',
			maxLength:32,
			allowBlank:false,
			anchor:'30%'
		},
		{
			fieldLabel:'状态：1-正常，0-删除',
			xtype:'textfield',
			name:'state',
			maxLength:2,
			value:'1',
			hidden:true,
			anchor:'100%'
		},
		{
			fieldLabel:'说明',
			xtype:'textareafield',
			name:'remark',
			maxLength:256,
			anchor:'100%'
		}
		]
	});
}
