<template>
  <div
    class="w-[100%] h-[100%] relative mt-[25px]"
  >
    <!-- 项目情况 -->
    <div class="flex">
      <block
        class="w-[555px] h-[100%] text-[50px] text-[#fff] pr-[39px]"
      >
        <PubTit
          :title="'项目情况'"
          :width="555"
        ></PubTit>
        <div
          class="flex items-center pt-[20px] px-[30px] box-border"
        >
          <div class="flex">
            <div
              class="flex flex-col text-[18px]"
            >
              <div
                class="leading-[50px] w-[360px] flex items-center"
              >
                <span class="text-[#6BB6ED]"
                  >安全施工</span
                >
                <div
                  class="pl-[18px] flex items-center gap-[5px]"
                >
                  <div
                    class="number-bg w-[30px] h-[40px] flex items-center justify-center"
                  >
                    4
                  </div>
                  <div
                    class="number-bg w-[30px] h-[40px] flex items-center justify-center"
                  >
                    7
                  </div>
                  <div
                    class="number-bg w-[30px] h-[40px] flex items-center justify-center"
                  >
                    3
                  </div>
                  <span class="pl-[13px]"
                    >天</span
                  >
                </div>
              </div>
              <div
                class="leading-[50px] w-[360px]"
              >
                <span class="text-[#6BB6ED]"
                  >项目名称：</span
                >
                <span
                  >重庆市东南医院二期建设项目</span
                >
              </div>
              <div class="leading-[50px]">
                <span class="text-[#6BB6ED]"
                  >统一项目编码：</span
                >
                <span class=""
                  >2104-500108-04-01-439202</span
                >
              </div>
              <div class="leading-[50px]">
                <span class="text-[#6BB6ED]"
                  >建设单位：</span
                >
                <span>重庆市东南医院</span>
              </div>
              <div class="leading-[50px]">
                <span class="text-[#6BB6ED]"
                  >项目地点：</span
                >
                <span>重庆市南岸区通江大道 </span>
              </div>
              <div class="leading-[50px]">
                <span class="text-[#6BB6ED]"
                  >项目总面积：</span
                >
                <span>72077平方米</span>
              </div>
              <div
                class="leading-[50px] line-[50px]"
              >
                <span class="text-[#6BB6ED]"
                  >项目总投资：</span
                >
                <span>64557万元</span>
              </div>
              <div
                class="leading-[50px] line-[50px]"
              >
                <span class="text-[#6BB6ED]"
                  >工程类型：</span
                >
                <span>设计牵头的EPC试点工程</span>
              </div>
              <div
                class="leading-[50px] line-[50px] flex items-center"
              >
                <span class="text-[#6BB6ED]"
                  >是否为“低价项目”：</span
                >
                <p class="flex items-center">
                  否 ( 常规监管:
                  <span
                    class="w-[30px] h-[30px] rounded-full bg-[#53B325] mx-[15px] block"
                  ></span>
                  )
                </p>
              </div>
            </div>
            <div class="">
              <img
                src="@/assets/images/staffPng/diagram.png"
                draggable="false"
                class="cursor-pointer"
                @click="diaShown = true"
                alt=""
              />
              <img
                src="@/assets/images/staffPng/groupm.png"
                draggable="false"
                alt=""
              />
              <div
                class="text-[28px] text-center"
              >
                三星工地
              </div>
              <div class="text-center">
                <img
                  src="@/assets/images/staffPng/fiveStars.png"
                  draggable="false"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </block>
      <block
        class="w-[555px] h-[100%] text-[18px] text-[#fff]"
      >
        <PubTit
          :title="'参建单位'"
          :width="555"
        ></PubTit>
        <div class="mt-[18px]">
          <div
            class="flex mb-[17px]"
            v-for="(ite, ind) in unitsData"
            :key="ind"
          >
            <div class="flex">
              <div
                class="w-[3px] bg-[#1F82F5]"
              ></div>
              <div
                class="ml-[4px] pl-[7px] bg-[#07284D] text-[#6BB6ED] w-[170px] h-full flex items-center"
              >
                {{ ite.name }}
              </div>
            </div>
            
            <div
              class="flex flex-1 ml-[4px] pl-[14px] items-center bg-[#07284D]"
              @click="handleDia(ite)"
            >
              <div
                class="pr-[12px] triangle"
              ></div>
              <div
                class="flex-1 flex items-center text-[#6BB6ED]"
              >
                <div
                  class="w-[255px] flex py-[12px]"
                  v-if="ite.name!='总承包单位'"
                >
                  {{ ite.label }}
                </div>
                <div
                  class="w-[255px] flex flex-col py-[12px]"
                  v-else
                >
                <span>重庆市设计院有限公司</span>
                <span>中建八局第四建设有限公司联合</span>
                </div>
              </div>
              
              <div
                class="flex"
                v-if="ite.name == '监管部门'"
              >
                <el-popover
                  class="box-item"
                  title=""
                  content="数字化工地"
                  placement="top-start"
                >
                  <template #reference>
                    <img
                      src="@/assets/xulei/icon5.png"
                      class="mr-[5px]"
                      alt=""
                    />
                  </template>
                </el-popover>
                <el-popover
                  class="box-item"
                  title=""
                  content="信用重庆"
                  placement="top-start"
                >
                  <template #reference>
                    <img
                      src="@/assets/xulei/icon6.png"
                      class="mr-[20px]"
                      alt=""
                    />
                  </template>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </block>
      <!-- 左弹窗 -->
      <div
        class="w-[1200px] pt-[50px] box-border h-[1080px] is-left-dialog absolute top-[-100px] left-[-50px] z-99"
        v-if="diaShown"
      >
        <div class="relative">
          <img
            src="@/assets/rou/guanbi.png"
            class="absolute right-[100px] top-[20px] cursor-pointer z-[99]"
            @click="diaShown = false"
            alt=""
          />
          <div>
            <div
              class="flex items-center mt-[20px] grid gap-[70px] relative after:block after:content-[''] after:absolute after:w-[90%] after:h-[1px] after:bg-[rgba(15,97,203,0.4)] after:bottom-0 after:left-[5%]"
            >
              <span
                class="ml-[50px] nav-item cursor-pointer"
                :class="{
                  'nav-item-act':
                    activeTabIndex == index,
                }"
                v-for="(item, index) in tabList"
                :key="index"
                @click="activeTabIndex = index"
                >{{ item.name }}</span
              >
            </div>
            <div class="text-[#fff]">
              <div
                class="flex justify-center mt-[20px]"
              >
                <div
                  class="h-[85px] w-[495px] is-title1 text-[18px] flex justify-center pt-[20px] box-border"
                >
                  共3项，已通过<span
                    class="text-[#60EAA1]"
                    >3</span
                  >项
                </div>
              </div>
              <div class="flex pl-[50px]">
                <!-- <img src="@/assets/rou/icon63.png" alt="" /> -->
                <div
                  class="flex flex-col w-[100%]"
                >
                  <div
                    v-for="(
                      item, index
                    ) in tabList1[activeTabIndex]"
                    :key="index"
                  >
                    <div
                      class="is-tit2 w-[100%] pr-[60px] h-[100px] flex text-[22px] justify-between pl-[50px] box-border cursor-pointer"
                      @click="temShown = index"
                    >
                      <p>
                        <i
                          class="text-[#79C5FF] font-600 mr-[30px]"
                          >{{ item.a }}</i
                        >
                        <span
                          class="text-[16px] text-[#fff]"
                          >{{ item.b }}</span
                        >
                      </p>
                      <p
                        class="text-[16px] text-[#6BFFAC]"
                      >
                        {{ item.c }}
                      </p>
                    </div>
                    <template
                      v-if="temShown == index"
                    >
                      <div
                        class="w-[100%] pl-[50px] pb-[20px]"
                      >
                        <img
                          src="@/assets/rou/icon65.png"
                          v-for="(
                            itm, idx
                          ) in item.profileList"
                          class="w-[50px] cursor-pointer mx-[20px] h-[50px]"
                          alt=""
                          @click="
                            handleDownloadPdf
                          "
                        />
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 下结构 -->
    <div class="flex">
      <div class="w-[555px] pr-[19px]">
        <PubTit
          :title="'人员管理'"
          :width="555"
        ></PubTit>
        <div class="px-[10px]">
          <div>
            <div class="custom-tabs mt-[10px]">
              <div class="tabs-header">
                <div
                  v-for="(
                    tab, index
                  ) in staffData"
                  :key="index"
                  class="tab-item text-[18px]"
                  :class="{
                    'is-active':
                      activeTab === index,
                    'is-nth-child': index == 0,
                  }"
                  @click="activeTab = index"
                >
                  {{ tab.name }}
                </div>
                <div
                  class="tab-underline"
                  :style="underlineStyle"
                ></div>
              </div>
              <div class="tabs-content">
                <div
                  v-for="(
                    ite, index
                  ) in staffData"
                  :key="index"
                  class="flex"
                >
                  <div
                    class="flex"
                    v-if="activeTab === index"
                    style="flex-wrap: wrap"
                  >
                    <div
                      class="slices-bg w-[45%] h-[100px] flex text-sm items-center pl-[26px] mt-[4.1px]"
                      v-for="(
                        item, inde
                      ) in ite.data"
                      :key="inde"
                      @click="handleDia(item)"
                    >
                      <div>
                        <img
                          :src="item.img"
                          alt=""
                          draggable="false"
                        />
                      </div>
                      <div
                        class="text-[#E1EEFF] pl-[20px]"
                      >
                        <div>{{ item.name }}</div>
                        <div>
                          {{ item.value }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[555px]">
        <block
          class="w-[100%] h-[100%] text-[50px] text-[#fff]"
        >
          <PubTit
            :title="'设备管理'"
            :width="555"
          ></PubTit>
          <div
            class="flex justify-end w-[548px] h-[367px] pl-[3px] relative"
          >
            <img
              src="@/assets/images/staffPng/discharge.png"
              class="w-full mt-[11px]"
              draggable="false"
              alt=""
            />
            <span
              class="w-[100%] cursor-pointer h-[50%] absolute top-0 left-0"
              @click="handleOpenJiqirenTanchuang"
            ></span>
            <span
              class="w-[100%] cursor-pointer h-[50%] absolute top-[50%] left-0"
              @click="handleOpenShebeiTanchuang"
            ></span>
          </div>
        </block>
      </div>
      <el-dialog
        v-model="centerDialogVisible2"
        style="width: 1500px"
        align-center
        class="video-dialog"
      >
        <video
          v-if="centerDialogVisible2"
          src="@/assets/video/Bim.mp4"
          style="
            width: 100%;
            height: 800px;
            object-fit: cover;
          "
          controls
          autoplay
          muted
        ></video>
      </el-dialog>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      v-model="centerDialogVisible"
      title=""
      :width="diaImgWidth"
      align-center
    >
    <div class="relative">
      <img :src="currentDiaImg" alt="" draggable="false"  />
      <div  v-if="xiangmufuzeren=='项目负责人'" >
        <div class="absolute top-[50px] left-[30px] w-[160px] h-[250px] bg-[#021631] flex flex-col justify-center items-center">
        <img src="@/assets/xulei/ren1.png" class="w-[160px] h-[200px]" alt="">
        <span class="text-[22px] text-[#A0C4E1] mt-[10px]">缪剑峰</span>
      </div>
      <span class="text-[22px] absolute top-[62px] left-[386px] bg-[#07284D] text-[#A0C4E1] mt-[10px]">项目经理</span>
      <span class="text-[22px] absolute top-[0] left-[30px] pr-[10px] bg-[#07284D] text-[#A0C4E1] mt-[10px]">人员信息</span>
      </div>
     
    </div>
      <!-- <img src="@/assets/xulei/diaicon1.png" alt=""> -->
    </el-dialog>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  computed,
  nextTick,
  reactive,
  toRefs,
} from "vue";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import { coverageData } from "./echarsOptions.js";
import PubTit from "@/components/public/PubTit.vue";
import costengineer from "@/assets/images/staffPng/costengineer.png";
import Engineer from "@/assets/images/staffPng/Engineer.png";
import projectLeader from "@/assets/images/staffPng/projectLeader.png";
import safetySpecialist from "@/assets/images/staffPng/safetySpecialist.png";
import specialist from "@/assets/images/staffPng/specialist.png";
import ziliaoyuan from "@/assets/images/staffPng/ziliaoyuan.png";
const currentDiaImg = ref(null);
import dicon1 from "@/assets/xulei/diaicon1.png";
import dicon2 from "@/assets/xulei/diaicon2.png";
import dicon3 from "@/assets/xulei/diaicon3.png";
import dicon4 from "@/assets/xulei/diaicon4.png";
import dicon5 from "@/assets/xulei/diaicon5.png";
import idcon6 from "@/assets/xulei/diaicon6.png"
const diaShown = ref(false);
const activeTabIndex = ref(0);
const activeName = ref("1");
const temShown = ref(0);
const centerDialogVisible = ref(false);
const diaImg = ref(null);
const diaImgWidth = ref(530);
// 打开弹窗
const xiangmufuzeren=ref("")
const handleDia = (item) => {
  console.log("🚀 ~ handleDia ~ item:", item)
  xiangmufuzeren.value=item.name
  if (item.url) {
    centerDialogVisible.value = true;
    currentDiaImg.value = item.url;
  }
  if(item.url==idcon6){
    diaImgWidth.value=620
  }else{
    diaImgWidth.value=530
  }
};
const centerDialogVisible2 = ref(false);
const data = reactive({
  weatherList: [
    {
      week: "周一",
      date: "2025-04-28",
      temperature: "18~32℃",
      weather: "晴",
      wind: "南风3-4级",
    },
    {
      week: "周二",
      date: "2025-04-29",
      temperature: "19~34℃",
      weather: "多云",
      wind: "东南风4级",
    },
    {
      week: "周三",
      date: "2025-04-30",
      temperature: "20~36℃",
      weather: "小雨",
      wind: "东风3级",
    },
    {
      week: "周四",
      date: "2025-05-01",
      temperature: "21~37℃",
      weather: "多云",
      wind: "东北风4-5级",
    },
    {
      week: "周五",
      date: "2025-05-02",
      temperature: "20~38℃",
      weather: "中到大雨",
      wind: "北风5-6级",
    },
    {
      week: "周六",
      date: "2025-05-03",
      temperature: "19~35℃",
      weather: "雷阵雨",
      wind: "西北风4级",
    },
  ],
  tabList: [
    {
      name: "立项用地规划许可",
    },
    {
      name: "工程建设许可",
    },
    {
      name: "施工许可",
    },
    {
      name: "竣工验收",
    },
  ],
  tabList1: [
    [
      {
        a: "准予许可",
        b: "建设工程地震安全性评价结果的审定及抗震设防要求的确定",
        c: "审批用时1个工作日",
        profileList: [],
      },
      {
        a: "准予许可",
        b: "区县权限内的企业投资项目备案",
        c: "审批用时1个工作日",
      },
      {
        a: "准予许可",
        b: "建设用地规划许可证核发",
        c: "审批用时6个工作日",
      },
    ],
    [
      {
        a: "准予许可",
        b: "生产建设项目水土保持方案审批(报告书)",
        c: "审批用时1个工作日",
        profileList: [
          {
            type: "pdf",
          },
          {
            type: "pdf",
          },
        ],
      },
      {
        a: "准予许可",
        b: "生产建设项目水土保持监测季报",
        c: "审批用时1个工作日",
      },
      {
        a: "准予许可",
        b: "生产建设项目水土保持方案审批",
        c: "审批用时3个工作日",
      },
      {
        a: "准予许可",
        b: "建设工程、临时建设工程规划许可",
        c: "审批用时9个工作日",
      },
      {
        a: "准予许可",
        b: "建设工程(含临时建设)规划许可证核发",
        c: "审批用时5个工作日",
      },
      {
        a: "准予许可",
        b: "城镇污水排入排水管网许可",
        c: "审批用时12个工作日",
      },
      {
        a: "准予许可",
        b: "建设项目附属园林绿化工程设计方案审查",
        c: "审批用时6个工作日",
      },
    ],
    [
      {
        a: "准予许可",
        b: "通騉信设备的安装、调试、开通",
        c: "审批用时5个工作日",
        profileList: [
          // {
          //   type: "pdf",
          // },
          // {
          //   type: "pdf",
          // },
        ],
      },
      {
        a: "准予许可",
        b: "施工图审查备案",
        c: "审批用时1个工作日",
      },
      {
        a: "准予许可",
        b: "人防设计审核确认",
        c: "审批用时1个工作日",
      },
      {
        a: "准予许可",
        b: "夜誂著瘓协作业审核",
        c: "审批用时1个工作日",
      },
      {
        a: "准予许可",
        b: "建设工程消防设计审查",
        c: "审批用时2个工作日",
      },
      {
        a: "准予许可",
        b: "轨道交通控制保护区内建设项目安全保护方案备案",
        c: "审批用时1个工作日",
      },
      {
        a: "准予许可",
        b: "超限高层建筑工程抗震设防审批",
        c: "审批用时28个工作日",
      },
    ],
    [],
  ],
});

