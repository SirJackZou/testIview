import Main from "@/views/Main.vue";
// 不作为Main组件的子页面展示的页面单独写，如下
export const page404 = {
  path: "/*",
  name: "error-404",
  meta: {
    title: "404-页面不存在"
  },
  component: () => import("@/views/error-page/404.vue")
};

export const page403 = {
  path: "/403",
  meta: {
    title: "403-权限不足"
  },
  name: "error-403",
  component: () => import("@//views/error-page/403.vue")
};

export const page500 = {
  path: "/500",
  meta: {
    title: "500-服务端错误"
  },
  name: "error-500",
  component: () => import("@/views/error-page/500.vue")
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  // access为true时不经过权限处理
  path: "/",
  name: "otherRouter",
  redirect: "/home",
  component: Main,
  access: true,
  children: [
    {
      path: "home",
      title: "首页",
      name: "home_index",
      access: true,
      component: () => import("@/views/home/home.vue")
    },
  ]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: "/product",
    name: "product",
    title: "汇总服务管理",
    icon: "md-home",
    component: Main,
    children: [
      {
        path: "/monitor",
        name: "moitor",
        title: "数据汇总监控",
        icon: "md-cube",
        component: () => import("@/views/monitor/monitor.vue")
      },
      {
        path: "/manage",
        name: "manage",
        title: "数据中心管理",
        icon: "md-cube",
        component: () => import("@/views/manage/manage.vue")
      },
      {
        path: "/base",
        name: "base",
        title: "数据中心基础数据",
        icon: "md-cube",
        component: () => import("@/views/base/base.vue")
      },
      {
        path: "/push",
        name: "push",
        title: "推送策略管理",
        icon: "md-cube",
        component: () => import("@/views/strategy/push.vue")
      },
      {
        path: "/white",
        name: "white",
        title: "白名单管理",
        icon: "md-cube",
        component: () => import("@/views/whiteList/whiteList.vue")
      },
    ]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [otherRouter, ...appRouter, page500, page403, page404];
