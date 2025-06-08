<template>
  <div class="map_container relative">
    <LoadingAnimation
      :loading="isLoading"
      @loadingComplete="handleLoadingComplete"
    />
    <div id="containCesium" class="containCesium"></div>
    <button
      @click="handleClick"
      class="bg-[red] absolute top-[20%] left-[40%] z-9 text-[50px]"
    >
      点击风险图层
    </button>
    <!-- 添加视角信息显示控件 -->
    <div class="view-info-panel">
      <p>视角位置</p>
      <div class="info-item">
        <span class="label">经度：</span>
        <span class="value">{{ currentView.longitude }}</span>
      </div>
      <div class="info-item">
        <span class="label">纬度：</span>
        <span class="value">{{ currentView.latitude }}</span>
      </div>
      <div class="info-item">
        <span class="label">高度：</span>
        <span class="value">{{ currentView.height }}米</span>
      </div>
    </div>
    <!-- 添加点击信息显示控件 -->
    <div class="absolute z-999 right-0 bottom-0">
      <p>点击位置</p>
      <textarea
        class="w-[400px] h-[300px]"
        :value="clickPositionInfo"
      ></textarea>
    </div>
    <!-- 风险信息弹窗 -->
    <div v-if="showRiskPopup" class="risk-popup" :style="popupStyle">
      <div class="risk-popup-header">
        <span class="risk-title">风险信息</span>
        <span class="risk-close" @click="closeRiskPopup">×</span>
      </div>
      <div class="risk-popup-content">
        <div class="risk-item" v-for="(item, index) in riskInfo" :key="index">
          <div class="risk-item-header">
            <span class="risk-type">{{ item.type }}</span>
            <span class="risk-level" :class="item.level">{{
              item.levelText
            }}</span>
          </div>
          <div class="risk-item-content">
            <p class="risk-desc">{{ item.description }}</p>
            <p class="risk-time">{{ item.time }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="popBox2"></div>
  </div>
</template>

<script setup name="CesiumViewer">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import bus from "../../utils/bus.js";
import buildingOptions from "../../assets/json/czzz.json";
import { color } from "echarts";
import LoadingAnimation from "./LoadingAnimation.vue";
import shexiangtou from "@/assets/rou/icon56.png";
import jiqiren from "@/assets/rou/icon55.png";
import bim1 from "@/assets/rou/BIM.png";
import bim2 from "@/assets/rou/BIM.png";
import fengxian from "@/assets/rou/fengxian.gif";
const emit = defineEmits([
  "handleEmitShexiangtou",
  "handleEmitJiqiren",
  "handleEmitYimo",
]);

const isLoading = ref(true);
const loading = ref(false);
const options = ref([]);
const value = ref(null);

let viewer = ref(null);
let scene = ref(null);
let camera = ref(null);
let handler = ref(null);

let agFeatureLayer = ref(null);

const informationShow = ref(false);
const overlayInformation = ref({
  type: null,
});
// 当前视角
const currentView = ref({
  longitude: "0.000000",
  latitude: "0.000000",
  height: "0.00",
});

// 添加点击位置信息
const clickPositionInfo = ref("");
const clickPosition = ref({
  longitude: "0.000000",
  latitude: "0.000000",
  height: "0.00",
});

// 添加风险信息弹窗相关数据
const showRiskPopup = ref(false);
const popupStyle = ref({
  left: "0px",
  top: "0px",
});

// 风险图层信息
const riskInfo = ref([
  {
    type: "结构风险",
    level: "high",
    levelText: "高风险",
    description: "建筑主体结构出现裂缝，需要立即处理",
    time: "2024-03-20 10:30",
  },

  {
    type: "设备风险",
    level: "medium",
    levelText: "中风险",
    description: "消防设备维护周期已到，建议及时检查",
    time: "2024-03-19 15:45",
  },
  {
    type: "环境风险",
    level: "low",
    levelText: "低风险",
    description: "周边施工可能影响建筑稳定性",
    time: "2024-03-18 09:15",
  },
  {
    type: "安全风险",
    level: "high",
    levelText: "高风险",
    description: "发现安全隐患，需要立即整改",
    time: "2024-03-17 14:20",
  },
  {
    type: "维护风险",
    level: "medium",
    levelText: "中风险",
    description: "电梯系统需要定期维护",
    time: "2024-03-16 11:00",
  },
]);

const handleLoadingComplete = () => {
  isLoading.value = false;
};
const fengxianList = ref([
  {
    id: "fengxian1",
    type: "fengxian",
    lon: 106.647562,
    lng: 29.511047,
    img: fengxian,
  },
  {
    id: "fengxian2",
    type: "fengxian",
    lon: 106.64764,
    lng: 29.516131,
    img: fengxian,
  },
]);

// 添加风险图层
const handleClick = () => {
  // 循环添加风险图层图片
  fengxianList.value.forEach((item) => {
    const imageEntity = new Cesium.Entity({
      id: item.id,
      position: Cesium.Cartesian3.fromDegrees(item.lon, item.lng, 300),
      billboard: {
        image: item.img,
        type: "fengxian",
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        zIndex: 1000,
        height: 100,
        width: 100,
      },
      properties: {
        type: "fengxian",
        name: "风险",
        lon: item.lon,
        lat: item.lng,
        height: 50,
      },
    });
    agFeatureLayer.addEntity(imageEntity);
  });

  // 调整相机视角到第一个风险点
  if (fengxianList.value.length > 0) {
    const firstPoint = fengxianList.value[0];
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(106.647817, 29.494957, 2150),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-45),
        roll: 0,
      },
      duration: 2,
    });
  }
};

