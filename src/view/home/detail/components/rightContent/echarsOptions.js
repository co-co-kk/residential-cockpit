import { reactive, ref } from "vue";
import * as echarts from "echarts";

// 1

export const coverageData= ref({
  title: {
    show:false,
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    show:false
    
  },
  series: [
    {
      name: '总揽',
      type: 'pie',
      radius: [40, '100%'],
      data: [
        { value: 2, name: '电焊工' },
        { value: 2, name: '起重信号工' },
        { value: 5, name: '架子工' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
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


const CubeLeft = echarts.graphic.extendShape({
  shape: {
      x: 0,
      y: 0
  },
  buildPath: function(ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c0 = [shape.x, shape.y]
      const c1 = [shape.x - 9, shape.y - 9]
      const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9]
      const c3 = [xAxisPoint[0], xAxisPoint[1]]
      ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  }
})
const CubeRight = echarts.graphic.extendShape({
  shape: {
      x: 0,
      y: 0
  },
  buildPath: function(ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c1 = [shape.x, shape.y]
      const c2 = [xAxisPoint[0], xAxisPoint[1]]
      const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
      const c4 = [shape.x + 18, shape.y - 9]
      ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
})
const CubeTop = echarts.graphic.extendShape({
  shape: {
      x: 0,
      y: 0
  },
  buildPath: function(ctx, shape) {
      const c1 = [shape.x, shape.y]
      const c2 = [shape.x + 18, shape.y - 9]
      const c3 = [shape.x + 9, shape.y - 18]
      const c4 = [shape.x - 9, shape.y - 9]
      ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
})
echarts.graphic.registerShape('CubeLeft', CubeLeft)
echarts.graphic.registerShape('CubeRight', CubeRight)
echarts.graphic.registerShape('CubeTop', CubeTop)
const MAX = [150,150,150,150,150]
const VALUE = [50,30,90,60,70]
export const coverageData3 = ref({
  title: {
      text: '',
      top: 0,
      left: 18,
      textStyle: {
          color: '#00F6FF',
          fontSize: 24
      }
  },
  grid: {
      left: 20,
      right: 40,
      bottom: '19%',
      top: 40,
      containLabel: true
  },
  xAxis: {
      type: 'category',
      data: ['钢筋工程', '模版工程', '混泥土工程', '地基与基...', '给排水及...'],
      axisLine: {
          show: true,
          lineStyle: {
              color: 'white'
          }
      },
      offset: 20,
      axisTick: {
          show: false,
          length: 9,
          alignWithLabel: true,
          lineStyle: {
              color: '#7DFFFD'
          }
      },
      axisLabel: {
          fontSize: 10
      }
  },
  yAxis: {
      type: 'value',
      axisLine: {
          show: true,
          lineStyle: {
              color: 'white'
          }
      },
      splitLine: {
          show: false
      },
      axisTick: {
          show: false
      },
      axisLabel: {
          fontSize: 16
      },
      boundaryGap: ['20%', '20%']
  },
  series: [{
      type: 'custom',
      renderItem: function(params, api) {
          const location = api.coord([api.value(0), api.value(1)])
          return {
              type: 'group',
              children: [{
                  type: 'CubeLeft',
                  shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                      fill: 'rgba(7,29,97,.6)'
                  }
              }, {
                  type: 'CubeRight',
                  shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                      fill: 'rgba(10,35,108,.7)'
                  }
              }, {
                  type: 'CubeTop',
                  shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                      fill: 'rgba(11,42,106,.8)'
                  }
              }]
          }
      },
      data: MAX
  }, {
      type: 'custom',
      renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
              type: 'group',
              children: [{
                  type: 'CubeLeft',
                  shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: '#3B80E2'
                          },
                          {
                              offset: 1,
                              color: '#49BEE5'
                          }
                      ])
                  }
              }, {
                  type: 'CubeRight',
                  shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: '#3B80E2'
                          },
                          {
                              offset: 1,
                              color: '#49BEE5'
                          }
                      ])
                  }
              }, {
                  type: 'CubeTop',
                  shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: '#3B80E2'
                          },
                          {
                              offset: 1,
                              color: '#49BEE5'
                          }
                      ])
                  }
              }]
          }
      },
      data: VALUE
  }, {
      type: 'bar',
      label: {
          normal: {
              show: false,
              position: 'top',
              formatter: (e) => {
                  switch (e.name) {
                      case '10kV线路':
                          return VALUE[0]
                      case '公用配变':
                          return VALUE[1]
                      case '35kV主变':
                          return VALUE[2]
                      case '水':

                  }
              },
              fontSize: 16,
              color: '#fff',
              offset: [4, -25]
          }
      },
      itemStyle: {
          color: 'transparent'
      },
      data: MAX
  }]
})

