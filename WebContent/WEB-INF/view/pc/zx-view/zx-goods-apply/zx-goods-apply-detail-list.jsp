<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/deng/include/include.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>  
<head>  
<meta charset="UTF-8">  
<title>员工培训申请</title>  

	<script type="text/javascript" src="../view/pc/zx-view/zx-goods-apply/zx-goods-apply-detail-list.js"></script> 
	<script type="text/javascript" src="../view/pc/zx-view/zx-goods-apply/zx-goods-apply-detail-add.js"></script>  
	<script type="text/javascript" src="../view/pc/zx-view/zx-goods-apply/zx-goods-apply-detail-update.js"></script>  
	<script type="text/javascript" src="../view/pc/zx-view/zx-goods-apply/zx-goods-apply-detail-detail.js"></script> 
	<script type="text/javascript" src="../view/pc/zx-view/zx-goods-apply/zx-office-apply-list-material.js"></script> 
	
	
	
	
	
	 
	
</head>  
<body>  
	<input type="hidden" id="parent_id" value="${zxGoodsApply.id }">

</body>  
</html> 