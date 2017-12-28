package jehc.xtmodules.xtcore.util.quartz.task;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.SchedulerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jehc.xtmodules.xtcore.util.CommonUtils;
import jehc.xtmodules.xtcore.util.UUID;
import jehc.xtmodules.xtcore.util.springutil.SpringUtil;
import jehc.xtmodules.xtmodel.XtMessage;
import jehc.xtmodules.xtmodel.XtQuartz;
import jehc.xtmodules.xtservice.XtMessageService;
import jehc.xtmodules.xtservice.XtQuartzService;
import jehc.zxmodules.model.ZxScheduleDay;
import jehc.zxmodules.service.ZxScheduleDayService;

public class Zx_Schedule_Tishi_Task extends Thread{
	Logger logger = LoggerFactory.getLogger(this.getClass());
	private String jobId = null;
	private String scheduleDay_id = null;
	public Zx_Schedule_Tishi_Task(String jobId,String scheduleDay_id){
		this.scheduleDay_id = scheduleDay_id;
		this.jobId = jobId;
	}
	public Zx_Schedule_Tishi_Task(){
	}
	/**
	 * 业务逻辑处理
	 */
	public void service(String jobId) {
		String[] ids = jobId.split("&N");
		if(null != ids&&ids.length > 1){
			this.scheduleDay_id = ids[1];
			this.jobId = jobId;
			new Zx_Schedule_Tishi_Task(jobId,ids[1]).start();
		}
	}
	public void run(){
		try {
			excute();
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
	
	public void excute() throws SchedulerException{
		addScheduleDay();
	}
	private void addScheduleDay() throws SchedulerException{

		String date = CommonUtils.getSimpleDateFormat();
		XtMessage xtMessage = new XtMessage();
		ZxScheduleDayService zxScheduleDayService = (ZxScheduleDayService)SpringUtil.getBean("zxScheduleDayService");
		ZxScheduleDay zxScheduleDay = zxScheduleDayService.getZxScheduleDayById((this.scheduleDay_id));
		String msg = "日程提醒："+zxScheduleDay.getTransaction_content()+"，在"+zxScheduleDay.getDate()+" "+zxScheduleDay.getBegin_time()+"开始。";
		xtMessage.setXt_message_id(UUID.toUUID());
		xtMessage.setTo_id(zxScheduleDay.getUser_id());
		xtMessage.setXt_meesage_content(msg);
		xtMessage.setIsread("0");
		xtMessage.setCtime(date);
		XtMessageService xtMessageService = (XtMessageService)SpringUtil.getBean("xtMessageService");
		xtMessageService.addXtMessage(xtMessage);
	    //删除定时任务
	    XtQuartzService xtQuartzService = (XtQuartzService)SpringUtil.getBean("xtQuartzService");
	    Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("jobId",jobId );
	    List<XtQuartz> quarts = xtQuartzService.getXtQuartzListAllByCondition(condition);
	    if(null != quarts && quarts.size() > 0){
	    	String[] ids = new String[quarts.size()];
	    	for(int i=0;i<quarts.size();i++){
	    		ids[i] = quarts.get(i).getId();
	    	}
	    	condition.put("id",ids);
	    	xtQuartzService.delXtQuartz(condition);
	    }
	}
}
