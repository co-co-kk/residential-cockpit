<template>
  <div class="map_container">
    <div id="containCesium" class="containCesium" style="width: 4800px;height: 1190px;"></div>
  
  </div>
</template>

<script setup name="CesiumViewer">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import bus from "../../utils/bus.js";

// 响应式数据
const loading = ref(false);
const options = ref([]);
const value = ref(null);

let viewer = ref(null);
let scene = ref(null);
let camera = ref(null);
let handler = ref(null);

let agFeatureLayer = ref(null);
 



let _pickerHelper = ref(null);
const informationShow = ref(false);
const overlayInformation = ref({
      type: null,
    });
// 初始化地图
const initMap = async () => {
  agcim.scene.mapInit.initMap("containCesium"); // 初始化地图

  // 添加影像图层
  let agGeoSceneTileLayer = new agcim.layer.AgGeoSceneTileLayer({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/",
    spatialReference: {
      wkid: "3857",
    },
  });
  CIM.layerTree.add(agGeoSceneTileLayer);

  // 添加地形图层
  let agTerrainLayer = new agcim.layer.AgTerrainLayer({
    url: "http://25.26.26.133:8392/dem/ChongQingCIM_DEM",
  });
  CIM.layerTree.add(agTerrainLayer);

  // 添加 WMTS 图层
  let options = {
    url: "http://25.26.26.45:8080/agserver/gwc/service/wmts", //服务链接
    layerTable: "dzdt_lll_fdcjyzx", //加载图层名称
    tileMatrixSet: "EPSG:4490_dzdt_lll_fdcjyzx", //矩阵集
  };
  let agWMTSLayer = new agcim.layer.AgWMTSLayer(options);
  CIM.layerTree.add(agWMTSLayer);

  // 添加 3D Tiles 图层
  let urls = [
        "http://25.26.26.82/models-rest/rest/models/preview/czzz_zxcq/tileset.json",
        "http://25.26.26.82/models-rest/rest/models/preview/czfzz_zxcq/tileset.json",
        "http://25.26.26.82/models-rest/rest/models/preview/ncdlzz_zxcq/tileset.json",
        "http://25.26.26.82/models-rest/rest/models/preview/ncjhzz_zxcq/tileset.json",
        "http://25.26.26.82/models-rest/rest/models/preview/ncfzz_zxcq/tileset.json",
      ];
      let optionsJsons = {
        urls: urls,
      };
  let ag3DTilesLayer = new agcim.layer.Ag3DTilesLayer(optionsJsons);
         CIM.layerTree.add(ag3DTilesLayer);
      viewer = CIM.viewer;
      scene = viewer.scene;
      camera = scene.camera;
      // viewer.scene.setTerrain(
      //   new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(1))
      // );
      viewer.scene.globe.depthTestAgainstTerrain = true;
      agFeatureLayer = new agcim.layer.FeatureLayer(viewer);
      let positionInfo = {
        longitude:106.58499130722143,
        latitude: 29.518665952030418,
        height: 2800,
      };

  // 设置初始视角
  camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          positionInfo.longitude,
          positionInfo.latitude,
          positionInfo.height
        ),
        orientation: {
          heading: 6.2831853071795765,
          pitch: -0.508461322700362,
          roll:6.283185307179572,
        },
      });

      
      // 添加建筑和多边形
      addBuilding();
      addBuildingPolgon();
      addPology();
    };

    // 添加建筑
    const addBuilding = () => {
      buildingOptions.forEach((ele) => {
        let positions = [];
        ele.geom.map((ele1) => {
          positions.push(ele1[0], ele1[1]);
        });
        const polygonPositions = Cesium.Cartesian3.fromDegreesArray(positions);
        const entity = new Cesium.Entity({
          polygon: {
            id: ele.id,
            name: ele.name,
            hierarchy: polygonPositions,
            material: Cesium.Color.WHITE.withAlpha(0.98), // 设置材质为红色
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            extrudedHeight:
              ele.single == 0 ? ele.buildingHeight : ele.buildingHeight, // 设置拉伸的高度，单位为米
          },
          label: {
            text: ele.name,
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 13,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            font: "bold 26px MicroSoft YaHei",
            backgroundColor: Cesium.Color.WHITE,
            showBackground: false,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            scale: 0.5,
          },
          properties: ele,
        });
        agFeatureLayer.addEntity(entity);
      });
      // viewer.flyTo(agFeatureLayer._entities);
    };

    const addBuildingPolgon = () => {
      buildingOptions.forEach((ele) => {
        let positions = [];
        ele.geom.map((ele1) => {
          positions.push(ele1[0], ele1[1]);
        });
        const polygonPositions = Cesium.Cartesian3.fromDegreesArray(positions);
        const entity = new Cesium.Entity({
          polygon: {
            id: ele.id,
            name: ele.name,
            hierarchy: polygonPositions,
            material:
              ele.type == 0
                ? Cesium.Color.fromCssColorString("#1e56a0").withAlpha(0.7)
                : ele.type == 1
                  ? Cesium.Color.fromCssColorString("#00bbf0").withAlpha(0.7)
                  : Cesium.Color.fromCssColorString("#aedefc").withAlpha(0.7),
            extrudedHeight: ele.buildingHeight,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          },
          label: {
            text: ele.name,
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 13,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            font: "bold 26px MicroSoft YaHei",
            backgroundColor: Cesium.Color.WHITE,
            showBackground: false,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            scale: 0.5,
          },
          properties: ele,
        });
        agFeatureLayer.addEntity(entity);
      });
    };

    // 添加多边形
    const addPology = () => {
      pologyOption.forEach((ele) => {
        let positions = [];
        ele.geom.map((ele1) => {
          positions.push(ele1[0], ele1[1]);
        });
        const polygonPositions = Cesium.Cartesian3.fromDegreesArray(positions);
        const entity = new Cesium.Entity({
          polygon: {
            id: ele.id,
            name: ele.name,
            hierarchy: polygonPositions,
            material:
              ele.type == 0
                ? Cesium.Color.fromCssColorString("#1e56a0").withAlpha(0.7)
                : ele.type == 1
                  ? Cesium.Color.fromCssColorString("#00bbf0").withAlpha(0.7)
                  : Cesium.Color.fromCssColorString("#aedefc").withAlpha(0.7),
          },
          label: {
            text: ele.name,
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 13,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            font: "bold 26px MicroSoft YaHei",
            backgroundColor: Cesium.Color.WHITE,
            showBackground: false,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            scale: 0.5,
          },
          properties: ele,
        });
        agFeatureLayer.addEntity(entity);
      });
    };

 

onMounted(() => {
  initMap();
});
</script>

<style scoped>
.map_container {
  width: 4800px;
  height: 1800px;
  position: relative;
}

.containCesium {
  width: 4800px;
  height: 1800px;
}

.note_class {
  background-image: url("../../assets/image/home/left_bottom_right_bottom.png");
  background-size: 100% 100%;
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
  background: linear-gradient(180deg, rgba(76, 169, 255, 1), rgba(1, 120, 230, 0));
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
</style>