const unitsData = ref([
  {
    name: "开工时间",
    label: "2023 年2月15日",
    url: null,
  },
  {
    name: "监管部门",
    label: "南岸区住房和城乡建设委员会",
  },
  {
    name: "代建单位",
    label: "重庆市建筑科学研究院有限公司",
    url: dicon1,
  },
  {
    name: "勘察单位",
    label: "重庆市设计院有限公司",
    url: dicon2,
  },
  {
    name: "监理单位",
    label: "上海建浩工程顾问有限公司",
    url: dicon3,
  },
  {
    name: "设计单位",
    label: "重庆市设计院有限公司",
    url: dicon4,
  },
  {
    name: "总承包单位",
    label: `重庆市设计院有限公司  中建八局第四建设有限公司联合`,
    url: dicon5,
  },
]);

const staffData = ref([
  {
    name: "代建单位",
    id: "1",
    data: [
      {
        name: "项目负责人",
        value: "1人",
        img: projectLeader,
        url:idcon6
      },
      {
        name: "工程管理工程师",
        value: "2人",
        img: Engineer,
      },
      {
        name: "造价工程师",
        value: "2人",
        img: costengineer,
      },
      {
        name: "安全专员",
        value: "2人",
        img: safetySpecialist,
      },
      {
        name: "报建专员",
        value: "2人",
        img: specialist,
      },
    ],
  },
  {
    name: "总承包单位",
    id: "2",
    data: [
      {
        name: "项目经理",
        value: "1人",
        img: projectLeader,
      },
      {
        name: "土建/机电工程师",
        value: "3人",
        img: Engineer,
      },
      {
        name: "造价工程师",
        value: "2人",
        img: costengineer,
      },
      {
        name: "安全主管",
        value: "1人",
        img: safetySpecialist,
      },
      {
        name: "资料管理员",
        value: "2人",
        img: specialist,
      },
    ],
  },
  {
    name: "设计单位",
    id: "3",
    data: [
      {
        name: "项目负责人(注册岩土)",
        value: "1人",
        img: projectLeader,
      },
      {
        name: "勘察工程师",
        value: "3人",
        img: Engineer,
      },
      {
        name: "野外作业组",
        value: "12人",
        img: costengineer,
      },
      {
        name: "实验室人员",
        value: "6人",
        img: specialist,
      },
    ],
  },
  {
    name: "监理单位",
    id: "4",
    data: [
      {
        name: "总监理工程师",
        value: "1人",
        img: projectLeader,
      },
      {
        name: "专业监理工程师(土建)",
        value: "2人",
        img: Engineer,
      },
      {
        name: "专业监理工程师(机电)",
        value: "1人",
        img: costengineer,
      },
      {
        name: "安全监理工程师",
        value: "1人",
        img: safetySpecialist,
      },
      {
        name: "监理员",
        value: "20人",
        img: specialist,
      },
      {
        name: "资料员",
        value: "1人",
        img: ziliaoyuan,
      },
    ],
  },
  {
    name: "勘查单位",
    id: "5",
    data: [
      {
        name: "项目负责人",
        value: "1人",
        img: projectLeader,
      },
      {
        name: "建筑/结构/机电设计师",
        value: "6人",
        img: Engineer,
      },
      {
        name: "驻场设计代表",
        value: "1人",
        img: costengineer,
      },
      {
        name: "BIM工程师",
        value: "2人",
        img: safetySpecialist,
      },
    ],
  },
]);

