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
import jehc.xtmodules.xtmodel.XtUserinfo;
import jehc.xtmodules.xtservice.XtUserinfoService;
import jehc.xtmodules.xtcore.util.UUID;
import jehc.zxmodules.model.ZxLoanBill;
import jehc.zxmodules.model.ZxOfficeApply;
import jehc.zxmodules.model.ZxOfficeApplyShow;
import jehc.zxmodules.model.ZxOfficeInventory;
import jehc.zxmodules.service.ZxOfficeApplyService;

/**
* 办公用品申请表 
* 2017-12-05 15:17:15  季建吉
*/
@Controller
@RequestMapping("/zxOfficeOutController")
public class ZxOfficeOutController extends BaseAction{
	@Autowired
	private ZxOfficeApplyService zxOfficeApplyService;
	@Autowired
	private XtUserinfoService xtUserinfoService;
	/**
	* 载入初始化页面
	* @param zx_office_apply 
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadZxOfficeOut",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadZxOfficeOut(ZxOfficeApply zxOfficeApply,HttpServletRequest request){
		return new ModelAndView("pc/zx-view/zx-office-out/zx-office-out-list");
	}
	/**
	* 方法列表载入数据
	* @param zx_office_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxOfficeOutListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxOfficeOutListByCondition(BaseSearch baseSearch,HttpServletRequest request){
		Map<String, Object> condition = baseSearch.convert();
		commonHPager(condition,request);
		List<ZxOfficeApplyShow> zxOfficeApplyList = zxOfficeApplyService.getZxOfficeOutListByCondition(condition);
		for(ZxOfficeApplyShow ApplyShow :zxOfficeApplyList){
			XtUserinfo borrower = xtUserinfoService.getXtUserinfoById(ApplyShow.getUser_id());
			ApplyShow.setUser_name(borrower.getXt_userinfo_realName());
		}
		PageInfo<ZxOfficeApplyShow> page = new PageInfo<ZxOfficeApplyShow>(zxOfficeApplyList);
		return outPageStr(page,request);
	}
	/**
	* 获取对象
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxOfficeApplyById",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxOfficeApplyById(String id,HttpServletRequest request){
		ZxOfficeApplyShow ZxOfficeApplyShow = zxOfficeApplyService.getZxOfficeApplyById(id);
		return outDataStr(ZxOfficeApplyShow);
	}
	/**
	* 添加
	* @param zx_office_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/addZxOfficeApply",method={RequestMethod.POST,RequestMethod.GET})
	public String addZxOfficeApply(ZxOfficeApply zxOfficeApply,HttpServletRequest request){
		int i = 0;
		if(null != zxOfficeApply && !"".equals(zxOfficeApply)){
			if(zxOfficeApply.getOffice_id().contains(","))
			{
				zxOfficeApply.setOffice_id(zxOfficeApply.getOffice_id().substring(0, zxOfficeApply.getOffice_id().length()-1));
			}
			zxOfficeApply.setUser_id(getXtUid());
			zxOfficeApply.setStatus("0");
			i=zxOfficeApplyService.addZxOfficeApply(zxOfficeApply);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 发放
	* @param zx_office_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/updateZxOfficeOut",method={RequestMethod.POST,RequestMethod.GET})
	public String updateZxOfficeOut(ZxOfficeApplyShow zxOfficeApplyShow,HttpServletRequest request){
		int i = 0;
		int j=0;
		ZxOfficeApply zxOfficeApply=new ZxOfficeApply();
		ZxOfficeInventory zxOfficeInventory=new ZxOfficeInventory();
		if(null != zxOfficeApplyShow && !"".equals(zxOfficeApplyShow)){
			if(zxOfficeApplyShow.getOffice_id().contains(","))
			{
				zxOfficeApplyShow.setOffice_id(zxOfficeApplyShow.getOffice_id().substring(0, zxOfficeApplyShow.getOffice_id().length()-1));
			}
			if(zxOfficeApplyShow.getId().contains(","))
			{
				zxOfficeApplyShow.setId(zxOfficeApplyShow.getId().substring(0, zxOfficeApplyShow.getId().length()-1));
			}
			zxOfficeApply.setId(zxOfficeApplyShow.getId());
			zxOfficeApply.setStatus("4");
			zxOfficeInventory.setOffice_id(zxOfficeApplyShow.getOffice_id());
			i=zxOfficeApplyService.updateZxOfficeOut(zxOfficeApply);
			double amount=zxOfficeApplyShow.getInventoryamount()-zxOfficeApplyShow.getAmount();
			zxOfficeInventory.setAmount(amount);
			j=zxOfficeApplyService.updateZxOfficeOutInventory(zxOfficeInventory);
			
		}
		if(i>0&&j>0){
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
	@RequestMapping(value="/delZxOfficeApply",method={RequestMethod.POST,RequestMethod.GET})
	public String delZxOfficeApply(String id,HttpServletRequest request){
		int i = 0;
		if(null != id && !"".equals(id)){
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("id",id.split(","));
			i=zxOfficeApplyService.delZxOfficeApply(condition);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
/*
	* 导出
	* @param excleData 
	* @param excleHeader 
	* @param excleText 
	* @param request 
	* @param request 
	*/
	@RequestMapping(value="/exportZxOfficeApply",method={RequestMethod.POST,RequestMethod.GET})
	public void exportZxOfficeApply(String excleData,String excleHeader,String excleText,HttpServletRequest request,HttpServletResponse response){
		ExportExcel exportExcel = new ExportExcel();
		exportExcel.exportExcel(excleData, excleHeader,excleText,response);
	}
}
