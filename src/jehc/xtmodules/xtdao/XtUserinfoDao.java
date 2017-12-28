package jehc.xtmodules.xtdao;
import java.util.List;
import java.util.Map;

import jehc.xtmodules.xtmodel.XtUserinfo;

/**
* 员工信息表 
* 2015-05-12 11:04:35  邓纯杰
*/
public interface XtUserinfoDao{
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<XtUserinfo> getXtUserinfoListByCondition(Map<String,Object> condition);
	/**
	 * 已删除用户
	 * @param condition
	 * @return
	 */
	public List<XtUserinfo> getXtUserinfoDeletedListByCondition(Map<String,Object> condition);
	/**
	* 查询对象
	* @param xt_userinfo_id 
	* @return
	*/
	public XtUserinfo getXtUserinfoById(String xt_userinfo_id);
	/**
	* 添加
	* @param xt_userinfo 
	* @return
	*/
	public int addXtUserinfo(XtUserinfo xt_Userinfo);
	/**
	* 修改
	* @param xt_userinfo 
	* @return
	*/
	public int updateXtUserinfo(XtUserinfo xt_Userinfo);
	/**
	* 删除
	* @param condition 
	* @return
	*/
	public int delXtUserinfo(Map<String,Object> condition);
	
	/**
	 * 恢复用户
	 * @param condition
	 * @return
	 */
	public int recoverXtUserinfo(Map<String,Object> condition);
	
	/**
	 * 登录
	 * @param condition
	 * @return
	 */
	public XtUserinfo getXtUserinfoByUP(Map<String,Object> condition);
	
	/**
	 * 读取所有用户根据各种情况非分页
	 * @param condition
	 * @return
	 */
	public List<XtUserinfo> getXtUserinfoListAllByCondition(Map<String,Object> condition);
	
	/**
	 * 修改密码
	 * @param condition
	 * @return
	 */
	public int updatePwd(Map<String,Object> condition);
	
	/**
	 * 验证用户名是否存在
	 * @return
	 */
	public int validateUser(Map<String,Object> condition);
	
	/**
	 * 根据各种情况查找集合不分页（流程设计器中处理人 发起人 发起人组等使用）
	 * @param condition
	 * @return
	 */
	public List<XtUserinfo> getXtUserinfoList(Map<String,Object> condition);
}
