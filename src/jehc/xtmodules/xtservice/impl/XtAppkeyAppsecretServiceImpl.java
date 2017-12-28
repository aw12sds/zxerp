package jehc.xtmodules.xtservice.impl;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jehc.xtmodules.xtcore.base.BaseService;
import jehc.xtmodules.xtcore.util.ExceptionUtil;
import jehc.xtmodules.xtdao.XtAppkeyAppsecretDao;
import jehc.xtmodules.xtmodel.XtAppkeyAppsecret;
import jehc.xtmodules.xtservice.XtAppkeyAppsecretService;

/**
* xt_appkey_appsecret 
* 2016-08-28 14:37:16  邓纯杰
*/
@Service("xtAppkeyAppsecretService")
public class XtAppkeyAppsecretServiceImpl extends BaseService implements XtAppkeyAppsecretService{
	@Autowired
	private XtAppkeyAppsecretDao xtAppkeyAppsecretDao;
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<XtAppkeyAppsecret> getXtAppkeyAppsecretListByCondition(Map<String,Object> condition){
		try{
			return xtAppkeyAppsecretDao.getXtAppkeyAppsecretListByCondition(condition);
		} catch (Exception e) {
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
	}
	/**
	* 查询对象
	* @param xt_appkey_appsecret_id 
	* @return
	*/
	public XtAppkeyAppsecret getXtAppkeyAppsecretById(String xt_appkey_appsecret_id){
		try{
			return xtAppkeyAppsecretDao.getXtAppkeyAppsecretById(xt_appkey_appsecret_id);
		} catch (Exception e) {
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
	}
	/**
	* 添加
	* @param xt_appkey_appsecret 
	* @return
	*/
	public int addXtAppkeyAppsecret(XtAppkeyAppsecret xt_Appkey_Appsecret){
		int i = 0;
		try {
			i = xtAppkeyAppsecretDao.addXtAppkeyAppsecret(xt_Appkey_Appsecret);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 修改
	* @param xt_appkey_appsecret 
	* @return
	*/
	public int updateXtAppkeyAppsecret(XtAppkeyAppsecret xt_Appkey_Appsecret){
		int i = 0;
		try {
			i = xtAppkeyAppsecretDao.updateXtAppkeyAppsecret(xt_Appkey_Appsecret);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 删除
	* @param condition 
	* @return
	*/
	public int delXtAppkeyAppsecret(Map<String,Object> condition){
		int i = 0;
		try {
			i = xtAppkeyAppsecretDao.delXtAppkeyAppsecret(condition);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
}
