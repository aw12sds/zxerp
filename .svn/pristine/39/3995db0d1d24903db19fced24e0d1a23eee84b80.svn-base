package jehc.zxmodules.web;
import java.util.List;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import jehc.zxmodules.model.ZxGoodsApplyDetail;
import jehc.zxmodules.model.ZxOfficeApply;
import jehc.zxmodules.model.ZxOfficeApplyShow;
import jehc.zxmodules.model.ZxUserAndDepartment;
import jehc.zxmodules.service.ZxGoodsApplyDetailService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.task.TaskDefinition;
import org.activiti.engine.task.Task;
import org.apache.commons.lang.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.github.pagehelper.PageInfo;

import jehc.lcmodules.activitiutil.ActivitiUtil;
import jehc.lcmodules.activitiutil.util.Variable;
import jehc.lcmodules.lcmodel.LcApply;
import jehc.lcmodules.lcmodel.LcApproval;
import jehc.lcmodules.lcservice.LcApplyService;
import jehc.lcmodules.lcservice.LcApprovalService;
import jehc.lcmodules.lcservice.LcDeploymentHisService;
import jehc.xtmodules.xtcore.base.BaseAction;
import jehc.xtmodules.xtcore.base.BaseSearch;
import jehc.xtmodules.xtcore.util.excel.poi.ExportExcel;
import jehc.xtmodules.xtmodel.XtConstant;
import jehc.xtmodules.xtmodel.XtUserinfo;
import jehc.xtmodules.xtservice.XtURService;
import jehc.xtmodules.xtcore.util.CommonUtils;
import jehc.xtmodules.xtcore.util.UUID;
import jehc.zxmodules.model.ZxGoodsApply;
import jehc.zxmodules.service.ZxGoodsApplyService;

