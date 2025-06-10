<template>
  <div class="">
    <div class="flex height-[56%]">
      <div>
        <PubTit style="width: 555px" :title="'质量监测'" :width="555"></PubTit>
        <div>
          <div class="flex text-[#fff]">
            <div class="w-[100%] flex flex-col items-center justify-center">
              <div class="w-[100%] flex justify-center flex-col items-center">
                <div class="text-[18px] is-title-bg mt-[10px] mb-[10px]">
                  质量问题情况
                </div>
                <div class="grid grid-cols-4 grid-rows-1 gap-[10px] w-[100%]">
                  <div
                    class="flex flex-col relative after:absolute after:right-[30px] after:top-[12.5%] after:block after:content-[''] after:w-[1px] after:h-[75%] after:bg-[rgba(110,181,233,0.3)]"
                    v-for="(item, index) in listData"
                  >
                    <div class="flex items-end">
                      <span class="text-[30px] tit-2">{{ item.value }}</span>
                      <span class="text-[18px] tit-2 ml-[5px]">个</span>
                    </div>
                    <span class="text-[18px] mt-[5px]">{{ item.name }}</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="flex items-end text-[rgba(86,209,146,1)]">
                      <span class="text-[30px]">99.43</span>
                      <span class="text-[18px] ml-[5px]">%</span>
                    </div>
                    <span class="text-[18px] mt-[5px]">整改率</span>
                  </div>
                </div>
              </div>

              <div class="h-[260px] w-[100%] mt-[31px]">
                <EcharsWrapper :chartData="coverageData3"></EcharsWrapper>
              </div>
              <!-- <div class="h-[276px] w-[100%] mt-[31px]">
                <EcharsWrapper :chartData="coverageData5"></EcharsWrapper>
              </div> -->
              <div class="h-[78px]">
                <img src="@/assets/sxk-qph/bhgs.png" draggable="false" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <PubTit style="width: 555px" :title="'安全监测'" :width="555"></PubTit>
        <div class="mt-[20px] mr-[29px]">
          <img
            src="@/assets/sxk-qph/qnjc.png"
            draggable="false"
            class="mr-[50px] h-[205px]"
            alt=""
          />
          <div>
            <div class="flex text-[#fff]">
              <div
                class="w-[100%] flex flex-col items-center justify-center h-[255px]"
              >
                <div class="w-[100%] flex justify-center flex-col items-center">
                  <div class="text-[18px] is-title-bg mt-[10px] mb-[10px]">
                    安全隐患
                  </div>
                  <div class="grid grid-cols-4 grid-rows-1 gap-[10px] w-[100%]">
                    <div
                      class="flex flex-col relative after:absolute after:right-[30px] after:top-[12.5%] after:block after:content-[''] after:w-[1px] after:h-[75%] after:bg-[rgba(110,181,233,0.3)]"
                      v-for="(item, index) in listData1"
                    >
                      <div class="flex items-end">
                        <span class="text-[30px] tit-2">{{ item.value }}</span>
                        <span class="text-[18px] tit-2 ml-[5px]">个</span>
                      </div>
                      <span class="text-[18px] mt-[5px]">{{ item.name }}</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="flex items-end text-[rgba(86,209,146,1)]">
                        <span class="text-[30px]">97.14</span>
                        <span class="text-[18px] ml-[5px]">%</span>
                      </div>
                      <span class="text-[18px] mt-[5px]">整改率</span>
                    </div>
                  </div>
                </div>
                <div class="flex h-[166px]">
                  <EcharsWrapper
                    class="w-[110px] h-[166px]"
                    :chartData="coverageData4"
                  ></EcharsWrapper>
                  <div>
                    <div class="mt-[10px]">
                      <div class="flex mt-[35px]">
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              材料管理
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              77
                            </div>
                          </div>
                        </div>
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              现场防火
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              36
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex mt-[21px]">
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              洞口防护
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              25
                            </div>
                          </div>
                        </div>
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              扣件式钢管脚手架
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              20
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex mt-[21px]">
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              临边防护
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              16
                            </div>
                          </div>
                        </div>
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              未分类
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              15
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
        </div>
      </div>
    </div>
    <div class="flex height-[54%]">
      <div>
        <PubTit style="width: 555px" :title="'施工进度'" :width="555"></PubTit>
        <div class="w-full">
          <div class="flex mt-[28px] text-[16px] justify-between items-center">
            <!-- <img
              src="@/assets/sxk-qph/gjjd2x.png"
              draggable="false"
              class="w-[400px] h-[50px]"
              alt=""
            /> -->
            <div class="w-[176px] flex items-center">
              <dev class="text-[#6BB6ED] mr-[5px]">总工期</dev>
              <div class="flex items-center gap-[5px] color-[#fff]">
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  4
                </div>
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  7
                </div>
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  3
                </div>
                <span class="pl-[5px]">天</span>
              </div>
            </div>
            <div class="w-[176px] flex items-center">
              <span class="text-[#6BB6ED] mr-[5px]">已施工</span>
              <div class="flex items-center gap-[5px] color-[#fff]">
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  2
                </div>
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  1
                </div>
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  4
                </div>
                <span class="pl-[5px]">天</span>
              </div>
            </div>
            <div class="w-[176px] flex items-center">
              <span class="text-[#6BB6ED] mr-[5px]">项目进度</span>
              <div class="flex items-center gap-[5px] color-[#fff]">
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  4
                </div>
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  7
                </div>
                <!-- <div
                    class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                  >
                    3
                  </div> -->
                <span class="pl-[5px]">%</span>
              </div>
            </div>
          </div>
          <div class="h-[276px] w-[100%] mt-[31px]">
            <EcharsWrapper :chartData="coverageData5"></EcharsWrapper>
          </div>
        </div>
      </div>
      <div>
        <PubTit
          style="width: 555px"
          :title="'项目支付情况'"
          :width="555"
        ></PubTit>
        <div class="pl-[15px] pr-[15px]">
          <div>
            <div class="custom-tabs mt-[21px]">
              <div class="tabs-header h-[44px]">
                <div
                  v-for="(tab, index) in staffData"
                  :key="index"
                  class="tab-item text-[18px]"
                  :class="{
                    'is-active': activeTab === index,
                    'is-nth-child': index == 0,
                  }"
                  @click="activeTab = index"
                >
                  {{ tab.name }}
                </div>
                <!-- <div class="tab-underline" :style="underlineStyle"></div> -->
              </div>
              <div class="tabs-content mt-[22px]">
                <div
                  v-for="(ite, index) in staffData"
                  :key="index"
                  class="flex"
                >
                  <div
                    class="flex w-full"
                    v-if="activeTab === index"
                    style="flex-wrap: wrap"
                  >
                    <!-- class="grid grid-cols-5 grid-rows-1 gap-[5px] w-[100%]" -->
                    <div v-if="activeTab == 0" class="flex w-full flex-col">
                      <div class="flex justify-between w-[100%]">
                        <div
                          class="flex flex-col relative after:absolute after:right-[30px] after:top-[12.5%] after:block after:content-[''] after:w-[1px] after:h-[75%] after:bg-[rgba(110,181,233,0.3)]"
                          v-for="(item, index) in ite.data"
                        >
                          <div class="flex items-end">
                            <span class="text-[24px] tit-2">{{
                              item.number
                            }}</span>
                            <span class="text-[14px] tit-2 ml-[5px]">{{
                              item.unit
                            }}</span>
                          </div>
                          <span class="text-[14px] mt-[5px] color-[#fff]">{{
                            item.describe
                          }}</span>
                        </div>
                      </div>
                      <div
                        class="w-full flex justify-between mt-[20px] color-[#fff] font-[14px]"
                      >
                        <div class="w-[50%]">
                          <div class="title-bg-img font-[14px]">
                            支付人数与金额分析
                          </div>
                          <div class="w-[100%] h-[200px] box-border">
                            <EcharsWrapper
                              :chartData="coverageData6"
                            ></EcharsWrapper>
                          </div>
                        </div>
                        <div class="w-[50%]">
                          <div class="h-[50%] w-full">
                            <div class="title-bg-img font-[14px]">
                              已履约金额与人员总金额占比
                            </div>
                            <div class="w-[100%] h-[60px] box-border">
                                    <EcharsWrapper
                                :chartData="coverageData8"
                              ></EcharsWrapper>
                            </div>
                          </div>
                          <div class="h-[50%]">
                            <div class="title-bg-img font-[14px]">
                              支付人数与金额分析
                            </div>
                            <div class="w-[100%] h-[60px] box-border">
                              <EcharsWrapper
                                :chartData="coverageData7"
                              ></EcharsWrapper>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex items-center justify-center m-[20px] ml-[70px]"
                      v-if="activeTab == 1"
                    >
                      <img
                        src="@/assets/sxk-qph/ty.png"
                        draggable="false"
                        class="w-[380px] h-[306px]"
                        alt=""
                      />
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
</template>

