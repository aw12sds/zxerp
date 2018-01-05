package jehc.zxmodules.model;
import jehc.xtmodules.xtcore.base.BaseEntity;
import java.io.Serializable;

/**
* zx_train_plan 月度培训计划 
* 2017-12-29 15:48:18  邓纯杰
*/
public class ZxTrainPlan extends BaseEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	private String id;/**序列号**/
	private String year;/**年度**/
	private String month;/**月份**/
	private String caption;/**标题**/
	private String depart;/**部门**/
	private String reason;/**备份**/
	private String status;/**状态**/
	private String create_date;/**创建时间**/
	public void setId(String id){
		this.id=id;
	}
	public String getId(){
		return id;
	}
	public void setYear(String year){
		this.year=year;
	}
	public String getYear(){
		return year;
	}
	public void setMonth(String month){
		this.month=month;
	}
	public String getMonth(){
		return month;
	}
	public void setCaption(String caption){
		this.caption=caption;
	}
	public String getCaption(){
		return caption;
	}
	public void setDepart(String depart){
		this.depart=depart;
	}
	public String getDepart(){
		return depart;
	}
	public void setReason(String reason){
		this.reason=reason;
	}
	public String getReason(){
		return reason;
	}
	public void setStatus(String status){
		this.status=status;
	}
	public String getStatus(){
		return status;
	}
	public void setCreate_date(String create_date){
		this.create_date=create_date;
	}
	public String getCreate_date(){
		return create_date;
	}
}
