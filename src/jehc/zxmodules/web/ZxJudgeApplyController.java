package jehc.zxmodules.web;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.task.Task;
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
import jehc.xtmodules.xtcore.util.CommonUtils;
import jehc.xtmodules.xtcore.util.UUID;
import jehc.xtmodules.xtcore.util.excel.poi.ExportExcel;
import jehc.xtmodules.xtmodel.XtConstant;
import jehc.zxmodules.model.ZxJudgeApply;
import jehc.zxmodules.model.ZxJudgeResult;
import jehc.zxmodules.model.ZxSupplier;
import jehc.zxmodules.service.ZxJudgeApplyService;
import jehc.zxmodules.service.ZxJudgeResultService;
import jehc.zxmodules.service.ZxSupplierService;

/**
* 供应商验厂申请单 
* 2017-10-08 22:08:02  a
*/
@Controller
@RequestMapping("/zxJudgeApplyController")
public class ZxJudgeApplyController extends BaseAction{
	@Autowired
	private ZxJudgeApplyService zxJudgeApplyService;
	@Autowired
	private ActivitiUtil activitiUtil;
	@Autowired
	private LcApprovalService lc_ApprovalService;
	@Autowired
	private LcApplyService lcApplyService;
	@Autowired
	private ZxJudgeResultService zxJudgeResultService;
	@Autowired
	private ZxSupplierService zxSupplierService;
	@Autowired
	private LcDeploymentHisService lc_Deployment_HisService;
	
