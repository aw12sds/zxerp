var xtMessageWin;
var xtMessageTreePanel;
var xtMessagePanel;
var xtMessageEastPanel;
function initXtMessageWin(){
	Ext.getCmp('xtMessageBtn').setDisabled(true);　
	reGetWidthAndHeight();
	initChattingPanel();
	initXtMessageTreePanel();
	if(xtMessageWin != null){
		xtMessageWin.show();
		return;
	}
	xtMessageWin = Ext.create('Ext.Window',{
		layout:'border',
		width:clientWidth*0.6,                    
		height:clientHeight*0.8,
		closable:false,
		tools:[
		{
			xtype:'button',
			text:'收缩',
			id:'ecBtn',
			handler:function(){
				if(this.text == '收缩'){
					xtMessageWin.collapse();
					this.setText('展开');
				}else{
					xtMessageWin.expand();
					this.setText('收缩');
				}
			}
		},
		{
			xtype:'button',
			text:'最小化',
			style:{marginRight:'4px',marginLeft:'4px'},
			handler:function(){
				xtMessageWin.hide();
				Ext.getCmp('xtMessageBtn').setDisabled(false);　
			}
		},
		{
			xtype:'button',
			text:'关闭',
			style:{marginRight:'4px',marginLeft:'4px'},
			handler:function(){
				xtMessageWin.close();
				xtMessageWin=null;
				Ext.getCmp('xtMessageBtn').setDisabled(false);　
			}
		}
		],
		title:'短消息信息',
		listeners:{
			minimize:function(win,opts){
				win.collapse();
			}
		},
		items:[
			xtMessagePanel,
			xtMessageTreePanel,
			{
				 xtype:'textfield',
				 hidden:true,
				 id:'xt_userinfo_id'
		    }]
	});
	xtMessageWin.show();
}

function initChattingPanel(){
	var htmlEditorHeight = clientHeight*0.24;
	if(getCookie("css") == 'crisp'){
		htmlEditorHeight = clientHeight*0.26;
	}
	var htmlEditor = Ext.create('Ext.form.HtmlEditor',{
        labelSeparator:"：",
		id:'sendMHtmlEditor',
        enableAlignments:false,
        enableColors:true,
        enableFont:false,
        enableFontSize:false,
        enableFormat:false,
        enableLinks:false,
        enableLists:true,
        enableSourceEdit:false,
		height:htmlEditorHeight,
        fontFamilies:["宋体", "隶书", "黑体"]
    });
	xtMessagePanel = Ext.create('Ext.FormPanel',{
        maskDiabled:true,
        region:'center',
        title:'您正在使用短消息...',
        layoutOnTabChange:true,
        autoScroll:false,
        items:[
        Ext.create('Ext.FormPanel',{
		    title:'<font color="green">请勿轻信汇款、中奖和话费充值等信息，谨防受骗。</font>',
		    collapsible:false,
		    height:(clientHeight*0.35),
		    border:false,
		    autoScroll:true,
			bodyStyle:'overflow-x:hidden; overflow-y:scroll',
			id:'MContent',
		    html:''
	    }),
	    Ext.create('Ext.FormPanel',{
	    	region:'south',
	    	collapsible:false,
	    	border:false,
			anchor:'100%',
	    	items:htmlEditor
	    })
        ],
        buttonAlign:'right',
		buttons:[
		{
			xtype:'button',
       		text:'发送...',
       		buttonAlign:'right',
       		id:'sendBtn',
       		handler:function(){
       			sendM();
       		}
		},
		{
			xtype:'button',
       		text:'清屏',
       		buttonAlign:'right',
       		handler:function(){
       			clearmsg();
       		}
		}
		]
    });
}
var xtMessageTreeStore;
function initXtMessageTreePanel(){
	xtMessageTreeStore = Ext.create('Ext.data.TreeStore', {  
	     root:{  
	     	  text:'我的同事',
	     	  expanded:true
         },
         proxy:{  
                type:'ajax',  
                url:'../xtUserinfoController/getChattingUserinfoList',
                reader:{  
                    type:'json',  
                    rootProperty:'items'  
                }  
         }  
	});  
	xtMessageTreePanel = Ext.create('Ext.tree.Panel',{ 
		region:'east',  
        store:xtMessageTreeStore,  
        width:230,
        rootVisible:true, 
        border:true,
        split:true,
        frameHeader:false,
        xtype:'filtered-tree',
        title:'导航目录',
        collapsible:true,
        loadMask:{
			msg:'正在加载...'
		},
        tools:[{
	    	type:'refresh',
	    	tooltip:'刷新',
	    	handler:function(event, toolEl, panelHeader){
	    		freshMessage(xtMessageTreePanel,xtMessageTreeStore);
	    	}
  	    }],
        tbar:[
      		{
      		   width:220,
      		   xtype:'triggerfield',
      		   emptyText:'输入关键字（如“邓”，“周”等）',
      	       triggerCls:'x-form-clear-trigger',
      	       onTriggerClick:function(){
      	           this.reset();
      	       },
      	       listeners:{
      	           change:function(){
      	           	filterBy(xtMessageTreePanel,this.getValue(),'text');
      	           },
      	           buffer:250
      	       }
      		}
      	],
        listeners:{ 
            itemclick:function(node,optd){
            	var leaf = optd.data.leaf;
            	if(leaf == true){
            		xtMessageMenuClick(optd);
            	}
            }
        }
	})
//	xtMessageEastPanel = Ext.create('Ext.Panel',{
//    	region:'east',
//    	collapsible:true,
//    	border:false,
//    	split:true,
//		width:220,
//		hideCollapseTool:true,
//		items:[{
//	        scrollable:true,  
//	        scrollable:'x',
//	        scrollable:'y',
//			items:xtMessageTreePanel
//		}]
//    })
}