// 添加bim图片
const imgList = ref([
  {
    id: "shexiangtou",
    lon: "106.650808",
    lng: "29.509416",
    img: shexiangtou,
    height: 100,
  },
  {
    id: "jiqiren",
    lon: "106.650191",
    lng: "29.509561",
    height: 50,
    img: jiqiren,
  },
  {
    id: "bim1",
    lon: "106.650945",
    lng: "29.508913",
    height: 50,
    img: bim1,
  },
]);

// 添加点击事件监听

const addImageMarker = () => {
  // let agFeatureLayer = new agcim.layer.FeatureLayer(CIM.viewer);
  imgList.value.forEach((ele) => {
    const imageEntity = new Cesium.Entity({
      id: ele.id,
      position: Cesium.Cartesian3.fromDegrees(ele.lon, ele.lng, ele.height),
      billboard: {
        image: ele.img,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        zIndex: 1000,
        height: 50,
        width: 50,
      },
      properties: {
        id: ele.id,
        name: ele.name,
        lon: ele.lon,
        lat: ele.lat,
        height: 50,
      },
    });
    agFeatureLayer.addEntity(imageEntity);
  });
};

import tiles1 from "./tiles/tileset.json";
import tiles2 from "./tiles/tileset2.json";
import tiles3 from "./tiles/tileset3.json";
import tiles4 from "./tiles/tileset4.json";

// 在其他 ref 声明后添加
const ag3DTilesLayer = ref(null); // 添加3D Tiles图层引用

// 添加处理楼层抽取效果的方法
const handleFloorExtraction = (feature) => {
  if (feature && feature.id) {
    const properties = feature.id.properties;
    console.log("🚀 ~ handleFloorExtraction ~ properties:", properties);
    if (properties) {
      currentFloor.value = properties.floor || 0;
      floorHeight.value = properties.height || 0;
      floorArea.value = properties.area || 0;
      showFloorDrawer.value = true;

      // 设置楼层抽取效果
      const conditions = [];
      // 将当前楼层设置为高亮
      conditions.push([
        `${properties.floor} === ${currentFloor.value}`,
        "rgba(45,208,255,1)",
      ]);
      // 其他楼层设置为半透明
      conditions.push(["true", "rgba(255,255,255,0.2)"]);

      // 应用样式
      ag3DTilesLayer.value.setStyle({
        color: {
          conditions: conditions,
        },
      });

      // 调整相机视角到当前楼层
      const position = feature.id.position;
      if (position) {
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            position.longitude,
            position.latitude,
            position.height + 50 // 稍微拉高视角
          ),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-45),
            roll: 0,
          },
          duration: 2,
        });
      }
    }
  }
};

// 添加重置楼层抽取效果的方法
const resetFloorExtraction = () => {
  if (ag3DTilesLayer.value) {
    ag3DTilesLayer.value.setStyle({
      color: {
        conditions: [["true", "rgba(255,255,255,1)"]],
      },
    });
  }
  showFloorDrawer.value = false;
};
// 1. 在 setup 里添加
let selectedBatchId = ref(null);
let drawerAnimation = { progress: 0, target: 30, running: false };

