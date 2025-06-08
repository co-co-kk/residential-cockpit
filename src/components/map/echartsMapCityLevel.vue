<template>
  <div class="echarts_container">
    <div id="main" :style="{ width: '100%', height: height + 'px' }" />
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import bus from "@/utils/bus";
export default {
  name: "MapWms",
  props: {},
  data() {
    return {
      height: window.innerHeight,
      mapImg: require("@/assets/images/screen/12.png"),
      pointImg: require("@/assets/images/car.png"),
      chart: null,
      layer: null,
      currentJson: require("@/assets/json/city.json"),
      mapJson: [
        require("@/assets/json/city.json"),
        require("@/assets/json/lhqjd.json"),
        require("@/assets/json/wyx.json"),
        require("@/assets/json/dkx.json"),
        require("@/assets/json/wltqq.json"),
        require("@/assets/json/wltzq.json"),
        require("@/assets/json/wlthq.json"),
        require("@/assets/json/hjhq.json"),
      ],
      dataJson: [
        [26, 118907, 50, "25.2℃"],
        [3250, 286300, 545, 409, 2, 749, 50, "25.2℃"],
        [690, 52658, 106, 67, 1, 260, 0, 22.6],
        [301, 27712, 148, 36, 4, 64, 0, 22.6],
        [731, 66649, 411, 109, 1, 38, 0, 22.6],
        [385, 26956, 72, 43, 1, 96, 0, 22.6],
        [234, 17676, 33, 37, 1, 70, 0, 22.6],
        [802, 65018, 205, 96, 2, 97, 0, 22.6],
      ],
    };
  },
  watch: {},
  created() {
    var _this = this;
    window.onresize = () => {
      return (() => {
        _this.height = window.innerHeight;
      })();
    };
  },
  beforeDestroy() {},
  mounted() {
    this.initMap();
  },
  methods: {
    // 初始化地图
    initMap() {
      var that = this;
      // 部分测试数据
      that.chart = echarts.init(document.getElementById("main"));
      echarts.registerMap("customMap", this.currentJson);
      var option = {};
      // if (that.layer != "临河区") {
      option = {
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            let i = params.data.index + 1;
            var res =
              `
                                <div>
                <div>
                  <span style="color: #286ECA;font-weight: 800;font-size: 13px">供热面积： ` +
              that.dataJson[i][0] +
              `</span>
                </div>
                <div>
                  <span style="color: #286ECA;font-weight: 800;font-size: 13px">供热用户：` +
              that.dataJson[i][1] +
              `</span>
                </div>
                <div>
                  <span style="color: #286ECA;font-weight: 800;font-size: 13px">小区数量：` +
              that.dataJson[i][2] +
              `个</span>
                </div>
                <div>
                  <span style="color: #286ECA;font-weight: 800;font-size: 13px">热力站数量：` +
              that.dataJson[i][3] +
              `</span>
                </div>
                 <div>
                  <span style="color: #286ECA;font-weight: 800;font-size: 13px">热企数量：` +
              that.dataJson[i][4] +
              `</span>
                </div>
                <div>
                  <span style="color: #286ECA;font-weight: 800;font-size: 13px">换热机组数量：` +
              that.dataJson[i][5] +
              `</span>
                </div>
                <div>
                  <span style="color: #286ECA;font-weight: 800;font-size: 13px">室温采集器数量：` +
              that.dataJson[i][6] +
              `</span>
                </div>
                <div>
                  <span style="color: #286ECA;font-weight: 800;font-size: 13px">平均温度：` +
              that.dataJson[i][7] +
              `</span>
                </div>
            `;
            return params.name + res;
          },
        },
        series: [
          {
            map: "customMap",
            type: "map3D",
            // 三维图形的着色效果
            shading: "realistic",
            viewControl: {
              distance: !that.layer ? 120 : 190,
            },
            zlevel: 10,
            // 真实感材质相关的配置项
            realisticMaterial: {
              detailTexture: this.mapImg, // 纹理图片
              textureTiling: 1,
            },
            label: {
              show: true,
              color: "#fff",
              fontSize: 14,
              fontWeight: "bold",
            },
            itemStyle: {
              opacity: 1, // 图形的不透明度 [ default: 1 ]
              borderWidth: 2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域
              borderColor: "#6AC0FF", // 图形描边的颜色。[ default: #333 ]
            },
            emphasis: {
              itemStyle: {
                color: "#286ECA",
                borderWidth: 1.5,
                borderColor: "#6AC0FF",
                shadowColor: "#ff6347", // 发光颜色
                shadowBlur: 15, // 发光强度
              },
              label: {
                show: true,
                color: "#fff",
                fontSize: 14,
                fontWeight: "bold",
              },
            },
            data: that.mapJson[0].features.map((feature, index) => ({
              name: feature.properties.name,
              value: feature.properties.value,
              index: index,
            })),
            extrude: true,
            extrudeHeight: 50,
            light: {
              main: {
                intensity: 1.2,
                shadowQuality: "high",
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      that.chart.setOption(option);
      that.chart.resize();
      that.chart.on("click", function (params) {
        if (
          params.componentType === "series" &&
          params.seriesType === "map3D"
        ) {
          bus.$emit("cityLevelShowMap", params);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.echarts_container {
  height: 100vh;
  width: 100vw;
  background: url("../../assets/images/screen/map-bg7.png") no-repeat;
  background-size: 100% 100%;
}
</style>
