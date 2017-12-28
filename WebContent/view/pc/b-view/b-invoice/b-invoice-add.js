var bInvoiceWinAdd;
var bInvoiceFormAdd;
function addBInvoice(){
	initBInvoiceFormAdd();
	bInvoiceWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
		height:400,
		maximized:true,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'添加信息',
		listeners:{
			minimize:function(win,opts){
				win.collapse();
			}
		},
		items:bInvoiceFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(bInvoiceFormAdd,'../bInvoiceController/addBInvoice',grid,bInvoiceWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	bInvoiceWinAdd.show();
	Ext.getCmp('b_member_id_').setValue($('#b_member_id').val());
}
function initBInvoiceFormAdd(){
	bInvoiceFormAdd = Ext.create('Ext.FormPanel',{
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
			fieldLabel:'发票类型',
			name:'b_invoice_type',
			xtype:"combo",
            store:[["0","普通发票"],["1","增值税发票"]],
            emptyText:"请选择",
            mode:"local",
            value:'0',
            triggerAction:"all",
            editable:false,
            name:'b_invoice_type',
			hiddenName:'b_invoice_type',
			allowBlank:false,
			width:200
		},
		{
			fieldLabel:'发票名称',
			xtype:'textfield',
			name:'b_invoice_name',
			maxLength:100,
			anchor:'100%'
		},
		{
			fieldLabel:'发票公司',
			xtype:'textfield',
			name:'b_invoice_company',
			maxLength:200,
			anchor:'100%'
		},
		{
			fieldLabel:'发票单号',
			xtype:'textfield',
			name:'b_invoice_num',
			maxLength:30,
			anchor:'100%'
		},
		{
			fieldLabel:'状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态',
			name:'b_invoice_status',
			xtype:"combo",
            store:[["0","正常"],["1","已取消"]],
            emptyText:"请选择",
            mode:"local",
            value:'0',
            triggerAction:"all",
            editable:false,
            name:'b_invoice_status',
			hiddenName:'b_invoice_status',
			allowBlank:false,
			width:200
		},
		{
			fieldLabel:'会员编号',
			xtype:'textfield',
			hidden:true,
			id:'b_member_id_',
			name:'b_member_id',
			maxLength:32,
			anchor:'100%'
		},
		{
			fieldLabel:'开户银行',
			xtype:'textfield',
			name:'b_invoice_bank',
			maxLength:50,
			width:200
		},
		{
			fieldLabel:'银行账号',
			xtype:'textfield',
			name:'b_invoice_bank_num',
			maxLength:25,
			width:200
		},
		{
			fieldLabel:'联系电话',
			xtype:'textfield',
			name:'b_invoice_tel',
			maxLength:25,
			width:200
		},
		{
			fieldLabel:'省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份',
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
                	Ext.getCmp('xt_cityID').setValue("");
		         	Ext.getCmp('xt_districtID').setValue("");
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
                	Ext.getCmp('xt_districtID').setValue("");
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
			xtype:'textareafield',
			name:'b_invoice_address',
			maxLength:200,
			anchor:'100%'
		}
		]
	});
}
