package jehc.zxmodules.service.impl;
import java.util.List;
import java.util.Map;
import jehc.xtmodules.xtcore.base.BaseService;
import jehc.xtmodules.xtcore.util.ExceptionUtil;

import org.apache.commons.lang.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jehc.zxmodules.model.ZxGoodsApplyDetail;
import jehc.zxmodules.model.ZxUserAndDepartment;
import jehc.zxmodules.service.ZxGoodsApplyDetailService;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Date;

import jehc.xtmodules.xtcore.allutils.StringUtil;
import jehc.zxmodules.service.ZxGoodsApplyService;
import jehc.zxmodules.dao.ZxGoodsApplyDao;
import jehc.zxmodules.model.ZxGoodsApply;

/**
* 办公用品主表 
* 2018-01-03 11:27:52  季建吉
*/
@Service("zxGoodsApplyService")
public class ZxGoodsApplyServiceImpl extends BaseService implements ZxGoodsApplyService{
	@Autowired
	private ZxGoodsApplyDao zxGoodsApplyDao;
	@Autowired
	private ZxGoodsApplyDetailService zxGoodsApplyDetailService;
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<ZxGoodsApply> getZxGoodsApplyListByCondition(Map<String,Object> condition){
		try{
			return zxGoodsApplyDao.getZxGoodsApplyListByCondition(condition);
		} catch (Exception e) {
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
	}
	/**
	* 查询对象
	* @param apply_id 
	* @return
	*/
	public ZxGoodsApply getZxGoodsApplyById(String apply_id){
		try{
			ZxGoodsApply zxGoodsApply = zxGoodsApplyDao.getZxGoodsApplyById(apply_id);
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("apply_id", apply_id);
			List<ZxGoodsApplyDetail> zxGoodsApplyDetail = zxGoodsApplyDetailService.getZxGoodsApplyDetailListByCondition(condition);
			zxGoodsApply.setZxGoodsApplyDetail(zxGoodsApplyDetail);
			return zxGoodsApply;
		} catch (Exception e) {
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
	}
	
	/**
	* 查询用户
	* @param apply_id 
	* @return
	*/
	public ZxUserAndDepartment getZxUserAndDeptById(String apply_id){
		try{
			ZxGoodsApply zxGoodsApply = zxGoodsApplyDao.getZxGoodsApplyById(apply_id);
		ZxUserAndDepartment zxUserAndDepartment=zxGoodsApplyDao.getUserAndDepartment(zxGoodsApply.getUser_id());
			return zxUserAndDepartment;
		} catch (Exception e) {
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
	}
	/**
	* 查询对象
	* @param apply_id 
	* @return
	*/
	public ZxGoodsApply getZxUserById(String apply_id){
		try{
			ZxGoodsApply zxGoodsApply = zxGoodsApplyDao.getZxGoodsApplyById(apply_id);
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("apply_id", apply_id);
			List<ZxGoodsApplyDetail> zxGoodsApplyDetail = zxGoodsApplyDetailService.getZxGoodsApplyDetailListByCondition(condition);
			zxGoodsApply.setZxGoodsApplyDetail(zxGoodsApplyDetail);
			return zxGoodsApply;
		} catch (Exception e) {
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
	}
	/**
	* 添加
	* @param zx_goods_apply 
	* @return
	*/
	public int addZxGoodsApply(ZxGoodsApply zxGoodsApply){
		int i = 0;
		try {
			zxGoodsApply.setStatus("0");
			i = zxGoodsApplyDao.addZxGoodsApply(zxGoodsApply);
			List<ZxGoodsApplyDetail> zxGoodsApplyDetailTempList = zxGoodsApply.getZxGoodsApplyDetail();
			List<ZxGoodsApplyDetail> zxGoodsApplyDetailList = new ArrayList<ZxGoodsApplyDetail>();
			if(zxGoodsApplyDetailTempList==null){
				return 1;
			}
			for(int j = 0; j < zxGoodsApplyDetailTempList.size(); j++){
				if(zxGoodsApply.getZxGoodsApplyDetail_removed_flag().indexOf(","+j+",") == -1){
					zxGoodsApplyDetailTempList.get(j).setApply_id(zxGoodsApply.getApply_id());
					zxGoodsApplyDetailTempList.get(j).setId(toUUID());
					zxGoodsApplyDetailTempList.get(j).setCreate_time(DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
					zxGoodsApplyDetailList.add(zxGoodsApplyDetailTempList.get(j));
				}
			}
			if(!zxGoodsApplyDetailList.isEmpty()&&zxGoodsApplyDetailList.size()>0){
				zxGoodsApplyDetailService.addBatchZxGoodsApplyDetail(zxGoodsApplyDetailList);
			}
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 申领前修改
	* @param zx_goods_apply 
	* @return
	*/
	public int updateZxGoodsApply(ZxGoodsApply zxGoodsApply){
		int i = 0;
		try {
			zxGoodsApply.setStatus("0");
			i = zxGoodsApplyDao.updateZxGoodsApply(zxGoodsApply);
			List<ZxGoodsApplyDetail> zxGoodsApplyDetailList = zxGoodsApply.getZxGoodsApplyDetail();
			List<ZxGoodsApplyDetail> zxGoodsApplyDetailAddList = new ArrayList<ZxGoodsApplyDetail>();
			List<ZxGoodsApplyDetail> zxGoodsApplyDetailUpdateList = new ArrayList<ZxGoodsApplyDetail>();
			if(zxGoodsApplyDetailList==null){
				return 1;
			}
			for(int j = 0; j < zxGoodsApplyDetailList.size(); j++){
				if(zxGoodsApply.getZxGoodsApplyDetail_removed_flag().indexOf(","+j+",") == -1){
					zxGoodsApplyDetailList.get(j).setApply_id(zxGoodsApply.getApply_id());
					if(StringUtil.isEmpty(zxGoodsApplyDetailList.get(j).getId())){
						zxGoodsApplyDetailList.get(j).setId(toUUID());
						zxGoodsApplyDetailAddList.add(zxGoodsApplyDetailList.get(j));
					}else{
						zxGoodsApplyDetailUpdateList.add(zxGoodsApplyDetailList.get(j));
					}
				}
			}
			if(!zxGoodsApplyDetailAddList.isEmpty()&&zxGoodsApplyDetailAddList.size()>0){
				i=zxGoodsApplyDetailService.addBatchZxGoodsApplyDetail(zxGoodsApplyDetailAddList);
			}
			if(!zxGoodsApplyDetailUpdateList.isEmpty()&&zxGoodsApplyDetailUpdateList.size()>0){
				i=zxGoodsApplyDetailService.updateBatchZxGoodsApplyDetail(zxGoodsApplyDetailUpdateList);
			}
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	
	/**
	* 申领修改状态
	* @param zx_goods_apply 
	* @return
	*/
	public int updateZxGoodsApplyStatus(ZxGoodsApply zxGoodsApply){
		int i = 0;
		try {
			i = zxGoodsApplyDao.updateZxGoodsApplyBySelective(zxGoodsApply);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	
	/**
	* 修改（根据动态条件）
	* @param zx_goods_apply 
	* @return
	*/
	public int updateZxGoodsApplyBySelective(ZxGoodsApply zxGoodsApply){
		int i = 0;
		try {
			i = zxGoodsApplyDao.updateZxGoodsApplyBySelective(zxGoodsApply);
			List<ZxGoodsApplyDetail> zxGoodsApplyDetailList = zxGoodsApply.getZxGoodsApplyDetail();
			List<ZxGoodsApplyDetail> zxGoodsApplyDetailAddList = new ArrayList<ZxGoodsApplyDetail>();
			List<ZxGoodsApplyDetail> zxGoodsApplyDetailUpdateList = new ArrayList<ZxGoodsApplyDetail>();
			for(int j = 0; j < zxGoodsApplyDetailList.size(); j++){
				if(zxGoodsApply.getZxGoodsApplyDetail_removed_flag().indexOf(","+j+",") == -1){
					zxGoodsApplyDetailList.get(j).setApply_id(zxGoodsApply.getApply_id());
					if(StringUtil.isEmpty(zxGoodsApplyDetailList.get(j).getId())){
						zxGoodsApplyDetailList.get(j).setId(toUUID());
						zxGoodsApplyDetailAddList.add(zxGoodsApplyDetailList.get(j));
					}else{
						zxGoodsApplyDetailUpdateList.add(zxGoodsApplyDetailList.get(j));
					}
				}
			}
			if(!zxGoodsApplyDetailAddList.isEmpty()&&zxGoodsApplyDetailAddList.size()>0){
				zxGoodsApplyDetailService.addBatchZxGoodsApplyDetail(zxGoodsApplyDetailAddList);
			}
			if(!zxGoodsApplyDetailUpdateList.isEmpty()&&zxGoodsApplyDetailUpdateList.size()>0){
				zxGoodsApplyDetailService.updateBatchZxGoodsApplyDetailBySelective(zxGoodsApplyDetailUpdateList);
			}
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
	public int delZxGoodsApply(Map<String,Object> condition){
		int i = 0;
		try {
			i = zxGoodsApplyDao.delZxGoodsApply(condition);
			String[] apply_idList= (String[])condition.get("apply_id");
			for(String apply_id:apply_idList){
				zxGoodsApplyDetailService.delZxGoodsApplyDetailByForeignKey(apply_id);
			}
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 批量添加
	* @param zx_goods_applyList 
	* @return
	*/
	public int addBatchZxGoodsApply(List<ZxGoodsApply> zxGoodsApplyList){
		int i = 0;
		try {
			i = zxGoodsApplyDao.addBatchZxGoodsApply(zxGoodsApplyList);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 批量修改
	* @param zx_goods_applyList 
	* @return
	*/
	public int updateBatchZxGoodsApply(List<ZxGoodsApply> zxGoodsApplyList){
		int i = 0;
		try {
			i = zxGoodsApplyDao.updateBatchZxGoodsApply(zxGoodsApplyList);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
	/**
	* 批量修改（根据动态条件）
	* @param zx_goods_applyList 
	* @return
	*/
	public int updateBatchZxGoodsApplyBySelective(List<ZxGoodsApply> zxGoodsApplyList){
		int i = 0;
		try {
			i = zxGoodsApplyDao.updateBatchZxGoodsApplyBySelective(zxGoodsApplyList);
		} catch (Exception e) {
			i = 0;
			/**方案一加上这句话这样程序异常时才能被aop捕获进而回滚**/
			throw new ExceptionUtil(e.getMessage(),e.getCause());
		}
		return i;
	}
}
