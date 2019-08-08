<style lang="less">
@import "./main.less";
</style>
<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div
      class="sidebar-menu-con"
      :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}"
    >
      <shrinkable-menu
        :shrink="shrink"
        @on-change="handleSubmenuChange"
        :theme="menuTheme"
        :before-push="beforePush"
        :open-names="openedSubmenuArr"
        :menu-list="menuList"
      >
        <div slot="top" class="logo-con">
          <img
            v-show="!shrink"
            style="width:150px;"
            src="../images/jdCloud-logo.png"
            key="max-logo"
          >
          <img
            v-show="shrink"
            src="../images/jdCloud-logo-min.png"
            key="min-logo"
          >
        </div>
      </shrinkable-menu>
    </div>
    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
      <div class="main-header" :style="{background:bCamouflaged?'#C50000':'#fff'}">
        <div class="navicon-con">
          <Button
            :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
            type="text"
            @click="toggleClick"
          >
            <Icon type="md-menu" size="32"/>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <div class="user-dropdown-menu-con" style="width:250px;">
            <div style="width:250px;padding:17px 20px 0 0;text-align:right;">
              <link-btn style="marginRight:10px;"></link-btn>
              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">
                    <span
                      style="color:#333;font-weight:bolder;"
                      v-show="bCamouflaged"
                    >{{ this.$store.state.user.camousname}}&nbsp;&nbsp;伪装&nbsp;&nbsp;{{ this.$store.state.user.username}}</span>
                    <span v-show="!bCamouflaged">{{ this.$store.state.user.username}}</span>
                  </span>
                  <Icon type="md-arrow-dropdown"/>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                  <!-- <DropdownItem name="camouflage" divided v-show="isCamouflage">用户伪装</DropdownItem>
                  <DropdownItem name="cancleUser" divided v-show="bCamouflaged">取消伪装</DropdownItem> -->
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="this.$store.state.user.headImg" style="margin-left: 10px;"></Avatar>
              <!-- <Avatar icon="md-person" style="background: #619fe7;margin-left: 10px;"></Avatar> -->
            </div>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
      <div class="single-page">
        <!-- <keep-alive :include="cachePage"> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
    <!--用户伪装登录框 -->
    <Modal v-model="bModal" @on-cancel="closeModal()">
      <p slot="header">
        <Icon type="ios-bulb"/>
        <span>用户伪装</span>
      </p>
      <Form :label-width="100">
        <Row>
          <Col span="18">
            <FormItem label=" ERP账号：">
              <Input v-model="erpName" style="width: 250px;"/>
            </FormItem>
          </Col>
          <Col span="6">
            <Button type="success" @click="changeUser()">伪装登录</Button>
          </Col>
        </Row>
      </Form>
      <p slot="footer"></p>
    </Modal>
  </div>
</template>
<script>
import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "./main-components/tags-page-opened.vue";
import linkBtn from "./main-components/link.vue";
import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";

export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    linkBtn
  },
  data() {
    return {
      shrink: false,
      userName: "",
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      bModal: false,
      erpName: "" //erp账号
    };
  },
  computed: {
    //判断用户是否处于伪装中
    bCamouflaged() {
      return this.$store.state.user.bCamouflaged;
    },
    //判断用户是否有伪装权限
    isCamouflage() {
      return this.$store.state.user.isCamouflage;
    },
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      let objCopy = JSON.parse(
        JSON.stringify(this.$store.state.app.pageOpenedList)
      );
      return objCopy; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    mesCount() {
      return this.$store.state.msg.nMsgCount;
    }
  },
  methods: {
    //确认伪装登录用户
    changeUser() {
      this.$store.dispatch("translateUser", this.erpName);
      this.bModal = false;
      this.erpName = "";
    },
    //关闭伪装登录框
    closeModal() {
      this.erpName = "";
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched
        .map(item => item.name)
        .filter(item => item !== name);
    },
    init() {
      this.openedNames = this.getOpenedNamesByActiveName(this.$route.name);
      let pathArr = util.setCurrentPath(this, this.$route.name);
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.$store.commit("addOpenSubmenu", this.openedNames);
      this.userName = Cookies.get("user");
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleClickUserDropdown(name) {
      if (name === "loginout") {
        // 退出登录
        this.$store.commit('logout');
        this.$store.commit("clearOpenedSubmenu");
      } else if (name === "camouflage") {
        this.bModal = true;
      } else if (name === "cancleUser") {
        this.$store.dispatch("deleteUser");
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange() {},
    beforePush() {
      // if (name === 'accesstest_index') {
      //     return false;
      // } else {
      //     return true;
      // }
      return true;
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, this.$route.name);
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.openedNames = this.getOpenedNamesByActiveName(this.$route.name);
      this.$store.commit("addOpenSubmenu", this.openedNames);
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    }
  },
  mounted() {
    this.init();
  },
  created() {
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");
  }
};
</script>
