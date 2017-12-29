/**
 * 广播类 用于不同view之间的通讯
 * @author YS
 */
class Broadcast {
  /**
   * 构造函数
   * @constructor
   */
  constructor() {
    /** 所有广播的句柄 */
    this.broadcasts = this.getBroadcasts(); // 所有广播的句柄 格式：{eventId:{msgObj,routes:[...已使用的page路由]}}
  }

  getBroadcasts() {
    let obj = localStorage.getItem(this.keyName());
    if (obj) obj = JSON.parse(obj); // 转为对象
    if (!this.checkTypeof(obj, 'Object')) obj = {}; // 如果缓存中的数据不是一个对象，则默认返回空对象
    return obj;
  }

  /**
   * 广播的在localStorage中的key值
   */
  keyName() {
    return 'cxy_w_broadcasts';
  }

  /**
   * 保存广播数据到全局缓存中
   */
  setDatas() {
    localStorage.setItem(this.keyName(), JSON.stringify(this.broadcasts));
  }

  /**
   * 发送广播
   * @param {string} eventId 广播id
   * @param {object} msgObj 广播id携带的数据（传递数据，必须符合Json格式）
   */
  send(eventId, msgObj) {
    this.broadcasts[eventId] = { msgObj, routes: [] };
    this.setDatas(); // 保存广播
    return true;
  }

  /**
   * 监听广播
   * @param {string} eventId 广播id
   * @param {function} callback 存在广播时的回调函数；回调函数的第一个参数是发送广播时的msgObj参数
   */
  watch(eventId, callback) {
    // 存在广播 并且是第一次接收广播
    const broadcast = this.broadcasts[eventId]; // 广播的详情
    const route = this.getRoute(); // 当前页面的路由
    if (broadcast && broadcast.routes.indexOf(route) === -1) {
      broadcast.routes.push(route); // 记录当前路由已接收过广播
      if (callback) callback(broadcast.msgObj);
      this.setDatas(); // 保存广播
    }
  }

  /**
   * 获取页面的路由
   */
  getRoute() {
    return window.location.pathname + window.location.hash;
  }

  /**
   * 判断数据类型
   * @param {*} data 用于匹配的数据
   * @param {string} type 需要匹配的类型 默认：Object 可选值："Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"
   */
  checkTypeof(data, type = 'Object') {
    return Object.prototype.toString.call(data) == "[object " + type + "]";
  }
}

export default Broadcast;
