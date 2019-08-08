<template>
  <Card title="数据中心管理">
    <Row>
      <Button
        type="primary"
        @click="addSystem()"
      >新增数据中心</Button>
    </Row>
    <Row style="margin-top:10px;">
      <table-explore
        :bSpinShow="tbLoading"
        :columns="columns1"
        :data="data1"
        :pagination="objPage"
        @changePage="changePage"
        @changePageSize="changePageSize"
        @selectChange="selectChange"
      ></table-explore>
    </Row>
     <Modal v-model="editModal" title="信息修改" @on-ok="ensureEdit" @on-cancel="ensureCancel">
         <Form :model="editForm" :label-width="100">
              <FormItem label="数据中心名称">
                <Input  v-model="editForm.name" placeholder="Enter something..."></Input>
              </FormItem>
               <FormItem label="cmdb机房id">
                <Input v-model="editForm.cmdbId" placeholder="Enter something..."></Input>
            </FormItem>
             <FormItem label="模组id">
                <Input v-model="editForm.moduleId" placeholder="Enter something..."></Input>
            </FormItem>
             <FormItem label="采集服务ip">
                <Input v-model="editForm.ip" placeholder="Enter something..."></Input>
            </FormItem>
             <FormItem label="端口">
                <Input v-model="editForm.port" placeholder="Enter something..."></Input>
            </FormItem>
             <FormItem label="用户名">
                <Input v-model="editForm.userName" placeholder="Enter something..."></Input>
            </FormItem>
              <FormItem label="token">
                <Input v-model="editForm.token" placeholder="Enter something..."></Input>
            </FormItem>
             <FormItem label="state">
                <Input v-model="editForm.createTime" placeholder="Enter something..."></Input>
            </FormItem>
        </Form>
    </Modal>
  </Card>
</template>
<script>
import API from "@/libs/API";
import initChart from "@/components/initChart.vue";
import tableExplore from "@/components/table-explore.vue";
export default {
  name: "manage",
  components: {
    tableExplore
  },
  data() {
    return {
     //存储修改信息
      editForm:{
         name:'',
         cmdbId:'',
         moduleId:'',
         ip:'',
         port:'',
         userName:'',
         token:'',
         createTime:'',
         state:'',
      },
      tbLoading: false,
      // 分页控制
      objPage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      cityList: [
        {
          value: "万国数据中心",
          label: "万国数据中心"
        },
        {
          value: "宿迁数据中心",
          label: "宿迁数据中心"
        }
      ],
      model1: "万国数据中心",
      columns1: [
        {
          title: "数据中心",
          key: "n1"
        },
        {
          title: "cmdb机房id",
          key: "n2"
        },
        {
          title: "模组id",
          key: "n3"
        },
        {
          title: "采集服务ip",
          key: "n4"
        },
        {
          title: "端口",
          key: "n5"
        },
        {
          title: "用户名",
          key: "n6"
        },
        {
          title: "token",
          key: "n7"
        },
        {
          title: "创建时间",
          key: "n8"
        },
        {
          title: "状态",
          key: "n9"
        },
        {
          title: "操作",
          key: "handle",
          render: (h, params) => {
            return h("div", [
              h("a", [
                h("Icon", {
                  props: {
                    type: "md-create"
                  }
                }),
                h(
                  "a",
                  {
                    style: {
                      margin: "0 5px"
                    },
                    props: {
                      type: "error",
                      placement: "top"
                    },
                    on: {
                      click: () => {
                          this.editModal=true;
                          console.log(9870,this.editModal);
                      }
                    }
                  },
                  "修改"
                )
              ]),
                h("a", [
                h("Icon", {
                  props: {
                    type: "md-create"
                  }
                }),
                h(
                  "a",
                  {
                    style: {
                      margin: "0 5px"
                    },
                    props: {
                      type: "error",
                      placement: "top"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "登录"
                )
              ])
            ]);
          }
        }
      ],
      data1: [
        {
          n1: "万国数据中心",
          n2: "238",
          n3: 5,
          n4: "11.22.33.44",
          n5: "8080",
          n6: "admin",
          n7: "xxx-xxx-xxxxxxx",
          n8: "2019-04-28",
          n9: "已登录",
          n10: "修改",
          n11: "退出"
        },
        {
          n1: "万国数据中心",
          n2: "238",
          n3: 5,
          n4: "11.22.33.44",
          n5: "8080",
          n6: "admin",
          n7: "xxx-xxx-xxxxxxx",
          n8: "2019-04-28",
          n9: "已登录",
          n10: "修改",
          n11: "退出"
        },
        {
          n1: "万国数据中心",
          n2: "238",
          n3: 5,
          n4: "11.22.33.44",
          n5: "8080",
          n6: "admin",
          n7: "xxx-xxx-xxxxxxx",
          n8: "2019-04-28",
          n9: "已登录",
          n10: "修改",
          n11: "退出"
        },
        {
          n1: "万国数据中心",
          n2: "238",
          n3: 5,
          n4: "11.22.33.44",
          n5: "8080",
          n6: "admin",
          n7: "xxx-xxx-xxxxxxx",
          n8: "2019-04-28",
          n9: "已登录",
          n10: "修改",
          n11: "退出"
        }
      ],
      lineData: [
        {
          title: "数据推送量/分钟",
          chartId: "line1",
          chartType: "line1",
          chartWidth: "100%",
          chartHeight: "100%",
          valueData: []
        },
        {
          title: "告警推送量/小时",
          chartId: "line2",
          chartType: "line1",
          chartWidth: "100%",
          chartHeight: "100%",
          valueData: []
        },
        {
          title: "断线数量/小时",
          chartId: "line3",
          chartType: "line1",
          chartWidth: "100%",
          chartHeight: "100%",
          valueData: []
        }
      ],
      //控制修改框加载
      editModal:false
    };
  },
  computed: {},

  methods: {
    //确定修改
    ensureEdit(){

    },
    //取消修改
    ensureCancel(){
          this.editModal=false;
    },
    //增加数据中心
    addSystem() {},
    // 分页切换
    changePage(page) {},

    // 页码数切换
    changePageSize(pagesize) {},
    selectChange(selection) {
      // 选中数组
      this.aSelect = selection;
    }
  },
  created() {},
  mounted() {
    this.lineData[0].valueData.push(11);
    this.lineData[1].valueData.push(11);
    this.lineData[2].valueData.push(11);
  }
};
</script>
