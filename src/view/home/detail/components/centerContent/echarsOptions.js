import { reactive, ref } from "vue";
// 1

export const coverageData= ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: ["计划完成时间", "实际完成时间"],
    top: 0,
    // right: 80,
    left: 'center',
    textStyle: {
      fontSize: 16,
      color: "#fff",
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["季度一", "季度二", "季度三", "季度四"],
    },
  ],
  yAxis: [
    {
      type: "value",
      splitLine: {
        lineStyle: {
          type: 'dashed', // 设置为虚线
          color: 'rgba(128, 164, 229, 0.4)', // 可设置颜色
          width: 1 // 可设置宽度
        }
      }
    },
  ],
  series: [
    {
      name: "计划完成时间",
      data: [23, 23, 23, 23],
      type: "line",
      color: "#FFBF5B",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
    },
    {
      name: "实际完成时间",
      data: [23, 80, 72, 69],
      type: "line",
      color: "#406EA9",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
    },
  ],
});
