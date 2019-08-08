<style lang="less" scoped>
.btn-app{
    cursor: pointer;
}
.link-con {
  width: 360px;
  height: 150px;
  .con-title {
    font-size: 14px;
  }
  .link-list {
    list-style: none;
    li {
      width: 80px;
      margin: 5px;
      display: inline-block;
      float: left;
      .link-img {
        width: 50px;
        height: 50px;
      }
      .link-text {
        line-height: 30px;
        font-size: 12px;
      }
    }
  }
}
</style>
<template>
  <Poptip v-model="bPop" placement="bottom-end">
    <Icon size="26" type="md-apps" class="btn-app"/>
    <div slot="content" class="link-con">
      <!-- 产品总览 -->
      <Divider orientation="left">
        <span class="con-title">产品总览</span>
      </Divider>
      <ul class="link-list">
        <li v-for="(item,index) in aPro" :key="index">
          <Card :padding="5">
            <div style="text-align:center">
              <a @click="jumpRoute(item.name)">
                <!-- <img class="link-img" :src="item.icon"> -->
                <p class="link-text">{{item.title}}</p>
              </a>
            </div>
          </Card>
        </li>
      </ul>
      <!-- 后台管理总览 -->
      <Divider orientation="left">
        <span class="con-title">后台管理总览</span>
      </Divider>
      <ul class="link-list">
        <li v-for="(item,index) in aMan" :key="index">
          <Card :padding="5">
            <div style="text-align:center">
              <a @click="jumpRoute(item.name)">
                <!-- <img class="link-img" :src="item.icon"> -->
                <p class="link-text">{{item.title}}</p>
              </a>
            </div>
          </Card>
        </li>
      </ul>
    </div>
  </Poptip>
</template>

<script>
import util from "@/libs/util";
export default {
  name: "link-btn",
  data() {
    return {
      bPop: false,
      //子菜单-产品
      aPro: [
        {
          title: "内互联",
          name: "cross_port",
          icon: require("../../images/server.jpg")
        },
        {
          title: "域互联",
          name: "metro_port",
          icon: require("../../images/network.png")
        },
        {
          title: "广互联",
          name: "cloud_port",
          icon: require("../../images/network.png")
        },
        {
          title: "SD-WAN",
          name: "sdwan_port",
          icon: require("../../images/network.png")
        }
      ],
      //子菜单
      aMan: [
        {
          title: "工单",
          name: "order_mine",
          icon: require("../../images/server.jpg")
        },
        {
          title: "字典",
          name: "dictionary_general",
          icon: require("../../images/network.png")
        }
      ]
    };
  },
  methods: {
    jumpRoute(name) {
      util.jumpRoute(this, name);
      this.bPop = false;
    }
  }
};
</script>

