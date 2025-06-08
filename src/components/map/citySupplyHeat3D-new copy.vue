<template>
  <div class="map_container">
    <div id="containCesium" class="containCesium w-[1272px]"></div>
    <!-- <div style="position: absolute; top: 10px; left: 20px">
      <el-select size="mini" v-model="value" filterable remote reserve-keyword clearable placeholder="请输入项目名称"
        :remote-method="remoteMethod" :loading="loading" @change="selectMethod">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" />
      </el-select>
    </div> -->
    <div class="note_class">
      <div class="text-[28px] font-400 ml-[18px]">项目阶段</div>
      <div class="flex ml-[18px]">
        <span class="w-[15px] h-[15px] m-[10px] bg-[#1e56a0] text-[20px] border_r"></span>
        设计
      </div>
      <div class="flex ml-[18px]">
        <span class="w-[15px] h-[15px] m-[10px] bg-[#ffc000] text-[20px] border_r"></span>
        施工
      </div>
      <div class="flex ml-[18px]">
        <span class="w-[15px] h-[15px] m-[10px] bg-[#00b050] text-[20px] border_r"></span>
        竣工
      </div>
    </div>

    <div v-if="informationShow" class="flex color-[#fff] text-[20px] py-4 px-6" style="
        position: absolute;
        top: 0;
        flex-direction: column;
        background: #0a2351;
      ">
      <div class="w-[100%]" style="text-align: center">项目信息</div>
      <div class="text-[16px]">
        <p>项目名称：<span class="color-[#f00]">中環万象城 </span></p>
        <p>统一项目编码：2019500111-47-01-153808</p>
        <p>项目立项文号：2019-500108-88-01-129201</p>
        <p>项目登记日期：2019-3-31</p>
        <p>建设用地规划许可证编号：4101052024YG0009473</p>
        <p>建设工程规划许可证编号：1305002024 (0046180)</p>
        <p>项目分类：房屋建筑工程</p>
        <p>项目地点：重庆市渝中区长江一路40号</p>
        <p>建设单位：中冶建工集团</p>
        <p>项目经理：张中华</p>
        <p>项目总面积：30.89万㎡</p>
        <p>项目总投资：94808.73万</p>
      </div>
    </div>

    <div id="popup12" v-if="informationShow">
      <div id="popup12-content" class="ol-popup12" :style="{
        borderColor:
          overlayInformation.type == 0
            ? '#1e56a0'
            : overlayInformation.type == 1
              ? '#00bbf0'
              : '#aedefc',
      }">
        <div v-if="overlayInformation.type == 0">
          <div>报审类别：建筑工程</div>
          <div>审查类别：建筑</div>
          <div>设计单位：重庆设计单位</div>
          <div>审查机构：重庆设计审图有限公司</div>
          <div>审查结果：合格</div>
          <div>合格书出具时间：2024-06-01</div>
          <div>合格书：<span>查看</span></div>
          <div>备案时间：2024-06-05</div>
          <div>备案文件：<span>查看</span></div>
        </div>
        <div v-if="overlayInformation.type == 1">
          <div>报审类别：建筑工程</div>
          <div>审查类别：建筑</div>
          <div>设计单位：重庆设计单位</div>
          <div>审查机构：重庆设计审图有限公司</div>
          <div>审查结果：合格</div>
          <div>合格书出具时间：2024-06-01</div>
          <div>合格书：<span>查看</span></div>
          <div>备案时间：2024-06-05</div>
          <div>备案文件：<span>查看</span></div>
        </div>
        <div v-if="overlayInformation.type == 2">
          <div>施工单位：劳务公司</div>
          <div>监理单位：监理公司</div>
          <div>质量报监受理部门：质安总站</div>
          <div>质量报监受理时间：2024-06-13</div>
          <div>质量报监受理意见：同意</div>
          <div>质量报监编号：</div>
          <div>质量监督报告<span>查看</span></div>
          <div>安全监督报告<span>查看</span></div>
        </div>
        <div v-if="overlayInformation.type == 3">
          <div>竣工规划核实结果：合格</div>
          <div>人防验收结果：已备案</div>
          <div>消防验收结果：合格</div>
          <div>档案专项验收结果：合格</div>
          <div>意见书出具时问：2024-12-30</div>
          <div>竣工联合验收意见书：<span>查看</span></div>
        </div>
        <div style="display: flex; margin-top: 10px">
          <button class="detailsBtn" @click="open(0)">一码贯通</button>
          <button class="detailsBtn" @click="open(1)">一图到底</button>
          <button class="detailsBtn" @click="open(2)">一台作业</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="CesiumViewer">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import bus from "../../utils/bus.js";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import { get as getProjection } from "ol/proj";
