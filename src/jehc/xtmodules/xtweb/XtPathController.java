package jehc.xtmodules.xtweb;
import java.util.HashMap;
import java.util.List;
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
import jehc.xtmodules.xtcore.util.CommonUtils;
import jehc.xtmodules.xtcore.util.UUID;
import jehc.xtmodules.xtcore.util.excel.poi.ExportExcel;
import jehc.xtmodules.xtmodel.XtPath;
import jehc.xtmodules.xtservice.XtPathService;

/**
* 文件路径设置; InnoDB free: 4096 kB 
* 2015-09-30 16:29:00  邓纯杰
*/
@Controller
@RequestMapping("/xtPathController")
public class XtPathController extends BaseAction{
	@Autowired
	private XtPathService xtPathService;
	/**
	* 载入初始化页面
	* @param xt_path 
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadXtPath",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadXtPath(XtPath xt_Path,HttpServletRequest request){
		return new ModelAndView("pc/xt-view/xt-path/xt-path-list");
	}
	/**
	* 加载初始化列表数据并分页
	* @param xt_path 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getXtPathListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getXtPathListByCondition(BaseSearch baseSearch,HttpServletRequest request){
		Map<String, Object> condition = baseSearch.convert();
		commonHPager(condition,request);
		List<XtPath> xt_PathList = xtPathService.getXtPathListByCondition(condition);
		PageInfo<XtPath> page = new PageInfo<XtPath>(xt_PathList);
		return outPageStr(page,request);
	}
	/**
	* 获取对象
	* @param xt_path_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getXtPathById",method={RequestMethod.POST,RequestMethod.GET})
	public String getXtPathById(String xt_path_id,HttpServletRequest request){
		XtPath xt_Path = xtPathService.getXtPathById(xt_path_id);
		return outDataStr(xt_Path);
	}
	/**
	* 添加
	* @param xt_path 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/addXtPath",method={RequestMethod.POST,RequestMethod.GET})
	public String addXtPath(XtPath xt_Path,HttpServletRequest request){
		int i = 0;
		if(null != xt_Path && !"".equals(xt_Path)){
			xt_Path.setXt_path_id(UUID.toUUID());
			xt_Path.setXt_time(CommonUtils.getSimpleDateFormat());
			i=xtPathService.addXtPath(xt_Path);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 修改
	* @param xt_path 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/updateXtPath",method={RequestMethod.POST,RequestMethod.GET})
	public String updateXtPath(XtPath xt_Path,HttpServletRequest request){
		int i = 0;
		if(null != xt_Path && !"".equals(xt_Path)){
			i=xtPathService.updateXtPath(xt_Path);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 删除
	* @param xt_path_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/delXtPath",method={RequestMethod.POST,RequestMethod.GET})
	public String delXtPath(String xt_path_id,HttpServletRequest request){
		int i = 0;
		if(null != xt_path_id && !"".equals(xt_path_id)){
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("xt_path_id",xt_path_id.split(","));
			i=xtPathService.delXtPath(condition);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 复制一行并生成记录
	* @param xt_path_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/copyXtPath",method={RequestMethod.POST,RequestMethod.GET})
	public String copyXtPath(String xt_path_id,HttpServletRequest request){
		int i = 0;
		XtPath xt_Path = xtPathService.getXtPathById(xt_path_id);
		xt_Path.setXt_time(CommonUtils.getSimpleDateFormat());
		if(null != xt_Path && !"".equals(xt_Path)){
			xt_Path.setXt_path_id(UUID.toUUID());
			i=xtPathService.addXtPath(xt_Path);
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
	@RequestMapping(value="/exportXtPath",method={RequestMethod.POST,RequestMethod.GET})
	public void exportXtPath(String excleData,String excleHeader,String excleText,HttpServletRequest request,HttpServletResponse response){
		ExportExcel exportExcel = new ExportExcel();
		exportExcel.exportExcel(excleData, excleHeader,excleText,response);
	}
}