export const coverageData4=ref({
  
  color: ['#39CAFB','#4CAFF9','#49DECA','#0271F4'],
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    },
    
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [8, '100%'],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 0
      },
      data: [
        { value: 40, name: '现场防火' },
        { value: 25, name: '洞口防护' },
        { value: 20, name: '扣件式钢管脚手架' },
        { value: 30, name: '临边防护' },
        { value: 28, name: '未分类' },
        { value: 26, name: '材料管理' },
      ],
      label: {
        show: false,
        formatter: function(params) {
          return `{b|${params.name}}\n{c|${params.value}}`;
        },
        rich: {
          b: {
            color: '#fff', // 设置名称颜色为白色
            fontSize: 16,
            align: 'center'
          },
          c: {
            color: '#0370F2', // 设置数量颜色
            fontSize: 14,
            align: 'center'
          }
        }
      },
      labelLine: {
        show: false // 显示引导线
      }
    }
  ]
})

export const coverageData5 = ref( {
  color:[''],
  color:['rgba(9,161,234,0.7)'],
  grid: {
    left: '1%',
    right: '1%',
    bottom: '1%',
    top: '1%',
    containLabel: true
  },
  title: {
      show:false,
      text: '甘特图测试',
      x: '甘特图测试'
  },

  yAxis: [{
    axisLabel:{
      color:"#fff"
    },
      type: "category",
      data: ["土石方开挖", "基础施工", "地下室主体施工", "地上主体结构施工", "抹灰施工", "屋面施工"]
  }],
  xAxis: [{
      type: 'value',
      axisLabel: {
        color:"#fff",
          formatter: function(value) {
              var end_time = 1718428800000;
              var start_time = 1717392000000;
              var date = [];
              var i = 1;
              while (end_time > start_time) {
                  var date_formatter = new Date(start_time);
                  var date_time = (date_formatter.getFullYear() + "-" + (date_formatter.getMonth() + 1) + "-" + date_formatter.getDate());
                  date.push(date_time);
                  start_time = start_time + i * 24 * 60 * 60 * 1000;
              }
            //   console.log(date);
              return date[value * 1];
          }
      },
  }],
  series: [{
          name: "土石方开挖",
          type: "bar",
          stack: "总",
          barWidth: 20,
          itemStyle: {
              normal: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'rgba(255,255,255,0.1)'
              }
          },
          data: [1, 1, 2, 3, 4, 5, 6]
      },
      {
          name: "基础施工",
          type: "bar",
          barWidth: 20,
          stack: "总",
          data: [3],
      },
      {
          name: "地下室主体施工",
          type: "bar",
          barWidth: 20,
          stack: "总",
          data: [0, 4, 0, 0, 0, 0, 0],
      },
      {
          name: "地上主体结构施工",
          type: "bar",
          barWidth: 20,
          stack: "总",
          data: [0, 0, 2, 0, 0, 0, 0],
      },
      {
          name: "抹灰施工",
          type: "bar",
          barWidth: 20,
          stack: "总",
          data: [0, 0, 0, 5, 0, 0, 0],
      },
      {
          name: "屋面施工",
          type: "bar",
          barWidth: 20,
          stack: "总",
          data: [0, 0, 0, 0, 4, 0, 0],
          
      },
      
  ]
});
