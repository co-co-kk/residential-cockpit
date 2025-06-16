<template>
  <div class="map_container relative">
    <LoadingAnimation
      :loading="isLoading"
      @loadingComplete="handleLoadingComplete"
    />
    <LoadingAnimation
      :loading="isLoading2"
      ref="loadingAnimationRef2"
      @loadingComplete="handleLoadingComplete2"
      :title="'监测报告生成中'"
    />
    <div id="containCesium" class="containCesium"></div>
    <div
      class="absolute top-[30%] right-[1250px] z-9 flex flex-col space-y-2xl"
    >
      <div
        class="is-btn-bg w-[180px] h-[44px] cursor-pointer text-[#fff] flex justify-center items-center"
        @click="handleRiskClick"
      >
        风险图层
      </div>
      <div
        class="is-btn-bg w-[180px] h-[44px] cursor-pointer text-[#fff] flex justify-center items-center"
        @click="handlePerceptionClick"
      >
        感知图层
      </div>
      <div
        class="is-btn-bg w-[180px] h-[44px] cursor-pointer text-[#fff] flex justify-center items-center"
        @click="addImageMarker(luanshengList)"
      >
        孪生图层
      </div>
      <!-- <div
        class="is-btn-bg w-[180px] h-[44px] cursor-pointer text-[#fff] flex justify-center items-center"
        @click="handleManyou"
      >
        AI巡视
      </div> -->
    </div>
    <!-- 添加视角信息显示控件 -->
    <!-- <div class="view-info-panel">
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
      <div class="info-item">
        <span class="label">Heading：</span>
        <span class="value">{{ currentView.heading }}°</span>
      </div>
      <div class="info-item">
        <span class="label">Pitch：</span>
        <span class="value">{{ currentView.pitch }}°</span>
      </div>
      <div class="info-item">
        <span class="label">Roll：</span>
        <span class="value">{{ currentView.roll }}°</span>
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
    <!-- 感知进度信息弹窗 -->
    <div v-if="showJinduPopup" class="fixed z-1000" :style="popupStyle">
      <img
        src="@/assets/xulei/cicon8.png"
        draggable="false"
        alt=""
        @click="showJinduPopup = false"
      />
    </div>
    <!-- 感知安全信息弹窗 -->
    <div v-if="showAnquanPopup" class="fixed z-1000" :style="popupStyle">
      <img
        src="@/assets/xulei/cicon7.png"
        draggable="false"
        alt=""
        @click="showAnquanPopup = false"
      />
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
const loadingAnimationRef2 = ref(null);
const emit = defineEmits([
  "handleEmitShexiangtou",
  "handleEmitJiqiren",
  "handleEmitYimo",
  "handleEmitJianCeBaoGao",
  "handleEmitJiqirenTan"
]);
const position = {
  lng: 106.651155,
  lat: 29.509141,
};
const isLoading = ref(true);
const isLoading2 = ref(false);
const loading = ref(false);
const options = ref([]);
const value = ref(null);
const layersType = ref("");
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
      lon: "106.651266",
      lat: "29.509373",
      height: 292,
      heading: -45,
      pitch: 0,
      roll: 0,
    },
    {
      lon: "106.651072",
      lat: "29.509487",
      height: 292,
      heading: -45,
      pitch: 0,
      roll: 0,
    },
    {
      lon: "106.650880",
      lat: "29.509605",
      height: 292,
      heading: -45,
      pitch: 0,
      roll: 0,
    },
    {
      lon: "106.650589",
      lat: "29.509787",
      height: 292,
      heading: 223.62,
      pitch: -30.31,
      roll: 0,
    },
    {
      lon: "106.650465",
      lat: "29.509445",
      height: 292,
      heading: 123.85,
      pitch: -26.99,
      roll: 0,
    },
    {
      lon: "106.651384",
      lat: "29.508870",
      height: 317.71,
      heading: 279.01,
      pitch: -10.18,
      roll: 0,
    },
    {
      lon: "106.651093",
      lat: "29.508991",
      height: 323.83,
      heading: 281.5,
      pitch: -12.83,
      roll: 0,
    },
  ];

  // 漫游函数
  const roamToIndoorPoints = (index) => {
    if (index < indoorPoints.length) {
      const position = indoorPoints[index];
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          position.lon,
          position.lat,
          position.height
        ),
        orientation: {
          heading: Cesium.Math.toRadians(position.heading),
          pitch: Cesium.Math.toRadians(position.roll),
          roll: 0,
        },
        duration: 5,
        complete: () => {
          if (index < indoorPoints.length - 1) {
            // 如果不是最后一个点，继续巡视下一个点
            roamToIndoorPoints(index + 1);
          } else {
            // 所有点都巡视完成后，触发检测报告
            loadingAnimationRef2.value.handleProgress();
            isLoading2.value = true;
            setTimeout(() => {
              isLoading2.value = false;
              emit("handleEmitJianCeBaoGao");
            }, 5000);
          }
        },
      });
    }
  };

  // 开始漫游
  roamToIndoorPoints(0);
};
defineExpose({
  handleManyou,
});
// 当前视角
const currentView = ref({
  longitude: "0.000000",
  latitude: "0.000000",
  height: "0.00",
  heading: "0.00",
  pitch: "0.00",
  roll: "0.00",
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
const showJinduPopup = ref(false);
const showAnquanPopup = ref(false);
const popupStyle = ref({
  left: "0px",
  top: "0px",
});
const popupStyle2 = ref({
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
const handleLoadingComplete2 = () => {
  isLoading2.value = false;
};
// fengxianList

const riskList = ref([
  {
    id: "fengxian1",
    type: "fengxian",
    lon: 106.648899,
    lng: 29.509967,
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
// 感知 ganzhilist
const perceptionList = ref([
  {
    id: "ganzhi",
    lon: 106.651352,
    lng: 29.509372,
    img: ganzhi,
    height: 10,
  },
  {
    id: "ganzhi2",
    lon: 106.650598,
    lng: 29.510701,
    img: ganzhi,
    height:20
  },
]);
// 雷达感知
const handlePerceptionCircle = () => {
  const radarLine = new Cesium.Entity({
    id: "radar_line",
    position: Cesium.Cartesian3.fromDegrees(106.651352, 29.509372, 50),
    polyline: {
      positions: new Cesium.CallbackProperty(() => {
        const center = Cesium.Cartesian3.fromDegrees(106.651352, 29.509372, 50);
        const radius = 20.0;
        const time = Date.now() / 1000;
        const angle = time % (2 * Math.PI);
        const endPoint = Cesium.Cartesian3.fromDegrees(
          106.651352 + (radius * Math.cos(angle)) / 111320,
          29.509372 + (radius * Math.sin(angle)) / 111320,
          50
        );
        return [center, endPoint];
      }, false),
      width: 8,
      zIndex: 999,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.2,
        color: Cesium.Color.BLUE.withAlpha(0.6),
      }),
    },
  });

  // 创建雷达圆环
  const radarCircle = new Cesium.Entity({
    id: "radar_circle",
    position: Cesium.Cartesian3.fromDegrees(106.651352, 29.509372, 50),
    ellipse: {
      semiMajorAxis: 20.0,
      semiMinorAxis: 20.0,
      material: new Cesium.ColorMaterialProperty(
        Cesium.Color.BLUE.withAlpha(0.3)
      ),
      outline: true,
      outlineColor: Cesium.Color.BLUE,
      height: 50,
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    },
  });

  agFeatureLayer.addEntity(radarLine);
  agFeatureLayer.addEntity(radarCircle);
};
const handleRiskRedCircle = () => {
  const riskRedEntity = new Cesium.Entity({
    id: "risk_red_circle",
    position: Cesium.Cartesian3.fromDegrees(106.649468, 29.510137, 40),
    ellipse: {
      semiMajorAxis: 30.0, // 半径
      semiMinorAxis: 30.0,
      material: new Cesium.ColorMaterialProperty(
        Cesium.Color.RED.withAlpha(0.4)
      ),
      outline: true,
      outlineColor: Cesium.Color.RED,
      height: 40,
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    },
  });
  agFeatureLayer.addEntity(riskRedEntity);
};
// 循环添加风险图层图片
const handleRiskClick = () => {
  layersType.value = "risk";
  removeLayer();
  riskList.value.forEach((item) => {
    const imageEntity = new Cesium.Entity({
      id: item.id,
      position: Cesium.Cartesian3.fromDegrees(item.lon, item.lng, 50),
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
  addRedPlane();
  // handleRiskRedCircle();
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(106.649611, 29.507842, 429.66),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-20), // 适当调整俯仰角度
      roll: 0,
    },
    duration: 2,
  });
  // 调整相机视角到第一个风险点
  // if (riskList.value.length > 0) {
  //   const firstPoint = riskList.value[0];
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
// 循环添加感知图层图片
const handlePerceptionClick = () => {
  layersType.value = "perception";
  // 移除风险图层
  removeLayer();
  // handlePerceptionCircle();
  perceptionList.value.forEach((item) => {
    const imageEntity = new Cesium.Entity({
      id: item.id,
      position: Cesium.Cartesian3.fromDegrees(item.lon, item.lng, item.height),
      billboard: {
        image: item.img,
        type: "ganzhi",
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        zIndex: 1000,
        height: 100,
        width: 100,
      },
      properties: {
        type: "ganzhi",
        name: "感知",
        lon: item.lon,
        lat: item.lng,
        height: 20,
      },
    });
    agFeatureLayer.addEntity(imageEntity);
  });
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(106.651505, 29.506099, 433.76),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-20), // 适当调整俯仰角度
      roll: 0,
    },
    duration: 2,
  });
};

// 移除添加图层
const removeLayer = () => {
  switch (layersType.value) {
    // redPlane risk_red_circle
    case "perception":
      const riskEntity = agFeatureLayer._entities.find(
        (itm) => (itm._id = "redPlane")
      );
      viewer.entities.remove(riskEntity);
      riskList.value.forEach((item) => {
        const entity = agFeatureLayer._entities.find(
          (itm) => (itm._id = item.id)
        );
        console.log("🚀 ~ riskList.value.forEach ~ entity:", entity);
        viewer.entities.remove(entity);
      });
      break;
    case "risk":
      const perceptionEntity1 = agFeatureLayer._entities.find(
        (itm) => (itm._id = "radar_line")
      );
      viewer.entities.remove(perceptionEntity1);
      const perceptionEntity2 = agFeatureLayer._entities.find(
        (itm) => (itm._id = "radar_circle")
      );
      viewer.entities.remove(perceptionEntity2);
      perceptionList.value.forEach((item) => {
        const entity = agFeatureLayer._entities.find(
          (itm) => (itm._id = item.id)
        );
        viewer.entities.remove(entity);
      });
      break;
    default:
      break;
  }
};
// maker列表
const imgList = ref([
  {
    id: "shexiangtou",
    lon: "106.649978",
    lng: "29.510803",
    img: shexiangtou,
    name: "摄像头",
    height: 50,
  },
  // {
  //   id: "jiqiren",
  //   lon: "106.650191",
  //   lng: "29.509561",
  //   height: 50,
  //   img: jiqiren,
  // },
  // {"lon":"106.651533","lng":"29.509455"}
  // {"lon":"106.651618","lng":"29.509208"}
  // {"lon":"106.651667","lng":"29.509299"}
  // {
  //     id: "jiqiren",
  //     lon: "106.651618",
  //     lng: "29.509208",
  //     height: 115,
  //     img: jiqiren,
  //   },
  {
    id: "bim1",
    lon: "106.650945",
    lng: "29.508913",
    height: 50,
    img: bim1,
  },
  // 漫游测试的点
  // {
  //   id: "ceshigaodu",
  //   lon: "106.650762",
  //   lng: "29.509678",
  //   height: 36,
  //   img: bim1,
  // },
]);
import jindu from "@/assets/xulei/jindu.png";
import anquan from "@/assets/xulei/anquan.png";
const jiqirenList = ref([
  {
    id: "jiqiren",
    lon: "106.651618",
    lng: "29.509208",
    height: 115,
    img: jiqiren,
  },
  {
    id: "jiqiren2",
    lon: "106.651336",
    lng: "29.509270",
    height: 115,
    img: jiqiren,
  },
]);
// 孪生图层
const luanshengList = ref([
  {
    id: "lsjindu",
    lon: "106.651374",
    lng: "29.509315",
    height: 40,
    img: jindu,
  },
  {
    id: "lsanquan",
    lon: "106.649099",
    lng: "29.509835",
    height: 70,
    img: anquan,
  },
]);
// 单独添加图标
// 初始化添加marker
const addImageMarker = (list) => {
  list.forEach((ele) => {
    const imageEntity = new Cesium.Entity({
      id: ele.id,
      position: Cesium.Cartesian3.fromDegrees(ele.lon, ele.lng, ele.height),
      billboard: {
        image: ele.img,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        zIndex: 1000,
        height: 70,
        width: 70,
      },
      properties: {
        id: ele.id,
        name: ele.name,
        lon: ele.lon,
        lat: ele.lat,
        height: ele.height,
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

// 添加红色平面
const addRedPlane = () => {
  const rectangle = new Cesium.Entity({
    id: "redPlane",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(
        106.649468 - 0.0002, // 左边界
        29.510137 - 0.001, // 下边界
        106.649468 + 0.0005, // 右边界
        29.510137 + 0.0002 // 上边界
      ),
      material: new Cesium.ColorMaterialProperty(
        Cesium.Color.RED.withAlpha(0.2)
      ),
      height: 50, // 设置高度
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    },
  });
  agFeatureLayer.addEntity(rectangle);
};

// 添加bim-glb
const addEntityBimGlb = () => {
  glbList.value.forEach((item, index) => {
    // {"id":"bim1","lon":"106.651279","lng":"29.509190","height":100,"img":"/src/assets/rou/BIM.png"}
    const height = index > 3 ? 35 + index * 0.7 : 35 + index * 0.9;
    const heading = Cesium.Math.toRadians(35); // 90度旋转
    const pitch = 0;
    const roll = 0;
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      Cesium.Cartesian3.fromDegrees(position.lng, position.lat, height),
      new Cesium.HeadingPitchRoll(heading, pitch, roll)
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
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        // height: height 不需要单独设置，因为位置已经包含高度
      },
    });
    agFeatureLayer.addEntity(glbEntity);
  });
};
let lastCopiedEntityId = null; // 存储上一个复制实体的 ID

// 常量配置
const CONSTANTS = {
  POSITION: {
    DEFAULT: {
      lng: 106.651155,
      lat: 29.509141,
    },
    CAMERA: {
      longitude: 106.651183,
      latitude: 29.504846,
      height: 614.3,
    },
  },
  LAYERS: {
    TERRAIN_URL: "http://172.30.41.194:20035/dem/ChongQingCIM_DEM",
    WMTS_URL: "http://172.30.41.194:20035/agserver/gwc/service/wmts",
    WMTS_LAYER: "dzdt_lll_fdcjyzx",
    WMTS_MATRIX: "EPSG:4490_dzdt_lll_fdcjyzx",
  },
};

// 图层管理
const LayerManager = {
  // 初始化地形图层
  initTerrainLayer() {
    return new agcim.layer.AgTerrainLayer({
      url: CONSTANTS.LAYERS.TERRAIN_URL,
    });
  },

  // 初始化 WMTS 图层
  initWMTSLayer() {
    const options = {
      url: CONSTANTS.LAYERS.WMTS_URL,
      layerTable: CONSTANTS.LAYERS.WMTS_LAYER,
      tileMatrixSet: CONSTANTS.LAYERS.WMTS_MATRIX,
    };
    return new agcim.layer.AgWMTSLayer(options);
  },

  // 初始化 3D Tiles 图层
  init3DTilesLayer() {
    const urls = [
      "http://172.30.41.194:20035/qxsy_tiles/qx_dnyy_250526/tileset.json",
      // "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_1/tileset.json",
      "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_2/tileset.json",
      "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_3/tileset.json",
      "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_4/tileset.json",
    ];
    return new agcim.layer.Ag3DTilesLayer({
      urls,
    });
  },
};

// 事件处理
const EventHandler = {
  // 处理点击事件
  handleClick(feature, movement, viewer, agFeatureLayer) {
    console.log("🚀 ~ handleClick ~ feature:", feature);
    if (!feature.id) {
      if (lastCopiedEntityId) {
        viewer.entities.remove(lastCopiedEntityId);
      }
      return;
    }
    if (feature.id._id === "shexiangtou" || feature.id._id === "ganzhi2") {
      emit("handleEmitShexiangtou");
    } else if (feature.id._id === "jiqiren" || feature.id._id === "jiqiren2") {
      // emit("handleEmitJiqiren");
      emit("handleEmitJiqirenTan");
    } else if (feature.id._id === "bim1") {
      emit("handleEmitYimo");
    } else if (
      ["fengxian1", "fengxian2", "fengxian3", "ceshigaodu"].includes(
        feature.id._id
      )
    ) {
      this.showRiskPopup(movement);
    } else if (feature.detail?.model?.type === "GLTF") {
      this.handleModelClick(feature, viewer, agFeatureLayer);
    } else if (feature.id._id == "lsanquan") {
      this.showSafePopup(movement);
    } else if (feature.id._id == "lsjindu") {
      this.showJinduPopup(movement);
    }
  },

  // 显示风险弹窗
  showRiskPopup(movement) {
    showRiskPopup.value = true;
    popupStyle.value = {
      left: movement.position.x + 10 + "px",
      top: movement.position.y + 10 + "px",
    };
  },
  // 孪生安全
  showSafePopup(movement) {
    showAnquanPopup.value = true;
    popupStyle.value = {
      left: movement.position.x + 10 + "px",
      top: movement.position.y + 10 + "px",
    };
  },
  // 显示孪生安全弹窗
  showJinduPopup(movement) {
    showJinduPopup.value = true;
    popupStyle.value = {
      left: movement.position.x + 10 + "px",
      top: movement.position.y + 10 + "px",
    };
  },

  // 处理模型点击
  handleModelClick(feature, viewer, agFeatureLayer) {
    console.log("🚀 ~ handleModelClick ~ feature:", feature.id._id, feature);
    if (lastCopiedEntityId) {
      viewer.entities.remove(lastCopiedEntityId);
    }

    // 设置glb模型偏移位置
    const m = feature.id._floor > 5 ? 80 / 111320 : 117 / 111320;
    const n = feature.id._floor > 5 ? 50 / 111320 : 71 / 111320;

    const position = {
      lng: 106.651155,
      lat: 29.509141,
    };
    const drawerPosition = Cesium.Cartesian3.fromDegrees(
      CONSTANTS.POSITION.DEFAULT.lng + m,
      CONSTANTS.POSITION.DEFAULT.lat - n,
      46
    );

    const heading = Cesium.Math.toRadians(35);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      Cesium.Cartesian3.fromDegrees(
        CONSTANTS.POSITION.DEFAULT.lng,
        CONSTANTS.POSITION.DEFAULT.lat,
        46
      ),
      new Cesium.HeadingPitchRoll(heading, 0, 0)
    );

    const copiedEntity = new Cesium.Entity({
      id: "Copy_" + feature.id._id,
      url: feature.id._url,
      orientation: orientation,
      position: drawerPosition,
      model: {
        uri: feature.id._url,
        scale: 1.0,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      },
    });

    agFeatureLayer.addEntity(copiedEntity);
    lastCopiedEntityId = agFeatureLayer._entities.find(
      (item) => item._id === copiedEntity._id
    );
    if (feature.id._id == "Floor16") {
      addImageMarker(jiqirenList.value);
    } 
    // else {
    //   topEntityId = agFeatureLayer._entities.find(
    //     (item) => item._id === "jiqiren"
    //   );
    //   console.log("🚀 ~ topEntityId:", topEntityId);
    //   viewer.entities.remove(topEntityId);
    // }
  },
};

// 初始化地图
const initMap = async () => {
  try {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 初始化地图
    await agcim.scene.mapInit.initMap("containCesium");
    viewer = CIM.viewer;
    scene = viewer.scene;
    camera = scene.camera;

    // 添加图层
    const terrainLayer = LayerManager.initTerrainLayer();
    const wmtsLayer = LayerManager.initWMTSLayer();
    const tilesLayer = LayerManager.init3DTilesLayer();

    CIM.layerTree.add(terrainLayer);
    CIM.layerTree.add(wmtsLayer);
    CIM.layerTree.add(tilesLayer);
    await tilesLayer.loadDataPromise;

    // 设置相机视角
    camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        CONSTANTS.POSITION.CAMERA.longitude,
        CONSTANTS.POSITION.CAMERA.latitude,
        CONSTANTS.POSITION.CAMERA.height
      ),
      orientation: {
        heading: 6.2831853071795765,
        pitch: -0.508461322700362,
        roll: 6.283185307179572,
      },
    });

    // 初始化特征图层
    agFeatureLayer = new agcim.layer.FeatureLayer(viewer);
    viewer.scene.globe.depthTestAgainstTerrain = true;

    // 添加实体
    addImageMarker(imgList.value);
    // 添加bimGlb
    addEntityBimGlb();
    // 添加事件监听
    setupEventListeners();
    isLoading.value = false;
  } catch (error) {
    console.error("地图初始化失败:", error);
    ElMessage.error("地图加载失败，请刷新重试");
    isLoading.value = false;
  }
};

