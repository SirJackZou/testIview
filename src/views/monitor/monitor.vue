<style lang="less" scoped>
.alertTitle {
  width: 20%;
  height: 80px;
  line-height:80px;
  border: 1px solid #ddd;
  border-radius: 4px;
  float: left;
  margin-left: 3%;
}
.alertTitle span {
  float: left;
  height: 80px;
}
.alertTitle span:first-child {
  width: 35%;
  color:#FFFFFF;
  text-align:center;

}
.alertTitle span:last-child {
  width: 65%;
}
.alertTitle p {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
<template>
<div id="monitor">
  <Card title="数据汇总监控">
      <p slot="title" style="height:35px;">
          数据汇总监控
            <Select v-model="model1" style="width:200px;margin-left:10px;">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
      </p>
    <Row style="height:300px;">
      <Col span="8" style="height:100%;">
         <init-chart :objData="lineData[0]"></init-chart>
      </Col>
      <Col span="8" style="height:100%;">
      <init-chart :objData="lineData[1]"></init-chart>
      </Col>
      <Col span="8" style="height:100%;">
      <init-chart :objData="lineData[2]"></init-chart>
      </Col>
    </Row>
    <Row style="margin-top:15px;background:#E7EDF4;">
    <div style="width:100%;height:40px;line-height:40px;background:#E7EDF4;text-indent:15px;">
     <strong>点位总数:</strong>
    <a href="#">56124</a>
    <Divider type="vertical" />
      <strong>通讯不健康点位:</strong> <a href="#">56</a>
    <Divider type="vertical" />
      <strong>数据中心通讯状态:</strong> 正常
    </div>
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
     
  </Card>
</div>
</template>
<script>
import API from "@/libs/API";
import initChart from "@/components/initChart.vue";
import tableExplore from "@/components/table-explore.vue";
export default {
  name: "monitor",
  components: {
    initChart,
    tableExplore
  },
  data() {
    return {
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
          title: "点位所在模组",
          key: "n1"
        },
        {
          title: "点位所在房间",
          key: "n2"
        },
        {
          title: "点位编号",
          key: "n3"
        },
        {
          title: "通讯周期（秒）",
          key: "n4"
        },
        {
          title: "通讯健康情况",
          key: "n5"
        }
      ],
      data1: [
        {
          n1: "1#模组",
          n2: "101",
          n3: "101-1",
          n4: "60",
          n5: "正常"
        },
        {
          n1: "1#模组",
          n2: "101",
          n3: "101-1",
          n4: "60",
          n5: "正常"
        },
        {
          n1: "1#模组",
          n2: "101",
          n3: "101-1",
          n4: "60",
          n5: "正常"
        },
        {
          n1: "1#模组",
          n2: "101",
          n3: "101-1",
          n4: "60",
          n5: "正常"
        }
      ],
      lineData: [
        {
          title: "数据推送量/分钟",
          chartId: "line1",
          chartType: "line1",
          chartWidth: "100%",
          chartHeight: "100%",
          valueData: [],
        },
        {
          title: "告警推送量/小时",
          chartId: "line2",
          chartType: "line1",
          chartWidth: "100%",
          chartHeight: "100%",
          valueData: [],
        },
        {
          title: "断线数量/小时",
          chartId: "line3",
          chartType: "line1",
          chartWidth: "100%",
          chartHeight: "100%",
          valueData: [],
        }
      ]
    };
  },
  computed: {},

  methods: {
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
