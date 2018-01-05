package jehc.zxmodules.service.impl;
import java.util.List;
import java.util.Map;
import jehc.xtmodules.xtcore.base.BaseService;
import jehc.xtmodules.xtcore.util.ExceptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jehc.zxmodules.service.ZxTrainPlanService;
import jehc.zxmodules.dao.ZxTrainPlanDao;
import jehc.zxmodules.model.ZxTrainPlan;

/**
* 月度培训计划 
* 2017-12-29 15:48:18  季建吉
*/
@Service("zxTrainPlanService")
public class ZxTrainPlanServiceImpl extends BaseService implements ZxTrainPlanService{
	@Autowired
	private ZxTrainPlanDao zxTrainPlanDao;
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<ZxTrainPlan> getZxTrainPlanListByCondition(Map<String,Object> condition){
		try{
			return zxTrainPlanDao.getZxTrainPlanListByCondition(condition);
		} catch (Exception e) {
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
	}
	/**
	* 查询对象
	* @param id 
	* @return
	*/
	public ZxTrainPlan getZxTrainPlanById(String id){
		try{
			ZxTrainPlan zxTrainPlan = zxTrainPlanDao.getZxTrainPlanById(id);
			return zxTrainPlan;
		} catch (Exception e) {
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
	}
	/**
	* 添加
	* @param zx_train_plan 
	* @return
	*/
	public int addZxTrainPlan(ZxTrainPlan zxTrainPlan){
		int i = 0;
		try {
			i = zxTrainPlanDao.addZxTrainPlan(zxTrainPlan);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 修改
	* @param zx_train_plan 
	* @return
	*/
	public int updateZxTrainPlan(ZxTrainPlan zxTrainPlan){
		int i = 0;
		try {
			i = zxTrainPlanDao.updateZxTrainPlan(zxTrainPlan);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 修改（根据动态条件）
	* @param zx_train_plan 
	* @return
	*/
	public int updateZxTrainPlanBySelective(ZxTrainPlan zxTrainPlan){
		int i = 0;
		try {
			i = zxTrainPlanDao.updateZxTrainPlanBySelective(zxTrainPlan);
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
	public int delZxTrainPlan(Map<String,Object> condition){
		int i = 0;
		try {
			i = zxTrainPlanDao.delZxTrainPlan(condition);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 批量添加
	* @param zx_train_planList 
	* @return
	*/
	public int addBatchZxTrainPlan(List<ZxTrainPlan> zxTrainPlanList){
		int i = 0;
		try {
			i = zxTrainPlanDao.addBatchZxTrainPlan(zxTrainPlanList);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 批量修改
	* @param zx_train_planList 
	* @return
	*/
	public int updateBatchZxTrainPlan(List<ZxTrainPlan> zxTrainPlanList){
		int i = 0;
		try {
			i = zxTrainPlanDao.updateBatchZxTrainPlan(zxTrainPlanList);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 批量修改（根据动态条件）
	* @param zx_train_planList 
	* @return
	*/
	public int updateBatchZxTrainPlanBySelective(List<ZxTrainPlan> zxTrainPlanList){
		int i = 0;
		try {
			i = zxTrainPlanDao.updateBatchZxTrainPlanBySelective(zxTrainPlanList);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
}