	/**
	* 载入初始化页面
	* @param zx_judge_apply 
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadZxJudgeApply",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadZxJudgeApply(ZxJudgeApply zxJudgeApply,HttpServletRequest request){
		return new ModelAndView("pc/zx-view/zx-judge-apply/zx-judge-apply-list");
	}
	/**
	* 加载初始化列表数据并分页
	* @param zx_judge_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxJudgeApplyListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxJudgeApplyListByCondition(BaseSearch baseSearch,HttpServletRequest request){
		Map<String, Object> condition = baseSearch.convert();
		condition.put("is_connect", "1");
		commonHPager(condition,request);
		List<ZxJudgeApply> zxJudgeApplyList = zxJudgeApplyService.getZxJudgeApplyListByCondition(condition);
		PageInfo<ZxJudgeApply> page = new PageInfo<ZxJudgeApply>(zxJudgeApplyList);
		return outPageStr(page,request);
	}
	/**
	* 获取对象
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxJudgeApplyById",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxJudgeApplyById(String id,HttpServletRequest request){
		ZxJudgeApply zxJudgeApply = zxJudgeApplyService.getZxJudgeApplyById(id);
		return outDataStr(zxJudgeApply);
	}
	
	/**
	* 添加
	* @param zx_judge_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/canApply",method={RequestMethod.POST,RequestMethod.GET})
	public String canApply(String supplier_id,HttpServletRequest request){
		String i = null;
		ZxSupplier zxSupplier = zxSupplierService.getZxSupplierById(supplier_id);
		
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("supplier_id", supplier_id);
		condition.put("num", zxSupplier.getYc_num() + 1);
		condition.put("state", "1");
		
		if(zxSupplier.getYc_num() >= 2){
			i = "5";
		}else if(zxSupplier.getYc_status() == null||zxSupplier.getYc_status().equals("0")){
			i = "0";
		}else if(zxSupplier.getYc_status().equals("1")||zxSupplier.getYc_status().equals("2")||zxSupplier.getYc_status().equals("3")){
			List<ZxJudgeApply> list = zxJudgeApplyService.getZxJudgeApplyListByCondition(condition);
			if(list != null&&!list.isEmpty()){
				 ZxJudgeApply apply = list.get(0);
				 i = apply.getStatus();
			}else{
				 i = "6";
			}
		}else if(zxSupplier.getYc_status().equals("4")){
			i = "7";
		}else if(zxSupplier.getYc_status().equals("5")){
			i = "8";
		}else if(zxSupplier.getYc_status().equals("6")){
			i = "9";
		}else {
			if(zxSupplier.getYc_grade().equals("1"))
				i = "10";
			else if(zxSupplier.getYc_grade().equals("2"))
				i = "11";
			else if(zxSupplier.getYc_grade().equals("3"))
				i = "12";
		}
		return i;
	}
	
	/**
	 * 验厂申请
	 * @param supplier_id
	 * @param status
	 * @param zxJudgeApply
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/addZxJudgeApply", method = { RequestMethod.POST, RequestMethod.GET })
	public String addZxJudgeApply(String supplier_id, String status,Integer num, ZxJudgeApply zxJudgeApply,
			HttpServletRequest request) {
		int i = 0;
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("supplier_id", supplier_id);
		condition.put("num", num);
		condition.put("state", 1);
		List<ZxJudgeApply> applys = zxJudgeApplyService.getZxJudgeApplyListByCondition(condition);
		if (applys == null || applys.size() < 1) {
			if (null != zxJudgeApply) {
				String date = getSimpleDateFormat();
				zxJudgeApply.setId(UUID.toUUID());
				zxJudgeApply.setSupplier_id(supplier_id);
				zxJudgeApply.setStatus(status);
				zxJudgeApply.setState("1");
				zxJudgeApply.setNum(num);
				zxJudgeApply.setApply_user_id(CommonUtils.getXtU().getXt_userinfo_id());
				zxJudgeApply.setCreate_date(date);
				i = zxJudgeApplyService.addZxJudgeApply(zxJudgeApply);
				
				if(i > 0){
					ZxSupplier zxSupplier = zxSupplierService.getZxSupplierById(supplier_id);
					if(status.equals("2")){
						zxSupplier.setYc_status("2");
						i = zxSupplierService.updateZxSupplier(zxSupplier);
						if(i > 0)addApplyLC(status,zxJudgeApply.getId(), date, zxSupplier.getName());
					}else if(status.equals("1")){
						zxSupplier.setYc_status("1");
						i = zxSupplierService.updateZxSupplier(zxSupplier);
					}
				}
			}
		}
		if (i > 0) {
			return outAudStr(true);
		} else {
			return outAudStr(false);
		}
	}

	/**
	 * 修改对象
	 * 
	 * @param id
	 * @param request
	 */
	@ResponseBody
	@RequestMapping(value = "/updateZxJudgeApply", method = { RequestMethod.POST, RequestMethod.GET })
	public String updateZxJudgeApply(String id, String content, String judge_date_start, String judge_date_end,
			String status, HttpServletRequest request) {
		int i = 0;
		ZxJudgeApply apply = zxJudgeApplyService.getZxJudgeApplyById(id);
		if(apply.getStatus().equals("1")||apply.getStatus().equals("4")){
			apply.setContent(content);
			apply.setJudge_date_start(judge_date_start);
			apply.setJudge_date_end(judge_date_end);
			apply.setStatus(status);
			i = zxJudgeApplyService.updateZxJudgeApply(apply);
			if(i > 0){
				ZxSupplier zxSupplier = zxSupplierService.getZxSupplierById(apply.getSupplier_id());
				if(status.equals("2")){
					zxSupplier.setYc_status("2");
					i = zxSupplierService.updateZxSupplier(zxSupplier);
					if(i > 0)addApplyLC( status,apply.getId(), getSimpleDateFormat(),zxSupplier.getName());
				}else if(status.equals("1")){
					zxSupplier.setYc_status("1");
					i = zxSupplierService.updateZxSupplier(zxSupplier);
				}
			}
		}
		if (i > 0) {
			return outAudStr(true);
		} else {
			return outAudStr(false);
		}
	}
	/**
	* 删除
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/delZxJudgeApply",method={RequestMethod.POST,RequestMethod.GET})
	public String delZxJudgeApply(String id,HttpServletRequest request){
		int i = 0;
		if(null != id && !"".equals(id)){
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("id",id.split(","));
			i=zxJudgeApplyService.delZxJudgeApply(condition);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 复制一行并生成记录
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/copyZxJudgeApply",method={RequestMethod.POST,RequestMethod.GET})
	public String copyZxJudgeApply(String id,HttpServletRequest request){
		int i = 0;
		ZxJudgeApply zxJudgeApply = zxJudgeApplyService.getZxJudgeApplyById(id);
		if(null != zxJudgeApply){
			zxJudgeApply.setId(UUID.toUUID());
			i=zxJudgeApplyService.addZxJudgeApply(zxJudgeApply);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 导出
	* @param excleData 
	* @param excleHeader 
	* @param excleText 
	* @param request 
	* @param request 
	*/
	@RequestMapping(value="/exportZxJudgeApply",method={RequestMethod.POST,RequestMethod.GET})
	public void exportZxJudgeApply(String excleData,String excleHeader,String excleText,HttpServletRequest request,HttpServletResponse response){
		ExportExcel exportExcel = new ExportExcel();
		exportExcel.exportExcel(excleData, excleHeader,excleText,response);
	}
	
