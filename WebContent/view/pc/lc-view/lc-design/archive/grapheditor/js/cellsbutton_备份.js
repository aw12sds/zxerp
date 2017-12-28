///////////////////////定义点击节点出现图标开始////////////////////////////
//定义节点处理程序，每个节点在被点击时会显示节点图标。图表是以节点的子类形式存在的。
var taskImg ='../view/pc/lc-view/lc-design/archive/grapheditor/images/activities/48/';
var bingxingImg = '../view/pc/lc-view/lc-design/archive/grapheditor/images/activities/48/exclusiveGateway.png';
function mxVertexToolHandler(state) {
	mxVertexHandler.apply(this, arguments);
};
mxVertexToolHandler.prototype = new mxVertexHandler();
mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;
mxVertexToolHandler.prototype.domNode = null;
//初始化
mxVertexToolHandler.prototype.init = function(){
	mxVertexHandler.prototype.init.apply(this, arguments);
	var cell = this.state.cell;
	//示例中使用div容器显示元素，这样做的目的就是解决IE浏览器中透明度的问题。
	this.domNode = document.createElement('div');
	this.domNode.style.position = 'absolute';
	this.domNode.style.whiteSpace = 'nowrap';
	var md = (mxClient.IS_TOUCH) ? 'touchstart' : 'mousedown';
	//删除按钮
	var img = mxUtils.createImage('../view/pc/lc-view/lc-design/archive/grapheditor/images/tools/clear.png');
	img.setAttribute('title', '删除节点');
	img.style.cursor = 'pointer';
	img.style.width = '16px';
	img.style.height = '16px';
	mxEvent.addListener(img, md,mxUtils.bind(this, function(evt){
			mxEvent.consume(evt);
		})
	);
	mxEvent.addListener(img,'click',
		mxUtils.bind(this, function(evt){
			var graph = this.graph;
			var cell = this.state.cell;
			Ext.MessageBox.confirm('提示', '确定要删除该流程节点?', function (btn) {
                if (btn == 'yes') {
                	graph.removeCells([cell]);
					mxEvent.consume(evt);
                }
           })
		})
	);
	this.domNode.appendChild(img);
	//大小按钮
	if(cell.node_type != 'timerBoundaryEvent' && cell.node_type != 'errorBoundaryEvent'){
		var img = mxUtils.createImage('../view/pc/lc-view/lc-design/archive/grapheditor/images/tools/resize.png');
		img.setAttribute('title', '拖拽节点大小');
		img.style.cursor = 'se-resize';
		img.style.width = '14px';
		img.style.height = '14px';
		//img.style="margin-left:8px;";
		mxEvent.addListener(img, md,mxUtils.bind(this, function(evt){
				this.start(mxEvent.getClientX(evt), mxEvent.getClientY(evt), 7);
				this.graph.isMouseDown = true;
				mxEvent.consume(evt);
			})
		);
		var br = document.createElement('br');  
		this.domNode.appendChild(br);
		var br = document.createElement('br');  
		this.domNode.appendChild(br);
		this.domNode.appendChild(img);
	}
	//移动按钮
	var img = mxUtils.createImage('../view/pc/lc-view/lc-design/archive/grapheditor/images/tools/move.png');
	img.setAttribute('title', '移动节点');
	img.style.cursor = 'move';
	img.style.width = '12px';
	img.style.height = '12px';
	//img.style="margin-left:8px;";
	mxEvent.addListener(img, md,mxUtils.bind(this, function(evt){
			this.graph.graphHandler.start(this.state.cell,mxEvent.getClientX(evt), mxEvent.getClientY(evt));
			this.graph.graphHandler.cellWasClicked = true;
			this.graph.isMouseDown = true;
			mxEvent.consume(evt);
		})
	);
	var br = document.createElement('br');  
	this.domNode.appendChild(br);
	var br = document.createElement('br');  
	this.domNode.appendChild(br);
	this.domNode.appendChild(img);
	//连线按钮
	var img = mxUtils.createImage('../view/pc/lc-view/lc-design/archive/grapheditor/images/tools/edges.png');
	img.setAttribute('title', '连线');
	img.style.cursor = 'pointer';
	img.style.width = '16px';
	img.style.height = '16px';
	//img.style="margin-left:10px;";
	mxEvent.addListener(img, md,mxUtils.bind(this, function(evt){
			var pt = mxUtils.convertPoint(this.graph.container,mxEvent.getClientX(evt), mxEvent.getClientY(evt));
			this.graph.connectionHandler.start(this.state, pt.x, pt.y);
			this.graph.isMouseDown = true;
			mxEvent.consume(evt);
		})
	);
	var br = document.createElement('br');  
	this.domNode.appendChild(br);
	var br = document.createElement('br');  
	this.domNode.appendChild(br);
	this.domNode.appendChild(img);
	if(cell.node_type == 'userTask' || cell.node_type == 'manualTask' || cell.node_type == 'scriptTask' || cell.node_type == 'serviceTask' || cell.node_type == 'mailTask' || cell.node_type == 'receiveTask' || cell.node_type == 'businessRuleTask' || cell.node_type == 'callActivity'){
		//创建一个任务按钮
		var img = mxUtils.createImage('../view/pc/lc-view/lc-design/archive/grapheditor/images/tools/new_task.png');
		img.setAttribute('title', '新建'+cell.value+'节点');
		img.style.cursor = 'pointer';
		img.style.width = '16px';
		img.style.height = '16px';
		mxEvent.addListener(img, md,mxUtils.bind(this, function(evt){
				var timg =  taskImg + cell.node_type+'.png';
				var pt = mxUtils.convertPoint(this.graph.container,mxEvent.getClientX(evt), mxEvent.getClientY(evt));
				var mxcell = this.graph.insertVertex(cell.getParent(), timg, cell.value, pt.x+10, pt.y, 128, 64,'gradientColor=#ffefbb;rounded=true;strokeColor=none;fillColor=#ffefbb;image='+timg+';imageAlign=center;verticalAlign=bottom;'); 
				mxcell.node_type = cell.node_type;
				//连线
　　				this.graph.insertEdge(cell.getParent(), null, null, cell, mxcell);
			})
		);
		var br = document.createElement('br');  
		this.domNode.appendChild(br);
		var br = document.createElement('br');  
		this.domNode.appendChild(br);
		this.domNode.appendChild(img);
	}
	if(cell.node_type != 'pool' && cell.node_type != 'lane'){
		//创建一个排他网关按钮
		var img = mxUtils.createImage('../view/pc/lc-view/lc-design/archive/grapheditor/images/tools/new_gateway_xor_data.png');
		img.style.cursor = 'pointer';
		img.setAttribute('title', '排他网关');
		img.style.width = '16px';
		img.style.height = '16px';
		mxEvent.addListener(img, md,mxUtils.bind(this, function(evt){
				var pt = mxUtils.convertPoint(this.graph.container,mxEvent.getClientX(evt), mxEvent.getClientY(evt));
				//如果是边界事件 则parent为边界的父节点的父节点即爷爷
				if(cell.node_type == 'timerBoundaryEvent'
					||cell.node_type == 'errorBoundaryEvent'
					||cell.node_type == 'messageBoundaryEvent'
					||cell.node_type == 'cancelBoundaryEvent'
					||cell.node_type == 'compensationBoundaryEvent'
					||cell.node_type == 'signalBoundaryEvent'){
					var mxcell = this.graph.insertVertex(cell.getParent().getParent(), '../view/pc/lc-view/lc-design/archive/grapheditor/images/activities/48/parallelGateway.png', '排他网关', pt.x+10, pt.y, 128, 64,'gradientColor=#ffefbb;rounded=true;strokeColor=none;fillColor=#ffefbb;image=../view/pc/lc-view/lc-design/archive/grapheditor/images/activities/48/parallelGateway.png;imageAlign=center;verticalAlign=bottom;'); 
					mxcell.node_type = 'exclusiveGateway';
					//虚线连线
		　　			this.graph.insertEdge(cell.getParent(), null, null, cell, mxcell, 'dashed=1;'+ 
								'startArrow=oval;endArrow=block;sourcePerimeterSpacing=4;startFill=0;endFill=0;');
				}else{
					var mxcell = this.graph.insertVertex(cell.getParent(), '../view/pc/lc-view/lc-design/archive/grapheditor/images/activities/48/parallelGateway.png', '排他网关', pt.x+10, pt.y, 128, 64,'gradientColor=#ffefbb;rounded=true;strokeColor=none;fillColor=#ffefbb;image=../view/pc/lc-view/lc-design/archive/grapheditor/images/activities/48/parallelGateway.png;imageAlign=center;verticalAlign=bottom;'); 
					mxcell.node_type = 'exclusiveGateway';
					//虚线连线
		　　			this.graph.insertEdge(cell.getParent(), null, null, cell, mxcell, 'dashed=1;'+ 
								'startArrow=oval;endArrow=block;sourcePerimeterSpacing=4;startFill=0;endFill=0;');
				}
			})
		);
		var br = document.createElement('br');  
		this.domNode.appendChild(br);
		var br = document.createElement('br');  
		this.domNode.appendChild(br);
		this.domNode.appendChild(img);
		
		//创建一个并行网关按钮
		var img = mxUtils.createImage('../view/pc/lc-view/lc-design/archive/grapheditor/images/tools/gateway_parallel.png');
		img.style.cursor = 'pointer';
		img.setAttribute('title', '并行网关');
		img.style.width = '16px';
		img.style.height = '16px';
		mxEvent.addListener(img, md,mxUtils.bind(this, function(evt){
				var pt = mxUtils.convertPoint(this.graph.container,mxEvent.getClientX(evt), mxEvent.getClientY(evt));
				//如果是边界事件 则parent为边界的父节点的父节点即爷爷
				if(cell.node_type == 'timerBoundaryEvent'
					||cell.node_type == 'errorBoundaryEvent'
					||cell.node_type == 'messageBoundaryEvent'
					||cell.node_type == 'cancelBoundaryEvent'
					||cell.node_type == 'compensationBoundaryEvent'
					||cell.node_type == 'signalBoundaryEvent'){
					var mxcell = this.graph.insertVertex(cell.getParent(), bingxingImg, '并行网关', pt.x+10, pt.y, 128, 64,'gradientColor=#ffefbb;rounded=true;strokeColor=none;fillColor=#ffefbb;image='+bingxingImg+';imageAlign=center;verticalAlign=bottom;'); 
					mxcell.node_type = 'parallelGateway';
					//虚线连线
		　　			this.graph.insertEdge(cell.getParent().getParent(), null, null, cell, mxcell, 'dashed=1;'+ 
								'startArrow=oval;endArrow=block;sourcePerimeterSpacing=4;startFill=0;endFill=0;');
				}else{
					var mxcell = this.graph.insertVertex(cell.getParent(), bingxingImg, '并行网关', pt.x+10, pt.y, 128, 64,'gradientColor=#ffefbb;rounded=true;strokeColor=none;fillColor=#ffefbb;image='+bingxingImg+';imageAlign=center;verticalAlign=bottom;'); 
					mxcell.node_type = 'parallelGateway';
					//虚线连线
		　　			this.graph.insertEdge(cell.getParent(), null, null, cell, mxcell, 'dashed=1;'+ 
								'startArrow=oval;endArrow=block;sourcePerimeterSpacing=4;startFill=0;endFill=0;');
				}
			})
		);
		var br = document.createElement('br');  
		this.domNode.appendChild(br);
		var br = document.createElement('br');  
		this.domNode.appendChild(br);
		this.domNode.appendChild(img);
	}
	//将节点添加到容器
	this.graph.container.appendChild(this.domNode);
	this.redrawTools();
};
//重绘
mxVertexToolHandler.prototype.redraw = function(){
	mxVertexHandler.prototype.redraw.apply(this);
	this.redrawTools();
};
//重绘工具
mxVertexToolHandler.prototype.redrawTools = function(){
	if (this.state != null && this.domNode != null){
		var dy = (mxClient.IS_VML && document.compatMode == 'CSS1Compat') ? 20 : 14;
		this.domNode.style.left = (this.state.x + this.state.width) + 'px';
		this.domNode.style.top = (this.state.y - 16) + 'px';
		/**
		var dy = (mxClient.IS_VML && document.compatMode == 'CSS1Compat') ? 20 : 4;
		this.domNode.style.left = (this.state.x + this.state.width - 56) + 'px';
		this.domNode.style.top = (this.state.y + this.state.height + dy) + 'px';
		**/
	}
};
//删除元素
mxVertexToolHandler.prototype.destroy = function(sender, me){
	mxVertexHandler.prototype.destroy.apply(this, arguments);
	if (this.domNode != null){
		this.domNode.parentNode.removeChild(this.domNode);
		this.domNode = null;
	}
};

