<template>
  <div class="screen_container1">
    <div id="containCesium" class="containCesium"></div>
    <div id="popup" class="ol-popup tech-border" v-if="informationShow">
      <div id="popup-content">
        <el-image
          style="width: 588px; height: 331px"
          :src="imgUrl"
          @click="gifShow = true"
          fit="fill"
        ></el-image>
      </div>
    </div>
    <div id="popup1" class="ol-popup1 tech-border" v-if="gifShow">
      <div id="popup1-content">
        <el-image
          style="width: 588px; height: 331px"
          :src="require('../../assets/gif/1.gif')"
          @click="clickImg"
          fit="fill"
        ></el-image>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../utils/bus";
import axios from "axios";
export default {
  name: "CesiumViewer",
  props: {},
  mounted() {
    this.initMap();
  },
  components: {},
  data() {
    return {
      gifShow: false,
      informationShow: false,
      polygonEntity: null,
      url: require("@/assets/images/tuban.png"),
      imgUrl: require("@/assets/images/image3.png"),
      srcList: [require("@/assets/images/tuban.png")],
      value: null,
      loading: null,
      fileList: [],
      options: [],
      disabled: false,
      drawer: false,
      innerDrawer: false,
      innerDrawer1: false,
      centerDialogVisible: false,
      agFeatureLayer: null,
      form: {
        code: null,
        originCode: null,
        name: null,
        standardAddress: null,
        detailAddress: null,
        planningPermission: null,
        constructionPermission: null,
        acceptancePermission: null,
        parcelCode: null,
        unitCode: null,
        structureType: null,
        shelter: null,
        acceptanceYear: null,
        buildingStoreyAbove: null,
        buildingStoreyUnderground: null,
        buildingHeight: null,
        parkingSpace: null,
        undergroundParkingSpace: null,
        baseArea: null,
        overallFloorage: null,
        mainApplication: null,
        conservationBuilding: null,
        dismantle: null,
        specialVersion: null,
        boardFile: null,
        preliminaryDrawings: null,
        productionDrawing: null,
        asBuiltDrawing: null,
        geom: null,
        boardFile: [],
        preliminaryDrawings: [],
        productionDrawing: [],
        asBuiltDrawing: [],
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入房屋建筑代码",
            trigger: "blur",
          },
        ],
        originCode: [
          {
            required: true,
            message: "请输入原房屋建筑代码",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入房屋建筑名称",
            trigger: "blur",
          },
        ],
        standardAddress: [
          {
            required: true,
            message: "请输入标准地址",
            trigger: "blur",
          },
        ],
        detailAddress: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur",
          },
        ],
        planningPermission: [
          {
            required: true,
            message: "请输入建设工程规划许可证编号",
            trigger: "blur",
          },
        ],
        constructionPermission: [
          {
            required: true,
            message: "请输入建筑工程施工许可证编号",
            trigger: "blur",
          },
        ],
        acceptancePermission: [
          {
            required: true,
            message: "请输入竣工验收合格证编号",
            trigger: "blur",
          },
        ],
        parcelCode: [
          {
            required: true,
            message: "请输入宗地代码",
            trigger: "blur",
          },
        ],
        unitCode: [
          {
            required: true,
            message: "请输入不动产单元代码",
            trigger: "blur",
          },
        ],
        structureType: [
          {
            required: true,
            message: "请输入结构类型",
            trigger: "blur",
          },
        ],
        shelter: [
          {
            required: true,
            message: "请输入临时房屋建筑",
            trigger: "blur",
          },
        ],
        acceptanceYear: [
          {
            required: true,
            message: "请输入竣工验收年",
            trigger: "blur",
          },
        ],
        buildingStoreyAbove: [
          {
            required: true,
            message: "请输入建筑层数 (地上)",
            trigger: "blur",
          },
        ],
        buildingStoreyUnderground: [
          {
            required: true,
            message: "请输入建筑层数 (地下)",
            trigger: "blur",
          },
        ],
        buildingHeight: [
          {
            required: true,
            message: "请输入建筑高度",
            trigger: "blur",
          },
        ],
        parkingSpace: [
          {
            required: true,
            message: "请输入地面停车位",
            trigger: "blur",
          },
        ],
        undergroundParkingSpace: [
          {
            required: true,
            message: "请输入地下停车位",
            trigger: "blur",
          },
        ],
        baseArea: [
          {
            required: true,
            message: "请输入基底面积",
            trigger: "blur",
          },
        ],
        overallFloorage: [
          {
            required: true,
            message: "请输入总建筑面积",
            trigger: "blur",
          },
        ],
        mainApplication: [
          {
            required: true,
            message: "请输入主要用途",
            trigger: "blur",
          },
        ],
        conservationBuilding: [
          {
            required: true,
            message: "请选择是否是保护性建筑",
            trigger: "blur",
          },
        ],
        dismantle: [
          {
            required: true,
            message: "请选择是否拆除",
            trigger: "blur",
          },
        ],
        specialVersion: [
          {
            required: true,
            message: "请输入特别说明",
            trigger: "blur",
          },
        ],
        boardFile: [
          {
            required: true,
            message: "请上传房屋建筑图斑文件",
            trigger: "blur",
          },
        ],
        preliminaryDrawings: [
          {
            required: true,
            message: "请上传初步设计图",
            trigger: "blur",
          },
        ],
        productionDrawing: [
          {
            required: true,
            message: "请上传施工图",
            trigger: "blur",
          },
        ],
        asBuiltDrawing: [
          {
            required: true,
            message: "请上传竣工图",
            trigger: "blur",
          },
        ],
        geom: [
          {
            required: true,
            message: "请输入建筑坐标",
            trigger: "blur",
          },
        ],
      },
      buildingOptions: [],
      shpData: [],
      defaultProps: {
        label: "mc",
        value: "mc",
      },
    };
  },
  created() {
    bus.$on("getData", (val) => {
      this.form.geom = val;
    });
  },
  methods: {
    // init2DMap() {
    //     agcim.scene.mapInit.initMap("containCesiumForDraw"); //初始化地图
    //     let agGeoSceneTileLayer = new agcim.layer.AgGeoSceneTileLayer({
    //         url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/",
    //         spatialReference: {
    //             wkid: "4326"
    //         },
    //     });
    //     CIM.layerTree.add(agGeoSceneTileLayer);
    //     Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(
    //         "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
    //     ).then((terrainProvider) => {
    //         CIM.viewer.terrainProvider = terrainProvider;
    //     });
    //     let positionInfo = {
    //         longitude: 106.53106626254807,
    //         latitude: 29.549328698600732,
    //         height: 5000,
    //     };
    //     agcim.camera.camera.flyTo(CIM.viewer, positionInfo);
    //     this.drawPolygon();
    // },
    init2DMap() {},
    //地图初始化事件
    initMap() {
      agcim.scene.mapInit.initMap("containCesium"); //初始化地图
      let agGeoSceneTileLayer = new agcim.layer.AgGeoSceneTileLayer({
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/",
        spatialReference: { wkid: "3857" },
      });
      CIM.layerTree.add(agGeoSceneTileLayer);
      Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(
        "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
        {
          token:
            "KED1aF_I4UzXOHy3BnhwyBHU4l5oY6rO6walkmHoYqGp4XyIWUd5YZUC1ZrLAzvV40pR6gBXQayh0eFA8m6vPg..",
        }
      ).then((terrainProvider) => {
        CIM.viewer.terrainProvider = terrainProvider;
      });
      // let options = {
      //   url: "http://25.26.26.45:8080/agserver/gwc/service/wmts", //服务链接
      //   layerTable: "dzdt_lll_fdcjyzx", //加载图层名称
      //   tileMatrixSet: "EPSG:4490", //矩阵集
      // };
      // let agWMTSLayer = new agcim.layer.AgWMTSLayer(options);
      // CIM.layerTree.add(agWMTSLayer);
      // agWMTSLayer.loadDataPromise.then(() => {
      //   agWMTSLayer.zoomToLayer();
      // });
      // let urls = [
      //   "http://25.26.26.82/models-rest/rest/models/preview/czzz_zxcq/tileset.json",
      //   "http://25.26.26.82/models-rest/rest/models/preview/czfzz_zxcq/tileset.json",
      //   "http://25.26.26.82/models-rest/rest/models/preview/ncdlzz_zxcq/tileset.json",
      //   "http://25.26.26.82/models-rest/rest/models/preview/ncjhzz_zxcq/tileset.json",
      //   "http://25.26.26.82/models-rest/rest/models/preview/ncfzz_zxcq/tileset.json",
      // ];
      // let optionsJsons = {
      //   urls: urls,
      // };
      // let ag3DTilesLayer = new agcim.layer.Ag3DTilesLayer(optionsJsons);
      // CIM.layerTree.add(ag3DTilesLayer);
      // ag3DTilesLayer.loadDataPromise.then(() => {
      //   ag3DTilesLayer.zoomToLayer();
      // });
      this.agFeatureLayer = new agcim.layer.FeatureLayer(CIM.viewer);
      let positionInfo = {
        longitude: 106.3619,
        latitude: 29.6146,
        height: 4000,
      };
      agcim.camera.camera.flyTo(CIM.viewer, positionInfo);
      this.addBuilding();
      var that = this;
      let highlightHelper = new agcim.renderer.HighlightHelper();
      let _pickerHelper = new agcim.interactive.PickerHelper(CIM.viewer);
      _pickerHelper.on("LEFT_CLICK", (movement) => {
        let cartesian = _pickerHelper.getPickPosition(movement.position);
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var lon = Cesium.Math.toDegrees(cartographic.longitude);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        let feature = _pickerHelper.getPickObject(movement.position);
        let properties = feature != null ? feature.id.properties : null;
        console.log("properties", properties);
        if (properties != null) {
          that.informationShow = true;
          that.gifShow = false;
        } else {
          that.informationShow = false;
          that.gifShow = false;
        }
      });
    },
    // initMap() {
    //     Cesium.Ion.defaultAccessToken =
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZjc0NDIzMS0zY2UzLTRlZjEtOGRmZC1hZjM3ZTFmYzFiMDkiLCJpZCI6MjM0NTAzLCJpYXQiOjE3MjM1NDk0MDN9.jHsgLhzjpRHJFvMNOj-98_9_sIYkrs079IH4a10Y-jY";
    //     var viewer = new Cesium.Viewer("containCesium");

    //     var handler; // 用于处理鼠标事件
    //     var positions = []; // 存储多边形的坐标点
    //     var polygonEntity; // 多边形实体对象
    //     var isDragging = false; // 是否正在拖拽
    //     var selectedVertexIndex = -1; // 被选中的顶点索引
    //     var previousPosition = null; // 记录拖拽开始时的位置

    //     // 开始绘制多边形
    //     function startDrawing() {
    //         handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

    //         // 监听鼠标左键点击事件
    //         handler.setInputAction(function (event) {
    //           console.log('event',event)
    //             var ray = viewer.camera.getPickRay(event.position);
    //             var cartesian = viewer.scene.globe.pick(ray, viewer.scene);

    //             if (Cesium.defined(cartesian)) {
    //                 positions.push(cartesian);

    //                 // 在地图上添加一个点
    //                 viewer.entities.add({
    //                     position: cartesian,
    //                     point: {
    //                         pixelSize: 5,
    //                         color: Cesium.Color.RED
    //                     },
    //                 });

    //                 // 绘制多边形
    //                 if (positions.length > 2) {
    //                     if (polygonEntity) {
    //                         viewer.entities.remove(polygonEntity);
    //                     }

    //                     polygonEntity = viewer.entities.add({
    //                         polygon: {
    //                             hierarchy: positions,
    //                             material: Cesium.Color.RED.withAlpha(0.5),
    //                             outline: true,
    //                             outlineColor: Cesium.Color.BLACK,
    //                         },
    //                     });
    //                 }
    //             }
    //         }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //         // 监听右键点击事件，结束绘制
    //         handler.setInputAction(function () {
    //             handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //             handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    //         }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    //     }

    //     // 拖拽功能
    //     function enableDragging() {
    //         handler.setInputAction(function (event) {
    //             if (!isDragging && selectedVertexIndex === -1) {
    //                 var ray = viewer.camera.getPickRay(event.startPosition);
    //                 var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    //                 if (Cesium.defined(cartesian)) {
    //                     // 检查是否点击了多边形上的顶点
    //                     var pickedEntity = viewer.scene.pick(event.startPosition);
    //                     if (pickedEntity && pickedEntity.id === polygonEntity) {
    //                       console.log("找到了么")
    //                         // 找到最近的顶点，并准备拖拽
    //                         selectedVertexIndex = getNearestVertexIndex(cartesian);
    //                         console.log("selectedVertexIndex",selectedVertexIndex)
    //                         // if (selectedVertexIndex !== -1) {
    //                             isDragging = true;
    //                             previousPosition = cartesian;
    //                         // }
    //                     }
    //                 }
    //             }

    //             // 拖动时更新顶点位置
    //             if (isDragging && selectedVertexIndex !== -1) {
    //                 var ray = viewer.camera.getPickRay(event.endPosition);
    //                 var cartesian = viewer.scene.globe.pick(ray, viewer.scene);

    //                 if (Cesium.defined(cartesian)) {
    //                     // 更新拖拽后的顶点位置
    //                     positions[selectedVertexIndex] = cartesian;

    //                     // 更新多边形
    //                     polygonEntity.polygon.hierarchy = new Cesium.PolygonHierarchy(
    //                         positions
    //                     );
    //                 }
    //             }
    //         }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    //         // 结束拖拽
    //         handler.setInputAction(function () {
    //             isDragging = false;
    //             selectedVertexIndex = -1;
    //             previousPosition = null;
    //         }, Cesium.ScreenSpaceEventType.LEFT_UP);
    //     }

    //     // 获取最接近的顶点索引
    //     function getNearestVertexIndex(cartesian) {
    //         var minDistance = Number.MAX_VALUE;
    //         var nearestIndex = -1;
    //         for (var i = 0; i < positions.length; i++) {
    //             var distance = Cesium.Cartesian3.distance(cartesian, positions[i]);
    //             if (distance < minDistance && distance < 100) {
    //                 // 100是拖拽顶点的允许距离阈值
    //                 minDistance = distance;
    //                 nearestIndex = i;
    //             }
    //         }
    //         return nearestIndex;
    //     }

    //     // 启动绘制和拖拽功能
    //     startDrawing();
    //     enableDragging();
    // },
    addBuilding() {
      axios({
        type: "GET",
        url: "http://125.211.217.17:10006/geoserver/harbin/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=harbin%3At_project&maxFeatures=50&outputFormat=application%2Fjson",
      }).then((res) => {
        console.log(res.data.features);
        res.data.features.map((ele, index) => {
          let positions = [];
          ele.geometry.coordinates[0][0].map((ele1) => {
            positions.push(ele1[0], ele1[1]);
          });
          const polygonPositions =
            Cesium.Cartesian3.fromDegreesArray(positions);
          var entity = new Cesium.Entity({
            polygon: {
              id: index,
              name: ele.project_name,
              hierarchy: polygonPositions,
              material: Cesium.Color.RED.withAlpha(0.6), // 设置材质为红色
              extrudedHeight: 800, // 设置拉伸的高度，单位为米
            },
            label: {
              text: ele.project_name,
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
            properties: ele,
          });
          this.agFeatureLayer.addEntity(entity);
        });
      });
    },
    //搜索框远程搜索事件
    remoteMethod(query) {
      if (query !== "") {
        this.options = [];
        this.loading = true;
        // let CQL = "name like '%25" + query + "%25'";
        setTimeout(() => {
          this.loading = false;
          this.buildingOptions.map((ele) => {
            if (ele.name.indexOf(query) > -1) {
              this.options.push(ele);
            }
          });
          // let queryTask = new agcim.wfs.QueryTask(
          //   "http://localhost:88/geoserver/topp/ows"
          // );
          // let parames = new agcim.wfs.CreateQuery({
          //   layerName: "topp:roads_xian",
          //   where: "name='二环南路'",
          // });
          // queryTask.execute(parames).then((result) => {
          //   console.log("result", result);
          // });
        }, 200);
      } else {
        this.options = [];
      }
    },
    //搜索框选中事件
    selectMethod(item) {
      let positionInfo = {
        longitude: item.geom[0][0],
        latitude: item.geom[0][1],
        height: 2000,
      };
      agcim.camera.camera.flyTo(CIM.viewer, positionInfo);
      this.addPolygon(item);
    },
    addPolygon(data) {
      if (this.polygonEntity) {
        CIM.viewer.entities.remove(this.polygonEntity);
      }
      let positions = [];
      data.geom.map((ele) => {
        positions.push(ele[0], ele[1]);
      });
      const polygonPositions = Cesium.Cartesian3.fromDegreesArray(positions);
      this.polygonEntity = new Cesium.Entity({
        name: "选中建筑物",
        polygon: {
          id: "20000000",
          name: data.name,
          hierarchy: polygonPositions,
          material: Cesium.Color.RED.withAlpha(0.6), // 设置材质为红色
          extrudedHeight: data.buildingHeight + 240, // 设置拉伸的高度，单位为米
        },
        properties: data,
      });
      this.agFeatureLayer.addEntity(this.polygonEntity);
    },
    //新增打开按钮
    openDialogue() {
      this.disabled = false;
      this.form = {
        code: null,
        originCode: null,
        name: null,
        standardAddress: null,
        detailAddress: null,
        planningPermission: null,
        constructionPermission: null,
        acceptancePermission: null,
        parcelCode: null,
        unitCode: null,
        structureType: null,
        shelter: null,
        acceptanceYear: null,
        buildingStoreyAbove: null,
        buildingStoreyUnderground: null,
        buildingHeight: null,
        parkingSpace: null,
        undergroundParkingSpace: null,
        baseArea: null,
        overallFloorage: null,
        mainApplication: null,
        conservationBuilding: null,
        dismantle: null,
        specialVersion: null,
        boardFile: null,
        preliminaryDrawings: null,
        productionDrawing: null,
        asBuiltDrawing: null,
        geom: null,
      };
      this.drawer = true;
    },
    //新增取消按钮
    cancel() {
      this.form = {
        code: null,
        originCode: null,
        name: null,
        standardAddress: null,
        detailAddress: null,
        planningPermission: null,
        constructionPermission: null,
        acceptancePermission: null,
        parcelCode: null,
        unitCode: null,
        structureType: null,
        shelter: null,
        acceptanceYear: null,
        buildingStoreyAbove: null,
        buildingStoreyUnderground: null,
        buildingHeight: null,
        parkingSpace: null,
        undergroundParkingSpace: null,
        baseArea: null,
        overallFloorage: null,
        mainApplication: null,
        conservationBuilding: null,
        dismantle: null,
        specialVersion: null,
        boardFile: null,
        preliminaryDrawings: null,
        productionDrawing: null,
        asBuiltDrawing: null,
        geom: null,
      };
      this.drawer = false;
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
      if (res.code == 0) {
        let shpData = [];
        res.data.map((ele) => {
          let obj = {
            ...ele.geometry,
            ...ele.properties,
          };
          shpData.push(obj);
        });
        this.shpData = shpData;
        this.$message.success(res.message);
      }
    },
    handleExceed() {},
    beforeRemove() {},
    handlePreview(file) {
      this.centerDialogVisible = true;
    },
    handleRemove() {},
    // drawPolygon() {
    //   let draw = new agcim.interactive.draw(CIM.viewer);
    //   let polygonArrays = [];
    //   var that = this;
    //   draw.drawPolygon({ clampToGround: true }, false).then((res) => {
    //     var positions = [];
    //     res.positions.map((ele) => {
    //       positions.push(new Cesium.Cartesian3(ele.x, ele.y, ele.z));
    //     });
    //     var ellipsoid = Cesium.Ellipsoid.WGS84;
    //     var cartographicPositions = positions.map(function (cartesian) {
    //       return Cesium.Cartographic.fromCartesian(cartesian, ellipsoid);
    //     });
    //     // 输出转换后的经纬度坐标 (经度、纬度、高度)
    //     cartographicPositions.forEach(function (cartographic) {
    //       var longitude = Cesium.Math.toDegrees(cartographic.longitude); // 经度
    //       var latitude = Cesium.Math.toDegrees(cartographic.latitude); // 纬度
    //       var height = cartographic.height; // 高度
    //       var polygonArray = [longitude, latitude];
    //       polygonArrays.push(polygonArray);
    //     });
    //     polygonArrays.push(polygonArrays[0]);
    //     this.form.geom = JSON.stringify(polygonArrays);
    //   });
    // },
    drawPolygon() {},
    closeViewer() {
      this.centerDialogVisible = false;
    },
    clearFeatures() {
      if (this.polygonEntity) {
        CIM.viewer.entities.remove(this.polygonEntity);
      }
    },
    handleClick(item) {
      console.log(item);
      this.form = {
        code: null,
        originCode: null,
        name: item.mc,
        standardAddress: null,
        detailAddress: null,
        planningPermission: null,
        constructionPermission: null,
        acceptancePermission: null,
        parcelCode: null,
        unitCode: null,
        structureType: null,
        shelter: null,
        acceptanceYear: null,
        buildingStoreyAbove: null,
        buildingStoreyUnderground: null,
        buildingHeight: item.gd,
        parkingSpace: null,
        undergroundParkingSpace: null,
        baseArea: null,
        overallFloorage: null,
        mainApplication: null,
        conservationBuilding: null,
        dismantle: null,
        specialVersion: null,
        boardFile: null,
        preliminaryDrawings: null,
        productionDrawing: null,
        asBuiltDrawing: null,
        geom: JSON.stringify(item.coordinates),
      };
    },
    handleClose(index) {
      this.shpData.splice(index, 1);
    },
  },
  beforeDestroy() {},
};
</script>

<style>
.screen_container1 {
  position: relative;
  height: 1170px;
  width: 2874px;
}
#containCesium {
  width: 100%;
  height: 100%;
}

#containCesiumForDraw {
  width: 100%;
  height: 100vh;
}

.cesium-infoBox-visible {
  display: none;
}

.ol-popup {
  position: absolute;
  background-color: rgba(37, 39, 40, 0.9);
  color: #fff;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  top: 10%;
  right: 10%;
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

.ol-popup1 {
  position: absolute;
  background-color: rgba(37, 39, 40, 0.9);
  color: #fff;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  top: 40%;
  right: 10%;
}

.ol-popup1:after,
.ol-popup1:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup1:after {
  border-top-color: 0f3360;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup1:before {
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
</style>
