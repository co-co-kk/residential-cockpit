<template>
  <el-dialog
    :visible="visible"
    :show-close="false"
    @close="closeModal"
    fullscreen
    custom-class="examine-dialog"
  >
    <div class="examine-dialog-header">
      <div class="examine-dialog-title">
        <div class="main-title">施工许可系统</div>
        <div class="sub-title">重庆市住房和城乡建设委员会</div>
      </div>
      <div class="right-area">
        <div class="right-btn" @click="closeModal">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="padding-right: 10px; font-size: 20px"
          >
            <path
              d="M23.508 12.0062L16.1152 19.399L14.3475 17.6312L18.7225 13.2562L6.74023 13.2562V10.7562L18.7225 10.7562L14.3475 6.38123L16.1152 4.61346L23.508 12.0062ZM9.24023 2.63123L2.99024 2.63123L2.99023 21.3812H9.24023V23.8812H0.490234L0.490235 0.131226L9.24023 0.131226V2.63123Z"
              fill="#0B1735"
              fill-opacity="0.9"
            />
          </svg>
          返回
        </div>
      </div>
    </div>
    <div class="examine-content">
      <div class="content">
        <div
          class="content_left"
          :style="{
            width: hiddenRightLayout ? '99%' : '55%',
            margin: hiddenRightLayout ? '0' : '0 1.5% 0 0',
          }"
        >
          <div class="top-content">
            <div class="top-content-left">
              <el-button
                class="top-content-left-btn"
                type="primary"
                style="
                  text-align: center;
                  background-color: #fff;
                  color: #409efe;
                  border-color: #fff;
                  font-weight: 700;
                "
                size="mini"
                @click="showFlowChart"
                >查看流程图</el-button
              >
              <el-button
                class="top-content-left-btn"
                type="warning"
                size="mini"
                style="
                  background-color: #e55113;
                  background-color: #fff;
                  color: #e55113;
                  border-color: #e55113;
                  border-radius: 5px;
                "
                @click="reject"
                >不予通过</el-button
              >
              <el-button
                class="top-content-left-btn"
                type="success"
                size="mini"
                style="background-color: #13ce67; border-radius: 5px"
                @click="pass"
                >准许通过</el-button
              >
            </div>
            <div class="top-content-right">
              <div style="margin-left: 10px; font-weight: 800; font-size: 14px">
                切换附件展示 ：
              </div>
              <el-switch v-model="showFiles" size="mini"> </el-switch>
              <div style="margin-left: 10px; font-weight: 800; font-size: 14px">
                当前文件 ：
              </div>
              <el-cascader
                size="mini"
                :disabled="!showFiles"
                v-model="checkFile"
                :options="data"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </div>
          </div>
          <div class="content_left_bottom">
            <CertifiedDetail
              v-if="!showFiles"
              :hidePrint="true"
              :auditInfo="currentRow"
            />
            <div
              class="material-display-left"
              v-if="showFiles && hiddenRightLayout"
            >
              <el-tree
                default-expand-all
                :data="data"
                :props="defaultProps"
                @node-click="handleNodeClick"
              ></el-tree>
            </div>
            <embed
              v-if="showFiles"
              :src="fileUrl"
              type="application/pdf"
              width="100%"
              height="100%"
            />
          </div>
        </div>

        <div
          class="content_right"
          :style="{ display: hiddenRightLayout ? 'none' : 'block' }"
        >
          <div class="map_container" id="map_container">
            <div
              style="
                position: absolute;
                right: 10px;
                bottom: 20px;
                z-index: 999;
                background: rgba(0, 0, 0, 0.4);
                padding: 10px;
              "
            >
              <div
                style="
                  display: flex;
                  align-items: center;
                  margin-bottom: 5px;
                  color: #ffffff;
                "
              >
                <div
                  style="
                    height: 15px;
                    width: 15px;
                    border-radius: 50%;
                    background-color: #00d26a;
                    margin-right: 5px;
                  "
                ></div>
                <div>已办理施工许可</div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  margin-bottom: 5px;
                  color: #ffffff;
                "
              >
                <div
                  style="
                    height: 15px;
                    width: 15px;
                    border-radius: 50%;
                    background-color: #ff6723;
                    margin-right: 5px;
                  "
                ></div>
                <div>本次办理施工许可</div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  margin-bottom: 5px;
                  color: #ffffff;
                "
              >
                <div
                  style="
                    height: 15px;
                    width: 15px;
                    border-radius: 50%;
                    background-color: #0074ba;
                    margin-right: 5px;
                  "
                ></div>
                <div>未办理施工许可</div>
              </div>
            </div>
            <div class="map_opration_area">
              <div class="operation_btn_area">
                <div
                  class="operation_btn"
                  :style="{
                    color: checkTab === 'a' ? '#08d9d6' : '#fff',
                    backgroundColor:
                      checkTab === 'a' ? '#1d2c52' : 'rgba(0, 0, 0, 0.5)',
                  }"
                  @click="() => handleCheckTab('a')"
                >
                  立项信息
                </div>
                <div
                  class="operation_btn"
                  :style="{
                    color: checkTab === 'b' ? '#08d9d6' : '#fff',
                    backgroundColor:
                      checkTab === 'b' ? '#1d2c52' : 'rgba(0, 0, 0, 0.5)',
                  }"
                  @click="() => handleCheckTab('b')"
                >
                  勘察设计
                </div>
                <div
                  class="operation_btn"
                  :style="{
                    color: checkTab === 'c' ? '#08d9d6' : '#fff',
                    backgroundColor:
                      checkTab === 'c' ? '#1d2c52' : 'rgba(0, 0, 0, 0.5)',
                  }"
                  @click="() => handleCheckTab('c')"
                >
                  施工信息
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page_postionChange_area">
          <div class="changeLayout_area" @click="handleChangeLayout">
            <div
              v-if="viewIndex == 0"
              style="color: #ffffff; font-weight: 800; font-size: 12px"
            >
              3D
            </div>
            <div
              v-if="viewIndex == 1"
              style="color: #ffffff; font-weight: 800; font-size: 12px"
            >
              鸟瞰
            </div>
          </div>
          <div class="changeLayout_area" @click="handleChangeLayout1">
            <div
              v-if="typeIndex == 0"
              style="color: #ffffff; font-weight: 800; font-size: 12px"
            >
              图斑
            </div>
            <div
              v-if="typeIndex == 1"
              style="color: #ffffff; font-weight: 800; font-size: 12px"
            >
              BIM
            </div>
          </div>
          <div class="checkLayout_area" @click="handleCheckLayout">
            <i
              class="el-icon-s-unfold"
              v-if="!hiddenRightLayout"
              style="font-size: 22px; line-height: 26px; color: #fff"
            ></i>
            <i
              class="el-icon-s-fold"
              v-if="hiddenRightLayout"
              style="font-size: 22px; line-height: 26px; color: #fff"
            ></i>
          </div>
        </div>
        <MapDetail
          :visible="mapDetailVisible"
          :checkTab="checkTab"
          @close="closeMapDetail"
          :infoVisible="informationShow"
          :infoObj="informationObj"
        />
      </div>
      <div class="page_bottom_area">
        <div class="page_bottom_content">
          <div class="table-display">
            <el-table
              :data="tableData"
              :span-method="objectSpanMethod"
              stripe
              border
              style="width: 100%; margin-top: 20px"
            >
              <el-table-column prop="taskName" label="节点名称" width="180">
              </el-table-column>
              <el-table-column prop="name" label="经办人"> </el-table-column>
              <el-table-column prop="assigneeName" label="流程进度">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.endTime != null && scope.row.endTime != ''"
                  >
                    <el-tag type="success">已完成</el-tag>
                  </span>
                  <span v-else>
                    <el-tag type="warning">办理中</el-tag>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="comment" label="办理意见">
              </el-table-column>
              <el-table-column prop="startTime" label="到达时间">
              </el-table-column>
              <el-table-column prop="endTime" label="办理时间">
              </el-table-column>
            </el-table>
          </div>
          <div class="bottom-content">
            <div class="bottom-content-title">
              <span>科室审核意见</span>
            </div>
            <el-input
              type="textarea"
              size="mini"
              :autosize="{ minRows: 3, maxRows: 4 }"
              placeholder="请输入审核意见"
              v-model="textarea1"
            >
            </el-input>
            <div class="bottom-content-btn">
              <el-button
                plain
                size="mini"
                type="danger"
                @click="textarea1 += '不同意'"
                >不同意</el-button
              >
              <el-button
                plain
                size="mini"
                type="success"
                @click="textarea1 += '同意'"
                >同意</el-button
              >
              <el-button
                plain
                size="mini"
                type="primary"
                @click="textarea1 += '已阅'"
                >已阅</el-button
              >
              <el-button
                plain
                size="mini"
                type="warning"
                @click="textarea1 += '已办理'"
                >已办理</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div style="height: 2vw"></div>
    </div>
    <div class="examin-dialog-footer">
      <div class="examin-dialog-footer-text">
        <div class="examin-dialog-footer-text-main">
          重庆市住房和城乡建设委员会
        </div>
        <span class="examin-dialog-footer-text-sub">
          地址:重庆市渝中区长江一路58号 | 电话:(023)63852577
        </span>
      </div>
    </div>
    <el-dialog
      width="60%"
      title="流程图"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-image
        style="width: 100%; height: 500px"
        :src="imageSrc"
        fit="fill"
      ></el-image>
      <!-- <ProcessDiagram :xml="diagramXml" :completedNodes="completedNodes" /> -->
    </el-dialog>
  </el-dialog>