////////在main中使用方法
function initcellClickShowIcon(graph){
	graph.createHandler = function(state){
		if(state != null && this.model.isVertex(state.cell)) {
			return new mxVertexToolHandler(state);
		}
		return mxGraph.prototype.createHandler.apply(this, arguments);
	};
}
///////////////////////定义点击节点出现图标结束////////////////////////////











///////////////////////定义鼠标移动到节点出现图标开始////////////////////////////
var iconTolerance = 20;
function mxIconSet(state){
	var cell = state.cell;
	this.images = [];
	var graph = state.view.graph;
	var md = (mxClient.IS_TOUCH) ? 'touchstart' : 'mousedown';
	//1删除
	var img = mxUtils.createImage('../view/pc/lc-view/lc-design/archive/grapheditor/images/tools/clear.png');
	img.setAttribute('title', '删除节点');
	img.style.position = 'absolute';
	img.style.cursor = 'pointer';
	img.style.width = '16px';
	img.style.height = '16px';
	img.style.left = (state.x + state.width) + 'px';
	img.style.top = (state.y - 16) + 'px';
	mxEvent.addListener(img, md,mxUtils.bind(this, function(evt){
			mxEvent.consume(evt);
		})
	);
	mxEvent.addListener(img, 'click',
		mxUtils.bind(this, function(evt){
			var thz = this;
			Ext.MessageBox.confirm('提示', '确定要删除该流程节点?', function (btn) {
                if (btn == 'yes') {
                	graph.removeCells([state.cell]);
					mxEvent.consume(evt);
					thz.destroy();
                }
           })
		})
	);
	state.view.graph.container.appendChild(img);
	this.images.push(img);
	
	//2设置
	var img = mxUtils.createImage('../view/pc/lc-view/lc-design/archive/grapheditor/images/tools/wrench_orange.png');
	img.setAttribute('title', '设置节点');
	img.style.position = 'absolute';
	img.style.cursor = 'pointer';
	img.style.width = '16px';
	img.style.height = '16px';
	img.style.left = (state.x + state.width-20) + 'px';
	img.style.top = (state.y - 16) + 'px';
	mxEvent.addListener(img, md,mxUtils.bind(this, function(evt){
			mxEvent.consume(evt);
		})
	);
	mxEvent.addListener(img, 'click',
		mxUtils.bind(this, function(evt){
			var thz = this;
			var cell = state.cell;
			//记得重新获取该方法
           	if (cell!=null) { 
				 if(!cell.edge){
				 	//非连线节点
				 	setNodeAttribute(cell,graph);
				 }else{
				 	//是连线节点
				 	if(null == cell.source || "" == cell.source){
				 		msgTishi("该连线没有指定源节点!");
				 	}else if(null == cell.target || "" == cell.target){
				 		msgTishi("该连线没有指定目标节点!");
				 	}else{
				 		var childsCellEdgs=cell.source.edges;
                        for(var i=0;i<childsCellEdgs.length;i++){
                            if(childsCellEdgs[i].source.id==cell.source.id){
                               showTransitionNodeAttributeWin(cell,graph);
                               return;
                            }
                            if(childsCellEdgs[i].target.id==cell.target.id){
                               //连线的下一个节点类型
                               var node_type = childsCellEdgs[i].target.node_type;
                            }
                        }
				 	}
				 }
            }else{
            	msgTishi("您没有选择节点!请选择!");
            }
		})
	);
	state.view.graph.container.appendChild(img);
	this.images.push(img);
	/**
	//新建一个节点
	if(cell.node_type == 'userTask' || cell.node_type == 'manualTask' || cell.node_type == 'scriptTask' || cell.node_type == 'serviceTask' || cell.node_type == 'mailTask' || cell.node_type == 'receiveTask' || cell.node_type == 'businessRuleTask' || cell.node_type == 'callActivity'){
		//创建一个任务按钮
		var img = mxUtils.createImage('../view/pc/lc-view/lc-design/archive/grapheditor/images/tools/new_task.png');
		img.setAttribute('title', '新建'+cell.value+'节点');
		img.style.position = 'absolute';
		img.style.cursor = 'pointer';
		img.style.width = '16px';
		img.style.height = '16px';
		img.style.left = (state.x + state.width) + 'px';
		img.style.top = (state.y + state.height) + 'px';
		mxEvent.addListener(img, md,mxUtils.bind(this, function(evt){
				var timg =  taskImg + cell.node_type+'.png';
				var pt = mxUtils.convertPoint(this.graph.container,mxEvent.getClientX(evt), mxEvent.getClientY(evt));
				var mxcell = this.graph.insertVertex(this.graph.getDefaultParent(), timg, cell.value, pt.x+10, pt.y, 128, 64,'rounded=true;strokeColor=none;fillColor=#FFFFE0;image='+timg+';imageAlign=center;verticalAlign=bottom;'); 
				mxcell.node_type = cell.node_type;
			})
		);
		state.view.graph.container.appendChild(img);
		this.images.push(img);
	}
	**/
};
mxIconSet.prototype.destroy = function(){
	if (this.images != null){
		for(var i = 0; i < this.images.length; i++){
			var img = this.images[i];
			img.parentNode.removeChild(img);
		}
	}
	this.images = null;
};
function initmouseOverIcon(graph){
	graph.addMouseListener({
	    currentState: null,
	    currentIconSet: null,
	    mouseDown: function(sender, me){
	       	if (this.currentState != null){
         		this.dragLeave(me.getEvent(), this.currentState);
         		this.currentState = null;
	       	}
	    },
	    mouseMove: function(sender, me){
	    	if (this.currentState != null && (me.getState() == this.currentState ||
	    		me.getState() == null)){
	    		var tol = iconTolerance;
	    		var tmp = new mxRectangle(me.getGraphX() - tol,
	    			me.getGraphY() - tol, 2 * tol, 2 * tol);
	    		if (mxUtils.intersects(tmp, this.currentState)){
	    			return;
	    		}
	    	}
			var tmp = graph.view.getState(me.getCell());
			if (graph.isMouseDown || (tmp != null && !graph.getModel().isVertex(tmp.cell))){
				tmp = null;
			}
	      	if (tmp != this.currentState){
	        	if (this.currentState != null){
	          		this.dragLeave(me.getEvent(), this.currentState);
	        	}
	       		this.currentState = tmp;
	        	if (this.currentState != null){
	          		this.dragEnter(me.getEvent(), this.currentState);
	        	}
	      	}
	    },
	    mouseUp: function(sender, me) { },
	    dragEnter: function(evt, state){
	    	if (this.currentIconSet == null){
	   			this.currentIconSet = new mxIconSet(state);
	    	}
	    },
	    dragLeave: function(evt, state){
	    	if (this.currentIconSet != null){
	   			this.currentIconSet.destroy();
	   			this.currentIconSet = null;
	    	}
	    }
	});
}
///////////////////////定义鼠标移动到节点出现图标结束////////////////////////////