// 添加克隆模型的函数
function addClonedModel(modelMatrix) {
  agFeatureLayer.addEntity({
    position: Cesium.Matrix4.getTranslation(
      modelMatrix,
      new Cesium.Cartesian3()
    ),
    model: {
      uri: "http://172.30.41.194:20035/qxsy_tiles/bim_zzkxjd_test/tileset.json", // 指向原始模型的路径
      minimumPixelSize: 64,
    },
  });
}
const initMap = async () => {
  try {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 500));
    await agcim.scene.mapInit.initMap("containCesium");

    // 添加点击事件监听
    viewer = CIM.viewer;
    scene = viewer.scene;
    camera = scene.camera;
    // 添加鼠标点击事件
    viewer.screenSpaceEventHandler.setInputAction((movement) => {
      let pickObj = viewer.scene.pick(movement.position);
      if (Cesium.defined(pickObj)) {
        if (pickObj.id && pickObj.id instanceof Cesium.Entity) {
          //点击entity
        }
        if (pickObj instanceof Cesium.Cesium3DTileFeature) {
          alert("点击了3dtiles")
          console.log("🚀 ~ viewer.screenSpaceEventHandler.setInputAction ~ pickObj:", pickObj)
          // let propertyNames = pickObj.getPropertyNames();
          // propertyNames.forEach((item) => {
          //   console.log(item); //属性名
          //   console.log(pickObj.getProperty(item)); //属性值
          // });
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    // // 添加地形图层
    let agTerrainLayer = new agcim.layer.AgTerrainLayer({
      url: "http://172.30.41.194:20035/dem/ChongQingCIM_DEM",
    });
    CIM.layerTree.add(agTerrainLayer);

    // 添加 WMTS 图层
    let options = {
      // url: "http://25.26.26.42:8080/agserver/cqcim/wms",
      url: "http://172.30.41.194:20035/agserver/gwc/service/wmts", //服务链接
      layerTable: "dzdt_lll_fdcjyzx",
      tileMatrixSet: "EPSG:4490_dzdt_lll_fdcjyzx",
    };
    let agWMTSLayer = new agcim.layer.AgWMTSLayer(options);
    CIM.layerTree.add(agWMTSLayer);

    let urls = [
      // tiles1,tiles2,tiles3,tiles4,
      // bim给的demo
      "http://172.30.41.194:20035/qxsy_tiles/bim_zzkxjd_test/tileset.json",
      // "http://172.30.41.194:20035/qxsy_tiles/qx_dnyy_250526/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_1/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_2/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_3/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_4/tileset.json",
      // 首页的
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/czzz_zxcq/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/czfzz_zxcq/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/ncdlzz_zxcq/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/ncjhzz_zxcq/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/ncfzz_zxcq/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/gczlaq_fwjztest/tileset.json",
    ];
    let optionsJsons = {
      urls: urls,
    };
    let ag3DTilesLayer = new agcim.layer.Ag3DTilesLayer(optionsJsons);
    // 创建样式

    CIM.layerTree.add(ag3DTilesLayer);
    await ag3DTilesLayer.loadDataPromise;
    // 修改白膜颜色
    // ag3DTilesLayer.loadDataPromise.then(() => {
    //   let conditions = [];
    //   conditions.push(["true", "rgba(45,208,255,1)"]);
    //   ag3DTilesLayer.setStyle({
    //     color: {
    //       conditions: conditions,
    //     },
    //   });
    // });
    viewer = CIM.viewer;
    scene = viewer.scene;
    camera = scene.camera;
    viewer.scene.globe.depthTestAgainstTerrain = true;
    agFeatureLayer = new agcim.layer.FeatureLayer(viewer);

    // bim给的demo
    let positionInfo = {
      longitude: 112.99948457,
      latitude: 22.99928826,
      height: 63, // 增加高度来拉远视距
    };
    // 东南医院的
    // let positionInfo = {
    //   longitude: 106.650952,
    //   latitude: 29.504009,
    //   height: 649.75, // 增加高度来拉远视距
    // };

    camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        positionInfo.longitude,
        positionInfo.latitude,
        positionInfo.height
      ),
      orientation: {
        heading: 6.2831853071795765,
        pitch: -0.508461322700362,
        roll: 6.283185307179572,
      },
    });

    addImageMarker();

    await new Promise((resolve) => setTimeout(resolve, 5000));
    isLoading.value = false;
    // 添加相机移动事件监听
    CIM.viewer.camera.changed.addEventListener(() => {
      const center = CIM.viewer.camera.position;
      const cartographic = Cesium.Cartographic.fromCartesian(center);
      const longitude = Cesium.Math.toDegrees(cartographic.longitude);
      const latitude = Cesium.Math.toDegrees(cartographic.latitude);
      const height = cartographic.height;

      currentView.value = {
        longitude: longitude.toFixed(6),
        latitude: latitude.toFixed(6),
        height: height.toFixed(2),
      };
    });
    // 添加点击事件监听
    let highlightHelper = new agcim.renderer.HighlightHelper();
    let _pickerHelper = new agcim.interactive.PickerHelper(CIM.viewer);
    _pickerHelper.on("LEFT_CLICK", (movement) => {
      let feature = _pickerHelper.getPickObject(movement.position);
      console.log("🚀 ~ _pickerHelper.on ~ feature11111111:", feature);
      if (feature && feature._batchId) {
        selectedBatchId.value = feature._batchId;
        // 添加显示隐藏楼层
        ag3DTilesLayer.setStyle({
          color: {
            conditions: [
              [
                `${feature._batchId} === ${selectedBatchId.value}`,
                "rgba(255,255,0,1)",
              ],
              ["true", "rgba(255,255,255,0.1)"],
            ],
          },
          // modelMatrix: {
          //   conditions: [
          //     [
          //       `${feature._batchId} === ${selectedBatchId.value}`,
          //       "modelMatrix * matrix4(translation(0, 0, 50))",
          //     ],
          //     ["true", "modelMatrix"],
          //   ],
          // },
        });
        // // 模型矩阵
        // const clonedModelMatrix = Cesium.Matrix4.clone(
        //   feature.content._model.modelMatrix,
        //   new Cesium.Matrix4()
        // );
        // Cesium.Matrix4.multiplyByTranslation(clonedModelMatrix, new Cesium.Cartesian3(110, 220, 310), clonedModelMatrix);
        //  // 创建新的实体或特征，假设有一个方法来添加克隆模型
        //  addClonedModel(clonedModelMatrix);
        // 计算动画偏移
        // const offset = drawerAnimation.progress;
        // // 偏移出矩阵位置
        // const m = Cesium.Matrix4.clone(
        //   feature.content._model.modelMatrix,
        //   new Cesium.Matrix4()
        // );
        // Cesium.Matrix4.multiplyByTranslation(
        //   m,
        //   new Cesium.Cartesian3(1020, 220, 300),
        //   m
        // );
        // console.log("🚀 ~ _pickerHelper.on ~ selectedBatchId---------m:", m);
        // feature.content._model.modelMatrix = m;
        // startDrawerAnimation();
      }

      // console.log("🚀 ~ _pickerHelper.on ~ feature:", style);

      // 抽屉效果

      // 4. 动画函数
      function startDrawerAnimation() {
        drawerAnimation.running = true;
        drawerAnimation.progress = 0;
        function animate() {
          if (!drawerAnimation.running) return;
          drawerAnimation.progress += 2; // 每帧上移2米
          if (drawerAnimation.progress < drawerAnimation.target) {
            requestAnimationFrame(animate);
          } else {
            drawerAnimation.progress = drawerAnimation.target;
            drawerAnimation.running = false;
          }
          // 触发 tileset 重新渲染
          ag3DTilesLayer.value._tileset._selectedTiles.length &&
            ag3DTilesLayer.value._tileset._selectedTiles[0].content
              ._modelMatrix;
        }
        animate();
      }
      let cartesian = _pickerHelper.getPickPosition(movement.position);
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      var lon = Cesium.Math.toDegrees(cartographic.longitude);
      var lat = Cesium.Math.toDegrees(cartographic.latitude);

      // 更新点击位置信息
      clickPosition.value = {
        longitude: lon.toFixed(6),
        latitude: lat.toFixed(6),
        height: cartographic.height.toFixed(2),
      };
      clickPositionInfo.value = JSON.stringify({
        id: "bim1",
        lon: lon.toFixed(6),
        lng: lat.toFixed(6),
        height: 100,
        img: bim1,
      });
      // console.log("🚀 ~ _pickerHelper.on ~ lat:", lat);
      // console.log("🚀 ~ _pickerHelper.on ~ feature:", feature);
      // if (feature.id._id === "shexiangtou") {
      //   emit("handleEmitShexiangtou");
      // } else if (feature.id._id === "jiqiren") {
      //   emit("handleEmitJiqiren");
      // } else if (feature.id._id === "bim1") {
      //   emit("handleEmitYimo");
      // } else if (feature.id._id === "fengxian1") {
      //   // 显示风险信息弹窗
      //   showRiskPopup.value = true;
      //   // 设置弹窗位置
      //   popupStyle.value = {
      //     left: movement.position.x + 10 + "px",
      //     top: movement.position.y + 10 + "px",
      //   };
      // }else{

      // }
    });
  } catch (error) {
    console.error("地图初始化失败:", error);
    ElMessage.error("地图加载失败，请刷新重试");
    isLoading.value = false;
  }
};

