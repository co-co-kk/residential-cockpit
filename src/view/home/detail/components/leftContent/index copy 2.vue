<template>
  <div class="w-[100%] h-[100%] relative ">
    <!-- 项目情况 -->
    <block class="w-[100%] h-[100%] text-[50px] text-[#fff]">
      <PubTit :title="'项目情况'"></PubTit>
      <div class="flex items-center pt-[20px] px-[30px] box-border">
        <img
          src="@/assets/rou/icon71.png"
          class="mr-[50px]"
          draggable="false"
          alt=""
        />
        <div class="flex flex-col text-[18px]">
          <div class="leading-[38px] w-[400px]">
            <span class="text-[#6BB6ED]">项目名称：</span>
            <span>重庆市东南医院二期建设项目</span>
          </div>
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]">统一项目编码：</span>
            <span class="">KC(2022)-08-0002701C</span>
          </div>
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]">建设单位：</span>
            <span>重庆市东南医院</span>
          </div>
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]">项目地点：</span>
            <span>重庆市南岸区茶园通江大道98号 </span>
          </div>
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]">项目总面积：</span>
            <span>69146平方米</span>
          </div>
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]">项目总投资：</span>
            <span>64557万元</span>
          </div>
        </div>
        <img
          src="@/assets/rou/icon51.png"
          class="cursor-pointer"
          alt=""
          @click="diaShown = true"
        />
        <!-- <img src="@/assets/rou/icon52.png" class="cursor-pointer" alt="" @click="centerDialogVisible2 = true" /> -->
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
                'nav-item-act': activeTabIndex == index,
              }"
              v-for="(item, index) in tabList"
              :key="index"
              @click="activeTabIndex = index"
              >{{ item.name }}</span
            >
          </div>
          <div class="text-[#fff]">
            <div class="flex justify-center mt-[20px]">
              <div
                class="h-[85px] w-[495px] is-title1 text-[18px] flex justify-center pt-[20px] box-border"
              >
                共3项，已通过<span class="text-[#60EAA1]">3</span>项
              </div>
            </div>
            <div class="flex pl-[50px]">
              <!-- <img src="@/assets/rou/icon63.png" alt="" /> -->
              <div class="flex flex-col w-[100%]">
                <div
                  v-for="(item, index) in tabList1[activeTabIndex]"
                  :key="index"
                >
                  <div
                    class="is-tit2 w-[100%] pr-[60px] h-[100px] flex text-[22px] justify-between pl-[50px] box-border cursor-pointer"
                    @click="temShown = index"
                  >
                    <p>
                      <i class="text-[#79C5FF] font-600 mr-[30px]">{{
                        item.a
                      }}</i>
                      <span class="text-[16px] text-[#fff]">{{ item.b }}</span>
                    </p>
                    <p class="text-[16px] text-[#6BFFAC]">
                      {{ item.c }}
                    </p>
                  </div>
                  <template v-if="temShown == index">
                    <div class="w-[100%] pl-[50px] pb-[20px]">
                      <img
                        src="@/assets/rou/icon65.png"
                        v-for="(itm, idx) in item.profileList"
                        class="w-[50px] cursor-pointer mx-[20px] h-[50px]"
                        alt=""
                        @click="handleDownloadPdf"
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
   
    <!-- 天气情况 -->
    <block class="w-[100%] h-[100%] text-[50px] text-[#fff]">
      <PubTit :title="'施工进度'"></PubTit>
      <div class="h-[300px] w-[100%]">
        <EcharsWrapper :chartData="coverageData"></EcharsWrapper>
      </div>
    </block>
    <!-- 设备支撑 -->
    <block class="w-[100%] h-[100%] text-[50px] text-[#fff]">
      <PubTit :title="'设备支撑'"></PubTit>
      <div class="flex justify-end">
        <img src="@/assets/rou/icon53.png" class="cursor-pointer" draggable="false" alt="" @click="handleOpenJiqirenTanchuang" />
      </div>
    </block>
    <el-dialog
      v-model="centerDialogVisible2"
      style="width: 1500px"
      align-center
      class="video-dialog"
    >
      <video
        v-if="centerDialogVisible2"
        src="@/assets/video/Bim.mp4"
        style="width: 100%; height: 800px; object-fit: cover"
        controls
        autoplay
        muted
      ></video>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, reactive, toRefs } from "vue";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import { coverageData } from "./echarsOptions.js";
import PubTit from "@/components/public/PubTit.vue";
const diaShown = ref(false);
const activeTabIndex = ref(0);
const activeName = ref("1");
const temShown = ref(0);
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
const { weatherList, tabList, tabList1 } = toRefs(data);
const emit=defineEmits(['handleEmitJiqirentanchuang'])
const handleOpenJiqirenTanchuang=()=>{
  emit('handleEmitJiqirentanchuang')
}
const handleDownloadPdf = async () => {
  const response = await fetch('http://lc-F59ERqoe.cn-n1.lcfile.com/YIhaOss6v25jk1JR9LMopz9UpWNjngrX/%E6%95%B0%E6%8D%AE%E5%BA%93%E9%83%A8%E7%BD%B2%E5%89%8D%E6%9C%9F%E7%A1%AE%E8%AE%A4%E5%B7%A5%E4%BD%9C%EF%BC%882025.05.22%EF%BC%89.xlsx') // 这里换成你的接口
  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'test.pdf' // 下载后的文件名
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
</script>

<style lang="scss" scoped>
.is-icon2-bg {
  background: url("@/assets/rou/dicon6.png") no-repeat center center;
  background-size: 100% 100%;
}
.is-icon4-bg {
  background: url("@/assets/rou/dicon5.png") no-repeat center center;
  background-size: 100% 100%;
}
.is-rig-border {
  border-right: 1px solid rgba(107, 182, 237, 0.3);
}

.is-left-dialog {
  background: url("@/assets/rou/maDia.png") no-repeat 100% 100% / cover;
}

.nav-item-act {
  padding: 16px;
  height: 42px;

  background: url("@/assets/rou/icon61.png") no-repeat center center;
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
  background: url("@/assets/rou/icon62.png") no-repeat 100% 100% / cover;
}
.is-tit2 {
  background: url("@/assets/rou/icon64.png") no-repeat center center;
  background-size: 100% 100%;
}
</style>
