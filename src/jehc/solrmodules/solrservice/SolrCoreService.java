package jehc.solrmodules.solrservice;
import java.util.List;
import java.util.Map;

import jehc.solrmodules.solrmodel.SolrCore;
import jehc.solrmodules.solrmodel.SolrDocument;
import jehc.solrmodules.solrmodel.SolrIndex;

/**
* 全文检索多实例配置 
* 2015-12-15 13:07:24  邓纯杰
*/
public interface SolrCoreService{
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<SolrCore> getSolrCoreListByCondition(Map<String,Object> condition);
	/**
	* 查询对象
	* @param solr_core_id 
	* @return
	*/
	public SolrCore getSolrCoreById(String solr_core_id);
	/**
	* 添加
	* @param solr_core 
	* @return
	*/
	public int addSolrCore(SolrCore solr_Core,SolrDocument solr_Document,List<SolrIndex> solr_IndexList);
	/**
	* 修改
	* @param solr_core 
	* @return
	*/
	public int updateSolrCore(SolrCore solr_Core,SolrDocument solr_Document,List<SolrIndex> solr_IndexList);
	/**
	* 删除
	* @param condition 
	* @return
	*/
	public int delSolrCore(Map<String,Object> condition);
}
