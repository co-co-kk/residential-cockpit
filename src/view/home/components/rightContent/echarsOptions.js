import { reactive, ref } from "vue";
// 1
import * as echarts from "echarts";
const charts = {
  unit: ' ',
  names: ["线上审查覆盖率", "线下审查占比"],
  lineX: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
  value: [
    [23, 45, 67, 12, 89, 34, 56, 78, 91, 3, 25, 50],
    [7, 32, 58, 14, 76, 90, 41, 22, 85, 63, 18, 99]
  ]

}
const color = ['rgba(255, 191, 91, 1)', 'rgba(105, 251, 170, 1)']
const lineY = []
for (let i = 0; i < charts.names.length; i++) {
  let x = i
  if (x > color.length - 1) {
      x = color.length - 1
  }
  const data = {
      name: charts.names[i],
      type: 'line',
      color: color[x],
      smooth: true,
      areaStyle: {
          normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                      offset: 0,
                      color: color[x].replace('1)', '0.3)')
                  },
                  {
                      offset: 0.8,
                      color: color[x].replace('1)', '0)')
                  }
              ]),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
          }
      },
      symbol: 'circle',
      symbolSize: 5,
      data: charts.value[i]
  }
  lineY.push(data)
}


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
    data: ["漏报阈值", "漏报率"],
    top: 0,
    // right: 80,
    left: 0,
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
      name: "漏报阈值",
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
      name: "漏报率",
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

export const coverageData2 = ref({
  legend: {
    data: ["按资质等级", "项目达标率"],
    top: 0,
    // right: 80,
    left: 0,
    textStyle: {
      fontSize: 16,
      color: "#fff",
    },
  },
  grid: {
    left: "5%",
    // right: '10%',
    bottom: "10%",
  },
  xAxis: {
    type: "category",
    data: ['企业1', '企业2', '企业3', '企业4', '企业5','企业6'],
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        type: 'dashed', // 设置为虚线
        color: 'rgba(128, 164, 229, 0.4)', // 可设置颜色
        width: 1 // 可设置宽度
      }
    }
  },

  series: [
    {
      name: "按资质等级",
      data: [80, 74, 65, 99, 78, 90],
      type: "bar",
      color: "#406EA9",
      stack: "Total",
      areaStyle: {},
      smooth: false,
      showSymbol: false,
      itemStyle: {
        normal: {
          barBorderRadius: 5 // 设置柱子的圆角
        }
      },
      barWidth: '30%'
    },
    {
      name: "项目达标率",
      data: [53, 62, 71, 84, 90, 80],
      type: "line",
      color: "#FFBF5B",
    },
  ],
});

export const coverageData3= {
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ["线上审查覆盖率", "线下审查占比"],
      textStyle: {
          fontSize: 12,
          color: '#fff'
      },
      right: '4%'
  },
  grid: {
      top: '14%',
      left: '4%',
      right: '4%',
      bottom: '12%',
      containLabel: true
  },
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      axisLabel: {
          textStyle: {
              color: '#fff'
          },
          formatter: function(params) {
              return params.split(' ')[0] 
          }
      }
  },
  yAxis: {
      name: charts.unit,
      type: 'value',
      axisLabel: {
          formatter: '{value}%',
          textStyle: {
              color: '#fff'
          }
      },
      splitLine: {
          lineStyle: {
              color: 'rgba(128, 164, 229, 0.2)',
              type: 'dashed'
          }
      },
      axisLine: {
          lineStyle: {
              color: 'rgb(0,253,255,0.6)'
          }
      }
  },
  series: lineY
}