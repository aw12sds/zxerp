var zxTrainPlanWinAdd;
var zxTrainPlanFormAdd;
var zxTrainPlanWinAdd;
var zxTrainPlanFormAdd;
function addZxTrainPlan(){
	initZxTrainPlanFormAdd();
	zxTrainPlanWinAdd = Ext.create('Ext.Window',{
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
		items:zxTrainPlanFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxTrainPlanFormAdd,'../zxTrainPlanController/addZxTrainPlan',grid,zxTrainPlanWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxTrainPlanWinAdd.show();
	
}
function initZxTrainPlanFormAdd(){
	zxTrainPlanFormAdd = Ext.create('Ext.form.FieldSet',{
		fieldDefaults:{
			labelWidth:100,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		anchor:'100%',
		title:'月度培训',
		items:[
			{
			  layout:"column",
		      items:[{
			        fieldLabel:'年度',
			        xtype:'textfield',
			        name:'year',
			        maxLength:10,
			        anchor:'100%'
		             },
		             {
		        		fieldLabel:'预计结算日',
					xtype:'datefield',
					format:'Y-m',
					editable:false,//点击文本弹出时间控件
					name:'time',
					allowBlank:false,
					maxLength:10,
					width:710
		            }]
		   },
		   	{
			  layout:"column",
		      items:[{
			       fieldLabel:'标题',
			xtype:'textfield',
			name:'caption',
			maxLength:255,
			anchor:'100%'
		             },
		             {
		        	fieldLabel:'部门',
			xtype:'textfield',
			name:'depart',
			maxLength:32,
			anchor:'100%'
		            }]
		   },
		{
			fieldLabel:'备&emsp;&emsp;注',
			           xtype:'textareafield',
			           name:'reason',
			           maxLength:200,
			           width:680
		}
		]
	});
}
