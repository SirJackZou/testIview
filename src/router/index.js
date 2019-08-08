import Vue from "vue";
// import Util from "../libs/util";
import VueRouter from "vue-router";
import { routers } from "./router";
import store from "../store";

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  routes: routers,
  //   滚动行为
  scrollBehavior(to, form, savedPosition) {
    //scrollBehavior方法接收to，form路由对象
    //第三个参数savedPosition当且仅当在浏览器前进后退按钮触发时才可用
    //该方法会返回滚动位置的对象信息，如果返回false，或者是一个空的对象，那么不会发生滚动
    //如果返回savedPosition,那么在点击后退按钮时就会表现的像原生浏览器一样，返回的页面会滚动过到之前按钮点击跳转的位置，大概写法如下：
    if (savedPosition) {
      return savedPosition;
    } else {
      //如果想要模拟滚动到锚点的行为:
      if (to.hash) {
        return {
          selector: to.hash
        };
      } else {
        //我们可以在该方法中设置返回值来指定页面的滚动位置，例如：
        //  return {x:0,y:0}
        //表示在用户切换路由时让是所有页面都返回到顶部位置
        return { x: 0, y: 0 };
      }
    }
  }
};
export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  // util.title(to.meta.title);
  next();
//   if (false) {
//     // if (!store.state.app.bPermit) {
//     store.dispatch("getUserPermission").then(() => {
//       next({ replace: true });
//     });
//   } else {
//     let allMenuName = store.getters.allMenuName,
//       accessName = store.state.app.accessName;
//     console.log(
//       "util.oneOf(to.name, accessName)",
//       util.oneOf(to.name, accessName)
//     );
//     console.log(
//       "util.oneOf(to.name, allMenuName)",
//       util.oneOf(to.name, allMenuName)
//     );
//     if (to.meta.access) {
//       next();
//     } else {
//       if (util.oneOf(to.name, accessName) && util.oneOf(to.name, allMenuName)) {
//         next();
//       } else if (
//         util.oneOf(to.name, allMenuName) &&
//         !util.oneOf(to.name, accessName)
//       ) {
//         next({ replace: true, name: "error-403" }); // 无权限页面
//       } else {
//         next({ replace: true, name: "error-404" }); // 页面不存在
//       }
//     }
//   }
});

// router.afterEach( to => {
//   // console.log("to", to);
// });
