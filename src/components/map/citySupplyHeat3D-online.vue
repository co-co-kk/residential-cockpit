<template>
  <div class="screen_container">
    <div id="cesiumContainer" style="height: 100vh; width: 100vw"></div>
    <div style="position: absolute; top: 10px; right: 10px">
      <el-select
        size="mini"
        v-model="value"
        filterable
        remote
        reserve-keyword
        clearable
        placeholder="输入进行搜索"
        :remote-method="remoteMethod"
        :loading="loading"
        @change="selectMethod"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div style="position: absolute; bottom: 10px; right: 10px">
      <el-upload
        class="upload-demo"
        action="http://125.211.217.17:20035/node/upload"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :file-list="fileList"
      >
        <el-button type="primary" size="mini">立即发布</el-button>
      </el-upload>
      <el-button size="mini" style="margin-top: 5px" @click="clearFeatures"
        >清除要素</el-button
      >
      <el-button size="mini" style="margin-top: 5px" @click="openDialogue"
        >落图</el-button
      >
    </div>
    <el-dialog
      title="建筑工程"
      :visible.sync="dialogFormVisible"
      width="70%"
      @opened="init2DMap"
      destroy-on-close
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form
            :model="form"
            size="mini"
            label-width="90px"
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item label="建筑名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入建筑名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="建筑楼层" prop="floor">
              <el-input
                v-model="form.floor"
                placeholder="请输入建筑楼层(数字)"
              ></el-input>
            </el-form-item>
            <el-form-item label="建筑坐标" prop="the_geom">
              <el-input
                v-model="form.the_geom"
                placeholder="请输入建筑坐标"
              ></el-input>
            </el-form-item>
            <el-form-item label="土地属性" prop="earth_type">
              <el-select v-model="form.earth_type" placeholder="请选择土地属性">
                <el-option label="国有" value="0"></el-option>
                <el-option label="集体" value="1"></el-option>
                <el-option label="其他" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目类型" prop="project_type">
              <el-select
                v-model="form.project_type"
                placeholder="请选择项目类型"
              >
                <el-option label="房建" value="0"></el-option>
                <el-option label="市政" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资主体" prop="project_type">
              <el-select
                v-model="form.investment_type"
                placeholder="请选择投资主体类别"
              >
                <el-option label="政府投资" value="0"></el-option>
                <el-option label="企业投资" value="1"></el-option>
                <el-option label="个人投资" value="2"></el-option>
                <el-option label="社团投资" value="3"></el-option>
                <el-option label="社会投资" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="建设性质" prop="build_type">
              <el-select v-model="form.build_type" placeholder="请选择建设性质">
                <el-option label="新建" value="0"></el-option>
                <el-option label="改建" value="1"></el-option>
                <el-option label="扩建" value="2"></el-option>
                <el-option label="恢复" value="3"></el-option>
                <el-option label="社会投资" value="4"></el-option>
                <el-option label="迁建" value="5"></el-option>
                <el-option label="拆除" value="6"></el-option>
                <el-option label="其他" value="7"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="风险等级" prop="risk_type">
              <el-select
                v-model="form.risk_type"
                placeholder="请选择项目综合风险等级"
              >
                <el-option label="高风险" value="0"></el-option>
                <el-option label="较高风险" value="1"></el-option>
                <el-option label="中风险" value="2"></el-option>
                <el-option label="低风险" value="3"></el-option>
              </el-select>
            </el-form-item>
            <div style="margin-top: 117px; text-align: right">
              <el-button @click="cancel" size="mini">取 消</el-button>
              <el-button type="primary" @click="submit('ruleForm')" size="mini"
                >确 定</el-button
              >
              <el-button size="mini" style="margin-top: 5px" @click="sendData"
                >传值</el-button
              >
            </div>
          </el-form>
        </el-col>
        <el-col :span="16">
          <div id="mapWms" class="mapWms" style="height: 500px; width: 100%" />
        </el-col>
      </el-row>
    </el-dialog>
    <div id="popup" class="ol-popup tech-border" v-if="informationShow">
      <div id="popup-content">
        <el-row :gutter="20">
          <el-col :span="24">
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 100%;
              "
            >
              <div style="margin-bottom: 10px; font-size: 14px">
                建筑名称: {{ overlayInformation.name }}
              </div>
              <div style="margin-bottom: 10px; font-size: 14px">
                土地属性:
                {{ overlayInformation.earth_type == "0" ? "国有" : "集体" }}
              </div>
              <div style="margin-bottom: 10px; font-size: 14px">
                项目类型：{{
                  overlayInformation.project_type == "0" ? "房建" : "市政"
                }}
              </div>
              <div style="margin-bottom: 10px; font-size: 14px">
                投资主体类别:
                {{
                  overlayInformation.investment_type == "0"
                    ? "政府投资"
                    : overlayInformation.investment_type == "1"
                    ? "企业投资"
                    : overlayInformation.investment_type == "2"
                    ? "个人投资"
                    : overlayInformation.investment_type == "3"
                    ? "社团投资"
                    : "社会投资"
                }}
              </div>
              <div style="margin-bottom: 10px; font-size: 14px">
                建设性质:
                {{
                  overlayInformation.build_type == "0"
                    ? "新建"
                    : overlayInformation.build_type == "1"
                    ? "改建"
                    : overlayInformation.build_type == "2"
                    ? "扩建"
                    : overlayInformation.build_type == "3"
                    ? "恢复"
                    : overlayInformation.build_type == "4"
                    ? "社会投资"
                    : overlayInformation.build_type == "5"
                    ? "迁建"
                    : overlayInformation.build_type == "6"
                    ? "拆除"
                    : "其他"
                }}
              </div>
              <div style="margin-bottom: 10px; font-size: 14px">
                项目综合风险等级:
                {{
                  overlayInformation.risk_type == "0"
                    ? "高风险"
                    : overlayInformation.risk_type == "1"
                    ? "较高风险"
                    : overlayInformation.risk_type == "2"
                    ? "中风险"
                    : "低风险"
                }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
let viewer, camera, scene;
import axios from "axios";

// 导入基本模块
import "ol/ol.css";
import * as ol from "ol";
import Map from "ol/Map";
import XYZ from "ol/source/XYZ";
import Tile from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Draw from "ol/interaction/Draw";
import Select from "ol/interaction/Select";
import DragBox from "ol/interaction/DragBox";
import {
  Fill,
  Icon,
  Stroke,
  Style,
  Text,
  Circle as CircleStyle,
} from "ol/style";
export default {
  name: "CesiumViewer",
  props: {},
  mounted() {
    this.initMap();
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "请输入建筑名称",
            trigger: "blur",
          },
        ],
        floor: [
          {
            required: true,
            message: "请输入建筑楼层数，请输入正整数",
            trigger: "blur",
          },
        ],
        the_geom: [
          {
            required: true,
            message: "请输入坐标或在地图上绘制",
            trigger: "blur",
          },
        ],
        earth_type: [
          {
            required: true,
            message: "请选择土地属性",
            trigger: "blur",
          },
        ],
        project_type: [
          {
            required: true,
            message: "请选择项目类型",
            trigger: "blur",
          },
        ],
        investment_type: [
          {
            required: true,
            message: "请选择投资主体",
            trigger: "blur",
          },
        ],
        build_type: [
          {
            required: true,
            message: "请选择建设属性",
            trigger: "blur",
          },
        ],
        risk_type: [
          {
            required: true,
            message: "请选择风险登记",
            trigger: "blur",
          },
        ],
      },
      informationShow: false,
      plotEntity: [],
      overlayInformation: {
        name: null,
        floor: null,
        earth_type: null,
        project_type: null,
        investment_type: null,
        build_type: null,
        risk_type: null,
      },
      form: {
        name: null,
        floor: null,
        the_geom: "",
        earth_type: null,
        project_type: null,
        investment_type: null,
        build_type: null,
        risk_type: null,
      },
      fileList: [],
      loading: null,
      options: [],
      value: null,
      polygonEntity: null,
      dialogFormVisible: false,
      map: null,
      drawPologySource: null,
      drawPologyVector: null,
      polygonBuilding: null,
    };
  },
  created() {},
  methods: {
    init2DMap() {
      var that = this;
      let layers = [
        new Tile({
          source: new XYZ({
            url: "https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=a8118bfa1925ee93b6efb19eec744c88",
          }),
        }),
        new Tile({
          source: new XYZ({
            url: "https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=a8118bfa1925ee93b6efb19eec744c88",
          }),
        }),
      ];
      that.map = new Map({
        layers: layers,
        target: "mapWms",
        view: new ol.View({
          projection: "EPSG:4326",
          zoom: 15,
          center: [106.54603616704267, 29.522509712720506],
          maxZoom: 18,
        }),
      });
      that.drawPologySource = new VectorSource();
      that.drawPologyVector = new VectorLayer({
        source: that.drawPologySource,
      });
      var draw = new Draw({
        source: that.drawPologySource,
        type: "Polygon",
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)",
          }),
          stroke: new Stroke({
            color: "#ffcc33",
            width: 2,
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: "#ffcc33",
            }),
          }),
        }),
      });
      that.map.addInteraction(draw);
      that.map.addLayer(that.drawPologyVector);
      that.map.on("singleclick", function (evt) {
        const longitude = evt.coordinate[0];
        const latitude = evt.coordinate[1];
        that.form.the_geom += longitude + "," + latitude + "-";
      });
      that.map.on("dblclick", function (evt) {
        const longitude = evt.coordinate[0];
        const latitude = evt.coordinate[1];
        if (that.form.the_geom) {
          that.form.the_geom += longitude + "," + latitude + "-";
        }
      });
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            ...this.form,
          };
          let array = [];
          if (!params.the_geom.startsWith("[")) {
            let geom = params.the_geom
              .substring(0, params.the_geom.length - 1)
              .split("-");
            geom.map((ele) => {
              let arr = ele.split(",");
              array.push([parseFloat(arr[0]), parseFloat(arr[1])]);
            });
            array.push(array[0]);
            let the_geom = [];
            the_geom.push(array);
            params.the_geom = JSON.stringify(the_geom);
          }
          axios
            .post("http://125.211.217.17:20035/node/add", params, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              if (res.data.code == 0) {
                this.dialogFormVisible = false;
                this.searchBuilding();
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.form = {
        name: null,
        floor: null,
        the_geom: "",
        earth_type: null,
        project_type: null,
        investment_type: null,
        build_type: null,
        risk_type: null,
      };
      this.dialogFormVisible = false;
    },
    openDialogue() {
      this.form = {
        name: null,
        floor: null,
        the_geom: "",
        earth_type: null,
        project_type: null,
        investment_type: null,
        build_type: null,
        risk_type: null,
      };
      this.dialogFormVisible = true;
    },
    selectMethod(item) {
      scene.camera.flyTo({
        destination: new Cesium.Cartesian3.fromDegrees(
          item.coordinates[0][0][0][0],
          item.coordinates[0][0][0][1],
          500
        ),
        orientation: {
          heading: 5.7349291280587895,
          pitch: -1.5702457126936387,
          roll: 0,
        },
      });
      this.addPolygon(item);
    },
    addPolygon(data) {
      if (this.polygonEntity) {
        viewer.entities.remove(this.polygonEntity);
      }
      let positions = [];
      data.coordinates[0][0].map((ele) => {
        positions.push(ele[0], ele[1]);
      });
      const polygonPositions = Cesium.Cartesian3.fromDegreesArray(positions);
      this.polygonEntity = viewer.entities.add({
        name: "选中建筑物",
        polygon: {
          id: "200000",
          name: "选中建筑物",
          hierarchy: polygonPositions,
          material: Cesium.Color.fromCssColorString("#FF0000").withAlpha(0.8),
          extrudedHeight: data.floor * 3, // 设置拉伸的高度，单位为米
        },
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.options = [];
        this.loading = true;
        let CQL = "name like '%25" + query + "%25'";
        setTimeout(() => {
          this.loading = false;
          axios({
            type: "GET",
            url:
              "http://125.211.217.17:10006/geoserver/InnerMongolia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=InnerMongolia%3Acqbuilding&outputFormat=application%2Fjson&CQL_FILTER=" +
              CQL +
              "+&maxFeatures=50&outputFormat=application%2Fjson",
          }).then((res) => {
            res.data.features.map((ele) => {
              let obj = {};
              obj.label = ele.properties.name;
              obj.value = ele.properties.pid;
              obj.coordinates = ele.geometry.coordinates;
              obj.floor = ele.properties.floor;
              this.options.push(obj);
            });
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    beforeAvatarUpload() {
      this.loading = this.$loading({
        lock: true,
        text: "正在导入要素信息",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    handleAvatarSuccess(res, file) {
      this.loading.close();
      this.$message.success(res.message);
    },
    clearFeatures() {
      axios({
        type: "GET",
        url: "http://125.211.217.17:20035/node/clearFeatures",
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success(res.data.message);
          this.searchBuilding();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    randomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    initMap() {
      let center = [106.54603616704267, 29.522509712720506];
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZjc0NDIzMS0zY2UzLTRlZjEtOGRmZC1hZjM3ZTFmYzFiMDkiLCJpZCI6MjM0NTAzLCJpYXQiOjE3MjM1NDk0MDN9.jHsgLhzjpRHJFvMNOj-98_9_sIYkrs079IH4a10Y-jY";
      viewer = new Cesium.Viewer("cesiumContainer", {
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        timeline: false,
        navigationHelpButton: false,
      });
      scene = viewer.scene;
      scene.camera.setView({
        destination: new Cesium.Cartesian3.fromDegrees(
          center[0],
          center[1],
          5000
        ),
        orientation: {
          heading: 6.105554111990866,
          pitch: -0.8497969761537805,
          roll: 6.282994966766402,
        },
      });
      viewer.scene.setTerrain(
        new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(1))
      );
      viewer.scene.globe.depthTestAgainstTerrain = true;

      var position = Cesium.Cartographic.fromDegrees(
        106.54603616704267,
        29.522509712720506
      ); // 经纬度

      this.searchBuilding();
      var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
      var that = this;
      handler.setInputAction(function (e) {
        var position = scene.pickPosition(e.position);
        var cartographic = Cesium.Cartographic.fromCartesian(position);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        var height = Cesium.Math.toDegrees(cartographic.height);
        var pick = viewer.scene.pick(e.position);
        // console.log(longitude, latitude);
        // console.log(longitude, latitude, height);
        // console.log(1111, viewer.camera.heading);
        // console.log(1111, viewer.camera.pitch);
        // console.log(1111, viewer.camera.roll);
        // console.log(1111, viewer.camera);
        that.informationShow = false;
        if (pick.id.id) {
          axios({
            type: "GET",
            url:
              "http://125.211.217.17:10006/geoserver/InnerMongolia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=InnerMongolia%3Acqbuilding&maxFeatures=1&outputFormat=application%2Fjson&CQL_FILTER=name='" +
              pick.id.name +
              "'",
          }).then((res) => {
            that.informationShow = true;
            that.overlayInformation = res.data.features[0].properties;
          });
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    searchBuilding() {
      if (this.polygonBuilding) {
        viewer.entities.remove(this.polygonBuilding);
      }
      axios({
        type: "GET",
        url: "http://125.211.217.17:10006/geoserver/InnerMongolia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=InnerMongolia%3Acqbuilding&maxFeatures=1000000&outputFormat=application%2Fjson",
      }).then((res) => {
        if (res.data.features.length > 0) {
          this.addPlot(res.data.features);
        }
      });
    },
    addPlot(arr) {
      arr.map((ele, index) => {
        let positions = [];
        ele.geometry.coordinates[0][0].map((ele1) => {
          positions.push(ele1[0], ele1[1]);
        });
        const polygonPositions = Cesium.Cartesian3.fromDegreesArray(positions);
        this.polygonBuilding = viewer.entities.add({
          name: ele.properties.name,
          polygon: {
            id: ele.properties.name,
            name: ele.properties.name,
            hierarchy: polygonPositions,
            material:
              ele.properties.floor > 20
                ? Cesium.Color.fromCssColorString("#c9d6df").withAlpha(0.8)
                : ele.properties.floor > 10
                ? Cesium.Color.fromCssColorString("#dff4f3").withAlpha(0.8)
                : Cesium.Color.fromCssColorString("#FFFFFF").withAlpha(0.8),
            extrudedHeight: 240 + ele.properties.floor * 3, // 设置拉伸的高度，单位为米
          },
          label: {
            text: ele.properties.pid,
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 13,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            font: "bold 26px MicroSoft YaHei",
            backgroundColor: Cesium.Color.WHITE,
            showBackground: false,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            scale: 0.5,
          },
        });
      });
    },

    sendData() {
      var that = this;
      window.parent.postMessage(that.form.the_geom, "http://localhost");
    },
  },
  beforeDestroy() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  },
};
</script>

<style>
.screen_container {
}

#cesiumContainer {
  width: 100%;
  height: 100vh;
}

.ol-popup {
  position: fixed;
  background-color: rgba(37, 39, 40, 0.9);
  color: #fff;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  top: 28vh;
  left: 40vw;
  min-width: 20vw;
  height: 220px;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: 0f3360;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #0f3360;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

@keyframes pulse {
  0% {
    border-color: #007bff;
  }

  50% {
    border-color: #2f00ff;
  }

  100% {
    border-color: #007bff;
  }
}

.tech-border {
  border: 2px solid #007bff;
  /* 或者其他科技色彩 */
  animation: pulse 2s infinite;
  /* 持续时间可调整 */
  border-radius: 0px;
  /* 可选：添加圆角 */
  border-left: none;
  border-right: none;
}

.cesium-viewer-toolbar {
  display: none;
}

.cesium-viewer-animationContainer {
  display: none;
}

.cesium-infoBox {
  display: none;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
}

.el-upload-list--text {
  display: none;
}
</style>