</template>


<script>
import { Message } from "element-ui";
import ProcessDiagram from "@/components/diagram/processDiagram.vue";
import {
  complete,
  terminate,
  history,
  getImgByProcessInstanceId,
} from "@/api/workflow";
import { getDetail } from "@/api/workflow";
import CertifiedDetail from "./CertifiedDetail.vue";
import MapDetail from "./MapDetail/index.vue";
var handler, viewer, scene, camera;
import axios from "axios";
export default {
  components: {
    CertifiedDetail,
    MapDetail,
    ProcessDiagram,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    auditInfo: {
      type: Object,
      default: undefined,
    },
    projectId: {
      type: String,
      default: "",
    },
    processInstanceId: {
      type: String,
      default: "",
    },
  },
  computed: {
    operatingStateText() {
      return "";
    },
  },
  data() {
    return {
      // 已完成节点 ID 列表
      completedNodes: ["SequenceFlow_076l5b3"],
      imageSrc: null,
      informationShow: false,
      labelPoint: [
        {
          id: 1,
          center: [106.65103792025042, 29.509932211294434],
          type: "1#二期医疗综合楼",
          height: 30,
          show: true,
        },
        {
          id: 2,
          center: [106.65103792025042, 29.509932211294434],
          type: "建筑面积:41728.85m²",
          height: 140,
          show: false,
        },
        {
          id: 3,
          center: [106.65063792025042, 29.509932211294434],
          type: "层数: 19层",
          height: 160,
          show: false,
        },
        {
          id: 4,
          center: [106.65063792025042, 29.509932211294434],
          type: "建筑高度: 67.4米",
          height: 120,
          show: false,
        },
        {
          id: 5,
          center: [106.65099708132378, 29.508175327846843],
          type: "2#感染楼",
          height: 100,
          show: true,
        },
        {
          id: 6,
          center: [106.65125199711266, 29.508790826203654],
          type: "建筑面积:2522.66m²",
          height: 60,
          show: false,
        },
        {
          id: 7,
          center: [106.65085199711266, 29.508790826203654],
          type: "层数: 2层",
          height: 80,
          show: false,
        },
        {
          id: 8,
          center: [106.65085199711266, 29.508790826203654],
          type: "建筑高度: 12米",
          height: 40,
          show: false,
        },
        {
          id: 9,
          center: [106.65035038247927, 29.50943058381159],
          type: "3#发热门诊",
          height: 5,
          coordinate: [
            106.6501782582971, 29.50973503625102, 106.65047042620289,
            29.509568146681946, 106.65018510057159, 29.50921285138085,
            106.6499305317786, 29.509361970229982, 106.6501782582971,
            29.50973503625102,
          ],
          show: true,
        },
        {
          id: 10,
          center: [106.65035038247927, 29.50943058381159],
          type: "建筑面积906.58m²",
          height: 30,
          show: false,
        },
        {
          id: 11,
          center: [106.65009038247927, 29.50943058381159],
          type: "层数: 2层",
          height: 45,
          show: false,
        },
        {
          id: 12,
          center: [106.65009038247927, 29.50943058381159],
          type: "建筑高度: 8.7米",
          height: 20,
          show: false,
        },
        {
          id: 13,
          center: [106.65100720206233, 29.51088168686425],
          type: "4#垃圾站",
          height: 20,
          show: true,
        },
        {
          id: 14,
          center: [106.65100720206233, 29.51088168686425],
          type: "建筑面积:293.04m²",
          height: 60,
          show: false,
        },
        {
          id: 15,
          center: [106.65137720206233, 29.51088168686425],
          type: "层数: 1层",
          height: 80,
          show: false,
        },
        {
          id: 16,
          center: [106.65137720206233, 29.51088168686425],
          type: "建筑高度: 3米",
          height: 40,
          show: false,
        },
      ],
      currentRow: {},
      urls: [
        "http://172.30.41.194:20035/models-rest/rest/models/preview/czzz_zxcq/tileset.json",
        // "http://172.30.41.194:20035/models-rest/rest/models/preview/czfzz_zxcq/tileset.json",
        // "http://172.30.41.194:20035/models-rest/rest/models/preview/ncdlzz_zxcq/tileset.json",
        // "http://172.30.41.194:20035/models-rest/rest/models/preview/ncjhzz_zxcq/tileset.json",
        // "http://172.30.41.194:20035/models-rest/rest/models/preview/ncfzz_zxcq/tileset.json",
        "http://172.30.41.194:20035/models-rest/rest/models/preview/gczlaq_tblt/tileset.json",
      ],
      urls1: [
        "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_1/tileset.json",
        "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_2/tileset.json",
        "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_3/tileset.json",
        "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_4/tileset.json",
      ],
      showFiles: true,
      fileUrl: "/pdf/yulan.pdf",
      hiddenRightLayout: false,
      textarea1: "",
      data: [
        {
          label: "许可证新办",
          value: "1",
          children: [
            {
              value: "1-1",
              label: "申请表",
            },
          ],
        },
      ],
      checkFile: "1-1",
      mapDetailVisible: false,
      checkTab: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      viewIndex: 0,
      typeIndex: 0,
      innerVisible: false,
      ag3DTilesLayer: null,
      tableData: [],
      informationObj: {},
      entity1: null,
    };
  },
  mounted() {
    this.getHistory();
    setTimeout(() => {
      this.initMap();
    }, 1000);
    this.getDetailModal();
  },
  methods: {
    showFlowChart() {
      this.innerVisible = true;
      getImgByProcessInstanceId(this.processInstanceId).then((res) => {
        const src = window.URL.createObjectURL(res); //这里也是关键,调用window的这个方法URL方法
        this.imageSrc = src;
      });
    },
    async getDetailModal() {
      const res = await getDetail(this.projectId);
      if (res.code === 200) {
        this.currentRow = res.data;
        console.log("this.currentRow", this.currentRow);
      }
    },
    //不予通过
    reject() {
      this.$confirm("确定不予通过么吗？", "提示", { type: "warning" }).then(
        () => {
          let params = {
            processInstanceId: this.auditInfo.processInstanceId,
            comment: this.textarea1,
            taskId: this.auditInfo.taskId,
          };
          terminate(params).then((response) => {
            if (response.code == 200) {
              this.$message.success("流程不予通过");
              this.visible = false;
            }
          });
        }
      );
    },
    //准许通过
    pass() {
      this.$confirm("确定准许通过吗？", "提示", { type: "warning" }).then(
        () => {
          let params = {
            taskId: this.auditInfo.taskId,
            processInstanceId: this.auditInfo.processInstanceId,
            comment: this.textarea1,
          };
          complete(params).then((response) => {
            if (response.code == 200) {
              this.$message.success("流程准许通过");
              this.visible = false;
            }
          });
        }
      );
    },
    //查询流程实例节点历史审批记录
    getHistory() {
      history(this.auditInfo.processInstanceId).then((response) => {
        this.tableData = response.data;
      });
    },
    flyTo(longitude, latitude, height, heading, pitch, roll) {
      camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        orientation: {
          heading: heading,
          pitch: pitch,
          roll: roll,
        },
      });
    },
    handleChangeLayout() {
      if (this.viewIndex == 0) {
        this.flyTo(
          106.65103792025042,
          29.509932211294434,
          800,
          6.283185307179586,
          -1.5707963267948966,
          0
        );
        this.viewIndex = 1;
        viewer.scene.screenSpaceCameraController.enableTilt = false;
      } else if (this.viewIndex == 1) {
        this.viewIndex = 0;
        if (this.typeIndex == 0) {
          viewer.scene.screenSpaceCameraController.enableTilt = false;
        } else {
          viewer.scene.screenSpaceCameraController.enableTilt = true;
        }
        this.flyTo(
          106.65103792025042,
          29.503932211294434,
          800,
          6.283185307179586,
          -0.7862540702665157,
          6.2831853071795365
        );
      }
    },
    handleChangeLayout1() {
      if (this.typeIndex == 0) {
        this.typeIndex = 1;
        this.addUrls();
        if (this.viewIndex == 0) {
          this.flyTo(
            106.65103792025042,
            29.503932211294434,
            800,
            6.283185307179586,
            -0.7862540702665157,
            6.2831853071795365
          );
          viewer.scene.screenSpaceCameraController.enableTilt = true;
        } else {
          this.flyTo(
            106.65103792025042,
            29.509932211294434,
            800,
            6.283185307179586,
            -1.5707963267948966,
            0
          );
          viewer.scene.screenSpaceCameraController.enableTilt = false;
        }
      } else if (this.typeIndex == 1) {
        if (this.viewIndex == 0) {
          this.flyTo(
            106.65103792025042,
            29.503932211294434,
            800,
            6.283185307179586,
            -0.7862540702665157,
            6.2831853071795365
          );
        } else {
          this.flyTo(
            106.65103792025042,
            29.509932211294434,
            800,
            6.283185307179586,
            -1.5707963267948966,
            0
          );
        }
        this.typeIndex = 0;
        this.addUrls();
        viewer.scene.screenSpaceCameraController.enableTilt = false;
      }
    },
    handleCheckLayout() {
      this.hiddenRightLayout = !this.hiddenRightLayout;
    },
    handleCheckTab(tab) {
      this.checkTab = tab;
      this.mapDetailVisible = true;
    },

    closeMapDetail() {
      console.log("====");
      this.checkTab = "";
      this.mapDetailVisible = false;
    },

    addLabel() {
      this.labelPoint.map((ele, index) => {
        if (ele.coordinate != undefined) {
          const polygonPositions = Cesium.Cartesian3.fromDegreesArray(
            ele.coordinate
          );
          this.entity1 = new Cesium.Entity({
            position: Cesium.Cartesian3.fromDegrees(
              ele.center[0],
              ele.center[1]
            ),
            polygon: {
              id: index,
              hierarchy: polygonPositions,
              material:
                ele.height == 0
                  ? Cesium.Color.fromCssColorString("#FFFFFF").withAlpha(0)
                  : Cesium.Color.fromCssColorString("#52616b").withAlpha(0.8),
              extrudedHeight: ele.height,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
          });
          this.agFeatureLayer.addEntity(this.entity1);
        }

        if (ele.show) {
          var entity = new Cesium.Entity({
            position: Cesium.Cartesian3.fromDegrees(
              ele.center[0],
              ele.center[1],
              ele.height
            ),
            label: {
              fillColor: Cesium.Color.fromAlpha(
                Cesium.Color.fromCssColorString("#000080"),
                1
              ),
              outlineColor: Cesium.Color.fromAlpha(
                Cesium.Color.fromCssColorString("#FFFFFF"),
                1
              ),
              outlineWidth: 5,
              font: "11px Lucida Console",
              showBackground: true,
              backgroundColor:
                Cesium.Color.fromCssColorString("#000000").withAlpha(0.3),
              backgroundPadding: new Cesium.Cartesian2(7, 5),
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              pixelOffset: new Cesium.Cartesian2(0, -ele.height),
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              text: ele.type,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              disableDepthTestDistance: Number.POSITIVE_INFINITY,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
          });
          this.agFeatureLayer.addEntity(entity);
        }
      });
    },
    //地图初始化事件
    async initMap() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Cesium.Ion.defaultAccessToken =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZjc0NDIzMS0zY2UzLTRlZjEtOGRmZC1hZjM3ZTFmYzFiMDkiLCJpZCI6MjM0NTAzLCJpYXQiOjE3MjM1NDk0MDN9.jHsgLhzjpRHJFvMNOj-98_9_sIYkrs079IH4a10Y-jY";
      await agcim.scene.mapInit.initMap("map_container"); //初始化地图
      // let agGeoSceneTileLayer = new agcim.layer.AgGeoSceneTileLayer({
      //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/",

      //   spatialReference: {
      //     wkid: "3857",
      //   },
      // });
      // CIM.layerTree.add(agGeoSceneTileLayer);
      // let agTerrainLayer = new agcim.layer.AgTerrainLayer({
      //   url: "http://172.30.41.194:20035/dem/ChongQingCIM_DEM",
      // });
      // CIM.layerTree.add(agTerrainLayer);
      // let options = {
      //   url: "http://172.30.41.194:20035/agserver/gwc/service/wmts", //服务链接
      //   layerTable: "dzdt_lll_fdcjyzx", //加载图层名称
      //   tileMatrixSet: "EPSG:4490", //矩阵集
      // };
      // let agWMTSLayer = new agcim.layer.AgWMTSLayer(options);
      // CIM.layerTree.add(agWMTSLayer);
      let agTerrainLayer = new agcim.layer.AgTerrainLayer({
        url: "http://172.30.41.194:20035/dem/ChongQingCIM_DEM",
      });
      CIM.layerTree.add(agTerrainLayer);
      var that = this;
      let options = {
        url: "http://172.30.41.194:20035/agserver/gwc/service/wmts", //服务链接
        layerTable: "dzdt_lll_fdcjyzx", //加载图层名称
        tileMatrixSet: "EPSG:4490_dzdt_lll_fdcjyzx", //矩阵集
      };
      let agWMTSLayer = new agcim.layer.AgWMTSLayer(options);
      CIM.layerTree.add(agWMTSLayer);
      this.addUrls();
      viewer = CIM.viewer;
      scene = viewer.scene;
      camera = scene.camera;
      viewer.scene.globe.depthTestAgainstTerrain = true;
      viewer.scene.screenSpaceCameraController.enableTilt = false; // 禁止俯仰
      this.agFeatureLayer = new agcim.layer.FeatureLayer(viewer);
      // this.addBuilding();
      // this.addBuildingPolgon();
      // this.addPology();

      let positionInfo = {
        longitude: 106.65152141047452,
        latitude: 29.505835295654723,
        height: 800,
      };
      camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          positionInfo.longitude,
          positionInfo.latitude,
          positionInfo.height
        ),
        orientation: {
          heading: 6.2831853071795365,
          pitch: -0.7862540702665157,
          roll: 6.2831853071795365,
        },
      });

      var that = this;
      let highlightHelper = new agcim.renderer.HighlightHelper();
      handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
      let _pickerHelper = new agcim.interactive.PickerHelper(viewer);
      _pickerHelper.on("LEFT_CLICK", (movement) => {
        that.informationShow = false;
        that.informationObj = {};
        let cartesian = _pickerHelper.getPickPosition(movement.position);
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var lon = Cesium.Math.toDegrees(cartographic.longitude);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        let feature = _pickerHelper.getPickObject(movement.position);
        console.log(11111, lon, lat);
        console.log(22222, feature);
        if (
          typeof feature.getProperty === "function" &&
          feature.getProperty("FID") != undefined
        ) {
          let fid = feature.getProperty("FID");
          if (fid == 76 || fid == 77 || fid == 78 || fid == 79) {
            that.informationShow = true;
            if (fid == 76) {
              that.informationObj = {
                name: "1#二期医疗综合楼",
                area: "41728.85m²",
                floor: "19层",
                height: "67.4米",
              };
            }
            if (fid == 77) {
              that.informationObj = {
                name: "2#感染楼",
                area: "2522.66m²",
                floor: "2层",
                height: "12米",
              };
            }
            if (fid == 78) {
              that.informationObj = {
                name: "3#发热门诊",
                area: "906.58m²",
                floor: "2层",
                height: "8.7米",
              };
            }
            if (fid == 79) {
              that.informationObj = {
                name: "4#垃圾站",
                area: "293.04m²",
                floor: "1层",
                height: "3米",
              };
            }
          }
        }
        if (feature && feature.tileset && feature.tileset._url) {
          that.informationShow = true;
          if (
            feature.tileset._url ==
            "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_2/tileset.json"
          ) {
            that.informationObj = {
              name: "2#感染楼",
              area: "2522.66m²",
              floor: "2层",
              height: "12米",
            };
          }
          if (
            feature.tileset._url ==
            "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_3/tileset.json"
          ) {
            that.informationObj = {
              name: "3#发热门诊",
              area: "906.58m²",
              floor: "2层",
              height: "8.7米",
            };
          }

          if (
            feature.tileset._url ==
            "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_4/tileset.json"
          ) {
            that.informationObj = {
              name: "4#垃圾站",
              area: "293.04m²",
              floor: "1层",
              height: "3米",
            };
          }
        }
        if (feature && feature.primitive && feature.primitive._url) {
          that.informationShow = true;
          if (
            feature.primitive._url ==
            "http://172.30.41.194:20035/models-rest/rest/models/preview/bim_dnyy_1/tileset.json"
          ) {
            that.informationObj = {
              name: "1#二期医疗综合楼",
              area: "41728.85m²",
              floor: "19层",
              height: "67.4米",
            };
          }
        }
      });
    },
    addUrls() {
      if (this.ag3DTilesLayer) {
        this.agFeatureLayer.removeEntity(this.entity1);
        let labelLayer = null;
        CIM.viewer.scene.primitives._primitives.map((ele) => {
          console.log("ele", ele);
          if (ele._url == undefined) {
            console.log("ele._url", ele._url);
            labelLayer = ele;
          }
        });
        this.$set(CIM.viewer.scene.primitives, "_primitives", [labelLayer]);
      }
      let optionsJsons = {
        urls: this.typeIndex == 0 ? this.urls : this.urls1,
      };
      this.ag3DTilesLayer = new agcim.layer.Ag3DTilesLayer(optionsJsons);
      CIM.layerTree.add(this.ag3DTilesLayer);
      if (this.typeIndex == 0) {
        this.ag3DTilesLayer.loadDataPromise.then(() => {
          let conditions = [];
          // conditions.push(["Number(${jzgd}) > 20 && Number(${jzgd}) <= 100", "rgb(93, 157, 185)"]);
          // tbbh
          conditions.push([
            "Number(${FID}) >= 79 && Number(${FID}) < 80",
            this.viewIndex == 2
              ? "rgba(0, 116, 186, 0)"
              : "rgba(0, 116, 186, 1)",
          ]);
          conditions.push([
            "Number(${FID}) >= 77 && Number(${FID}) < 78",
            this.viewIndex == 2
              ? "rgba(0, 116, 186, 0)"
              : "rgba(0, 116, 186, 1)",
          ]);
          conditions.push([
            "Number(${FID}) >= 76 && Number(${FID}) < 77",
            this.viewIndex == 2
              ? "rgba(0, 116, 186, 0)"
              : "rgba(0, 210, 106, 1)",
          ]);
          conditions.push([
            "Number(${FID}) >= 78 && Number(${FID}) < 79",
            this.viewIndex == 2
              ? "rgba(0, 116, 186, 0)"
              : "rgba(255, 103, 35, 0.7)",
          ]);
          conditions.push(["true", "rgba(255, 255, 255, 1)"]);
          this.ag3DTilesLayer.setStyle({
            color: {
              conditions: conditions,
            },
          });
          this.addLabel();
          let agFeatureLayer1 = new agcim.layer.FeatureLayer(CIM.viewer);
          var entity = new Cesium.Entity({
            position: Cesium.Cartesian3.fromDegrees(
              106.65152141047452,
              29.505835295654723
            ),
            billboard: {
              image: require("@/assets/images/profile.jpg"),
              heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
              pixelOffset: new Cesium.Cartesian2(0, -14),
              height: 130,
              width: 130,
            },
            properties: {
              name: "123456",
              height: 30,
            },
          });
          agFeatureLayer1.addEntity(entity);
        });
      } else {
        this.addLabel();
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex === 0) {
      //   if (rowIndex % 2 === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1,
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0,
      //     };
      //   }
      // }
    },
    closeModal() {
      this.$emit("close");
    },
    handleSubmit() {},
    handleNodeClick(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>
<style>
.examine-dialog .el-dialog__header {
  padding: 0 !important;
}
.examine-dialog .el-dialog__headerbtn .el-dialog__close {
  color: #fff !important;
}
.examine-dialog .el-dialog__body {
  padding: 0;
  width: 100%;
  height: auto !important;
  background-color: #f1f4f7;
  background-image: url(../../../../../assets/images/bg-header.png);
  background-size: 100% auto; /* 这会使背景图片覆盖整个区域，保持图片的宽高比 */
  background-position: center top; /* 图片将居中对齐，并从顶部开始 */
  background-repeat: no-repeat; /* 防止背景图像重复 */
}

.cesium-infoBox {
  display: none;
}
</style>
