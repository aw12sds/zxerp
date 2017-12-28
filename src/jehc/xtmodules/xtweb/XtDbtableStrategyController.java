package jehc.xtmodules.xtweb;
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
import jehc.xtmodules.xtcore.util.UUID;
import jehc.xtmodules.xtcore.util.excel.poi.ExportExcel;
import jehc.xtmodules.xtmodel.XtDbtableStrategy;
import jehc.xtmodules.xtservice.XtDbtableStrategyService;

/**
* 分表策略表 
* 2017-02-14 16:23:48  邓纯杰
*/
@Controller
@RequestMapping("/xtDbtableStrategyController")
public class XtDbtableStrategyController extends BaseAction{
	@Autowired
	private XtDbtableStrategyService xtDbtableStrategyService;
	/**
	* 载入初始化页面
	* @param xt_dbtable_strategy 
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadXtDbtableStrategy",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadXtDbtableStrategy(XtDbtableStrategy xt_Dbtable_Strategy,HttpServletRequest request){
		return new ModelAndView("pc/xt-view/xt-dbtable-strategy/xt-dbtable-strategy-list");
	}
	/**
	* 加载初始化列表数据并分页
	* @param xt_dbtable_strategy 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getXtDbtableStrategyListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getXtDbtableStrategyListByCondition(BaseSearch baseSearch,HttpServletRequest request){
		Map<String, Object> condition = baseSearch.convert();
		commonHPager(condition,request);
		List<XtDbtableStrategy> xt_Dbtable_StrategyList = xtDbtableStrategyService.getXtDbtableStrategyListByCondition(condition);
		PageInfo<XtDbtableStrategy> page = new PageInfo<XtDbtableStrategy>(xt_Dbtable_StrategyList);
		return outPageStr(page,request);
	}
	/**
	* 获取对象
	* @param xt_dbtable_strategy_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getXtDbtableStrategyById",method={RequestMethod.POST,RequestMethod.GET})
	public String getXtDbtableStrategyById(String xt_dbtable_strategy_id,HttpServletRequest request){
		XtDbtableStrategy xt_Dbtable_Strategy = xtDbtableStrategyService.getXtDbtableStrategyById(xt_dbtable_strategy_id);
		return outDataStr(xt_Dbtable_Strategy);
	}
	/**
	* 添加
	* @param xt_dbtable_strategy 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/addXtDbtableStrategy",method={RequestMethod.POST,RequestMethod.GET})
	public String addXtDbtableStrategy(XtDbtableStrategy xt_Dbtable_Strategy,HttpServletRequest request){
		int i = 0;
		if(null != xt_Dbtable_Strategy && !"".equals(xt_Dbtable_Strategy)){
			xt_Dbtable_Strategy.setXt_dbtable_strategy_id(UUID.toUUID());
			xt_Dbtable_Strategy.setCTime(getSimpleDateFormat());
			i=xtDbtableStrategyService.addXtDbtableStrategy(xt_Dbtable_Strategy);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 修改
	* @param xt_dbtable_strategy 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/updateXtDbtableStrategy",method={RequestMethod.POST,RequestMethod.GET})
	public String updateXtDbtableStrategy(XtDbtableStrategy xt_Dbtable_Strategy,HttpServletRequest request){
		int i = 0;
		if(null != xt_Dbtable_Strategy && !"".equals(xt_Dbtable_Strategy)){
			xt_Dbtable_Strategy.setCTime(getSimpleDateFormat());
			i=xtDbtableStrategyService.updateXtDbtableStrategy(xt_Dbtable_Strategy);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 删除
	* @param xt_dbtable_strategy_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/delXtDbtableStrategy",method={RequestMethod.POST,RequestMethod.GET})
	public String delXtDbtableStrategy(String xt_dbtable_strategy_id,HttpServletRequest request){
		int i = 0;
		if(null != xt_dbtable_strategy_id && !"".equals(xt_dbtable_strategy_id)){
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("xt_dbtable_strategy_id",xt_dbtable_strategy_id.split(","));
			i=xtDbtableStrategyService.delXtDbtableStrategy(condition);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 复制一行并生成记录
	* @param xt_dbtable_strategy_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/copyXtDbtableStrategy",method={RequestMethod.POST,RequestMethod.GET})
	public String copyXtDbtableStrategy(String xt_dbtable_strategy_id,HttpServletRequest request){
		int i = 0;
		XtDbtableStrategy xt_Dbtable_Strategy = xtDbtableStrategyService.getXtDbtableStrategyById(xt_dbtable_strategy_id);
		if(null != xt_Dbtable_Strategy && !"".equals(xt_Dbtable_Strategy)){
			xt_Dbtable_Strategy.setXt_dbtable_strategy_id(UUID.toUUID());
			i=xtDbtableStrategyService.addXtDbtableStrategy(xt_Dbtable_Strategy);
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
	@RequestMapping(value="/exportXtDbtableStrategy",method={RequestMethod.POST,RequestMethod.GET})
	public void exportXtDbtableStrategy(String excleData,String excleHeader,String excleText,HttpServletRequest request,HttpServletResponse response){
		ExportExcel exportExcel = new ExportExcel();
		exportExcel.exportExcel(excleData, excleHeader,excleText,response);
	}
}