import buildingOptions from "../../assets/json/czzz.json";
import { color } from "echarts";
// 响应式数据
const loading = ref(false);
const options = ref([]);
const value = ref(null);

let viewer = ref(null);
let scene = ref(null);
let camera = ref(null);
let handler = ref(null);

let agFeatureLayer = ref(null);

// const buildingOptions = [
//   {
//     id: 1,
//     type: 0,
//     code: "110101120101000011",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.53050233255891, 29.678193356176877],
//       [106.53115622291803, 29.677701580492172],
//       [106.53125657224516, 29.677789196098686],
//       [106.5308519377089, 29.678108568264495],
//       [106.53113356368407, 29.67838272004435],
//       [106.53090049273773, 29.678580561209134],
//       [106.53050233255891, 29.678193356176877],
//     ],
//     single: 0,
//     select: 1,
//   },
//   {
//     id: 2,
//     type: 0,
//     code: "110101120101000012",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.53154044599451, 29.67807630596523],
//       [106.53133870326616, 29.67787418579335],
//       [106.53097491799274, 29.67812829141432],
//       [106.5312229614445, 29.678330410679294],
//       [106.53154044599451, 29.67807630596523],
//     ],
//     single: 0,
//     select: 0,
//   },
//   {
//     id: 3,
//     type: 0,
//     code: "110101120101000013",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.53064556199676, 29.677486558120663],
//       [106.53092292496692, 29.677762711820197],
//       [106.53048011968279, 29.678089850112638],
//       [106.53020275703817, 29.67782219265582],
//       [106.53064556199676, 29.677486558120663],
//     ],
//     single: 0,
//     select: 0,
//   },
//   {
//     id: 4,
//     type: 1,
//     code: "110101120101000014",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.52912851072128, 29.67683090130102],
//       [106.5296193892461, 29.67729648206888],
//       [106.53021243197685, 29.676763459381963],
//       [106.52974896278032, 29.676323986069622],
//       [106.52912851072128, 29.67683090130102],
//     ],
//     single: 0,
//     select: 0,
//   },
//   {
//     id: 5,
//     type: 1,
//     code: "110101120101000015",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.52885661957676, 29.676542717790507],
//       [106.5294876676804, 29.67606430601252],
//       [106.52972777436938, 29.67628469740065],
//       [106.52959540855387, 29.676373392260693],
//       [106.52953999921861, 29.676298136490868],
//       [106.52902900340193, 29.676706668257346],
//       [106.52885661957676, 29.676542717790507],
//     ],
//     single: 0,
//     select: 0,
//   },
//   {
//     id: 6,
//     type: 2,
//     code: "110101120101000015",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.53354950973333, 29.67653982196486],
//       [106.53266574234254, 29.677180467639836],
//       [106.53204565122543, 29.67653865525989],
//       [106.53288758703005, 29.675920757860432],
//       [106.53354950973333, 29.67653982196486],
//     ],
//     single: 0,
//     select: 0,
//   },
//   {
//     id: 7,
//     type: 2,
//     code: "110101120101000015",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.53236701781282, 29.67524263098058],
//       [106.53142267298863, 29.67598142625387],
//       [106.53104329017847, 29.67560663273358],
//       [106.53197126537269, 29.67488537404032],
//       [106.53210199501189, 29.674893296721468],
//       [106.53236701781282, 29.67524263098058],
//     ],
//     single: 0,
//     select: 0,
//   },
//   {
//     id: 8,
//     type: 2,
//     code: "110101120101000008",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.58212957010694, 29.559785601121746],
//       [106.58211345182372, 29.559727287819367],
//       [106.58217358027481, 29.559706304201907],
//       [106.5821192019382, 29.559543758147974],
//       [106.582213137993, 29.559530106988866],
//       [106.58226709367175, 29.559747615289243],
//       [106.58212957010694, 29.559785601121746],
//     ],
//     single: 0,
//     select: 0,
//   },
//   {
//     id: 9,
//     type: 2,
//     code: "110101120101000008",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.58272817975156, 29.5595420998078],
//       [106.58277865557923, 29.559597828761017],
//       [106.58289308862075, 29.55952407707105],
//       [106.58270389518376, 29.55931980228196],
//       [106.58263227294226, 29.55937781371527],
//       [106.58277985638746, 29.55950147199849],
//       [106.58272817975156, 29.5595420998078],
//     ],
//     single: 0,
//     select: 0,
//   },
//   {
//     id: 10,
//     type: 1,
//     code: "110101120101000008",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.58273277447653, 29.559651039337997],
//       [106.58263158849978, 29.559711785515326],
//       [106.5824970177208, 29.559751424720012],
//       [106.5824580003, 29.559664685335846],
//       [106.58256265262925, 29.55962022864425],
//       [106.58255211570668, 29.55960298770881],
//       [106.58260542769018, 29.55957772793192],
//       [106.58262983399004, 29.559608702464878],
//       [106.58268545797836, 29.55958058935831],
//       [106.58273277447653, 29.559651039337997],
//     ],
//     single: 0,
//     select: 0,
//   },
//   {
//     id: 11,
//     type: 0,
//     code: "110101120101000008",
//     originCode: "110101120101000011",
//     name: "4#住宅",
//     standardAddress: "XX市XX区XX街道XX路XX号",
//     detailAddress: "XX市XX区XX街道XX路XX号",
//     planningPermission: "1305002024 (0046180)",
//     constructionPermission: "340827202406120199",
//     acceptancePermission: "LS210900267000",
//     parcelCode: "LS210900267000",
//     unitCode: "否",
//     structureType: "钢筋混凝土结构",
//     shelter: "否",
//     acceptanceYear: "2023 年",
//     buildingStoreyAbove: "18 层",
//     buildingStoreyUnderground: "2 层",
//     buildingHeight: 200,
//     parkingSpace: "30 个",
//     undergroundParkingSpace: "120 个",
//     baseArea: "1000 平方米",
//     overallFloorage: "20000 平方米",
//     mainApplication: "住宅",
//     conservationBuilding: "否",
//     dismantle: "否",
//     specialVersion: "无特殊情况",
//     boardFile: null,
//     preliminaryDrawings: null,
//     productionDrawing: null,
//     asBuiltDrawing: null,
//     geom: [
//       [106.58257444233136, 29.559571378829617],
//       [106.58269968146656, 29.559547202443866],
//       [106.58268012982056, 29.559483060686997],
//       [106.58264973926639, 29.55948031011436],
//       [106.58260654829094, 29.55932860475497],
//       [106.58252050947652, 29.55934489153841],
//       [106.58257444233136, 29.559571378829617],
//     ],
//     single: 0,
//     select: 0,
//   },
// ];
const pointOptions = [
  {
    name: "中寰万象城",
    lon: 106.56740031737885,
    lat: 29.554045422935857,
  },
  {
    name: "商务综合中心",
    lon: 106.57703117322394,
    lat: 29.55878996062129,
  },
  {
    name: "业务综合楼",
    lon: 106.57902619232505,
    lat: 29.543068911250614,
  },
];

