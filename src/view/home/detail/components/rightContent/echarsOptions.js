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

export const coverageData6 = ref({
  legend: {
    data: ["支付人数", "支付金额"],
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
    data: ['第一季度', '第二季度', '第三季度', '第四季度'],
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        type: 'dashed', // 设置为虚线
        // color: 'rgba(128, 164, 229, 0.4)', // 可设置颜色
        color: '#fff', // 可设置颜色
        width: 1 // 可设置宽度
      }
    }
  },

  series: [
    {
      name: "支付人数",
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
      name: "支付金额",
      data: [53, 62, 71, 84, 90, 80],
      type: "line",
      color: "#FFBF5B",
    },
  ],
});
export const coverageData7=ref({
  
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
      radius: [0, '80%'],
      center: ['50%', '50%'],
      // roseType: 'area',
      itemStyle: {
        borderRadius: 0
      },
      data: [
        { value: 6, name: '剩余' },
        { value: 24, name: '合同总月数' },
      ],
      label: {
        show: true,
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
        show: true // 显示引导线
      }
    }
  ]
})

const getPie3D = (pieData, internalDiameterRatio) => {
    //internalDiameterRatio:透明的空心占比
    let series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    let k = 1;
    pieData.sort((a, b) => {
        return b.value - a.value;
    });
    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        let seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            pieData: pieData[i],
            pieStatus: {
                selected: false,
                hovered: false,
                k: k,
            },
            radius: '50%',
            center: ['10%', '10%'],
        };

        if (typeof pieData[i].itemStyle != 'undefined') {
            let itemStyle = {};
            typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
            typeof pieData[i].itemStyle.opacity != 'undefined'
                ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                : null;
            seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
    }

    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。

    for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value
        );
        startValue = endValue;
    }
    let boxHeight = getHeight3D(series, 25); //通过传参设定3d饼/环的高度，26代表26px
    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    let option = {
        backgroundColor: '#203598',
        labelLine: {
            show: true,
            lineStyle: {
                color: '#404772',
            },
        },
        label: {
            show: true,
            position: 'outside',
            rich: {
                b: {
                    fontSize: 24,
                    lineHeight: 30,
                    fontWeight: 'bold',
                    color: '#fff',
                },
                c: {
                    fontSize: 18,
                    color: '#fff',
                },
            },
            formatter: '{b|{b}}\n{c|{c}%}',
        },
        tooltip: {
            backgroundColor: '#053A8D',
            formatter: (params) => {
                if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
                    let bfb = (
                        (option.series[params.seriesIndex].pieData.endRatio -
                            option.series[params.seriesIndex].pieData.startRatio) *
                        100
                    ).toFixed(2);
                    return (
                        `${params.seriesName}<br/>` +
                        `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
                        `${bfb}%`
                    );
                }
            },
        },
        xAxis3D: {
            min: -1,
            max: 1,
        },
        yAxis3D: {
            min: -1,
            max: 1,
        },
        zAxis3D: {
            min: -1,
            max: 1,
        },
        grid3D: {
            show: false,
            boxHeight: boxHeight, //圆环的高度
            left: 0,
            top: 0, //3d饼图的位置
            viewControl: {
                //3d效果可以放大、旋转等，请自己去查看官方配置
                alpha: 20, //角度
                distance: 250, //调整视角到主体的距离，类似调整zoom
                rotateSensitivity: 0, //设置为0无法旋转
                zoomSensitivity: 0, //设置为0无法缩放
                panSensitivity: 0, //设置为0无法平移
                autoRotate: false, //自动旋转
            },
        },
        series: series,
    };
    return option;
};
export const coverageData9 = ref({
  tooltip: {
    trigger: 'item'
  },
  // legend: {
  //   top: '5%',
  //   left: 'center'
  // },
  series: [
    {
      name: '示例数据',
      type: 'pie',
      radius: '70%',
      data: [
        { value: 1120, name: '已履约' },
        { value: 4120, name: '履约' },
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