// 设置事件监听
const setupEventListeners = () => {
  // 相机移动事件
  viewer.camera.changed.addEventListener(() => {
    const center = viewer.camera.position;
    const cartographic = Cesium.Cartographic.fromCartesian(center);
    const heading = Cesium.Math.toDegrees(viewer.camera.heading);
    const pitch = Cesium.Math.toDegrees(viewer.camera.pitch);
    const roll = Cesium.Math.toDegrees(viewer.camera.roll);

    currentView.value = {
      longitude: Cesium.Math.toDegrees(cartographic.longitude).toFixed(6),
      latitude: Cesium.Math.toDegrees(cartographic.latitude).toFixed(6),
      height: cartographic.height.toFixed(2),
      heading: heading.toFixed(2),
      pitch: pitch.toFixed(2),
      roll: roll.toFixed(2),
    };
  });

  // 点击事件
  const highlightHelper = new agcim.renderer.HighlightHelper();
  const _pickerHelper = new agcim.interactive.PickerHelper(viewer);
  _pickerHelper.on("LEFT_CLICK", (movement) => {
    const feature = _pickerHelper.getPickObject(movement.position);
    const cartesian = _pickerHelper.getPickPosition(movement.position);

    if (cartesian) {
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      const lon = Cesium.Math.toDegrees(cartographic.longitude);
      const lat = Cesium.Math.toDegrees(cartographic.latitude);

      clickPosition.value = {
        longitude: lon.toFixed(6),
        latitude: lat.toFixed(6),
        height: cartographic.height.toFixed(2),
      };

      clickPositionInfo.value = JSON.stringify({
        lon: lon.toFixed(6),
        lng: lat.toFixed(6),
      });

      if (feature) {
        EventHandler.handleClick(feature, movement, viewer, agFeatureLayer);
      }
    }
  });
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
.is-btn-bg {
  background: url("@/assets/rou/fxbtn.png") no-repeat center center;
  background-size: 100% 100%;
}
</style>