const pologyOption = [
  {
    id: "pol1",
    name: "重庆设计院",
    type: 0,
    geom: [
      [106.52987954345892, 29.677699604660926],
      [106.53081670225299, 29.676973921064803],
      [106.53190803873296, 29.678096326295933],
      [106.53100163232901, 29.678734783144],
      [106.52987954345892, 29.677699604660926],
    ],
    buildingHeight: 55,
  },
  {
    id: "pol2",
    name: "重庆设计院",
    type: 1,
    geom: [
      [106.52987954345892, 29.677699604660926],
      [106.53081670225299, 29.676973921064803],
      [106.52946852086497, 29.675821596850284],
      [106.52860846859511, 29.676477616023583],
      [106.52987954345892, 29.677699604660926],
    ],
    buildingHeight: 72,
  },
  {
    id: "pol3",
    name: "重庆设计院",
    type: 2,
    geom: [
      [106.53383787504772, 29.676472915125853],
      [106.53263331954044, 29.67748619895991],
      [106.530797802505, 29.675699798204594],
      [106.53216043744246, 29.674685444174326],
      [106.53383787504772, 29.676472915125853],
    ],
    buildingHeight: 72,
  },
  {
    id: "pol4",
    name: "重庆设计院",
    type: 2,
    geom: [
      [106.58202786596671, 29.55981874623758],
      [106.58197063243404, 29.55942900997039],
      [106.58227678261714, 29.559429537736705],
      [106.58235316782928, 29.559780620863588],
      [106.58202786596671, 29.55981874623758],
    ],
    buildingHeight: 90,
  },
];

