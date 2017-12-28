package jehc.lcmodules.activitiutil.util;

import java.util.List;

import jehc.lcmodules.activitiutil.ActivitiUtil;
import jehc.xtmodules.xtcore.util.CommonUtils;
import jehc.xtmodules.xtmodel.XtDepartinfo;
import jehc.xtmodules.xtmodel.XtUserinfo;
import jehc.xtmodules.xtservice.XtDepartinfoService;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.ExecutionListener;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 
 * @author 邓纯杰
 */
@Service("myNextExecutionListener")
public class MyNextExecutionListener implements ExecutionListener, TaskListener  {
	private static final long serialVersionUID = 1L;

	@Autowired
	ActivitiUtil activitiUtil;
	@Autowired
	XtDepartinfoService xtDepartinfoService;
	
	private Expression message;  
	  
    public Expression getMessage() {  
        return message;  
    }  
  
    public void setMessage(Expression message) {  
        this.message = message;  
    }  
    
	@Override
	public void notify(DelegateExecution execution) throws Exception {
		System.out.println("--------------------------开始审批--------------------------");
		//获得当前登录人部门负责人
		XtUserinfo  xtUserinfo = CommonUtils.getXtU();
		String departId = xtUserinfo.getXt_departinfo_id();
		
		XtDepartinfo departinfo = xtDepartinfoService.getXtDepartinfoById(departId);
		System.out.println(message.getValue(execution)+departinfo.getXt_company_id());
		
		List<Task> taskList = activitiUtil.getCurrentTaskList(execution.getProcessInstanceId());
		activitiUtil.setAssignee(taskList.get(0).getId(), xtUserinfo.getXt_userinfo_id());
	}

	@Override
	public void notify(DelegateTask delegateTask) {
		  System.out.println("任务监听器:" + message.getValue(delegateTask));  
	}  
	
}