/**
* 办公用品主表 
* 2018-01-03 11:27:52  季建吉
*/
@Controller
@RequestMapping("/zxGoodsApplyController")
public class ZxGoodsApplyController extends BaseAction{
	@Autowired
	private ZxGoodsApplyService zxGoodsApplyService;
	@Autowired
	private ZxGoodsApplyDetailService zxGoodsApplyDetailService;
	@Autowired
	private LcDeploymentHisService lc_Deployment_HisService;
	@Autowired
	private ActivitiUtil activitiUtil;
	@Autowired
	private XtURService xtURService;
	@Autowired
	private LcApplyService lcApplyService;
	@Autowired
	private LcApprovalService lc_ApprovalService;
	/**
	* 载入初始化页面
	* @param zx_goods_apply 
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadZxGoodsApply",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadZxGoodsApply(ZxGoodsApply zxGoodsApply,HttpServletRequest request){
		return new ModelAndView("pc/zx-view/zx-goods-apply/zx-goods-apply-list");
	}
	/**
	* 加载初始化列表数据并分页
	* @param zx_goods_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxGoodsApplyListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxGoodsApplyListByCondition(BaseSearch baseSearch,HttpServletRequest request){
		Map<String, Object> condition = baseSearch.convert();
		commonHPager(condition,request);
		List<ZxGoodsApply> zxGoodsApplyList = zxGoodsApplyService.getZxGoodsApplyListByCondition(condition);
		PageInfo<ZxGoodsApply> page = new PageInfo<ZxGoodsApply>(zxGoodsApplyList);
		return outPageStr(page,request);
	}
	/**
	* 获取对象
	* @param apply_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxGoodsApplyById",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxGoodsApplyById(String apply_id,HttpServletRequest request){
		ZxGoodsApply zxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(apply_id);
		return outDataStr(zxGoodsApply);
	}
	
	/**
	* 获取用户
	* @param apply_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxUserById",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxUserById(String apply_id,HttpServletRequest request){
		ZxUserAndDepartment zxUserAndDepartment = zxGoodsApplyService.getZxUserAndDeptById(apply_id);
		return outDataStr(zxUserAndDepartment);
	}
	/**
	* 添加
	* @param zx_goods_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/addZxGoodsApply",method={RequestMethod.POST,RequestMethod.GET})
	public String addZxGoodsApply(ZxGoodsApply zxGoodsApply,HttpServletRequest request){
		int i = 0;
		if(null != zxGoodsApply && !"".equals(zxGoodsApply)){
			zxGoodsApply.setApply_id(UUID.toUUID());
			zxGoodsApply.setCreate_date(DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
			i=zxGoodsApplyService.addZxGoodsApply(zxGoodsApply);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 修改
	* @param zx_goods_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/updateZxGoodsApply",method={RequestMethod.POST,RequestMethod.GET})
	public String updateZxGoodsApply(ZxGoodsApply zxGoodsApply,HttpServletRequest request){
		int i = 0;
		if(null != zxGoodsApply && !"".equals(zxGoodsApply)){
			i=zxGoodsApplyService.updateZxGoodsApply(zxGoodsApply);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 删除
	* @param apply_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/delZxGoodsApply",method={RequestMethod.POST,RequestMethod.GET})
	public String delZxGoodsApply(String apply_id,HttpServletRequest request){
		int i = 0;
		if(null != apply_id && !"".equals(apply_id)){
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("apply_id",apply_id.split(","));
			i=zxGoodsApplyService.delZxGoodsApply(condition);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 申领
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/setZxOfficeApplyById",method={RequestMethod.POST,RequestMethod.GET})
	public String setZxOfficeApplyById(String id,HttpServletRequest request){
		int i = 0;
		ZxGoodsApply zxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(id);
		if(null != id && !"".equals(id)){
			String dep_user_id = null;
			Map<String, Object> conditionr = new HashMap<String, Object>();
			conditionr.put("flag", 1);
			List<XtUserinfo> xtUserinfoList = xtURService.getXtURListByCondition(conditionr);
			XtConstant Xt_Constant = getXtConstantCache("zx-office");
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("xt_constant_id", Xt_Constant.getXt_constant_id());
			String lc_his_id = lc_Deployment_HisService.getLcDeploymentHisNewUnique(condition).getId();
			LcApply lc_Apply = new LcApply();
			Map<String, Object> variables = new HashMap<String, Object>();
		    variables.put("taskType","用品审批流程" );
		    variables.put("owner",zxGoodsApply.getUser_id());
		    lc_Apply.setLc_apply_title(getXtU().getXt_userinfo_realName()+"于"+getSimpleDateFormat()+"，提交了一条办公用品使用申请流程");
			lc_Apply.setLc_apply_model_biz_id(zxGoodsApply.getApply_id());
			if(activitiUtil.addApply(lc_his_id, zxGoodsApply.getApply_id(), variables,lc_Apply)){
				zxGoodsApply.setStatus("1");
				i=zxGoodsApplyService.updateZxGoodsApplyStatus(zxGoodsApply);
			}
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	
	/**
	* 审批
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/approvalOfficeApply",method={RequestMethod.POST,RequestMethod.GET})
	public String approval(String task_id,String task_status,String remark,HttpServletRequest request){
		int i = 0;
		if(null != task_id && !"".equals(task_id)){
			Map<String, Object> taskData = activitiUtil.getTask(task_id);
		    Variable variables = new Variable();
		    ZxGoodsApply ZxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(taskData.get("businessKey").toString());
		    String vals = task_status + "," + ZxGoodsApply.getUser_id() + ",";
		    variables.setKeys("status,owner,applyType");
		    variables.setTypes("S,S,S");
		    vals +=3;
		    variables.setValues(vals);
		    String s="aa";
		    Map<String, Object> taskData1= (Map<String, Object>) activitiUtil.getTask(task_id).get("taskVariables");
		    taskData1.get("owner");
		    TaskDefinition t=activitiUtil.getNextTaskDefinition(task_id,s);
			if(activitiUtil.completeTask(task_id, variables)){
				LcApproval lc_approval = new LcApproval();
				Map<String, Object> condition = new HashMap<String, Object>();
				condition.put("processInstance_id", ((Task) taskData.get("task")).getProcessInstanceId());
				List<LcApply> list = lcApplyService.getLcApplyListByCondition(condition);
				if(!list.isEmpty()){
					lc_approval.setLc_apply_id(list.get(0).getLc_apply_id());
				}
				lc_approval.setLc_approval_id(UUID.toUUID());
				lc_approval.setLc_approval_remark(remark);
				lc_approval.setLc_approval_time(CommonUtils.getSimpleDateFormat());
				lc_approval.setLc_status_id(task_status);
				if(task_status.equals("yes")){
					lc_approval.setLc_status_name("审批通过");
					boolean isEnd = activitiUtil.isEnded(((Task) taskData.get("task")).getProcessInstanceId());
					if(isEnd){
						ZxGoodsApply.setStatus("3");
						zxGoodsApplyService.updateZxGoodsApplyStatus(ZxGoodsApply);
					}
				}else{
					lc_approval.setLc_status_name("审批不通过");
					ZxGoodsApply.setStatus("2");
					zxGoodsApplyService.updateZxGoodsApplyStatus(ZxGoodsApply);
				}
				lc_approval.setTaskId(task_id);
				lc_approval.setXt_userinfo_id(CommonUtils.getXtUid());
				lc_ApprovalService.addLcApproval(lc_approval);
				i = 1;
			}else{
				i = 0;
			};
		}
		if(i>0){ 
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
}

}
