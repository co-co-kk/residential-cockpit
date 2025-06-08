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
              <div class="h-[260px]">
                <EcharsWrapper
                  :chartData="coverageData3"
                ></EcharsWrapper>
              </div>
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
              <div class="w-[100%] flex flex-col items-center justify-center h-[255px]">
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
        <div>
          <div class="flex justify-center mt-[18px]">
            <img
              src="@/assets/sxk-qph/gjjd2x.png"
              draggable="false"
              class="w-[400px] h-[50px]"
              alt=""
            />
            <!-- <div class="flex">
              <div v-for="item in KeyProgress" :key="item" class="w-[100px] h-[50px] flex items-center justify-center key-progress-item">
                <div class="key-progress">
                  {{ item }}
                </div>
              </div>
            </div> -->
          </div>
          <div class="h-[276px] w-[100%] mt-[31px]">
            <EcharsWrapper :chartData="coverageData5"></EcharsWrapper>
          </div>
        </div>
      </div>
      <div>
        <PubTit style="width: 555px" :title="'项目支付情况'" :width="555"></PubTit>
        <div class="flex items-center justify-center m-[20px] ml-[70px] ">
         <img
            src="@/assets/sxk-qph/ty.png"
            draggable="false"
            class="w-[420px] h-[346px]"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PubTit from "@/components/public/PubTit.vue";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import { coverageData, coverageData3, coverageData4,coverageData5 } from "./echarsOptions.js";
import SeamlessScroll from "@/components/SeamlessScroll.vue";
const KeyProgress = ['关键进度一', '关键进度二', '关键进度三', '关键进度四'];
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
color: #FFFFFF;
background: linear-gradient(0deg, #79C5FF 0%, #FFFFFF 59.8388671875%, #FFFFFF 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.key-progress-item {
    // background: rgba(255, 255, 255, 0.1);
    // border: 1px solid rgba(255, 255, 255, 0.2);
  // background: radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.1));
  background: radial-gradient(circle, rgb(1, 19, 42,0.1), rgba(255, 255, 255, 0.3));

}
</style>
