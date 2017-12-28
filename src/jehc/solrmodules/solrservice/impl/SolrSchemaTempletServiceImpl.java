package jehc.solrmodules.solrservice.impl;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jehc.solrmodules.solrdao.SolrSchemaTempletDao;
import jehc.solrmodules.solrmodel.SolrSchemaTemplet;
import jehc.solrmodules.solrservice.SolrSchemaTempletService;
import jehc.xtmodules.xtcore.base.BaseService;
import jehc.xtmodules.xtcore.util.ExceptionUtil;

/**
* solr schema 模板 
* 2016-07-01 13:14:46  邓纯杰
*/
@Service("solrSchemaTempletService")
public class SolrSchemaTempletServiceImpl extends BaseService implements SolrSchemaTempletService{
	@Autowired
	private SolrSchemaTempletDao solrIndexSqlDao;
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<SolrSchemaTemplet> getSolrSchemaTempletListByCondition(Map<String,Object> condition){
		try{
			return solrIndexSqlDao.getSolrSchemaTempletListByCondition(condition);
		} catch (Exception e) {
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
	}
	/**
	* 查询对象
	* @param solr_schema_templet_id 
	* @return
	*/
	public SolrSchemaTemplet getSolrSchemaTempletById(String solr_schema_templet_id){
		try{
			return solrIndexSqlDao.getSolrSchemaTempletById(solr_schema_templet_id);
		} catch (Exception e) {
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
	}
	/**
	* 添加
	* @param solr_schema_templet 
	* @return
	*/
	public int addSolrSchemaTemplet(SolrSchemaTemplet solr_Schema_Templet){
		int i = 0;
		try {
			i = solrIndexSqlDao.addSolrSchemaTemplet(solr_Schema_Templet);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 修改
	* @param solr_schema_templet 
	* @return
	*/
	public int updateSolrSchemaTemplet(SolrSchemaTemplet solr_Schema_Templet){
		int i = 0;
		try {
			i = solrIndexSqlDao.updateSolrSchemaTemplet(solr_Schema_Templet);
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
	public int delSolrSchemaTemplet(Map<String,Object> condition){
		int i = 0;
		try {
			i = solrIndexSqlDao.delSolrSchemaTemplet(condition);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
}
