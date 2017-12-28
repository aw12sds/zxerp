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
import jehc.zxmodules.model.ZxCar;
import jehc.zxmodules.service.ZxCarService;

/**
* 车辆管理 
* 2017-09-14 10:21:06  陆建
*/
@Controller
@RequestMapping("/zxCarController")
public class ZxCarController extends BaseAction{
	@Autowired
	private ZxCarService zxCarService;
	/**
	* 载入初始化页面
	* @param zx_car 
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadZxCar",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadZxCar(ZxCar zxCar,HttpServletRequest request){
		return new ModelAndView("pc/zx-view/zx-car/zx-car-list");
	}
	/**
	* 加载初始化列表数据并分页
	* @param zx_car 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxCarListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxCarListByCondition(BaseSearch baseSearch,HttpServletRequest request){
		Map<String, Object> condition = baseSearch.convert();
		commonHPager(condition,request);
		List<ZxCar> zxCarList = zxCarService.getZxCarListByCondition(condition);
		PageInfo<ZxCar> page = new PageInfo<ZxCar>(zxCarList);
		return outPageStr(page,request);
	}
	/**
	* 获取对象
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxCarById",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxCarById(String id,HttpServletRequest request){
		ZxCar zxCar = zxCarService.getZxCarById(id);
		return outDataStr(zxCar);
	}
	/**
	* 添加
	* @param zx_car 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/addZxCar",method={RequestMethod.POST,RequestMethod.GET})
	public String addZxCar(ZxCar zxCar,HttpServletRequest request){
		int i = 0;
		if(null != zxCar){
			zxCar.setId(UUID.toUUID());
			i=zxCarService.addZxCar(zxCar);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 修改
	* @param zx_car 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/updateZxCar",method={RequestMethod.POST,RequestMethod.GET})
	public String updateZxCar(ZxCar zxCar,HttpServletRequest request){
		int i = 0;
		if(null != zxCar){
			i=zxCarService.updateZxCar(zxCar);
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
	@RequestMapping(value="/delZxCar",method={RequestMethod.POST,RequestMethod.GET})
	public String delZxCar(String id,HttpServletRequest request){
		int i = 0;
		if(null != id && !"".equals(id)){
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("id",id.split(","));
			i=zxCarService.delZxCar(condition);
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
	@RequestMapping(value="/copyZxCar",method={RequestMethod.POST,RequestMethod.GET})
	public String copyZxCar(String id,HttpServletRequest request){
		int i = 0;
		ZxCar zxCar = zxCarService.getZxCarById(id);
		if(null != zxCar){
			zxCar.setId(UUID.toUUID());
			i=zxCarService.addZxCar(zxCar);
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
	@RequestMapping(value="/exportZxCar",method={RequestMethod.POST,RequestMethod.GET})
	public void exportZxCar(String excleData,String excleHeader,String excleText,HttpServletRequest request,HttpServletResponse response){
		ExportExcel exportExcel = new ExportExcel();
		exportExcel.exportExcel(excleData, excleHeader,excleText,response);
	}
}
