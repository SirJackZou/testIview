<template>
  <Card title="数据中心基础数据">
    <Row style="margin-top:10px;">
      <table-explore :bSpinShow="tbLoading"
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
  name: "base",
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
          title: "基础数据版本号",
          key: "n2"
        },
        {
          title: "空间数量",
          key: "n3"
        },
        {
          title: "设备数量",
          key: "n4"
        },
        {
          title: "点位数量",
          key: "n5"
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
                      }
                    }
                  },
                  "获取基础数据"
                )
              ]),
            ]);
          }
        }
      ],
      data1: [
        {
          n1: "万国数据中心",
          n2: "20190706171833",
          n3: 16,
          n4: 456,
          n5: 34204,
        },
         {
          n1: "万国数据中心",
          n2: "20190706171833",
          n3: 16,
          n4: 456,
          n5: 34204,
        },
         {
          n1: "万国数据中心",
          n2: "20190706171833",
          n3: 16,
          n4: 456,
          n5: 34204,
        },
        {
          n1: "万国数据中心",
          n2: "20190706171833",
          n3: 16,
          n4: 456,
          n5: 34204,
        },
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

  }
};
</script>
