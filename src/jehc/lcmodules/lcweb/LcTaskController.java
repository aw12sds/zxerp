package jehc.lcmodules.lcweb;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.activiti.engine.FormService;
import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import jehc.lcmodules.activitiutil.ActivitiUtil;
import jehc.xtmodules.xtcore.allutils.StringUtil;
import jehc.xtmodules.xtcore.base.BaseAction;
import jehc.xtmodules.xtservice.XtUserinfoService;

/**
 * 流程任务管理
 * @author 邓纯杰
 *
 */
@Controller
@RequestMapping("/lcTaskController")
public class LcTaskController extends BaseAction{
	@Autowired
	ActivitiUtil activitiUtil;
	@Autowired
	private FormService formService;
	@Autowired
	private XtUserinfoService xtUserinfoService;
	/**
	* 载入初始化页面
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadLcTask",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadLcProcess(HttpServletRequest request){
		return new ModelAndView("pc/lc-view/lc-task/lc-task-list");
	}
	
	/**
	* 读取所有任务
	* @param request 
	*/
	@SuppressWarnings({ "unchecked", "deprecation" })
	@ResponseBody
	@RequestMapping(value="/getTaskListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getLcApprovalListByCondition(String instanceId,HttpServletRequest request){
		Map<String, Object> condition = new HashMap<String, Object>();
		commonPager(condition, request);
		Map<String, Object> map;
		if(StringUtil.isEmpty(instanceId)){
			map = activitiUtil.getTaskList(condition);
			//map = activitiUtil.getAssigneeTaskPageList(condition);
		}else{
			condition.put("instanceId", instanceId);
			map = activitiUtil.getTaskListByInstanceId(condition);
		}
		List<Task> list = (List<Task>)map.get("TaskList");
		int total = new Integer(map.get("TaskCount").toString());
		JSONArray jsonArray = new JSONArray();  
		Map<String, Object> model = new HashMap<String, Object>();
		for(int i = 0; i < list.size(); i++){
			Task task = list.get(i);
			model.put("category", task.getCategory());

			if(!StringUtil.isEmpty(task.getAssignee())){
				model.put("assignee", xtUserinfoService.getXtUserinfoById(task.getAssignee()).getXt_userinfo_realName());
			}else{
				model.put("assignee", task.getAssignee());
			}
			model.put("description", task.getDescription());
			model.put("executionId", task.getExecutionId());
			model.put("formKey", task.getFormKey());
			model.put("taskId", task.getId());
			model.put("name", task.getName());
			if(!StringUtil.isEmpty(task.getOwner())){
				model.put("owner", xtUserinfoService.getXtUserinfoById(task.getOwner()).getXt_userinfo_realName());
			}else{
				model.put("owner", task.getOwner());
			}
			model.put("parentTaskId", task.getParentTaskId());
			model.put("priority", task.getPriority());
			model.put("processDefinitionId", task.getProcessDefinitionId());
			model.put("processInstanceId", task.getProcessInstanceId());
			model.put("taskDefinitionKey", task.getTaskDefinitionKey());
			model.put("tenantId", task.getTenantId());
			model.put("createTime", task.getCreateTime().toLocaleString());
			model.put("delegationState", task.getDelegationState());
			model.put("dueDate", task.getDueDate());
			model.put("processVariables", task.getProcessVariables());
			model.put("processDefinitionId", task.getProcessDefinitionId());
			model.put("processInstanceId", task.getProcessInstanceId());
            jsonArray.add(model);
		}
		return outPageStr(jsonArray,total, request);
	}
	
	
	/**
	* 设置经办人
	* @param lc_process 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/setAssignee",method={RequestMethod.POST,RequestMethod.GET})
	public String setAssignee(String taskId,String userId,HttpServletRequest request){
		return outAudStr(activitiUtil.setAssignee(taskId, userId));
	} 
	
	/**
	* 设置归属人
	* @param lc_process 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/setOwner",method={RequestMethod.POST,RequestMethod.GET})
	public String setOwner(String taskId,String userId,HttpServletRequest request){
		return outAudStr(activitiUtil.setOwner(taskId, userId));
	} 
	

	/**
	* 设置委托经办人
	* @param lc_process 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/setOwnerAssignee",method={RequestMethod.POST,RequestMethod.GET})
	public String setOwnerAssignee(String taskId,String userId,HttpServletRequest request){
		activitiUtil.setOwner(taskId, getXtUid());
		return outAudStr(activitiUtil.setAssignee(taskId, userId));
	} 
	
	/**
	* 签收任务
	* @param taskId 
	* @param userId 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/claimTask",method={RequestMethod.POST,RequestMethod.GET})
	public String claimTask(String taskId,String userId,HttpServletRequest request){
		return outAudStr(activitiUtil.claimTask(taskId, userId) > 0);
	} 
	
	/**
	* 向组任务中添加成员
	* @param lc_process 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/addGroupUser",method={RequestMethod.POST,RequestMethod.GET})
	public String addGroupUser(String taskId,String userId,HttpServletRequest request){
		return outAudStr(activitiUtil.addGroupUser(taskId, userId));
	} 
	
	/**
	* 向组任务中删除成员
	* @param lc_process 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/deleteGroupUser",method={RequestMethod.POST,RequestMethod.GET})
	public String deleteGroupUser(String taskId,String userId,HttpServletRequest request){
		return outAudStr(activitiUtil.deleteGroupUser(taskId, userId));
	} 
	
	/**
	 * 完成任务
	 * @param taskId
	 * @param userId
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/completeTask",method={RequestMethod.POST,RequestMethod.GET})
	public String completeTask(String taskId,String userId,HttpServletRequest request){
		return outAudStr(activitiUtil.completeTask(taskId));
	}
	
	/**
	* 跳转到审批页面
	* @param lc_process 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/redirectPage",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView redirectPage(String taskId,String formKey,HttpServletRequest request){
		TaskFormData formData = this.formService.getTaskFormData(taskId);
	    String url = formData.getFormKey();
	    ModelAndView mav=new ModelAndView("pc/lc-view/lc-task/"+url);
	    mav.addObject("taskData", activitiUtil.getTask(taskId));
		return mav;
	} 
	
	/**
	* 载入初始化页面(当前用户)
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadAssigneeLcTask",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadAssigneeLcProcess(HttpServletRequest request){
		return new ModelAndView("pc/lc-view/lc-task/lc-task-assignee-list");
	}

	/**
	* 载入初始化页面(当前用户)
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadCandidateLcTask",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadCandidateLcTask(HttpServletRequest request){
		return new ModelAndView("pc/lc-view/lc-task/lc-task-candidate-list");
	}
	
	/**
	* 载入初始化页面(当前用户)
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadCandidateGroupLcTask",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadCandidateGroupLcTask(HttpServletRequest request){
		return new ModelAndView("pc/lc-view/lc-task/lc-task-candidateGroup-list");
	}
	
	/**
	* 读取所有任务(当前用户)
	* @param request 
	*/
	@SuppressWarnings({ "unchecked", "deprecation" })
	@ResponseBody
	@RequestMapping(value="/getAssigneeTaskListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getAssigneeLcApprovalListByCondition(String instanceId,HttpServletRequest request){
		Map<String, Object> condition = new HashMap<String, Object>();
		commonPager(condition, request);
		Map<String, Object> map;
		if(StringUtil.isEmpty(instanceId)){
			condition.put("assignee", getXtUid());
			map = activitiUtil.getAssigneeTaskPageList(condition);
		}else{
			condition.put("instanceId", instanceId);
			map = activitiUtil.getTaskListByInstanceId(condition);
		}
		List<Task> list = (List<Task>)map.get("TaskList");
		int total = new Integer(map.get("TaskCount").toString());
		JSONArray jsonArray = new JSONArray();  
		Map<String, Object> model = new HashMap<String, Object>();
		for(int i = 0; i < list.size(); i++){
			Task task = list.get(i);
			model.put("category", task.getCategory());
			if(!StringUtil.isEmpty(task.getAssignee())){
				model.put("assignee", xtUserinfoService.getXtUserinfoById(task.getAssignee()).getXt_userinfo_realName());
			}else{
				model.put("assignee", task.getAssignee());
			}
			model.put("description", task.getDescription());
			model.put("executionId", task.getExecutionId());
			model.put("formKey", task.getFormKey());
			model.put("taskId", task.getId());
			model.put("name", task.getName());
			if(!StringUtil.isEmpty(task.getOwner())){
				model.put("owner", xtUserinfoService.getXtUserinfoById(task.getOwner()).getXt_userinfo_realName());
			}else{
				model.put("owner", task.getOwner());
			}
			model.put("parentTaskId", task.getParentTaskId());
			model.put("priority", task.getPriority());
			model.put("processDefinitionId", task.getProcessDefinitionId());
			model.put("processInstanceId", task.getProcessInstanceId());
			model.put("taskDefinitionKey", task.getTaskDefinitionKey());
			model.put("tenantId", task.getTenantId());
			model.put("createTime", task.getCreateTime().toLocaleString());
			model.put("delegationState", task.getDelegationState());
			model.put("dueDate", task.getDueDate());
			model.put("processVariables", task.getProcessVariables());
			model.put("processDefinitionId", task.getProcessDefinitionId());
			model.put("processInstanceId", task.getProcessInstanceId());
            jsonArray.add(model);
		}
		return outPageStr(jsonArray,total, request);
	}
}