//////////////////panel展开收开始////////////
var collapsibleflag= 0;  
function collapsibleCE(flag){
	if(flag == 0){
		if (collapsibleflag=== 1) {  
	        Ext.getCmp('leftPanel').collapse();//panel收缩
	        Ext.getCmp('leftPanel').setTitle('<a href="javascript:collapsibleCE(0);"><font color="#5fa2dd">工作流设计器</font></a>');
	        collapsibleflag= 0;
	    } else {  
	        Ext.getCmp('leftPanel').expand();//panel展开
	        Ext.getCmp('leftPanel').setTitle('<font color="#fff">工作流设计器</font>');
	        collapsibleflag = 1;
	    }
	}
	if(flag == 1){
		if (collapsibleflag=== 1) {  
	        Ext.getCmp('eastPanel').collapse();//panel收缩
	        Ext.getCmp('eastPanel').setTitle('<a href="javascript:collapsibleCE(1);"><font color="#5fa2dd">流程基本信息</font></a>');
	        collapsibleflag= 0;
	    } else {  
	        Ext.getCmp('eastPanel').expand();//panel展开
	        Ext.getCmp('eastPanel').setTitle('<font color="#fff">流程基本信息</font>');
	        collapsibleflag = 1;
	    }
	}
}
/////////////////panel展开结束//////////////