<template>
  <div class="map_container relative">
    <LoadingAnimation
      :loading="isLoading"
      @loadingComplete="handleLoadingComplete"
    />
    <div
      id="containCesium"
      class="containCesium"
    ></div>
     <!-- <button
      @click="handleClick"
      class="bg-[red] absolute top-[40%] left-[1250px] z-9 text-[50px]"
    >
      点击感知图层
    </button> -->
    <button
      @click="handleClick"
      class="bg-[red] absolute top-[20%] left-[1250px] z-9 text-[50px]"
    >
      点击风险图层
    </button>

    <button
      @click="handleManyou"
      class="bg-[red] absolute top-[30%] left-[1250px] z-9 text-[50px]"
    >
      开始漫游
    </button>
    <!-- 添加视角信息显示控件 -->
    <!-- <div class="view-info-panel">
      <p>视角位置</p>
      <div class="info-item">
        <span class="label">经度：</span>
        <span class="value">{{
          currentView.longitude
        }}</span>
      </div>
      <div class="info-item">
        <span class="label">纬度：</span>
        <span class="value">{{
          currentView.latitude
        }}</span>
      </div>
      <div class="info-item">
        <span class="label">高度：</span>
        <span class="value"
          >{{ currentView.height }}米</span
        >
      </div>
    </div> -->
    <!-- 添加点击信息显示控件 -->
    <!-- <div class="absolute z-999 right-0 bottom-0">
      <p>点击位置</p>
      <textarea
        class="w-[400px] h-[300px]"
        :value="clickPositionInfo"
      ></textarea>
    </div> -->
    <!-- 风险信息弹窗 -->
    <div
      v-if="showRiskPopup"
      class="risk-popup"
      :style="popupStyle"
    >
      <div class="risk-popup-header">
        <span class="risk-title">风险信息</span>
        <span
          class="risk-close"
          @click="closeRiskPopup"
          >×</span
        >
      </div>
      <div class="risk-popup-content">
        <div
          class="risk-item"
          v-for="(item, index) in riskInfo"
          :key="index"
        >
          <div class="risk-item-header">
            <span class="risk-type">{{
              item.type
            }}</span>
            <span
              class="risk-level"
              :class="item.level"
              >{{ item.levelText }}</span
            >
          </div>
          <div class="risk-item-content">
            <p class="risk-desc">
              {{ item.description }}
            </p>
            <p class="risk-time">
              {{ item.time }}
            </p>
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
import ganzhi from "@/assets/rou/ganzhi.png";
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
const handleManyou = () => {
  // 定义室内漫游的多个点
  const indoorPoints = [
    {
      lon: 106.651317,
      lat: 29.509315,
      height: 300, // 设置较低的高度以适应室内
    },
    {
      lon: 106.650404,
      lat: 29.509315,
      height: 300,
    },
    // {
    //   lon: 106.650404,
    //   lat: 29.509000,
    //   height: 300,
    // },
  ];

  // 漫游函数
  const roamToIndoorPoints = (index) => {
    if (index < indoorPoints.length) {
      const position = indoorPoints[index];
      viewer.camera.flyTo({
        destination:
          Cesium.Cartesian3.fromDegrees(
            position.lon,
            position.lat,
            position.height + 1 // 稍微拉高视角，适合室内
          ),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-10), // 适当调整俯仰角度
          roll: 0,
        },
        duration: 5,
        complete: () => {
          // 等待飞行完成后，继续下一个点
          roamToIndoorPoints(index + 1);
        },
      });
    }
  };

  // 开始漫游
  roamToIndoorPoints(0);
};

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
    description:
      "建筑主体结构出现裂缝，需要立即处理",
    time: "2024-03-20 10:30",
  },

  {
    type: "设备风险",
    level: "medium",
    levelText: "中风险",
    description:
      "消防设备维护周期已到，建议及时检查",
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
    lon: 106.648762,
    lng: 29.510208,
    img: fengxian,
  },
  {
    id: "fengxian2",
    type: "fengxian",
    lon: 106.650136,
    lng: 29.509099,
    img: fengxian,
  },
  {
    id: "fengxian3",
    type: "fengxian",
    lon: 106.649468,
    lng: 29.510137,
    img: fengxian,
  },
]);
const ganzhiList = ref([
  {
    id: "fengxian1",
    type: "fengxian",
    lon: 106.648762,
    lng: 29.510208,
    img: fengxian,
  },
  {
    id: "fengxian2",
    type: "fengxian",
    lon: 106.650136,
    lng: 29.509099,
    img: fengxian,
  },
  {
    id: "fengxian2",
    type: "fengxian",
    lon: 106.649468,
    lng: 29.510137,
    img: fengxian,
  },
]);
const handleClick = () => {
  // 循环添加风险图层图片
  fengxianList.value.forEach((item) => {
    const imageEntity = new Cesium.Entity({
      id: item.id,
      position: Cesium.Cartesian3.fromDegrees(
        item.lon,
        item.lng,
        50
      ),
      billboard: {
        image: item.img,
        type: "fengxian",
        heightReference:
          Cesium.HeightReference
            .RELATIVE_TO_GROUND,
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

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      106.649611,
      29.507842,
     429.66
    ),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-20), // 适当调整俯仰角度
      roll: 0,
    },
    duration: 2,
  });
  // 调整相机视角到第一个风险点
  // if (fengxianList.value.length > 0) {
  //   const firstPoint = fengxianList.value[0];
  //   viewer.camera.flyTo({
  //     destination: Cesium.Cartesian3.fromDegrees(
  //       106.648916,
  //       29.508106,
  //       455.98
  //     ),
  //     orientation: {
  //       heading: Cesium.Math.toRadians(0),
  //       pitch: Cesium.Math.toRadians(-45),
  //       roll: 0,
  //     },
  //     duration: 2,
  //   });
  // }
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
      position: Cesium.Cartesian3.fromDegrees(
        ele.lon,
        ele.lng,
        ele.height
      ),
      billboard: {
        image: ele.img,
        heightReference:
          Cesium.HeightReference
            .RELATIVE_TO_GROUND,
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

const glbList = ref([
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/7ElXOSoNL8YgTE4nVlED7yfRMTrJSx2S/1.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/JQ937DuMvhffLtraY7o9ktIlt66niYLT/2.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/ybw4H9PwNMjSJpTPTC7xBN8bdgF1ib8o/3.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/m01jXtgoRu2Jo9Js9nburMrAF2SeTlHB/4.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/5QfJRKUhyL5f7YOFrP8twGKYkXTwlkkd/5.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/UCFKcdNgNmWPlnupG7Oh5PswBPLLdQij/6.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/778wRfzfOGHFo5LNeXeb6GJzJmg3ePup/7.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/izmNuNUbWseC4L2xi6CleFKWWUGv02Og/8.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/pJgOdy78Jny0SSS6uG0EiJUgRqvTXect/9.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/J7zg5BmmWhiD4vOsG36Xm8SN51qBW0tc/10.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/QsK5hywNTvrHaXhmQ7pPiNzjigRz63Yv/11.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/FJOajYkiYvg3BnsrtojO7YCySUaDOi4U/12.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/2Pcu0jEzSutCbg4fLsJuB6WOBuci8e4d/13.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/YQIIIuVeaxsH6qCCpujGMa3b0goXIB5m/14.glb",
  },
  {
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/DC6EudvbMk2mkVAaNLVUyzQMBIbWnUMv/15.glb",
  },
  {
    floor: "top",
    url: "http://lc-F59ERqoe.cn-n1.lcfile.com/rD9jQ0e6DuH9CaJkA8I56OpuFKnFWC5z/table.glb",
  },
]);
const position = {
  lng: 106.651155,
  lat: 29.509141,
};
const addEntity2 = () => {
  glbList.value.forEach((item, index) => {
    // {"id":"bim1","lon":"106.651279","lng":"29.509190","height":100,"img":"/src/assets/rou/BIM.png"}

    const height = 35 + index * 1.5;

    const heading = Cesium.Math.toRadians(35); // 90度旋转
    const pitch = 0;
    const roll = 0;
    const orientation =
      Cesium.Transforms.headingPitchRollQuaternion(
        Cesium.Cartesian3.fromDegrees(
          position.lng,
          position.lat,
          height
        ),
        new Cesium.HeadingPitchRoll(
          heading,
          pitch,
          roll
        )
      );

    const glbEntity = new Cesium.Entity({
      id: "Floor" + (index + 1),
      floor: index + 1,
      url: item.url,
      orientation: orientation,
      position: Cesium.Cartesian3.fromDegrees(
        position.lng,
        position.lat,
        height // 增加高度来拉远视距
      ), // 更新位置
      model: {
        uri: item.url,
        // minimumPixelSize: 200,
        // maximumScale: 1500,
        scale: 1.0,
        heightReference:
          Cesium.HeightReference
            .RELATIVE_TO_GROUND,
        // height: height 不需要单独设置，因为位置已经包含高度
      },
    });
    agFeatureLayer.addEntity(glbEntity);
  });
};
let lastCopiedEntityId = null; // 存储上一个复制实体的 ID

const initMap = async () => {
  try {
    isLoading.value = true;
    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );
    await agcim.scene.mapInit.initMap(
      "containCesium"
    );

    // 添加点击事件监听
    viewer = CIM.viewer;
    scene = viewer.scene;
    camera = scene.camera;

    // // 添加地形图层
    let agTerrainLayer =
      new agcim.layer.AgTerrainLayer({
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
    let agWMTSLayer = new agcim.layer.AgWMTSLayer(
      options
    );
    CIM.layerTree.add(agWMTSLayer);

    let urls = [
      // tiles1,tiles2,tiles3,tiles4,
      "https://data.mars3d.cn/3dtiles/bim-daxue/tileset.json",
      // bim给的demo
      // "http://172.30.41.194:20035/qxsy_tiles/bim_zzkxjd_test/tileset.json",
      "http://172.30.41.194:20035/qxsy_tiles/qx_dnyy_250526/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_1/tileset.json",
      "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_2/tileset.json",
      "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_3/tileset.json",
      "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_4/tileset.json",
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
    let ag3DTilesLayer =
      new agcim.layer.Ag3DTilesLayer(
        optionsJsons
      );
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
    agFeatureLayer = new agcim.layer.FeatureLayer(
      viewer
    );

    // hsl/que/coco
    // let positionInfo = {
    //   longitude: 117.248583,
    //   latitude: 31.844709,
    //   height: 163, // 增加高度来拉远视距
    // };
    // 火星glb
    // let positionInfo = {
    //   longitude: 117.252010,
    //   latitude: 31.846696,
    //   height:156.08, // 增加高度来拉远视距
    // };
    // bim给的demo
    // let positionInfo = {
    //   longitude: 112.99948457,
    //   latitude: 22.99928826,
    //   height: 63, // 增加高度来拉远视距
    // };
    // 东南医院的
    let positionInfo = {
      longitude: 106.651183,
      latitude: 29.504846,
      height: 614.3, // 增加高度来拉远视距
    };

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

    await new Promise((resolve) =>
      setTimeout(resolve, 5000)
    );
    isLoading.value = false;
    // 添加相机移动事件监听
    CIM.viewer.camera.changed.addEventListener(
      () => {
        const center = CIM.viewer.camera.position;
        const cartographic =
          Cesium.Cartographic.fromCartesian(
            center
          );
        const longitude = Cesium.Math.toDegrees(
          cartographic.longitude
        );
        const latitude = Cesium.Math.toDegrees(
          cartographic.latitude
        );
        const height = cartographic.height;

        currentView.value = {
          longitude: longitude.toFixed(6),
          latitude: latitude.toFixed(6),
          height: height.toFixed(2),
        };
      }
    );
    addEntity2();

    // 添加点击事件监听
    let highlightHelper =
      new agcim.renderer.HighlightHelper();
    let _pickerHelper =
      new agcim.interactive.PickerHelper(
        CIM.viewer
      );
    _pickerHelper.on("LEFT_CLICK", (movement) => {
      let feature = _pickerHelper.getPickObject(
        movement.position
      );

      console.log(
        "🚀 ~ _pickerHelper.on ~ feature:",
        feature
      );
      let cartesian =
        _pickerHelper.getPickPosition(
          movement.position
        );
      var cartographic =
        Cesium.Cartographic.fromCartesian(
          cartesian
        );
      var lon = Cesium.Math.toDegrees(
        cartographic.longitude
      );
      var lat = Cesium.Math.toDegrees(
        cartographic.latitude
      );

      // if (cartesian) {
      //   // viewer.entities.removeAll();
      //   // {"id":"bim1","lon":"106.651249","lng":"29.509274","height":100,"img":"/src/assets/rou/BIM.png"}

      //   const cartographic =
      //     Cesium.Cartographic.fromCartesian(
      //       cartesian
      //     );
      //   const lon = Cesium.Math.toDegrees(
      //     cartographic.longitude
      //   );
      //   const lat = Cesium.Math.toDegrees(
      //     cartographic.latitude
      //   );
      //   const height = cartographic.height;

      //   // 设置旋转角度（单位为弧度，绕Z轴旋转）
      //   const heading = Cesium.Math.toRadians(0); // 90度旋转
      //   const pitch = 0;
      //   const roll = 0;
      //   const orientation =
      //     Cesium.Transforms.headingPitchRollQuaternion(
      //       Cesium.Cartesian3.fromDegrees(
      //         lon,
      //         lat,
      //         height
      //       ),
      //       new Cesium.HeadingPitchRoll(
      //         heading,
      //         pitch,
      //         roll
      //       )
      //     );

      //   const offset = new Cesium.Cartesian3(
      //     10,
      //     10,
      //     0
      //   ); // 可以根据需要调整偏移量
      //   const position = Cesium.Cartesian3.add(
      //     cartesian,
      //     offset,
      //     new Cesium.Cartesian3()
      //   );
      //   const imageEntity = new Cesium.Entity({
      //     id: `myEntity_1f`, // 设置唯一ID
      //     floor: "3",
      //     orientation: orientation, // 设置旋转
      //     position: Cesium.Cartesian3.fromDegrees(106.651342, 29.509054, 50), // 东南医院更新位置
      //     // position, // 东南医院更新位置
      //     // position: Cesium.Cartesian3.fromDegrees(
      //     //   117.248735,
      //     //   31.847059,
      //     //   height
      //     // ), // 西南医院的更新位置
      //     // position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      //     model: {
      //       // uri: "https://data.mars3d.cn/gltf/mars/floor/floor.glb",
      //       // uri: "http://lc-F59ERqoe.cn-n1.lcfile.com/Bleie3aOaXRO2zSsl0IhHEIAEaX8zrJc/new2.glb",
      //       uri: "http://172.30.41.194:20035/glb/1.glb",

      //       minimumPixelSize: 128,
      //       maximumScale: 20000,
      //       scale: 2.0,
      //       heightReference:
      //         Cesium.HeightReference
      //           .RELATIVE_TO_GROUND,
      //     },
      //   });
      //   // 将实体添加到视图中
      //   agFeatureLayer.addEntity(imageEntity);
      // }
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
      if (feature.id._id === "shexiangtou") {
        emit("handleEmitShexiangtou");
      } else if (feature.id._id === "jiqiren") {
        emit("handleEmitJiqiren");
      } else if (feature.id._id === "bim1") {
        emit("handleEmitYimo");
      } else if (feature.id._id === "fengxian1" || feature.id._id === "fengxian2" || feature.id._id === "fengxian3") {
        // 显示风险信息弹窗
        showRiskPopup.value = true;
        // 设置弹窗位置
        popupStyle.value = {
          left: movement.position.x + 10 + "px",
          top: movement.position.y + 10 + "px",
        };
      } else if (
        feature.detail.model.type === "GLTF"
      ) {
        // feature.id._id
        // feature.id._url
        // 移除上一个复制的实体
        // viewer.entities.remove(agFeatureLayer._entities[19]);
        if (lastCopiedEntityId) {
          viewer.entities.remove(
            lastCopiedEntityId
          );
          // console.log(
          //   "🚀 ~ _pickerHelper.on ~ lastCopiedEntityId:",
          //   lastCopiedEntityId
          // );
          // const entity = viewer.entities.getById(
          //   lastCopiedEntityId
          // ); // 根据 ID 获取 Entity
          // if (entity) {
          //   viewer.entities.remove(entity); // 移除 Entity
          // }
        }

        console.log(
          feature.id._id,
          feature.id._url
        );
        // alert("点击了模型",feature.id._id,feature.id._url);
        const m =
          feature.id._floor > 5 ? 0.0009 : 0.0013;
        console.log(
          "🚀 ~ _pickerHelper.on ~ m:",
          feature.id.floor,
          m
        );
        // console.log("gaodu",cartographic.height)
        const drawerPosition =
          Cesium.Cartesian3.fromDegrees(
            // 106.651186 + m, // 平移500米（经度约0.0045）
            position.lng + m,
            position.lat,
            50
            // (cartographic.height-100) // 抽屉效果的高度
          );
        const heading = Cesium.Math.toRadians(35); // 90度旋转
        const pitch = 0;
        const roll = 0;
        const orientation2 =
          Cesium.Transforms.headingPitchRollQuaternion(
            Cesium.Cartesian3.fromDegrees(
              position.lng,
              position.lat,
              50
            ),
            new Cesium.HeadingPitchRoll(
              heading,
              pitch,
              roll
            )
          );
        const copiedEntity = new Cesium.Entity({
          id: "Copy_" + feature.id._id,
          url: feature.id._url,
          orientation: orientation2,
          position: drawerPosition,
          model: {
            uri: feature.id._url,
            // minimumPixelSize: 128,
            // maximumScale: 1500,
            scale: 1.0,
            heightReference:
              Cesium.HeightReference
                .RELATIVE_TO_GROUND,
          },
        });
        agFeatureLayer.addEntity(copiedEntity);
        // lastCopiedEntityId = copiedEntity._id;
        console.log(
          "suoyourtuceng",
          agFeatureLayer._entities
        );
        lastCopiedEntityId =
          agFeatureLayer._entities.find(
            (item) =>
              (item._id = copiedEntity._id)
          );
        console.log(
          "🚀 ~ _pickerHelper.on ~ lastCopiedEntityId:",
          lastCopiedEntityId
        );
        // lastCopiedEntityId = copiedEntity;

        console.log(
          "🚀 ~ _pickerHelper.on ~ copiedEntity:",
          copiedEntity._id
        );
      } else {
        return;
      }
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