const closeRiskPopup = () => {
  showRiskPopup.value = false;
};

onMounted(() => {
  initMap();
});
</script>

<style scoped>
.map_container {
  width: 100%;
  height: 1080px;
  position: relative;
}

.containCesium {
  width: 100%;
  height: 100%;
}

.note_class {
  background: #0a2351;
  position: absolute;
  top: 50%;
  right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #9abbdb;
}

.border_r {
  display: block;
  border-radius: 50%;
}

.detailsBtn {
  width: 140px;
  height: 40px;
  border: 1px solid #2a63bc;
  border-radius: 6px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 1.1rem;
  color: #0086ff;
  background: linear-gradient(
    180deg,
    rgba(76, 169, 255, 1),
    rgba(1, 120, 230, 0)
  );
  margin-right: 10px;
  color: #ffffff;
}

.ol-popup12 {
  position: absolute;
  padding: 10px;
  border-radius: 4px;
  width: 20rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  font-size: 1.2rem;
  color: #ffffff;
  border: 4px solid;
  background: rgba(4, 42, 107, 0.8);
  border-radius: 10px;
}

.ol-popup12 span {
  color: #0086ff;
  border: 1px solid #2a63bc;
  background: rgba(4, 42, 107, 0.8);
  padding: 0 5px;
}