<script setup>
import { ref } from "vue";
import PubTit from "@/components/public/PubTit.vue";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import {
  coverageData,
  coverageData3,
  coverageData4,
  coverageData5,
  coverageData6,
  coverageData7,
  coverageData8,
} from "./echarsOptions.js";
import SeamlessScroll from "@/components/SeamlessScroll.vue";
const KeyProgress = ["关键进度一", "关键进度二", "关键进度三", "关键进度四"];
const scrollTableList = ref([
  {
    a: "1",
    b: "环境监控",
    c: "工程施工图审查",
    d: "设计绿建处",
  },
  {
    a: "2",
    b: "一般",
    c: "渝中七号库房建设项目",
    d: "质安总站",
  },
  {
    a: "3",
    b: "一般",
    c: "渝北胜景大楼建设项目",
    d: "质安总站",
  },
]);

const scrollTableListHeader = ref(["排名", "设备类型", "设备数量", "本月新增"]);

const listData = ref([
  {
    name: "问题总数",
    value: 350,
  },
  {
    name: "严重问题",
    value: 0,
  },
  {
    name: "已整改",
    value: 348,
  },
]);
const listData1 = ref([
  {
    name: "隐患总数",
    value: 315,
  },
  {
    name: "重大隐患",
    value: 0,
  },
  {
    name: "已整改",
    value: 306,
  },
]);
const listData2 = ref([
  {
    name: "隐患总数",
    value: 350,
  },
  {
    name: "重大隐患",
    value: 0,
  },
  {
    name: "已整改",
    value: 306,
  },
]);
const activeTab = ref(0);
const staffData = ref([
  {
    name: "履约支付",
    id: "1",
    data: [
      {
        name: "项目负责人",
        value: "1人",
        number: 340,
        unit: "人",
        describe: "实名制人数",
      },
      {
        name: "工程管理工程师",
        value: "2人",
        number: 205,
        unit: "万元",
        describe: "合同人员总薪资",
      },
      {
        name: "造价工程师",
        value: "2人",
        number: 87,
        unit: "万元",
        describe: "累积发放金额",
      },
      {
        name: "安全专员",
        value: "2人",
        number: 2037,
        unit: "人次",
        describe: "履约总人次",
      },
      {
        name: "报建专员",
        value: "2人",
        number: 47,
        unit: "条",
        describe: "欠薪线索移交",
      },
    ],
  },
  {
    name: "支付预警",
    id: "2",
    data: [],
  },
]);
</script>

