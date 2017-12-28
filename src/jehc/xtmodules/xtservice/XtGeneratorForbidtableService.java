package jehc.xtmodules.xtservice;
import java.util.List;
import java.util.Map;

import jehc.xtmodules.xtmodel.XtGeneratorForbidtable;

/**
* 禁止使用代码生成器生成的表信息 
* 2016-09-26 10:55:48  邓纯杰
*/
public interface XtGeneratorForbidtableService{
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<XtGeneratorForbidtable> getXtGeneratorForbidtableListByCondition(Map<String,Object> condition);
	/**
	* 查询对象
	* @param xt_generator_forbidtable_id 
	* @return
	*/
	public XtGeneratorForbidtable getXtGeneratorForbidtableById(String xt_generator_forbidtable_id);
	/**
	* 添加
	* @param xt_generator_forbidtable 
	* @return
	*/
	public int addXtGeneratorForbidtable(XtGeneratorForbidtable xt_Generator_Forbidtable);
	/**
	* 修改
	* @param xt_generator_forbidtable 
	* @return
	*/
	public int updateXtGeneratorForbidtable(XtGeneratorForbidtable xt_Generator_Forbidtable);
	/**
	* 删除
	* @param condition 
	* @return
	*/
	public int delXtGeneratorForbidtable(Map<String,Object> condition);
	/**
	* 批量添加
	* @param xt_generator_forbidtableList 
	* @return
	*/
	public int addBatchXtGeneratorForbidtable(List<XtGeneratorForbidtable> xt_Generator_ForbidtableList);
	/**
	* 批量修改
	* @param xt_generator_forbidtableList 
	* @return
	*/
	public int updateBatchXtGeneratorForbidtable(List<XtGeneratorForbidtable> xt_Generator_ForbidtableList);
}
