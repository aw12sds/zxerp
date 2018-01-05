package jehc.zxmodules.web;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.github.pagehelper.PageInfo;
import jehc.xtmodules.xtcore.base.BaseAction;
import jehc.xtmodules.xtcore.base.BaseSearch;
import jehc.xtmodules.xtcore.util.excel.poi.ExportExcel;
import jehc.xtmodules.xtcore.util.UUID;
import jehc.zxmodules.model.ZxTrainPlan;
import jehc.zxmodules.service.ZxTrainPlanService;

/**
* 月度培训计划 
* 2017-12-29 15:48:18  季建吉
*/
@Controller
@RequestMapping("/zxTrainPlanController")
public class ZxTrainPlanController extends BaseAction{
	@Autowired
	private ZxTrainPlanService zxTrainPlanService;
	/**
	* 载入初始化页面
	* @param zx_train_plan 
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadZxTrainPlan",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadZxTrainPlan(ZxTrainPlan zxTrainPlan,HttpServletRequest request){
		return new ModelAndView("pc/zx-view/zx-train-plan/zx-train-plan-list");
	}
	/**
	* 加载初始化列表数据并分页
	* @param zx_train_plan 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxTrainPlanListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxTrainPlanListByCondition(BaseSearch baseSearch,HttpServletRequest request){
		Map<String, Object> condition = baseSearch.convert();
		commonHPager(condition,request);
		List<ZxTrainPlan> zxTrainPlanList = zxTrainPlanService.getZxTrainPlanListByCondition(condition);
		PageInfo<ZxTrainPlan> page = new PageInfo<ZxTrainPlan>(zxTrainPlanList);
		return outPageStr(page,request);
	}
	/**
	* 获取对象
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxTrainPlanById",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxTrainPlanById(String id,HttpServletRequest request){
		ZxTrainPlan zxTrainPlan = zxTrainPlanService.getZxTrainPlanById(id);
		return outDataStr(zxTrainPlan);
	}
	/**
	* 添加
	* @param zx_train_plan 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/addZxTrainPlan",method={RequestMethod.POST,RequestMethod.GET})
	public String addZxTrainPlan(ZxTrainPlan zxTrainPlan,HttpServletRequest request){
		int i = 0;
		if(null != zxTrainPlan && !"".equals(zxTrainPlan)){
			zxTrainPlan.setId(UUID.toUUID());
			i=zxTrainPlanService.addZxTrainPlan(zxTrainPlan);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 修改
	* @param zx_train_plan 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/updateZxTrainPlan",method={RequestMethod.POST,RequestMethod.GET})
	public String updateZxTrainPlan(ZxTrainPlan zxTrainPlan,HttpServletRequest request){
		int i = 0;
		if(null != zxTrainPlan && !"".equals(zxTrainPlan)){
			i=zxTrainPlanService.updateZxTrainPlan(zxTrainPlan);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 删除
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/delZxTrainPlan",method={RequestMethod.POST,RequestMethod.GET})
	public String delZxTrainPlan(String id,HttpServletRequest request){
		int i = 0;
		if(null != id && !"".equals(id)){
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("id",id.split(","));
			i=zxTrainPlanService.delZxTrainPlan(condition);
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
	@RequestMapping(value="/copyZxTrainPlan",method={RequestMethod.POST,RequestMethod.GET})
	public String copyZxTrainPlan(String id,HttpServletRequest request){
		int i = 0;
		ZxTrainPlan zxTrainPlan = zxTrainPlanService.getZxTrainPlanById(id);
		if(null != zxTrainPlan && !"".equals(zxTrainPlan)){
			zxTrainPlan.setId(UUID.toUUID());
			i=zxTrainPlanService.addZxTrainPlan(zxTrainPlan);
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
	@RequestMapping(value="/exportZxTrainPlan",method={RequestMethod.POST,RequestMethod.GET})
	public void exportZxTrainPlan(String excleData,String excleHeader,String excleText,HttpServletRequest request,HttpServletResponse response){
		ExportExcel exportExcel = new ExportExcel();
		exportExcel.exportExcel(excleData, excleHeader,excleText,response);
	}
}
