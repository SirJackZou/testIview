const sign = "/Gargantua/v1/";

const API = {
  //白名单管理
  whiteList: {
    list: "whiteList/list",//白名单列表
    add: "whiteList/add", //添加白名单
    modify:"whiteList/modify", //修改白名单
    del:"whiteList/del", //删除白名单
  },
  // 数据推送策略管理
  strategy: {
    list: "strategy/list",//订阅策略列表
    add: "strategy/add",//添加策略
    modify: "strategy/modify",//修改策略
    dis: "strategy/enable",//启用/停用策略
    del: "strategy/del",//删除策略
    idcAndModule: "idcUser/available/idcAndModule/list",//加载数据中心及对应的模组
  },
};

function getJson(obj) {
  for (const key in obj) {
    let single = obj[key];
    if (typeof single == "object") {
      for (const key_child in single) {
        if (typeof single[key_child] == "object") {
          getJson(single[key_child]);
        } else {
          single[key_child] = sign + single[key_child];
        }
      }
    } else {
      obj[key] = sign + obj[key];
    }
  }
}

getJson(API);

export default API;
