package jehc.zxmodules.service;
import java.util.List;
import java.util.Map;
import jehc.zxmodules.model.ZxTrainPlan;

/**
* 月度培训计划 
* 2017-12-29 15:48:18  季建吉
*/
public interface ZxTrainPlanService{
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<ZxTrainPlan> getZxTrainPlanListByCondition(Map<String,Object> condition);
	/**
	* 查询对象
	* @param id 
	* @return
	*/
	public ZxTrainPlan getZxTrainPlanById(String id);
	/**
	* 添加
	* @param zx_train_plan 
	* @return
	*/
	public int addZxTrainPlan(ZxTrainPlan zxTrainPlan);
	/**
	* 修改
	* @param zx_train_plan 
	* @return
	*/
	public int updateZxTrainPlan(ZxTrainPlan zxTrainPlan);
	/**
	* 修改（根据动态条件）
	* @param zx_train_plan 
	* @return
	*/
	public int updateZxTrainPlanBySelective(ZxTrainPlan zxTrainPlan);
	/**
	* 删除
	* @param condition 
	* @return
	*/
	public int delZxTrainPlan(Map<String,Object> condition);
	/**
	* 批量添加
	* @param zx_train_planList 
	* @return
	*/
	public int addBatchZxTrainPlan(List<ZxTrainPlan> zxTrainPlanList);
	/**
	* 批量修改
	* @param zx_train_planList 
	* @return
	*/
	public int updateBatchZxTrainPlan(List<ZxTrainPlan> zxTrainPlanList);
	/**
	* 批量修改（根据动态条件）
	* @param zx_train_planList 
	* @return
	*/
	public int updateBatchZxTrainPlanBySelective(List<ZxTrainPlan> zxTrainPlanList);
}