<style lang="scss" scoped>
.shenjikeng {
  background: url("@/assets/rou/ricon6.png") no-repeat center center;
  padding: 5px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-box {
  // font-weight: bold;
  // font-size: 24px;
  // color: #f6f9fe;
  // text-shadow: 0px 2px 8px rgba(5, 28, 55, 0.42);
  width: 132px;
  height: 29px;
  background: linear-gradient(
    0deg,
    rgba(44, 96, 140, 0.92) 0%,
    rgba(55, 177, 255, 0.77) 100%
  );
  border-radius: 1px;
  border: 1px solid;
  opacity: 0.58;
  border-image: linear-gradient(0deg, #79caf0, #06baff, #79caf0) 10 10;
}
.title-text {
  width: 100%;
  // height: 15px;
  font-family: Alibaba PuHuiTi;
  font-weight: 400;
  color: #83d9ff;
  background: linear-gradient(
    0deg,
    rgba(107, 182, 237, 0.96) 0%,
    rgba(255, 255, 255, 0.96) 82.6904296875%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.bt-title-bg2 {
  background: linear-gradient(
    0deg,
    rgba(44, 96, 140, 0.92) 0%,
    rgba(55, 177, 255, 0.77) 100%
  );
  border-radius: 1px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  opacity: 0.58;
  border-image: linear-gradient(0deg, #79caf0, #06baff, #79caf0) 10 10;
}
.tit-2 {
  font-family: Source Han Sans CN;
  font-weight: bold;
  // font-size: 24px;
  color: #50bbff;
  // line-height: 48px;
  background: linear-gradient(0deg, #ffffff 0%, #6bb6ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tit1 {
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 24px;
  color: #17b99a;
  background: linear-gradient(0deg, #eefdff 0%, #6bffac 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.border-bg-op {
  background: linear-gradient(
    0deg,
    rgba(21, 171, 250, 0) 0%,
    rgba(109, 199, 246, 0.78) 50%,
    rgba(21, 171, 250, 0) 100%
  );
  opacity: 0.4;
}
.is-dot {
  position: relative;
  padding-left: 20px;
}
.is-dot::before {
  display: block;
  content: "";
  width: 10px;
  height: 10px;
  background: linear-gradient(0deg, #488cf7 0%, #ffffff 100%);
  border-radius: 50%;
  margin-right: 10px;
  position: absolute;
  left: 0px;
  top: calc(50% - 5px);
}
.key-progress {
  width: 76px;
  height: 13px;
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 16px;
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
.key-progress-item {
  // background: rgba(255, 255, 255, 0.1);
  // border: 1px solid rgba(255, 255, 255, 0.2);
  // background: radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.1));
  background: radial-gradient(
    circle,
    rgb(1, 19, 42, 0.1),
    rgba(255, 255, 255, 0.3)
  );
}
.number-bg {
  background: url("@/assets/images/staffPng/numberbg.png") no-repeat center
    center;
  background-size: 100% 100%;
}
.title-bg-img {
  background: url("@/assets/sxk-qph/z.png") no-repeat center center;
  background-size: 100% 100%;
  font-size: 14px;
  height: 37px;
  text-align: center;
  line-height: 37px;
}

.tabs-header {
  display: flex;
  position: relative;
  background-color: #051833;
  border-bottom: 1px solid #004392;
}

.tab-item {
  position: relative;
  padding: 12px 10px;
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
</style>