.view-info-panel {
  position: absolute;
  z-index: 999;
  bottom: 20px;
  left: 20px;
  background: red;
  padding: 15px;
  border-radius: 8px;
  color: #fff;
  z-index: 1000;
  min-width: 200px;
}

.info-item {
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-item .label {
  color: #9abbdb;
  margin-right: 10px;
}

.info-item .value {
  color: #fff;
  font-family: monospace;
}

.table-attr {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 36px;
  font-weight: bold;
  color: white;
  border-bottom: solid rgba(0, 255, 255, 0.22) 1px;
}

.click-info-panel {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 8px;
  color: #fff;
  z-index: 1000;
  min-width: 200px;
}

.click-info-panel h3 {
  margin-bottom: 10px;
}

/* 风险信息弹窗样式 */
.risk-popup {
  position: fixed;
  width: 320px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(45, 208, 255, 1);
  border-radius: 8px;
  color: #fff;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(45, 208, 255, 0.3);
}

.risk-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid rgba(45, 208, 255, 0.3);
}

.risk-title {
  font-size: 18px;
  font-weight: bold;
  color: rgba(45, 208, 255, 1);
}

.risk-close {
  cursor: pointer;
  font-size: 20px;
  color: rgba(45, 208, 255, 1);
}

.risk-popup-content {
  padding: 15px;
  max-height: 400px;
  overflow-y: auto;
}

.risk-item {
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(45, 208, 255, 0.1);
  border-radius: 6px;
}

.risk-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.risk-type {
  font-weight: bold;
  color: rgba(45, 208, 255, 1);
}

.risk-level {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.risk-level.high {
  background: rgba(255, 0, 0, 0.3);
  color: #ff4444;
}

.risk-level.medium {
  background: rgba(255, 165, 0, 0.3);
  color: #ffa500;
}

.risk-level.low {
  background: rgba(0, 255, 0, 0.3);
  color: #00ff00;
}

.risk-desc {
  font-size: 14px;
  margin-bottom: 5px;
  line-height: 1.4;
}

.risk-time {
  font-size: 12px;
  color: rgba(45, 208, 255, 0.7);
}

/* 自定义滚动条样式 */
.risk-popup-content::-webkit-scrollbar {
  width: 6px;
}

.risk-popup-content::-webkit-scrollbar-track {
  background: rgba(45, 208, 255, 0.1);
  border-radius: 3px;
}

.risk-popup-content::-webkit-scrollbar-thumb {
  background: rgba(45, 208, 255, 0.5);
  border-radius: 3px;
}

.risk-popup-content::-webkit-scrollbar-thumb:hover {
  background: rgba(45, 208, 255, 0.7);
}
</style>