const activeTab = ref(0);

const { weatherList, tabList, tabList1 } =
  toRefs(data);
const emit = defineEmits([
  "handleEmitJiqirentanchuang",
  "handleEmitShebeiTanchuang",
]);
const handleOpenJiqirenTanchuang = () => {
  emit("handleEmitJiqirentanchuang");
};
const handleOpenShebeiTanchuang = () => {
  emit("handleEmitShebeiTanchuang");
};
const handleDownloadPdf = async () => {
  const response = await fetch(
    "http://lc-F59ERqoe.cn-n1.lcfile.com/YIhaOss6v25jk1JR9LMopz9UpWNjngrX/%E6%95%B0%E6%8D%AE%E5%BA%93%E9%83%A8%E7%BD%B2%E5%89%8D%E6%9C%9F%E7%A1%AE%E8%AE%A4%E5%B7%A5%E4%BD%9C%EF%BC%882025.05.22%EF%BC%89.xlsx"
  ); // 这里换成你的接口
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "test.pdf"; // 下载后的文件名
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
</script>

<style lang="scss" scoped>
.is-icon2-bg {
  background: url("@/assets/rou/dicon6.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.is-icon4-bg {
  background: url("@/assets/rou/dicon5.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.is-rig-border {
  border-right: 1px solid rgba(107, 182, 237, 0.3);
}

.is-left-dialog {
  background: url("@/assets/rou/maDia.png")
    no-repeat 100% 100% / cover;
}

.nav-item-act {
  padding: 16px;
  height: 42px;

  background: url("@/assets/rou/icon61.png")
    no-repeat center center;
  background-size: 100% 100%;
  font-size: 21px;
}
.nav-item {
  display: block;
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 20px;
  color: #c8e3fc;
  line-height: 42px;
}
.is-title1 {
  background: url("@/assets/rou/icon62.png")
    no-repeat 100% 100% / cover;
}
.is-tit2 {
  background: url("@/assets/rou/icon64.png")
    no-repeat center center;
  background-size: 100% 100%;
}

//
.slices-bg {
  background: url("@/assets/images/staffPng/slices.png")
    no-repeat center center;
  background-size: 100% 100%;
}

.number-bg {
  background: url("@/assets/images/staffPng/numberbg.png")
    no-repeat center center;
  background-size: 100% 100%;
}

.triangle {
  width: 0;
  height: 0;
  border-top: 10px solid transparent; /* 上边框 */
  border-bottom: 10px solid transparent; /* 下边框 */
  border-left: 11px solid blue; /* 左边框 */
}

.custom-card-tabs {
  :deep(.el-tabs__item) {
    color: #fff !important;
    font-size: 18px !important;
    width: 100px !important;
    border-bottom: 1px solid #004392;
  }
}

:deep(.el-tabs__item .is-top .is-active) {
  background: red !important;
  border-bottom: 1px solid #004392;
  border-bottom-color: none;
}

:deep(.el-tabs__header) {
  border-bottom: none !important;
}

.bordered-tabs {
  border: 1px solid #004392;
  border-radius: 4px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  position: relative;
  background-color: #051833;
  border-bottom: 1px solid #004392;
}

.tab-item {
  position: relative;
  padding: 12px 5px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  flex: 1;
  transition: all 0.3s;
  border-right: 1px solid #004392;
  border-top: 1px solid #004392;
  user-select: none;
}

.is-nth-child {
  border-left: 1px solid #004392;
}

.tab-item:last-child {
  border-right: none;
}

.tab-item.is-active {
  color: #fff;
  background-color: rgba(43, 118, 226, 0.29);
  font-weight: 500;
}

.tab-item.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #f5f7fa;
}

.tab-underline {
  position: absolute;
  bottom: -1px;
  left: 0;
  height: 2px;
  background-color: #409eff;
  transition: transform 0.3s;
  z-index: 1;
}

.close-icon {
  margin-left: 8px;
  font-size: 12px;
  color: #c0c4cc;
  transition: color 0.3s;
}

.close-icon:hover {
  color: #909399;
}

.tab-pane.is-active {
  display: block;
}
// :deep(.el-dialog){
//   height: 305px;
//   width: 619px;
//   background: url("@/assets/xulei/renyuan.png") no-repeat center center;
//   background-size: 100% 100%;
// }
:deep(.el-dialog) {
  padding: 0;
  background: transparent !important;
}
:deep(.el-dialog__headerbtn){
  margin-top: 20px;
}
</style>
