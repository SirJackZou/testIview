import { otherRouter, appRouter } from "@/router/router";
import Util from "@/libs/util";
import Cookies from "js-cookie";
import API from "@/libs/API";
import Vue from "vue";
import { Message } from "iview";

const app = {
  state: {
    mealNumber: 0,
    cachePage: [],
    lang: "",
    isFullScreen: false,
    openedSubmenuArr: [], // 要展开的菜单数组
    menuTheme: "dark", // 主题
    themeColor: "",
    pageOpenedList: [
      {
        title: "首页",
        path: "",
        name: "home_index"
      }
    ],
    currentPageName: "",
    currentPath: [
      {
        title: "首页",
        path: "",
        name: "home_index"
      }
    ], // 面包屑数组
    menuList: [],
    // 权限允许菜单name
    accessMenu: [],
    // 权限list
    aResMenu: [],
    // 是否拿到权限
    bFetchPermission: false,
    routers: [otherRouter, ...appRouter],
    tagsList: [...otherRouter.children],
    dontCache: ["text-editor", "artical-publish"] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
  },
  actions: {
    //设置资源跳转
    getNumber(state, number) {
      state.state.mealNumber = number;
    },
    //获取用户菜单和权限
    getUserPermission(state) {
      return new Promise(resolve => {
        state
          .dispatch("ajaxPost", {
            url: API.user.permission + Cookies.get("sso.jd.com")
          })
          .then(res => {
            let objData = res.data;
            if (objData.status_code == 200) {
              let objRes = objData.data;
              state.commit("updateMenulist", objRes);
              state.aResMenu = objRes;
              resolve();
            } else {
              Message.error(objData.message);
            }
          });
      });
    }
  },
  mutations: {
    setTagsList(state, list) {
      state.tagsList.push(...list);
    },
    updateMenulist(state, aMenuList) {
      let aAccessMenu = [];
      // let menuData = [];
      let menuData = appRouter;

      // aMenuList.forEach(item => {
      //     if (item.children) {
      //         for (var i = 0; i < item.children.length; i++) {
      //             aAccessMenu.push(item.children[i].menuName);
      //         }
      //         aAccessMenu.push(item.menuName);
      //     } else {
      //         aAccessMenu.push(item.menuName);
      //     }
      // });
      // appRouter.forEach(item => {
      //     if (item.children.length === 1) {
      //         aAccessMenu.forEach(element => {
      //             if (item.children[0]['name'] == element) {
      //                 menuData.push(item);
      //             }
      //         });
      //     } else if (item.children.length > 1) {
      //         let objCopy = JSON.parse(JSON.stringify(item));
      //         objCopy.children = [];
      //         for (var i = 0; i < item.children.length; i++) {
      //             aAccessMenu.forEach(element => {
      //                 if (item.children[i]['name'] == element) {
      //                     objCopy.children.push(item.children[i]);
      //                 }
      //             });
      //         }
      //         if (objCopy.children.length > 0) {
      //             menuData.push(objCopy);
      //         }
      //     }
      // });
      state.accessMenu = aAccessMenu;
      state.menuList = menuData;
      state.bFetchPermission = true;
    },
    changeMenuTheme(state, theme) {
      state.menuTheme = theme;
    },
    changeMainTheme(state, mainTheme) {
      state.themeColor = mainTheme;
    },
    addOpenSubmenu(state, name) {
      state.openedSubmenuArr = name;
    },
    closePage(state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1);
        }
      });
    },
    initCachepage(state) {
      if (localStorage.cachePage) {
        state.cachePage = JSON.parse(localStorage.cachePage);
      }
    },
    removeTag(state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1);
        }
      });
    },
    pageOpenedList(state, get) {
      let openedPage = state.pageOpenedList[get.index];
      if (get.argu) {
        openedPage.argu = get.argu;
      }
      if (get.query) {
        openedPage.query = get.query;
      }
      state.pageOpenedList.splice(get.index, 1, openedPage);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    clearAllTags(state) {
      state.pageOpenedList.splice(1);
      state.cachePage.length = 0;
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    clearOtherTags(state, vm) {
      let currentName = vm.$route.name;
      let currentIndex = 0;
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index;
        }
      });
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1);
      } else {
        state.pageOpenedList.splice(currentIndex + 1);
        state.pageOpenedList.splice(1, currentIndex - 1);
      }
      let newCachepage = state.cachePage.filter(item => {
        return item === currentName;
      });
      state.cachePage = newCachepage;
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    setOpenedList(state) {
      state.pageOpenedList = localStorage.pageOpenedList
        ? JSON.parse(localStorage.pageOpenedList)
        : [otherRouter.children[0]];
    },
    setCurrentPath(state, pathArr) {
      state.currentPath = pathArr;
    },
    setCurrentPageName(state, name) {
      state.currentPageName = name;
    },
    setAvator(state, path) {
      localStorage.avatorImgPath = path;
    },
    switchLang(state, lang) {
      state.lang = lang;
      Vue.config.lang = lang;
    },
    clearOpenedSubmenu(state) {
      state.openedSubmenuArr.length = 0;
    },
    setMessageCount(state, count) {
      state.messageCount = count;
    },
    increateTag(state, tagObj) {
      if (!Util.oneOf(tagObj.name, state.dontCache)) {
        state.cachePage.push(tagObj.name);
        localStorage.cachePage = JSON.stringify(state.cachePage);
      }
      state.pageOpenedList.push(tagObj);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    }
  }
};

export default app;
