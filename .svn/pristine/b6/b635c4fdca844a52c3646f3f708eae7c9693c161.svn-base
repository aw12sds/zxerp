package jehc.zxmodules.dao.impl;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;
import jehc.xtmodules.xtcore.base.impl.BaseDaoImpl;
import jehc.zxmodules.dao.ZxTrainPlanDao;
import jehc.zxmodules.model.ZxTrainPlan;

/**
* 月度培训计划 
* 2017-12-29 15:48:18  季建吉
*/
@Repository("zxTrainPlanDao")
public class ZxTrainPlanDaoImpl  extends BaseDaoImpl implements ZxTrainPlanDao{
	/**
	* 分页
	* @param condition 
	* @return
	*/
	@SuppressWarnings("unchecked")
	public List<ZxTrainPlan> getZxTrainPlanListByCondition(Map<String,Object> condition){
		return (List<ZxTrainPlan>)this.getList("getZxTrainPlanListByCondition",condition);
	}
	/**
	* 查询对象
	* @param id 
	* @return
	*/
	public ZxTrainPlan getZxTrainPlanById(String id){
		return (ZxTrainPlan)this.get("getZxTrainPlanById", id);
	}
	/**
	* 添加
	* @param zx_train_plan 
	* @return
	*/
	public int addZxTrainPlan(ZxTrainPlan zxTrainPlan){
		return this.add("addZxTrainPlan", zxTrainPlan);
	}
	/**
	* 修改
	* @param zx_train_plan 
	* @return
	*/
	public int updateZxTrainPlan(ZxTrainPlan zxTrainPlan){
		return this.update("updateZxTrainPlan", zxTrainPlan);
	}
	/**
	* 修改（根据动态条件）
	* @param zx_train_plan 
	* @return
	*/
	public int updateZxTrainPlanBySelective(ZxTrainPlan zxTrainPlan){
		return this.update("updateZxTrainPlanBySelective", zxTrainPlan);
	}
	/**
	* 删除
	* @param condition 
	* @return
	*/
	public int delZxTrainPlan(Map<String,Object> condition){
		return this.del("delZxTrainPlan", condition);
	}
	/**
	* 批量添加
	* @param zx_train_planList 
	* @return
	*/
	public int addBatchZxTrainPlan(List<ZxTrainPlan> zxTrainPlanList){
		return this.add("addBatchZxTrainPlan", zxTrainPlanList);
	}
	/**
	* 批量修改
	* @param zx_train_planList 
	* @return
	*/
	public int updateBatchZxTrainPlan(List<ZxTrainPlan> zxTrainPlanList){
		return this.update("updateBatchZxTrainPlan", zxTrainPlanList);
	}
	/**
	* 批量修改（根据动态条件）
	* @param zx_train_planList 
	* @return
	*/
	public int updateBatchZxTrainPlanBySelective(List<ZxTrainPlan> zxTrainPlanList){
		return this.update("updateBatchZxTrainPlanBySelective", zxTrainPlanList);
	}
}