//菜单点击事件
function xtMessageMenuClick(node){
	var text = getName(node.data.text);
	var id = node.data.id;
	var xt_userinfo_id = Ext.getCmp('xt_userinfo_id').getValue();
	if(id != xt_userinfo_id){
		clearmsg();
		//并加装与该用户对话记录
		ajaxGetHis(id);
	}
	Ext.getCmp('xt_userinfo_id').setValue(id);
	xtMessagePanel.setTitle("正在与【"+text+"】聊天中");
}

function sendM(){
	var xt_userinfo_id = Ext.getCmp('xt_userinfo_id').getValue();
	if(xt_userinfo_id == null || xt_userinfo_id == ''){
		msgTishi("请选择聊天的用户!")
		Ext.getCmp('sendMHtmlEditor').focus();
		return;
	}
	var sendTime = dt();
	var sendMHtmlEditor = gValue('sendMHtmlEditor');
	if(sendMHtmlEditor == null || sendMHtmlEditor == ''){
		msgTishi("请输入聊天内容!");
		Ext.getCmp('sendMHtmlEditor').focus();
		return;
	}
	Ext.getCmp('sendBtn').setDisabled(true);　
	Ext.Ajax.request({  
		params:{xt_meesage_content:sendMHtmlEditor,to_id:xt_userinfo_id}, 
	    timeout:600000,/**设置超时时间10十分钟**/
	    method:'post',
	    url:'../xtMessageController/addXtMessage',
	    success:function(response,opts){
	    	var MContent = Ext.getCmp('MContent').body.dom.innerHTML;
			var MContentText = Ext.getCmp('MContent').body.dom.innerText;
			if(MContentText == null || MContentText == ''){
				MContent = "";
			}
			Ext.getCmp('MContent').body.update(MContent+"<br><font color='red'>【"+sendTime+"】</font><br>"+sendMHtmlEditor);
			sValue('sendMHtmlEditor','');
			var d=Ext.getCmp('MContent').body.dom;
			d.scrollTop = d.scrollHeight - d.offsetHeight+2;
			Ext.getCmp('sendBtn').setDisabled(false);　
			var obj=Ext.decode(response.responseText);  
			msgTishi(obj.msg);
	    },  
	    failure:function(response,opts){  
	    	Ext.getCmp('sendBtn').setDisabled(false);
	    	msgTishi("消息发送失败!");
	    }  
	});
}

//清空
function clearmsg(){
	Ext.getCmp('MContent').body.update("");
}

//获取历史记录
function ajaxGetHis(xt_userinfo_id){
	Ext.Ajax.request({  
		params:{to_id:xt_userinfo_id}, 
	    timeout:600000,/**设置超时时间10十分钟**/
	    method:'post',
	    url:'../xtMessageController/getXtMessageHisListByCondition',
	    success:function(response,opts){
	    	var respText = Ext.util.JSON.decode(response.responseText).items;
	    	var MContent = "";
	    	for(var i = 0; i < respText.length; i++){
	    		var userSay='';
	    		if(respText[i].to_id != xt_userinfo_id){
	    			userSay='我说：'
	    		}
	    		MContent = MContent + '<font color="red">'+userSay+'【'+respText[i].ctime+'】</font><br>'+respText[i].xt_meesage_content+"<br>";
	    	}
	    	Ext.getCmp('MContent').body.update(MContent+Ext.getCmp('MContent').body.dom.innerHTML);
			var d=Ext.getCmp('MContent').body.dom;
			d.scrollTop = d.scrollHeight - d.offsetHeight+2;
	    },  
	    failure:function(response,opts){  
	    	msgTishi("读取历史记录失败!");
	    }  
	});
}

//去掉所有的html标记
function delHtmlTag(str){
	return str.replace(/<[^>]+>/g,"");
}
//文字闪烁
var cur_col = 0;
function changeColor(){
	var color="red|black";
	color=color.split("|");
	var names = document.getElementsByName("u-zx-name");
	for(i = 0; i < names.length; i++) {
        names[i].style.color=color[cur_col];
    }
	if(cur_col==0)cur_col = 1;
	else cur_col = 0;
}
setInterval("changeColor()",500);

