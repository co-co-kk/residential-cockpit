<template>
  <div
    class="w-[100%] h-[100%] flex flex-col relative box-border"
  >
    <!-- 左右地图遮罩 -->
    <div
      class="w-[calc(33.33%-50px)] h-[100%] bg-[rgba(0,0,0,0.5)] absolute z-1 left-0 top-0"
      style="background: linear-gradient(0deg, rgba(4,29,60,0.4) 0%, rgba(7,38,83,0.8) 100%);"

    ></div>
    <div
      class="w-[calc(33.33%-50px)] h-[100%] bg-[rgba(0,0,0,0.5)] absolute z-1 right-0 top-0"
      style="background: linear-gradient(0deg, rgba(4,29,60,0.1) 0%, rgba(7,38,83,0.6) 100%);"
    ></div>
    <!-- top -->
    <div
      class="w-[100%] h-[125px] top-0 z-1 absolute px-[54px] w-[calc(100%-108px)] is-top-bg"
    >
      <div class="title_container">
        <div
          class="w-[1600px] h-[100%] text-[18px] flex gap-[215px] mt-[10px]"
        >
          <el-input
            :prefix-icon="Search"
            v-model="input"
            style="width: 500px; height: 36px"
            class="text-[#fff]"
            placeholder="请输入项目名称"
          >
            <template #append>
              <el-select
                v-model="select"
                placeholder="Select"
                style="width: 115px;background: rgba(0,0,0,0.4);border:1px solid #406EA9;"
              >
                <el-option
                  label="工地"
                  value="1"
                />
                <el-option
                  label="Order No."
                  value="2"
                />
                <el-option
                  label="Tel"
                  value="3"
                />
              </el-select>
            </template>
          </el-input>
        </div>
        <div class="is-title1 mt-[5px] pl-[80px]">
          工程质量安全保障
        </div>
        <div
          class="w-[1600px] h-[100%] font-400 flex mt-[20px] justify-end text-[18px] text-[#B1EAFF]"
        >
          <div class="mr-[20px]">
            <span>
              {{ formattedDate }}
            </span>
          </div>
          <div class="flex h-[100%]">
            <img
              src="@/assets/image/home/sun.gif"
              class="w-[30px] h-[30px] mr-[10px]"
              alt=""
            />
            <span>晴</span>
            <span> 30-38℃ </span>
          </div>
        </div>
      </div>
    </div>
    <!-- left -->
    <div
      class="w-[45px] top-[15%] h-[70%] left-0 z-2 absolute is-left-bg animate-pulse"
    ></div>
    <!-- right -->
    <div
      class="w-[45px] top-[15%] h-[70%] right-0 z-2 absolute is-right-bg animate-pulse"
    ></div>
    <!-- 在建项目。。。 -->
    <div
      class="w-[1300px] h-[90px] top-[110px] z-1 absolute left-[calc(50%-650px)]"
      style="background: linear-gradient(0deg, rgba(4,29,60,0.1) 0%, rgba(7,38,83,0.6) 100%);"
    >
      <div
        class="w-[100%] h-[100%] flex justify-between"
      >
        <div
          class="rounded-[5px] w-[200px] flex items-center cursor-pointer"
          style="
            border: 4px solid
              rgba(61, 133, 207, 0.4);
          "
          v-for="(item, index) in middleOptions"
          @click="showTable(index)"
          :key="index"
        >
          <img
            :src="item.params4"
            class="mx-[10px]"
            alt=""
          />
          <div>
            <div>
              <span class="tit1">{{
                item.params2
              }}</span>
              <span
                class="tit1 ml-[10px]"
                style="font-size: 14px"
                >{{ item.params3 }}</span
              >
            </div>
            <div
              class="text-[#FFFFFF] text-[18px] font-bold mt-[5px]"
            >
              {{ item.params1 }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 区域分舱 -->
    <block>
      <div
        class="px-[20px] w-[80%] absolute top-[100px] left-[10%] z-9999"
        v-if="areaShown"
      >
        <div class="w-[100%] relative">
          <div
            class="w-[30px] h-[30px] absolute top-[50px] right-[30px] z-[9999]"
          >
            <el-icon
              color="#fff"
              class="cursor-pointer"
              @click="areaShown = false"
            >
              <Close />
            </el-icon>
          </div>
          <dv-border-box-11
            title="区域分舱"
            class=""
            style="
              width: 100%;
              background: #0e152f;
            "
          >
            <div
              class="text-[#fff] flex flex-wrap pt-[60px] pb-[50px] ml-[50px]"
            >
              <div
                class="w-[200px] h-[81px] flex justify-center items-center border-item"
                v-for="(item, index) in areaArr"
              >
                {{ item }}
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </div>
    </block>
    <!-- 地图 -->
    <div class="w-[100%] h-[100%]">
      <div
        class="w-[100%] h-[100%] bg-[rgba(0,0,0,0.4)]"
      >
        <mapCom
          v-show="currentMap == 0"
          ref="mapWms"
          style="width: 100%; height: 100%"
        ></mapCom>
        <mapCom1
          v-show="currentMap == 1"
          ref="mapWms"
          style="width: 100%; height: 100%"
          @handleEmitTuban="handleTuban"
        ></mapCom1>
      </div>
      <div
        class="absolute top-[150px] right-[1350px] z-999"
      >
        <SearchCom></SearchCom>
      </div>
    </div>
    <Dialog
      ref="dialogRef"
      :title="'在建项目列表'"
    >
      <template v-slot:content>
        <div class="flex justify-between">
          <searchFrom
            :formFields="formData"
            @formSubmitted="handleSumbit"
          />
          <div class="flex ml-[30px]">
            <span
              class="w-[80px] h-[32px] bg-[#418CFF] flex justify-center items-center rounded-[6px] text-[#fff] cursor-pointer"
              >查询</span
            >
            <span
              class="w-[80px] h-[32px] ml-[10px] bg-[#071A38] flex justify-center items-center rounded-[6px] text-[#4A93CE] cursor-pointer"
              >清空</span
            >
          </div>
        </div>
        <CustomTable
          :tableData="tableData5"
          v-loading="loading"
          :height="'480px'"
          class="mt-[10px]"
        >
          <template #empty>暂无数据</template>
          <CustomColumn
            :table-headers="tableHeaderMapper"
          >
            <template #default-b="scope">
              <!-- <a 
            href="https://fwgl.zfcxjw.cq.gov.cn:28081/dataIndicatorsForStaticData/#/project-process" 
            target="_blank" 
            style="color:rgb(77, 168, 238);"
            class="font-bold"
          >{{scope.row.b}}</a> -->
              <div
                class="cursor-pointer"
                @click="handleFlowShown"
              >
                {{ scope.row.b }}
              </div>
            </template>

            <template #default-options="scope">
              <div>
                <span
                  class="is-span"
                  @click="
                    handleEditGuige(scope.row)
                  "
                >
                  编辑</span
                >
                <span
                  class="is-span"
                  @click="
                    handleDeleteGuige(scope.row)
                  "
                >
                  删除</span
                >
              </div>
            </template>
          </CustomColumn>
        </CustomTable>
      </template>
    </Dialog>
    <Dialog
      ref="dialogRef2"
      :title="'项目信息'"
      :width="'1500'"
    >
      <template v-slot:content>
        <div
          class="text-[#CCE8FF] text-[30px] overflow-hidden"
        >
          <div
            class="w-[100%] h-[800px] mt-[20px]"
            v-if="dialogRef2.diaShown"
          >
            <TuBan></TuBan>
          </div>
          <!-- <div class="w-[200px] h-[200px] bg-[red] absolute top-[50%] z-99 left-[50%]"></div> -->
        </div>
      </template>
    </Dialog>
    <Dialog
      ref="dialogRef3"
      :title="'中环万象城'"
      :width="'2000'"
    >
      <template v-slot:content>
        <div
          class="text-[#CCE8FF] text-[30px] overflow-auto relative"
        >
          <div
            class="w-[100%] h-[900px] mt-[20px]"
          >
            <Jump></Jump>
          </div>
        </div>
      </template>
    </Dialog>
    <!-- bottom -->
    <div
      class="w-[1900px] bottom-0 h-[76px] z-11 right-[calc(50%-950px)] absolute is-bottom-bg animate-pulse"
    ></div>
    <!-- 底部 -->
    <div
      class="w-[920px] h-[500px] absolute bottom-0 z-10 left-[calc(50%-460px)]"
    >
      <div class="is-zhibiao">
        <div
          class="text-[#fff] h-[60px] pl-[50px] pt-[10px] box-border is-tit5"
        >
          指标达成情况
        </div>
        <div class="flex justify-around w-[100%]">
          <!-- 1 -->
          <div
            class="w-[23.75%] mt-[20px] flex flex-col justify-center items-center"
          >
            <div class="h-[100px] w-[100%]">
              <EcharsWrapper
                :chartData="echarsOptions1"
              ></EcharsWrapper>
            </div>
            <span class="tit-2"
              >质量安全事故下降率</span
            >
          </div>
          <!-- 2 -->
          <div
            class="w-[23.75%] mt-[20px] flex flex-col justify-center items-center"
          >
            <div class="h-[100px] w-[100%]">
              <EcharsWrapper
                :chartData="echarsOptions2"
              ></EcharsWrapper>
            </div>
            <span class="tit-2"
              >强条审查合格率</span
            >
          </div>
          <!-- 3 -->
          <div
            class="w-[23.75%] mt-[20px] flex flex-col justify-center items-center"
          >
            <div class="h-[100px] w-[100%]">
              <EcharsWrapper
                :chartData="echarsOptions3"
              ></EcharsWrapper>
            </div>
            <span class="tit-2">隐患整改率</span>
          </div>
          <!-- 4 -->
          <div
            class="w-[23.75%] mt-[20px] flex flex-col justify-center items-center"
          >
            <div class="h-[100px] w-[100%]">
              <EcharsWrapper
                :chartData="echarsOptions4"
              ></EcharsWrapper>
            </div>
            <span class="tit-2">设备在线率</span>
          </div>
        </div>
        <div
          class="flex justify-around mt-[30px] px-[10px]"
        >
          <div
            class="flex flex-col justify-center items-center is-dashed"
          >
            <span
              class="text-[#FFFFFF] text-[16px]"
              >2024年事故率</span
            >
            <p class="is-tit3">
              260
              <span class="text-[14px]">人</span>
            </p>
          </div>
          <div
            class="flex flex-col justify-center items-center ml-[18px]"
          >
            <span
              class="text-[#FFFFFF] text-[16px]"
              >2025年事故率</span
            >
            <p class="is-tit4">
              260
              <span class="text-[14px]">人</span>
            </p>
          </div>
          <div
            class="flex flex-col justify-center items-center is-dashed ml-[30PX]"
          >
            <span
              class="text-[#FFFFFF] text-[16px]"
              >条文总数</span
            >
            <p class="is-tit3">
              542
              <span class="text-[14px]">家</span>
            </p>
          </div>
          <div
            class="flex flex-col justify-center items-center ml-[18px]"
          >
            <span
              class="text-[#FFFFFF] text-[16px]"
              >合格数</span
            >
            <p class="is-tit4">
              1226
              <span class="text-[14px]">家</span>
            </p>
          </div>
          <div
            class="flex flex-col justify-center items-center is-dashed ml-[30PX]"
          >
            <span
              class="text-[#FFFFFF] text-[16px]"
              >立即整改</span
            >
            <p class="is-tit3">
              1260
              <span class="text-[14px]">个</span>
            </p>
          </div>
          <div
            class="flex flex-col justify-center items-center ml-[18px]"
          >
            <span
              class="text-[#FFFFFF] text-[16px]"
              >限期整改</span
            >
            <p class="is-tit4">
              236
              <span class="text-[14px]">个</span>
            </p>
          </div>
          <div
            class="flex flex-col justify-center items-center is-dashed ml-[30PX]"
          >
            <span
              class="text-[#FFFFFF] text-[16px]"
              >报警项目</span
            >
            <p class="is-tit3">
              260
              <span class="text-[14px]">人</span>
            </p>
          </div>
          <div
            class="flex flex-col justify-center items-center ml-[18px]"
          >
            <span
              class="text-[#FFFFFF] text-[16px]"
              >报警数</span
            >
            <p class="is-tit4">
              236
              <span class="text-[14px]">人</span>
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center items-end pb-[20px] pt-[10px]"
      >
       <div class="flex flex-col items-center">
        <img
          src="@/assets/rou/fangzi.png"
          class="w-[65px] cursor-pointer h-[65px] mx-[30px]"
          alt=""
        />
        <div class="text-[16px] text-[#fff] mt-[10px]">住建一张图</div>
       </div>
       <div class="flex flex-col items-center">
        <img
          src="@/assets/rou/guanzhu-act.png"
          class="w-[94px] h-[92px] cursor-pointer"
          alt=""
        />
        <div class="text-[16px] text-[#fff] mt-[10px]">今日关注</div>
       </div>
       <div class="flex flex-col items-center">
        <img
          src="@/assets/rou/xianshang.png"
          class="w-[65px] h-[65px] mx-[30px] cursor-pointer"
          alt=""
        />
        <div class="text-[16px] text-[#fff] mt-[10px]">线上指挥部</div>
       </div>
       
      </div>
    </div>
    <!-- <div class="w-[1700px] h-[870px]  z-99 absolute top-[calc(50%-435px)] left-[calc(50%-850px)]">
      <video src="@/assets/sp.mp4" style="width: 100%; height: 100%;" controls autoplay muted></video>
    </div> -->
   

  </div>
</template>
<script setup>
import Dialog from "../../../../components/Dialog.vue";
import CustomColumn from "@/components/custom-column/index.vue";
import CustomTable from "@/components/custom-table/index.vue";
import searchFrom from "../../../../components/DiaForm.vue";
import {
  formData,
  tableHeaderMapper,
} from "./index";
import { useRouter } from "vue-router";

import TuBan from "../../../jump/TuBan.vue";
import Jump from "../../../jump/index.vue";
import { Search } from "@element-plus/icons-vue";
import {
  echarsOptions1,
  echarsOptions2,
  echarsOptions3,
  echarsOptions4,
} from "./echarsOptions.js";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";

import {
  ref,
  reactive,
  toRefs,
  onMounted,
  onBeforeUnmount,
  nextTick,
  computed,
} from "vue";

import bus from "../../../../utils/bus";
import mapCom from "../../../../components/map/homeMap.vue";
import mapCom1 from "../../../../components/map/citySupplyHeat3D-new.vue";
// import mapCom1 from "../../../../components/map/Bim.vue";
import pictureComponents from "./picture.vue";
import work from "./work.vue";
import SearchCom from "./components/Search.vue";
import { Close } from "@element-plus/icons-vue";

const input=ref('')
const select=ref('')
const flowShown=ref(false)
const currentMap = ref(1);
onMounted(() => {
  // handleTuban()
});
const dialogRef2 = ref(null);
const handleTuban = () => {
  dialogRef2.value.diaShown = true; 
};
const handleSumbit = (e) => {
  console.log(e);
};
const flowDiaRef=ref()
const router = useRouter();
const changeStatus = ref(1);

const dialogRef3 = ref();
const botTabList = [
  "质安一张图",
  "今日关注",
  "线上指挥部",
];
const emit=defineEmits(['emitHandleJump'])
const handleFlowShown = () => {
  // flowDiaRef.value.handleOpenFlow()
  // dialogRef3.value.diaShown = true;
  router.push({
    path: "/projectDetail",
  });
};

const dialogRef = ref();
const botShown = ref(true);
const diaProjectRef = ref();
const diaEnterpriseRef = ref();
const areaShown = ref(false);
const tableData = ref([
  {
    goodsName: "张三",
    age: 18,
    address: "北京市海淀区",
  },
  {
    goodsName: "李四",
    age: 20,
    address: "北京市海淀区",
  },
  {
    goodsName: "李四",
    age: 20,
    address: "北京市海淀区",
  },
  {
    goodsName: "李四",
    age: 20,
    address: "北京市海淀区",
  },
  {
    goodsName: "李四",
    age: 20,
    address: "北京市海淀区",
  },
  {
    goodsName: "李四",
    age: 20,
    address: "北京市海淀区",
  },
  {
    goodsName: "李四",
    age: 20,
    address: "北京市海淀区",
  },
]);
const tableData5 = ref([
  {
    a: "1",
    b: "东南医院二期项目",
    c: "房建",
    d: "重庆市南岸区茶园新城区通江大道98号",
    e: "重庆市南岸区",
    f: "重庆怡润华成房地产开发有限公司",
    g: "中建八局第四建设有限公司",
  },
  {
    a: "2",
    b: "重庆中医药学院二期北区学生宿舍建设项目",
    c: "房建",
    d: "重庆市璧山区黛山大道以东、璧南河以西，中医药",
    e: "璧山区",
    f: "重庆中医药学院",
    g: "北京住总第三开发建设有限公司",
  },
  {
    a: "3",
    b: "城口县葛城街道北门路捌号危房改造项目",
    c: "房建",
    d: "城口县葛城街道",
    e: "城口县",
    f: "重庆巴山原乡商业运营管理有限公司",
    g: "重庆渝秀建设工程有限公司",
  },
  {
    a: "4",
    b: "昕晖中航·璟昱二期11#、12#楼及部分地下车库",
    c: "房建",
    d: "荣昌区昌州街道2021-RC-1-15号地块",
    e: "荣昌区",
    f: "重庆昕航荣昇房地产开发有限公司",
    g: "重庆市洪春建筑工程有限公司",
  },
  {
    a: "5",
    b: "潮江机械制造项目",
    c: "房建",
    d: "重庆大足高新技术产业开发区",
    e: "大足区",
    f: "重庆朝之江机械制造有限公司",
    g: "百存建设（重庆）有限公司",
  },
  {
    a: "6",
    b: "重庆颢晨机械有限公司厂区研发楼项目",
    c: "房建",
    d: "重庆市铜梁区工业园区铁佛路6号",
    e: "铜梁区",
    f: "重庆颢晨机械有限公司",
    g: "重庆茂速建设工程有限公司",
  },
  {
    a: "7",
    b: "巫山望霞体育公园建设项目",
    c: "市政",
    d: "巫山县高塘街道望霞路452号",
    e: "巫山县",
    f: "巫山县投资有限公司",
    g: "重庆市巫山县农兴建设工程有限公司",
  },
  {
    a: "8",
    b: "重庆医药进口分销物流综合基地项目（二期）(分",
    c: "房建",
    d: "沙坪坝区-沙坪坝西永组团G标准分区G08-01/05地",
    e: "沙坪坝区",
    f: "重庆医药（集团）股份有限公司",
    g: "重庆建工市政交通工程有限责任公司",
  },
  {
    a: "9",
    b: "重庆市三峡库区森林火灾应急能力建设项目 (万",
    c: "房建",
    d: "重庆市万州区天城街道小湾社区",
    e: "万州区",
    f: "重庆市万州区应急管理局",
    g: "重庆市万州建筑工程集团有限公司",
  },
  {
    a: "10",
    b: "江北嘴B01地块项目-4#楼（万怡酒店）室内装饰",
    c: "房建",
    d: "重庆市江北区北城街道北滨二路中建二局项目部",
    e: "两江新区",
    f: "重庆市江北嘴置业有限公司",
    g: "中建八局装饰工程有限公司",
  },
  {
    a: "11",
    b: "万盛邮件处理及仓配 (快递服务) 中心",
    c: "房建",
    d: "重庆市綦江区万东镇五里村",
    e: "万盛经开区",
    f: "中国邮政集团有限公司重庆市万",
    g: "广东电白二建集团有限公司",
  },
  {
    a: "12",
    b: "重庆轻工职业学院璧山校区建设项目一期 (1#楼",
    c: "房建",
    d: "重庆市璧山区来凤街道林家岩水库旁地块",
    e: "璧山区",
    f: "重庆轻工职业学院",
    g: "重庆沂矾建筑工程有限公司",
  },
  {
    a: "13",
    b: "两江新区A67-4地块高中项目",
    c: "房建",
    d: "重庆两江新区礼嘉镇街道",
    e: "两江新区",
    f: "重庆市礼嘉中学校",
    g: "中冶建工集团有限公司",
  },
  {
    a: "14",
    b: "重庆市南开中学校科创楼新建工程",
    c: "房建",
    d: "沙坪坝区沙南街1号",
    e: "沙坪坝区",
    f: "重庆市南开中学校",
    g: "广东新可宇建设集团有限公司",
  },
  {
    a: "15",
    b: "两江科技工业产业园",
    c: "房建",
    d: "重庆渝北区两路组团G标准分区G59、G61地块",
    e: "渝北区",
    f: "两江国际控股股份有限公司",
    g: "重庆黄金建设 (集团) 有限公司",
  },
  {
    a: "16",
    b: "年产输送机1800台(套)制造项目(1#厂房)",
    c: "房建",
    d: "重庆市万州区经济技术开发区高峰园万利地块",
    e: "万州区",
    f: "重庆博奕机械设备有限公司",
    g: "重庆亚昌建筑工程有限公司",
  },
  {
    a: "17",
    b: "重庆市巴南中学校塑胶运动场排危改造工程",
    c: "房建",
    d: "巴南区龙洲大道2346号",
    e: "巴南区",
    f: "重庆市巴南中学校",
    g: "重庆金沁水电安装工程有限公司",
  },
  {
    a: "18",
    b: "李市小学B区综合楼工程",
    c: "房建",
    d: "江津区李市镇迎龙路145号",
    e: "江津区",
    f: "重庆市江津区李市小学校",
    g: "重庆春越建设工程有限公司",
  },
  {
    a: "19",
    b: "江北区石子山体育公园 (一期) 改造提升工程",
    c: "房建",
    d: "江北区石马河",
    e: "江北区",
    f: "重庆市江北区国有资本投资运营",
    g: "重庆林沃建设工程有限公司",
  },
  {
    a: "20",
    b: "渝北区人和组团N分区N19-2-4地块二批次项目",
    c: "房建",
    d: "渝北区人和组团N分区N19-2-4地块二批次项目",
    e: "渝北区",
    f: "重庆蜀裕房地产开发有限公司",
    g: "重庆先锋建筑工程有限公司",
  },
  {
    a: "21",
    b: "江北区大石坝组团I分区I6-1-1/03地块精装修工程",
    c: "房建",
    d: "江北区大石坝组团I分区I6-1-1/03地块",
    e: "江北区",
    f: "重庆信扬置业有限公司",
    g: "金梭装饰设计工程有限公司",
  },
  {
    a: "22",
    b: "重庆市垫江第一中学校高中部学生宿舍改建工程",
    c: "房建",
    d: "垫江县桂溪街道桂溪大道北段255号",
    e: "垫江县",
    f: "重庆市垫江第一中学校",
    g: "重庆阿泽柯建筑工程有限公司",
  },
  {
    a: "23",
    b: "巫山县哨路加油站",
    c: "房建",
    d: "巫山县曲尺乡哨路村1组70号",
    e: "巫山县",
    f: "巫山民生石油化工有限公司",
    g: "重庆炬垅建筑工程有限公司",
  },
  {
    a: "24",
    b: "忠县苏家污水处理厂中水回用工程",
    c: "市政",
    d: "忠县县城沿江路苏家段滨江公园",
    e: "忠县",
    f: "忠县蓝天环境有限公司",
    g: "重庆市富博建筑工程有限责任公司",
  },
  {
    a: "25",
    b: "万盛经开区南桐镇温塘片区生态环境系统整治项",
    c: "市政",
    d: "重庆市万盛经开区南桐镇",
    e: "万盛经开区",
    f: "重庆市万盛经开区水务开发建设",
    g: "重庆市万盛区顺达公路开发有限责",
  },
  {
    a: "26",
    b: "星城原麓项目三期一标段 (20#-22#楼及对应地",
    c: "房建",
    d: "璧山区黛山大道东段",
    e: "璧山区",
    f: "重庆盛越鑫融房地产开发有限公",
    g: "重庆先锋建筑工程有限公司",
  },
  {
    a: "27",
    b: "年拆解10万辆报废汽车和年处理15万吨退役锂电",
    c: "房建",
    d: "重庆市大足区邮亭工业园华福路2号",
    e: "双桥经开区",
    f: "重庆环锂循环科技有限公司",
    g: "中建一局集团第二建筑有限公司",
  },
  {
    a: "28",
    b: "重庆市江津区白沙镇槽坊社区 龙江巷片区老旧小",
    c: "房建",
    d: "白沙镇",
    e: "江津区",
    f: "重庆市江津区白沙镇人民政府",
    g: "重庆山渝建筑工程有限公司",
  },
  {
    a: "29",
    b: "重庆市江津区白沙镇麻柳塆社区滨江中路片区老",
    c: "房建",
    d: "白沙镇",
    e: "江津区",
    f: "重庆市江津区白沙镇人民政府",
    g: "重庆市聚友建设工程有限公司",
  },
  {
    a: "30",
    b: "荣峰河片区(阮家庙至峰高段)雨污水管网维修改",
    c: "市政",
    d: "荣昌区东湖东路沿线",
    e: "荣昌区",
    f: "重庆兴荣新成工程建设管理有限",
    g: "重庆滨隆建筑工程有限公司",
  },
]);
const isActive = ref(0);
const currentAct = ref(0);
const handleChoose = (index) => {
  console.log(
    "🚀 ~ handleChoose ~ index:",
    index
  );

  if (index == 3) {
    changeStatus.value = 2;
    currentMap.value = 0;
    currentAct.value = index;
  } else if (index == 2) {
    return;
  } else {
    currentAct.value = index;
    currentMap.value = index;
  }
};
const handleChangeType = (index) => {
  if (index == 2) {
    return;
  } else {
    changeStatus.value = 1;
    currentMap.value = 1;
    isActive.value = 0;
    currentAct.value = index;
  }
};
import ItemImg1 from "@/assets/image/home/zaijian.png";
import ItemImg2 from "@/assets/image/home/canjian.png";
import ItemImg3 from "@/assets/image/home/congye.png";
import ItemImg4 from "@/assets/image/home/ganzhi.png";
import ItemImg5 from "@/assets/image/home/hetong.png";
import ItemImg6 from "@/assets/image/home/quxian.png";
import { useNow } from "@vueuse/core";

const data = reactive({
  middleOptions: [
    {
      params1: "在建项目",
      params2: "2598",
      params3: "个",
      params4: ItemImg1,
    },
    {
      params1: "参建单位",
      params2: "43768",
      params3: "家",
      params4: ItemImg2,
    },
    {
      params1: "从业人员",
      params2: "296181",
      params3: "人",
      params4: ItemImg3,
    },
    {
      params1: "感知设备",
      params2: "6516",
      params3: "台",
      params4: ItemImg4,
    },
    {
      params1: "合同履约",
      params2: "2.06",
      params3: "千亿元",
      params4: ItemImg5,
    },
    {
      params1: "区县分舱",
      params2: "41",
      params3: "个",
      params4: ItemImg6,
    },
  ],
  areaArr: [
    "渝中区",
    "大渡口区",
    "江北区",
    "沙坪坝取",
    "九龙坡区",
    "南岸区",
    "北碚区",
    "渝北区",
    "巴南区",
    "两江新区",
    "高新区",
    "江津区",
    "合川区",
    "永川区",
    "大足区",
    "璧山区",
    "铜梁区",
    "潼南区",
    "荣昌区",
    "涪陵区",
    "长寿区",
    "南川区",
    "綦江区",
    "万盛经开区",
    "黔江区",
    "武隆区",
    "石柱县",
    "秀山县",
    "酉阳县",
    "彭水县",
    "万州区",
    "开州区",
    "梁平区",
    "城口县",
    "丰都县",
    "垫江县",
    "忠县",
    "云阳县",
    "奉节县",
    "巫山县",
    "巫溪县",
  ],
  bottomChangeList: [
    "质安一张图",
    "今日关注",
    "线上指挥部",
  ],
});

const {
  middleOptions,
  areaArr,
  bottomChangeList,
} = toRefs(data);
const showTable = (index) => {
  console.log("🚀 ~ showTable ~ index:", index);
  switch (index) {
    case 0:
      dialogRef.value.diaShown = true;

      // diaProjectRef.value.handleShown();
      break;
    case 1:
      console.log("视频")
      diaEnterpriseRef.value.handleShown();
      break;
    case 7:
      areaShown.value = true;
      break;

    default:
      break;
  }
};
const handleEmitClick = (type) => {
  if (type == 1) {
    botShown.value = false;
  } else {
    botShown.value = true;
  }
};

const changeMap = (index) => {
  currentMap.value = index;
  changeStatus.value = index;
};
const now = useNow();
// 格式化日期的函数
const formatDate = (date) => {
  const pad = (num) =>
    String(num).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 月份从 0 开始8860
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 使用计算属性
const formattedDate = computed(() => {
  return formatDate(now.value);
});
</script>
<style lang="scss" scoped>
.second_level {
  font-size: 18px;
  color: #c9ecff;
  font-weight: bold;
  padding: 0 10px;
  text-align: center;
}

.number_level1 {
  font-size: 25px;
  color: #ffffff;
  font-weight: bold;
  padding: 0 2px;
  text-align: center;
}

.unit_level {
  font-size: 12px;
  color: #c9ecff;
}

:deep(.el-form-item__label) {
  color: #fff;
  font-size: 14px;
}

:deep(.el-select__wrapper) {
  background-color: transparent;
  border: 1px solid #0a6683;
  box-shadow: none;
}

:deep(.el-input__wrapper) {
  background-color: transparent;
  border: 1px solid #0a6683;
  box-shadow: none;
}
:deep(.el-form-item) {
  margin-right: 10px;
}

.border-item {
  border-bottom: 1px solid rgb(1, 159, 210);
  border-right: 1px solid rgb(1, 159, 210);
}

.border-item:nth-child(6n) {
  border-right: none;
}

.border-item:nth-child(37) {
  border-bottom: none;
}

.border-item:nth-child(38) {
  border-bottom: none;
}

.border-item:nth-child(39) {
  border-bottom: none;
}

.border-item:nth-child(40) {
  border-bottom: none;
}

.border-item:nth-child(41) {
  border-bottom: none;
}

.tuceng_button {
  margin: 10px;
  background-color: #1e386b;
  border: none;
  color: #ffffff;
  font-size: 1.4rem;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.tuceng_button:hover {
  background-color: #215aa6;
}

.tuceng_button1 {
  margin: 10px;
  background-color: #215aa6;
  border: none;
  color: #ffffff;
  font-size: 1.4rem;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.tuceng_button1:hover {
  background-color: #1e386b;
}

.linear_gradient {
  height: 100%;
  width: 100%;
  z-index: 1000;
  overflow-x: auto;
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    #000000 20%,
    #000000 90%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.is-top {
  background: url("@/assets/image/public/is_top.png")
    no-repeat center center;
  background-size: 100% 100%;
}

.is-map {
  background: url("@/assets/image/public/is_map.png")
    no-repeat center center;
  background-size: 100% 100%;
}

.is-bottom-bg1 {
  background: url("@/assets/image/home/bt-bg.png")
    no-repeat center center;
  background-size: 100% 100%;
}

.is-change1 {
  position: relative;
}

/* 仅为第一个和第二个元素添加伪元素 */
.is-change1:nth-child(1)::after,
.is-change1:nth-child(2)::after {
  position: absolute;
  display: block;
  content: "";
  width: 1px;
  height: 36px;
  background: #1ca2ff;
  /* 伪元素背景色 */
  right: 0;
  top: calc(50% - 18px);
}

.isAct {
  color: #ffffff;
}
p {
  padding: 0;
  margin: 5px 0;
}

.is-con-box {
  background-size: 100% 100%;
  background: url("@/assets/rou/bg.png") no-repeat
    center center;
}

.title_container {
  // text-align: center;
  font-size: 60px;
  // width: 100%;
  display: flex;
  // justify-content: center;
  // justify-content: space-between;
  // align-items: center;
  height: 90px;
  font-weight: 800;
  background: linear-gradient(
    to top,
    #adbecc,
    #ffffff
  );
  -webkit-background-clip: text;
  color: transparent;
}
.tit1 {
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 24px;
  color: #17b99a;
  background: linear-gradient(
    0deg,
    #eefdff 0%,
    #6bffac 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.is-zhibiao {
  width: 920px;
  height: 326px;
  background: url("@/assets/rou/bot-con-bg.png")
    no-repeat center center;
}

.is-title1 {
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 48px;
  color: #ffffff;
  text-shadow: 0px 5px 6px rgba(17, 20, 22, 0.28);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.35) 1.4892578125%,
    rgba(139, 225, 255, 0.35) 34.7412109375%,
    rgba(255, 255, 255, 0.35) 55.0048828125%,
    rgba(139, 225, 255, 0.35) 67.7001953125%,
    rgba(255, 255, 255, 0.35) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
p {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.tit-2 {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: linear-gradient(
    0deg,
    #6bb6ed 0%,
    #ffffff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-radius: 14px;
  border: 2px solid rgba(174, 210, 255, 0.4);
  padding: 7px 4px;
}
.is-tit3 {
  font-family: Source Han Sans CN;
  font-weight: 600;
  font-size: 23px;
  margin-top: 5px;
  color: #69fbaa;
  background: linear-gradient(
    0deg,
    rgba(105, 251, 170, 0.8) 0%,
    #ffffff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.is-tit4 {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 23px;
  margin-top: 5px;
  color: #ffd35e;
  background: linear-gradient(
    0deg,
    rgba(255, 191, 91, 0.8) 0%,
    #ffffff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.is-tit5 {
  font-weight: 400;
  font-size: 22px;
  color: #ffffff;
  background: linear-gradient(
    0deg,
    #79c5ff 0%,
    #ffffff 59.8388671875%,
    #ffffff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.is-dashed {
  border-right: 1px dashed #42a4ff;
  padding-right: 18px;
}

.is-top-bg {
  background: url("@/assets/rou/top-bg.png")
    no-repeat center center;
  background-size: 100% 100%;
}

.is-left-bg {
  background: url("@/assets/rou/left-bg.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.is-right-bg {
  background: url("@/assets/rou/right-bg.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.is-bottom-bg {
  background: url("@/assets/rou/bottom-bg.png")
    no-repeat center center;
  background-size: 100% 100%;
}


</style>