	/**
	* 审批
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/checkZxJudgeApply",method={RequestMethod.POST,RequestMethod.GET})
	public String checkZxJudgeApply(String task_id,String task_status,String remark,String apply_id,HttpServletRequest request){
		int i = 0;
		if(null != task_id && !"".equals(task_id)){
			Map<String, Object> taskData = activitiUtil.getTask(task_id);
		    ZxJudgeApply apply = zxJudgeApplyService.getZxJudgeApplyById(taskData.get("businessKey").toString());
			if(activitiUtil.completeTask(task_id, new Variable())){
				String date = CommonUtils.getSimpleDateFormat();
				
				LcApproval lc_approval = new LcApproval();
				Map<String, Object> condition = new HashMap<String, Object>();
				condition.put("processInstance_id", ((Task) taskData.get("task")).getProcessInstanceId());
				List<LcApply> list = lcApplyService.getLcApplyListByCondition(condition);
				if(!list.isEmpty()){
					lc_approval.setLc_apply_id(list.get(0).getLc_apply_id());
				}
				lc_approval.setLc_approval_id(UUID.toUUID());
				lc_approval.setLc_approval_remark(remark);
				lc_approval.setLc_approval_time(date);
				lc_approval.setLc_status_id(task_status);
				if(task_status.equals("3")){
					lc_approval.setLc_status_name("审批通过");
				}else{
					lc_approval.setLc_status_name("审批不通过");
				}
				apply.setCheck_user_id(CommonUtils.getXtU().getXt_userinfo_id());
				apply.setCheck_date(date);
				apply.setStatus(task_status);
				zxJudgeApplyService.updateZxJudgeApply(apply);
				
				if(task_status.equals("3")){
					ZxJudgeResult result = new ZxJudgeResult();
					result.setId(UUID.toUUID());
					result.setApply_id(apply_id);
					result.setStatus("1");
					result.setState("1");
					result.setCreate_date(date);
					zxJudgeResultService.addZxJudgeResult(result);
					
					ZxSupplier zxSupplier = zxSupplierService.getZxSupplierById(apply.getSupplier_id());
					zxSupplier.setYc_status("4");
					zxSupplierService.updateZxSupplier(zxSupplier);
				}else if(task_status.equals("4")){
					ZxSupplier zxSupplier = zxSupplierService.getZxSupplierById(apply.getSupplier_id());
					zxSupplier.setYc_status("3");
					zxSupplierService.updateZxSupplier(zxSupplier);
				}
				lc_approval.setTaskId(task_id);
				lc_approval.setXt_userinfo_id(CommonUtils.getXtUid());
				lc_ApprovalService.addLcApproval(lc_approval);
				i = 1;
			}else{
				i = 0;
			};
		}
		return String.valueOf(i);
	}
	
	/**
	 * 获取对象
	 * 
	 * @param id
	 * @param request
	 */
	@ResponseBody
	@RequestMapping(value = "/getZxJudgeApply", method = { RequestMethod.POST, RequestMethod.GET })
	public String getZxJudgeApply(String supplier_id,Integer num, HttpServletRequest request) {
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("supplier_id", supplier_id);
		condition.put("state", 1);
		condition.put("num", num);
		List<ZxJudgeApply> applys = zxJudgeApplyService.getZxJudgeApplyListByCondition(condition);
		ZxJudgeApply apply = null;
		if (applys != null && applys.size() > 0)
			apply = applys.get(0);
		return outDataStr(apply);
	}
	
	private void addApplyLC(String status,String id,String date,String supplier_name){
			//将业务与工作流流程绑定起来
		XtConstant Xt_Constant = getXtConstantCache("zx_judge_apply");
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("xt_constant_id", Xt_Constant.getXt_constant_id());
		String lc_his_id = lc_Deployment_HisService.getLcDeploymentHisNewUnique(condition).getId();
		LcApply lc_Apply = new LcApply();
		lc_Apply.setLc_apply_title(CommonUtils.getXtU().getXt_userinfo_name() + "于"+ date +"，提交了一条验厂申请流程");
		lc_Apply.setLc_apply_model_biz_id(id);
		Map<String, Object> variables = new HashMap<String, Object>();
	    variables.put("taskType","验厂申请审批" );
	    variables.put("description","供应商名称：" + supplier_name);
	    variables.put("owner",CommonUtils.getXtU().getXt_userinfo_id() );
		activitiUtil.addApplySetAssignee(lc_his_id, id, variables,lc_Apply);
	}
}
