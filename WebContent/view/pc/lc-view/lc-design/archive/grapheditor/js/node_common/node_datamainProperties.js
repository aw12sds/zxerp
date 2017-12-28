//////////////数据属性事件子流程 子流程 事物流程 流程信息等地方使用///////////
//数据属性表格
var datamainProperties_grid;
//数据属性数据源
var datamainProperties_store;
function initdatamainProperties_grid(){
	var event_typeStore;
	//数据注意该数据主要从mxgraph属性中获取
	var data_value;
	var dataProperties_node_value = Ext.getCmp('datamainProperties_node_value').getValue();
	if(null != dataProperties_node_value && "" != dataProperties_node_value){
		/**1级grid显示即总Grid使用#分割**/
		var dataproperties_node_valueArray = dataProperties_node_value.split("#");
		for(var i = 0; i < dataproperties_node_valueArray.length; i++){
			var dataproperties_node_val = dataproperties_node_valueArray[i];
			if("undefined" != typeof(dataproperties_node_val)){
				/**grid行列**/
				var dataproperties_node_v = dataproperties_node_val.split("@");
				if(null == data_value || "" == data_value){
					data_value = "['"+dataproperties_node_v[0]+"','"+dataproperties_node_v[1]+"','"+dataproperties_node_v[2]+"','"+dataproperties_node_v[3]+"']";
				}else{
					data_value = data_value+","+"['"+dataproperties_node_v[0]+"','"+dataproperties_node_v[1]+"','"+dataproperties_node_v[2]+"','"+dataproperties_node_v[3]+"',]";
				}
			}
		}
	}
	var data;
	if("undefined" != typeof(data_value)){
		data = "["+data_value+"]";
		data = Ext.decode(data);
	}
	//定义列
	//类型数据源
	var dataPropertiesTypeStore = new Ext.data.SimpleStore({
	  fields:['value', 'name'],
      data:[["string","string"],["boolean","boolean"],["datetime","datetime"],["double","double"],["int","int"],["long","long"]]
	});
	//列的类型
	var event_Plant = Ext.data.Record.create([
           {name:'ID',type:'String'},
           {name:'name',type:'string'},
           {name:'type',type:'string'},
           {name:'value',type:'string'}
    ]);
	//定义数据源
	datamainProperties_store = Ext.create('Ext.data.Store',{  
           fields:['ID','name','type','value'],  
           data:data,  
           proxy:{  
              type:'memory',  
              reader:{  
                  type:'json',  
                  rootProperty:'items'  
              }  
          }  
    })
	this.editing = Ext.create('Ext.grid.plugin.CellEditing',{
    	clicksToEdit:1
    });
	//定义grid编辑列
	datamainProperties_grid = Ext.create('Ext.grid.Panel',{
			store:datamainProperties_store,
			requires:[
		        'Ext.grid.plugin.CellEditing',
		        'Ext.form.field.Text',
		        'Ext.form.field.TextArea',
		        'Ext.toolbar.TextItem'
		    ],
			columnLines:true,
	        multiSelect:true,
	        border:true,
	         /**新方法使用开始**/  
         	scrollable:true,  
         	scrollable:'x',
         	scrollable:'y',
         	region:'center',
	        plugins:[this.editing], 
			viewConfig:{
				emptyText:'暂无数据',
				stripeRows:true
			},
			loadMask:{
				msg:'正在加载...'
			},
			columns:[
				{
					header:'编号',
					dataIndex:'ID',
					flex:1,
	                editor:{
	                    xtype:'textfield'
	                }
				},
				{
					header:'名称',
					dataIndex:'name',
					flex:1,
	                editor:{
		                    xtype:'textfield'
	                }
				},
				{
					header:'类型',
					dataIndex:'type',
					flex:1,
	                editor:{
	                     	xtype:'combo',
		                    name:"name",
				            hiddenName:'name',
				            valueField:"value",
				            displayField:"name",
				            xtype:"combo",
				            anchor:'100%',
				            store:dataPropertiesTypeStore,
				            emptyText:"请选择",
				            mode:"local",
				            triggerAction:"all",
				            editable:false
	                }
				},
				{
					header:'值',
					flex:1,
					dataIndex:'value',
	                editor:{
	                    xtype:'textfield'
	                }
				}
			],
			listeners:{  
			    selectionChange:'selectionChange'  
			},
			//选中的记录发生变化过后的事件  
			selectionChange:function(view, records){  
				datamainProperties_grid.down('#node_datamainpropertiest_del_button').setDisabled(!records.length);
			},
			tbar:[{
				  text:'增 加',
				  minWidth:tbarBtnMinWidth,
				  cls:'addBtn',
				  icon:addIcon,
				  handler:function(){
		            var model = Ext.create(datamainProperties_grid.getStore().model);  
				    /**model.set('','');**/  
				    datamainProperties_grid.getStore().insert(0, model);  
				  }
				 },{
				  text:'删 除',
				  minWidth:tbarBtnMinWidth,
				  cls:'delBtn',
				  icon:delIcon,
				  id:'node_datamainpropertiest_del_button',
				  handler:function(){
					 var model = datamainProperties_grid.getSelectionModel();
					 if(model.selected.length == 0){
						msgTishi("请选择要删除的项");
						return;
					 }
				     Ext.MessageBox.confirm('确定删除', '确定要删除所选项吗？', function(btn) {  
				       if(btn == 'yes'){  
				           datamainProperties_grid.getStore().remove(datamainProperties_grid.getSelectionModel().getSelection());  
				           datamainProperties_grid.getStore().sync();  
				       }  
				     })
				  }
				 }]　　　　　
	}); 
	datamainProperties_store.load(); 
}

