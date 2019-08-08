<template>
  <!-- <div style="height:100%;"> -->
  <div :id="objData.chartId" :style="{width:objData.chartWidth,height:objData.chartHeight}"
  ></div>
  <!--<Spin size="large" fix v-if="objData.loading"></Spin> -->
  <!-- </div> -->
</template>
<script>
//不同类型图表配置
let option = {};
import echarts from "echarts";
export default {
  name: "initChart",
  components: {},
  props: {
    objData: Object,
  },
  data() {
    return {};
  },
  watch: {
    objData: {
      handler() {
        //初始化echarts图
       this.initChart();
      },
      deep: true,
    }
  },
  methods: {
    initChart() {
      var chart = document.getElementById(this.objData.chartId);
      var myChart = echarts.init(chart);
      switch (this.objData.chartType) {
        case "line1":
          option = {
            title: {
                text:this.objData.title,
                left:'center',
                textStyle: {
                    fontWeight:800,
                    fontSize: 16,
                },
            },
            grid: {
              top: "13%",
              left: "5%",
              right: "2%",
              bottom: 0,
              containLabel: true
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "line",
                label: {
                  backgroundColor: "#6a7985"
                }
              }
            },
             xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
               },
            yAxis: {
                 type: 'value'
              },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
          };
          break;
     
        default:
          break;
      }
      myChart.setOption(option, true);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  },
  mounted() {}
};
</script>