function getName(text){
	var text = delHtmlTag(text);
	var start = text.lastIndexOf("(");
	var name = text;
	if(start > 0&&start < text.length - 1){
		name = text.substring(0,start);
	}
	return name;
}
//统计未读个数
function unReadCount(){
	Ext.Ajax.request({  
	    timeout:600000,/**设置超时时间10十分钟**/
	    method:'post',
	    url:'../xtMessageController/getXtMessageUnReadCount',
	    success:function(response,opts){
	    	var respText = Ext.util.JSON.decode(response.responseText).items;
	    	var count=0;
	    	var version = Math.random();
	    	
	    	for(var i = 0; i < respText.length; i++){
	    		count+=respText[i].count;
	    		
	    		try {
	    			xtMessageTreePanel.getRootNode().eachChild(function(child) { 
		    			if(child.get('id') == respText[i].from_id){
		    				if(child.get('text').length > 30){
		    					var name = getName(child.get('text'));
		    					if(name != ''){
		    						child.set('text','<font color="red" name="u-zx-name" version="'+ version +'">'+ name +'('+ respText[i].count +')</font>');
		    					}
		    				}else{
		    					child.set('text','<font color="red" name="u-zx-name" version="'+ version +'">'+ child.get('text') +'('+ respText[i].count +')</font>');
		    				} 
		    				xtMessageTreePanel.getRootNode().insertChild(0, child);
		    			}
		            })
			　　} catch(error) {}
	    	}
	    	
	    	try {
    			xtMessageTreePanel.getRootNode().eachChild(function(child) {
    				var element= $(child.get('text')).get(0);
    				var jqueryobj=$(element);
				    if(version != jqueryobj.attr("version")){
				    	child.set('text',getName(child.get('text')));
				    }
	    			
	            })
		　　} catch(error) {}
	    	
	    	if(count > 0){
	    		Ext.getCmp('xtMessageBtn').setText("<font color=red>"+count+"</font>");
	    	}else{
	    		Ext.getCmp('xtMessageBtn').setText('');
	    	}
	    },  
	    failure:function(response,opts){}  
	});
}
setInterval(unReadCount,6000); 

function cancleTip(ids){
	$.post('../xtMessageController/updateReadByIds',{ids:ids},function(data){
		Ext.getCmp('tip' + ids).close();
	});
}
//会议提示，2分钟
function unMeetingTip(){
	Ext.Ajax.request({  
	    timeout:600000,/**设置超时时间10十分钟**/
	    method:'post',
	    url:'../xtMessageController/getXtMessageUnRead',
	    success:function(response,opts){
	    	var respText = Ext.util.JSON.decode(response.responseText).items;
	    	for(var i = 0; i < respText.length; i++){
	    		var content = respText[i].xt_meesage_content + '<br><a href="#" onclick="cancleTip(\''+ respText[i].xt_message_id +'\')" style="color:red">不再提醒</a>';
	    		if(content.indexOf('会议【') == 0){
	    			Ext.create('Ext.ux.Notification', {
	    		        title:'会议消息提醒',
	    		        iconCls:'ux-notification-icon-information',
	    		        position:'br',/**br, bl, tr, tl, t, l, b, r  'bc', lc', 'rc', 'tc'**/
	    		        width:220,
	    		        height:120,
	    		        id:'tip' + respText[i].xt_message_id,
	    		        autoCloseDelay:119997,
	    		        manager:'test',
	    		        stickWhileHover:false,
	    		        html:content
	    		     }).show(); 
	    		}
	    	}
	    },  
	    failure:function(response,opts){}  
	});
}
unMeetingTip();
setInterval(unMeetingTip,120000); 
//个人日程提示，3分钟
function unScheduleTip(){
	Ext.Ajax.request({  
	    timeout:600000,/**设置超时时间10十分钟**/
	    method:'post',
	    url:'../xtMessageController/getXtMessageUnRead',
	    success:function(response,opts){
	    	var respText = Ext.util.JSON.decode(response.responseText).items;
	    	for(var i = 0; i < respText.length; i++){
	    		var content = respText[i].xt_meesage_content + '<br><a href="#" onclick="cancleTip(\''+ respText[i].xt_message_id +'\')" style="color:red">不再提醒</a>';
	    		if(content.indexOf('日程提醒：') == 0){
	    			Ext.create('Ext.ux.Notification', {
	    		        title:'个人日程提醒',
	    		        iconCls:'ux-notification-icon-information',
	    		        position:'br',/**br, bl, tr, tl, t, l, b, r  'bc', lc', 'rc', 'tc'**/
	    		        width:220,
	    		        height:120,
	    		        id:'tip' + respText[i].xt_message_id,
	    		        autoCloseDelay:119997,
	    		        manager:'test',
	    		        stickWhileHover:false,
	    		        html:content
	    		     }).show(); 
	    		}
	    	}
	    },  
	    failure:function(response,opts){}  
	});
}
unScheduleTip();
setInterval(unScheduleTip,180000); 

function freshMessage(xtMessageTreePanel,xtMessageTreeStore){
	xtMessageTreeStore.load();
	xtMessageTreeStore.on('load',function(){
		xtMessageTreePanel.expandAll();
    });
}