//点击确定按钮设置mxgraph中cell属性
var datamainProperties_node_value;
function datamainProperties_setvalue(cell){
	//验证操作
	for(var i=0;i<datamainProperties_grid.getStore().getCount();i++){
		var ID = datamainProperties_grid.store.getAt(i).data.ID;
		var name = datamainProperties_grid.store.getAt(i).data.name;
		var type = datamainProperties_grid.store.getAt(i).data.type;
		var value = datamainProperties_grid.store.getAt(i).data.value;
		if("undefined" == typeof(ID) || null == ID || ID == ""){
			datamainProperties_grid.store.getAt(i).data.ID="";
			datamainProperties_node_value="";
			msgTishi('请输入编号!');
			return false;	
		}
		if("undefined" == typeof(name) || null == name || name == ""){
			datamainProperties_grid.store.getAt(i).data.name="";
			datamainProperties_node_value="";
			msgTishi('请输入名称!');
			return false;	
		}
		if("undefined" == typeof(type) || null == type || type == ""){
			datamainProperties_grid.store.getAt(i).data.type="";
			datamainProperties_node_value="";
			msgTishi('请选择类型!');
			return false;	
		}
		if("undefined" == typeof(value) || null == value || value == ""){
			datamainProperties_grid.store.getAt(i).data.value="";
			datamainProperties_node_value="";
			msgTishi('请输入值!');
			return false;
		}
	}
	//赋值操作
	for(var i=0;i<datamainProperties_grid.getStore().getCount();i++){
		var ID = datamainProperties_grid.store.getAt(i).data.ID;
		var name = datamainProperties_grid.store.getAt(i).data.name;
		var type = datamainProperties_grid.store.getAt(i).data.type;
		var value = datamainProperties_grid.store.getAt(i).data.value;
		if(null != datamainProperties_node_value && "" != dataProperties_node_value){
			datamainProperties_node_value = dataProperties_node_value+"#"+ID+"@"+name+"@"+type+"@"+value;
		}else{
			datamainProperties_node_value = ID+"@"+name+"@"+type+"@"+value;
		}
	}
	//赋值
	if(null != dataProperties_node_value && "" != dataProperties_node_value){
		Ext.getCmp('datamainProperties_node_value').setValue(datamainProperties_node_value);
		datamainProperties_node_value="";
	}
}