let _pickerHelper = ref(null);
const informationShow = ref(false);
const overlayInformation = ref({
  type: null,
});
// 初始化地图
const initMap = async () => {
  agcim.scene.mapInit.initMap("containCesium"); // 初始化地图
  // 添加地形图层
  let agTerrainLayer = new agcim.layer.AgTerrainLayer({
    // url: "http://172.30.41.194:20035/dem/ChongQingCIM_DEM",
    url: "http://25.26.26.133:8392/dem/ChongQingCIM_DEM",
  });
  CIM.layerTree.add(agTerrainLayer);
  // 添加 WMTS 图层
  let options = {
    // url: "http://172.30.41.194:20035/agserver/gwc/service/wmts", //服务链接
    url: "http://25.26.26.42:8080/agserver/cqcim/wms", //服务链接
    layerTable: "dzdt_lll_fdcjyzx", //加载图层名称
    tileMatrixSet: "EPSG:4490_dzdt_lll_fdcjyzx", //矩阵集
  };
  let agWMTSLayer = new agcim.layer.AgWMTSLayer(options);
  CIM.layerTree.add(agWMTSLayer);

  // 添加 3D Tiles 图层
  let urls = [
    // "http://172.30.41.194:20035/models-rest/rest/models/preview/czzz_zxcq/tileset.json",
    // "http://172.30.41.194:20035/models-rest/rest/models/preview/czfzz_zxcq/tileset.json",
    // "http://172.30.41.194:20035/models-rest/rest/models/preview/ncdlzz_zxcq/tileset.json",
    // "http://172.30.41.194:20035/models-rest/rest/models/preview/ncjhzz_zxcq/tileset.json",
    // "http://172.30.41.194:20035/models-rest/rest/models/preview/ncfzz_zxcq/tileset.json",
    // "http://172.30.41.194:20035/models-rest/rest/models/preview/gczlaq_fwjztest/tileset.json",

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
  ag3DTilesLayer.loadDataPromise.then(() => {
    let conditions = [];
    // conditions.push(["Number(${jzgd}) > 20 && Number(${jzgd}) <= 100", "rgb(93, 157, 185)"]);
    // tbbh
    conditions.push(["Number(${dqzt}) <= 3", "rgb(30, 86, 160)"]);
    conditions.push([
      "Number(${dqzt}) > 3 && Number(${dqzt}) <= 5",
      "rgb(255, 192, 0)",
    ]);
    conditions.push(["Number(${dqzt}) > 5", "rgb(0, 176, 80)"]);
    conditions.push(["true", "rgb(116, 219, 239)"]);
    ag3DTilesLayer.setStyle({
      color: {
        conditions: conditions,
      },
    });
  });
  viewer = CIM.viewer;
  scene = viewer.scene;
  camera = scene.camera;
  // viewer.scene.setTerrain(
  //   new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(1))
  // );
  viewer.scene.globe.depthTestAgainstTerrain = true;
  agFeatureLayer = new agcim.layer.FeatureLayer(viewer);
  let positionInfo = {
    longitude: 106.58499130722143,
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
      roll: 6.283185307179572,
    },
  });
  addpoint();
  // addBuilding();
  // handler = new Cesium.ScrenSpeaceEventHandler(scene.canvas);
  _pickerHelper = new agcim.interactive.PickerHelper(viewer);

  _pickerHelper.on("LEFT_CLICK", (movement) => {
    console.log("movement", movement);
    informationShow.value = false;
    let cartesian = _pickerHelper.getPickPosition(movement.position);
    let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    let lon = Cesium.Math.toDegrees(cartographic.longitude);
    let lat = Cesium.Math.toDegrees(cartographic.latitude);
    let feature = _pickerHelper.getPickObject(movement.position);
    console.log("feature", feature);
    console.log("camera", camera, lon, lat);
    let properties = feature != null ? feature.id.properties : null;

    if (feature) {
      informationShow.value = true;
      console.log("properties", properties);

      overlayInformation.value.type = properties.type._value;
      setTimeout(() => {
        let divlayer = new agcim.ui.FloatInfoBox(CIM.viewer);
        // 添加信息框
        divlayer.add(
          document.getElementById("popup12"),
          Cesium.Cartesian3.fromDegrees(lon, lat, 0)
        );
      }, 1000);
    }
  });

  console.log(666666);
  // 添加建筑和多边形

  // addBuildingPolgon();
  // addPology();
};
const addpoint = () => {
  pointOptions.forEach((ele) => {
    let positions = [];
    positions.push(ele.lon, ele.lat);
    const startPosition = Cesium.Cartesian3.fromDegrees(
      positions[0],
      positions[1],
      0
    );
    // 创建一个实体表示终点
    const endPosition = Cesium.Cartesian3.fromDegrees(
      positions[0],
      positions[1],
      550
    );
    const LineEntity = new Cesium.Entity({
      polyline: {
        positions: [startPosition, endPosition], // 起点和终点
        width: 1, // 线宽
        material: Cesium.Color.CYAN, // 线的颜色
      }, // 设置经度、纬度坐标
      label: {
        text: ele.name,
        fillColor: Cesium.Color.WHITE,
        font: "bold 20px MicroSoft YaHei", //#endregion
        backgroundColor: Cesium.Color.fromCssColorString("#30c0b4"),
        showBackground: true,
        scale: 1,
      },
    });
    const pointEntity = new Cesium.Entity({
      position: Cesium.Cartesian3.fromDegrees(positions[0], positions[1], 550), // 设置经度、纬度坐标
      point: {
        pixelSize: 10, // 点的大小
        color: Cesium.Color.fromCssColorString("#1e56a0"),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
      label: {
        text: ele.name,
        fillColor: Cesium.Color.WHITE,
        font: "bold 20px MicroSoft YaHei", //#endregion
        backgroundColor: Cesium.Color.fromCssColorString("#30c0b4"),
        showBackground: true,
        scale: 1,
      },
    });
    agFeatureLayer.addEntity(LineEntity);
    agFeatureLayer.addEntity(pointEntity);
  });
};
// const addPoint = () => {
//   const polygonPositions = Cesium.Cartesian3.fromDegreesArray(positions);
//     const entity = new Cesium.Entity({
//       polygon: {
//         id: ele.tbbh,
//         name: ele.tbbh,
//         hierarchy: polygonPositions,
//         material:
//           ele.type == 0
//             ? Cesium.Color.fromCssColorString("#1e56a0")
//             : ele.type == 1
//             ? Cesium.Color.fromCssColorString("#ffc000")
//             : Cesium.Color.fromCssColorString("#00b050"),
//         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
//         extrudedHeight: ele.single == 0 ? ele.jzgd : ele.jzgd, // 设置拉伸的高度，单位为米
//       },
//       label: {
//         text: ele.name,
//         fillColor: Cesium.Color.WHITE,
//         outlineColor: Cesium.Color.BLACK,
//         outlineWidth: 13,
//         style: Cesium.LabelStyle.FILL_AND_OUTLINE,
//         font: "bold 26px MicroSoft YaHei",
//         backgroundColor: Cesium.Color.WHITE,
//         showBackground: false,
//         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
//         scale: 0.5,
//       },
//       properties: ele,
//     });
//     if (ele.name != "项目") {
//       const startPosition = Cesium.Cartesian3.fromDegrees(
//         positions[0],
//         positions[1],
//         0
//       );

//       // 创建一个实体表示终点
//       const endPosition = Cesium.Cartesian3.fromDegrees(
//         positions[0],
//         positions[1],
//         ele.jzgd + 350
//       );
//       const LineEntity = new Cesium.Entity({
//         polyline: {
//           positions: [startPosition, endPosition], // 起点和终点
//           width: 1, // 线宽
//           material: Cesium.Color.CYAN, // 线的颜色
//         }, // 设置经度、纬度坐标
//         label: {
//           text: ele.name,
//           fillColor: Cesium.Color.WHITE,
//           font: "bold 20px MicroSoft YaHei", //#endregion
//           backgroundColor: Cesium.Color.fromCssColorString("#30c0b4"),
//           showBackground: true,
//           scale: 1,
//         },
//       });
//       const pointEntity = new Cesium.Entity({
//         position: Cesium.Cartesian3.fromDegrees(
//           positions[0],
//           positions[1],
//           ele.jzgd + 350
//         ), // 设置经度、纬度坐标
//         point: {
//           pixelSize: 10, // 点的大小
//           color:
//             ele.type == 0
//               ? Cesium.Color.fromCssColorString("#1e56a0")
//               : ele.type == 1
//               ? Cesium.Color.fromCssColorString("#ffc000")
//               : Cesium.Color.fromCssColorString("#00b050"),
//           heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
//         },
//         label: {
//           text: ele.name,
//           fillColor: Cesium.Color.WHITE,
//           font: "bold 20px MicroSoft YaHei", //#endregion
//           backgroundColor: Cesium.Color.fromCssColorString("#30c0b4"),
//           showBackground: true,
//           scale: 1,
//         },
//       });
//       agFeatureLayer.addEntity(LineEntity);
//       agFeatureLayer.addEntity(pointEntity);

// }
// 添加建筑
const addBuilding = () => {
  buildingOptions.czzz.forEach((ele) => {
    let positions = [];
    ele.txxx.map((ele1) => {
      positions.push(ele1[0], ele1[1]);
    });
    console.log("positions", positions);
    const polygonPositions = Cesium.Cartesian3.fromDegreesArray(positions);
    const entity = new Cesium.Entity({
      polygon: {
        id: ele.tbbh,
        name: ele.tbbh,
        hierarchy: polygonPositions,
        material:
          ele.type == 0
            ? Cesium.Color.fromCssColorString("#1e56a0")
            : ele.type == 1
              ? Cesium.Color.fromCssColorString("#ffc000")
              : Cesium.Color.fromCssColorString("#00b050"),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        extrudedHeight: ele.single == 0 ? ele.jzgd : ele.jzgd, // 设置拉伸的高度，单位为米
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
    if (ele.name != "项目") {
      const startPosition = Cesium.Cartesian3.fromDegrees(
        positions[0],
        positions[1],
        0
      );

      // 创建一个实体表示终点
      const endPosition = Cesium.Cartesian3.fromDegrees(
        positions[0],
        positions[1],
        ele.jzgd + 350
      );
      const LineEntity = new Cesium.Entity({
        polyline: {
          positions: [startPosition, endPosition], // 起点和终点
          width: 1, // 线宽
          material: Cesium.Color.CYAN, // 线的颜色
        }, // 设置经度、纬度坐标
        label: {
          text: ele.name,
          fillColor: Cesium.Color.WHITE,
          font: "bold 20px MicroSoft YaHei", //#endregion
          backgroundColor: Cesium.Color.fromCssColorString("#30c0b4"),
          showBackground: true,
          scale: 1,
        },
      });
      const pointEntity = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(
          positions[0],
          positions[1],
          ele.jzgd + 350
        ), // 设置经度、纬度坐标
        point: {
          pixelSize: 10, // 点的大小
          color:
            ele.type == 0
              ? Cesium.Color.fromCssColorString("#1e56a0")
              : ele.type == 1
                ? Cesium.Color.fromCssColorString("#ffc000")
                : Cesium.Color.fromCssColorString("#00b050"),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        label: {
          text: ele.name,
          fillColor: Cesium.Color.WHITE,
          font: "bold 20px MicroSoft YaHei", //#endregion
          backgroundColor: Cesium.Color.fromCssColorString("#30c0b4"),
          showBackground: true,
          scale: 1,
        },
      });
      agFeatureLayer.addEntity(LineEntity);
      agFeatureLayer.addEntity(pointEntity);
    }

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

// 打开弹窗
const open = (index) => {
  console.log("打开弹窗，类型：", index);
  bus.$emit("open", index);
};
// 选择项目
const selectMethod = (item) => {
  console.log("Selected item:", item);
};

onMounted(() => {
  initMap();
});
</script>

<style scoped>
.map_container {
  width: 100%;
  height: 100%;
  position: relative;
}

.containCesium {
  width: 100%;
  height: 100%;
}

.note_class {
  /* background-image: url("../../assets/image/home/left_bottom_right_bottom.png");
  background-size: 100% 100%; */
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
  background: linear-gradient(180deg,
      rgba(76, 169, 255, 1),
      rgba(1, 120, 230, 0));
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