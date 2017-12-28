package jehc.bmodules.bdao;
import java.util.List;
import java.util.Map;

import jehc.bmodules.bmodel.BOrderPay;

/**
* 基础订单支付 
* 2016-03-22 16:47:52  邓纯杰
*/
public interface BOrderPayDao{
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<BOrderPay> getBOrderPayListByCondition(Map<String,Object> condition);
	/**
	* 查询对象
	* @param b_order_pay_id 
	* @return
	*/
	public BOrderPay getBOrderPayById(String b_order_pay_id);
	/**
	* 添加
	* @param b_order_pay 
	* @return
	*/
	public int addBOrderPay(BOrderPay b_Order_Pay);
	/**
	* 修改
	* @param b_order_pay 
	* @return
	*/
	public int updateBOrderPay(BOrderPay b_Order_Pay);
	/**
	* 删除
	* @param condition 
	* @return
	*/
	public int delBOrderPay(Map<String,Object> condition);
	/**
	 * 计算订单已付总金额
	 * @param condition
	 * @return
	 */
	public double getBOrderPayTotalPrice(Map<String,Object> condition);
}
