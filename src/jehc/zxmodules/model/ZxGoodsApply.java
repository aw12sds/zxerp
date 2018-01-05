package jehc.zxmodules.model;
import jehc.xtmodules.xtcore.base.BaseEntity;
import java.io.Serializable;
import jehc.zxmodules.model.ZxGoodsApplyDetail;
import java.util.List;

/**
* zx_goods_apply 办公用品主表 
* 2018-01-03 11:27:52  邓纯杰
*/
public class ZxGoodsApply extends BaseEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	private String apply_id;/**序列号**/
	private String user_id;/**申请人**/
	private String reason;/**备注**/
	private String create_date;/**申请时间**/
	private String status;/**状态**/
	private List<ZxGoodsApplyDetail> zxGoodsApplyDetail;/**用品申领详细表**/
	private String zxGoodsApplyDetail_removed_flag;/**用品申领详细表移除标识**/
	public void setApply_id(String apply_id){
		this.apply_id=apply_id;
	}
	public String getApply_id(){
		return apply_id;
	}
	public void setUser_id(String user_id){
		this.user_id=user_id;
	}
	public String getUser_id(){
		return user_id;
	}
	public void setReason(String reason){
		this.reason=reason;
	}
	public String getReason(){
		return reason;
	}
	public void setCreate_date(String create_date){
		this.create_date=create_date;
	}
	public String getCreate_date(){
		return create_date;
	}
	public void setStatus(String status){
		this.status=status;
	}
	public String getStatus(){
		return status;
	}
	public void setZxGoodsApplyDetail(List<ZxGoodsApplyDetail> zxGoodsApplyDetail){
		this.zxGoodsApplyDetail=zxGoodsApplyDetail;
	}
	public List<ZxGoodsApplyDetail> getZxGoodsApplyDetail(){
		return zxGoodsApplyDetail;
	}
	public void setZxGoodsApplyDetail_removed_flag(String zxGoodsApplyDetail_removed_flag){
		this.zxGoodsApplyDetail_removed_flag=zxGoodsApplyDetail_removed_flag;
	}
	public String getZxGoodsApplyDetail_removed_flag(){
		return zxGoodsApplyDetail_removed_flag;
	}
}
