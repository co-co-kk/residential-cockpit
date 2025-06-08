<template>
  <div class="w-[100%] h-[100%] relative">
    <!-- 项目情况 -->
    <block
      class="w-[100%] h-[100%] text-[50px] text-[#fff]"
    >
      <PubTit :title="'项目情况'"></PubTit>
      <div
        class="flex items-center pt-[20px] px-[30px] box-border"
      >
        <div class="flex flex-col text-[18px]">
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]"
              >项目名称：</span
            >
            <span
              >重庆市东南医院二期建设项目</span
            >
          </div>
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]"
              >统一项目编码：</span
            >
            <span class=""
              >KC(2022)-08-0002701C</span
            >
          </div>
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]"
              >建设单位：</span
            >
            <span>重庆市东南医院</span>
          </div>
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]"
              >项目地点：</span
            >
            <span
              >重庆市南岸区茶园通江大道98号
            </span>
          </div>
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]"
              >项目总面积：</span
            >
            <span>69146平方米</span>
          </div>
          <div class="leading-[38px]">
            <span class="text-[#6BB6ED]"
              >项目总投资：</span
            >
            <span>64557万元</span>
          </div>
        </div>
        <img
          src="@/assets/rou/icon51.png"
          class="cursor-pointer"
          alt=""
          @click="diaShown = true"
        />
        <img
          src="@/assets/rou/icon52.png"
          class="cursor-pointer"
          alt=""
        />
      </div>
    </block>
    <div
      class="w-[1117px] h-[1080px] is-left-dialog absolute top-[-90px] left-0 z-99"
      v-if="diaShown"
    >
      <div
        class="flex items-center mt-[20px] grid gap-[70px] relative after:block after:content-[''] after:absolute after:w-[90%] after:h-[1px] after:bg-[rgba(15,97,203,0.4)] after:bottom-0 after:left-[5%]"
      >
        <span
          class=" ml-[50px] nav-item cursor-pointer"
          :class="{'nav-item-act': activeTabIndex ==item.name}"
          v-for="(item, index) in tabList"
          :key="index"
          @click="activeTabIndex = item.name"
          >{{ item.name }}</span
        >
        <!-- <span class="nav-item h-[62px]"
          >立项用地规划许可,工程建设许可</span
        > -->
        <img
          src="@/assets/rou/guanbi.png"
          class="absolute right-[100px] top-[20px] cursor-pointer"
          @click="diaShown = false"
          alt=""
        />
      </div>
      <template v-if="activeTabIndex=='立项用地规划许可'">
        <div class="flex justify-center py-[20px]">
        <div
          class="h-[85px] w-[495px] is-title1 text-[18px] flex justify-center pt-[20px] box-border"
        >
          共3项，已通过<span
            class="text-[#60EAA1]"
            >3</span
          >项
        </div>
      </div>
      <div class="flex">
        <img
          src="@/assets/rou/icon63.png"
          alt=""
        />
        <div
          class="flex flex-col w-[100%] pt-[30px]"
        >
          <div
            class="is-tit2 w-[100%] pr-[60px] h-[100px] flex text-[22px] justify-between pl-[50px] box-border"
          >
            <p>
              <i
                class="text-[#79C5FF] font-600 mr-[30px]"
                >准予许可</i
              >
              <span class="16px"
                >建设工程地震安全性评价结果的审定及抗震设防要求的确定</span
              >
            </p>
            <p class="16px text-[#6BFFAC]">
              审批用时1个工作日
            </p>
          </div>
          <div
            class="is-tit2 w-[100%] pr-[60px] h-[100px] flex text-[22px] justify-between pl-[50px] box-border"
          >
            <p>
              <i
                class="text-[#79C5FF] font-600 mr-[30px]"
                >准予许可</i
              >
              <span class="16px"
                >区县权限内的企业投资项目备案</span
              >
            </p>
            <p class="16px text-[#6BFFAC]">
              审批用时1个工作日
            </p>
          </div>
          <div
            class="is-tit2 w-[100%] pr-[60px] h-[100px] flex text-[22px] justify-between pl-[50px] box-border"
          >
            <p>
              <i
                class="text-[#79C5FF] font-600 mr-[30px]"
                >准予许可</i
              >
              <span class="16px"
                >建设用地规划许可证核发</span
              >
            </p>
            <p class="16px text-[#6BFFAC]">
              审批用时6个工作日
            </p>
          </div>
        </div>
      </div>
      </template>
    </div>
    <!-- 天气情况 -->
    <block
      class="w-[100%] h-[100%] text-[50px] text-[#fff]"
    >
      <PubTit :title="'施工进度'"></PubTit>
      <div class="h-[300px] w-[100%]">
        <EcharsWrapper
          :chartData="coverageData"
        ></EcharsWrapper>
      </div>
    </block>
    <!-- 设备支撑 -->
    <block
      class="w-[100%] h-[100%] text-[50px] text-[#fff]"
    >
      <PubTit :title="'设备支撑'"></PubTit>
      <div class="flex justify-center">
        <img
          src="@/assets/rou/icon53.png"
          alt=""
        />
      </div>
    </block>
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
const diaShown = ref(false);
const activeTabIndex=ref('立项用地规划许可')
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
});
const { weatherList,tabList } = toRefs(data);
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
</style>
