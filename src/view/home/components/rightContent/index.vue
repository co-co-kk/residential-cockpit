<template>
  <div class="">
     <block class="w-[100%] h-[100%] text-[50px] text-[#fff]">
      
      <PubTit :title="'风险综控'"></PubTit>
      <div class="flex justify-between w-[100%] mt-[60px]">
        <div class="w-[50%] flex justify-center">
          <div class="flex flex-col w-[104px] items-center mt-[80px]">
            <div class="tit-2">30%</div>
            <div class="text-[18px]">管理指令响应时效提升</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="title-1">100%</div>
            <div class="text-[18px] my-[10px]">工地要素数字化率</div>
            <img src="@/assets/rou/zhu.png" alt="" />
            <!-- <img src="@/assets/rou/dong2.gif" class="w-[242px] h-[164px]" alt="" /> -->
          </div>
          <div
            class="flex flex-col w-[104px] items-center mt-[80px] text-center"
          >
            <div class="tit-2">40%</div>
            <div class="text-[18px]">跨部⻔协同效率提升</div>
          </div>
        </div>
        <div class="w-[50%] h-[260px]">
          <EcharsWrapper :chartData="coverageData3"></EcharsWrapper>
        </div>
      </div>
    </block>
    <!-- 预警处置 -->
    <!-- <block class="w-[100%] h-[100%] text-[50px] text-[#fff]">
      <PubTit :title="'预警处置'"></PubTit>
      <div class="w-[100%] h-[100%] flex">
        <div class="w-[50%] flex flex-col pr-[20px]">
          <div class="flex items-end">
            <div>
              <span v-for="item in num1" class="tit1">{{ item }}</span>
            </div>
            <img
              src="@/assets/rou/top-arrow.png"
              class="w-[22px] h-[30px] mx-[5px]"
              alt=""
            />
            <span class="text-[18px] text-[#FF855B]">+10.4%</span>
          </div>
          <div class="flex items-center mt-[22px]">
            <span class="text-[#AECBE2] text-[16px]">已办结</span>
            <div class="flex ml-[30px]">
              <div class="is-block-item mr-[5px]" v-for="item in 13"></div>
            </div>
            <div class="flex">
              <div class="is-block-item2 mr-[5px]" v-for="item in 7"></div>
            </div>
            <div class="is-tit2 ml-[60px]">85.5 <span>%</span></div>
          </div>
          <div class="is-line"></div>
          <div class="my-[17px]">
            <div class="flex justify-between">
              <div class="text-[#AECBE2] text-[14px]">
                <span>2023/04/01</span> <span class="ml-[10px]">12:30:00</span>
              </div>
              <span
                class="bg-[#FF855B] rounded-[4px] text-[14px] py-[3px] px-[5px]"
                >重大事件</span
              >
            </div>
            <div class="mt-[16px] text-[16px]">
              事件内容一二三四五六七八九十事件内容一二三四的
            </div>
          </div>
          <div class="is-line"></div>
          <div class="my-[17px]">
            <div class="flex justify-between">
              <div class="text-[#AECBE2] text-[14px]">
                <span>2023/04/01</span> <span class="ml-[10px]">12:30:00</span>
              </div>
              <span
                class="bg-[#FF855B] rounded-[4px] text-[14px] py-[3px] px-[5px]"
                >重大事件</span
              >
            </div>
            <div class="mt-[16px] text-[16px]">
              事件内容一二三四五六七八九十事件内容一二三四的
            </div>
          </div>
          <div class="is-line"></div>
        </div>
        <div class="w-[50%] pl-[20px] pt-[20px]">
          <div class="flex flex-col justify-around h-[100%]">
            <div
              class="flex items-center"
              v-for="(item, index) in unitListData"
            >
              <div
                class="is-num w-[67px] h-[33px] mr-[5px] text-[16px] font-bold flex items-center justify-center"
                :style="{
                  background: `url('/src/assets/rou/num${
                    index + 1
                  }.png') no-repeat center center`,
                  backgroundSize: '100% 100%',
                }"
                :class="{
                  'text-[#FF855B]': index === 0,
                  'text-[#FFBF5B]': index === 1,
                  'text-[#6BFFAC]': index === 2,
                  'text-[#ffffff]': index > 2,
                }"
              >
                No.{{ index + 1 }}
              </div>
              <div class="text-[16px] w-[100px]">{{ item.name }}</div>
              <div class="bar">
                <div class="fill" :style="{ width: item.num * 10 + '%' }"></div>
              </div>
              <div class="num-bg flex items-center justify-center ml-[10px]">
                <div class="text-[18px]">{{ item.num }}</div>
                <div class="text-[15px] text-[#90D4F4] ml-[10px]">次</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </block> -->
    <!-- 信用监管 -->
    <block class="w-[100%] h-[100%] text-[30px] text-[#fff]">
      <PubTit :title="'信用监管'"></PubTit>
      <div class="w-[100%] mt-[20px] flex">
        <div class="w-[50%] h-[200px] px-[10px] box-border">
          <EcharsWrapper :chartData="coverageData"></EcharsWrapper>
        </div>
        <div class="w-[50%] h-[200px] px-[10px] box-border">
          <SeamlessScroll
            :initData="scrollTableList"
            :initHeader="scrollTableListHeader"
            width="50%"
            class="h-[100%]"
          >
          </SeamlessScroll>
        </div>
      </div>
    </block>
    <!-- 企业画像 -->
    <block class="w-[100%] h-[100%] text-[30px] text-[#fff]">
      <PubTit :title="'企业画像'"></PubTit>
      <div class="w-[100%] mt-[10px] flex">
        <div class="w-[50%] h-[200px] px-[10px] box-border">
          <EcharsWrapper :chartData="coverageData2"></EcharsWrapper>
        </div>
        <div class="flex flex-col">
          <div class="flex">
            <img src="@/assets/rou/lamb.png" class="mr-[20px]" alt="" />
            <div>
              <div class="w-[425px] h-[36px] flex items-center is-bg1">
                <div
                  class="text-[#AFB9C1] text-[18px] ml-[40px] flex items-center"
                >
                  公共风险源 <span class="is-num3 ml-[20px]">9280</span>
                  <span>个</span>
                </div>
              </div>
              <div class="flex mt-[10px]">
                <div class="flex mt-[10px] ml-[30px]">
                  <div class="flex flex-col justify-center items-center">
                    <div class="text-[#FFD35E] text-[17px] is-dot">
                      本月火灾
                    </div>
                    <div class="text-[23px]">
                      0
                      <span class="ml-[5px] text-[#CAD3DE] text-[14px]"
                        >个</span
                      >
                    </div>
                  </div>
                </div>
                <div class="flex mt-[10px] ml-[30px]">
                  <div class="flex flex-col justify-center items-center">
                    <div class="text-[#FFD35E] text-[17px] is-dot">
                      本月新增隐患总数
                    </div>
                    <div class="text-[23px]">
                      2600
                      <span class="ml-[5px] text-[#CAD3DE] text-[14px]"
                        >个</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex">
            <img src="@/assets/rou/building.png" class="mr-[20px]" alt="" />
            <div>
              <div class="w-[425px] h-[36px] flex items-center is-bg1">
                <div
                  class="text-[#AFB9C1] text-[18px] ml-[40px] flex items-center"
                >
                  企业风险源 <span class="is-num3 ml-[20px]">994</span>
                  <span>个</span>
                </div>
              </div>
              <div class="flex mt-[10px]">
                <div class="flex mt-[10px] ml-[30px]">
                  <div class="flex flex-col justify-center items-center">
                    <div class="text-[#FFD35E] text-[17px] is-dot">
                      重点人员
                    </div>
                    <div class="text-[23px]">
                      4821
                      <span class="ml-[5px] text-[#CAD3DE] text-[14px]"
                        >个</span
                      >
                    </div>
                  </div>
                </div>
                <div class="flex mt-[10px] ml-[30px]">
                  <div class="flex flex-col justify-center items-center">
                    <div class="text-[#FFD35E] text-[17px] is-dot">
                      违规人员
                    </div>
                    <div class="text-[23px]">
                      3214
                      <span class="ml-[5px] text-[#CAD3DE] text-[14px]"
                        >个</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </block>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, reactive, toRefs } from "vue";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import { coverageData, coverageData2,coverageData3 } from "./echarsOptions.js";
import SeamlessScroll from "@/components/SeamlessScroll.vue";
const scrollTableList = ref([
  {
    b: "一殿",
    c: "工程施工图审查",
    d: "设计绿建处",
  },
  {
    b: "一般",
    c: "渝中七号库房建设项目",
    d: "质安总站",
  },
  {
    b: "一般",
    c: "渝北胜景大楼建设项目",
    d: "质安总站",
  },
]);

const scrollTableListHeader = ref([
  "信用评分排名",
  "企业名称",
  "质量安全发生率",
]);
const data = reactive({
  num1: "12345",
});
const { num1 } = toRefs(data);
import PubTit from "../../../../components/public/PubTit.vue";
const unitListData = ref([
  {
    name: "单位一",
    num: "8",
  },
  {
    name: "处理单位",
    num: "4",
  },
  {
    name: "单位的名字",
    num: "2",
  },
  {
    name: "单位四",
    num: "1",
  },
  {
    name: "单位五",
    num: "6",
  },
]);
</script>

<style lang="scss" scoped>
.tit1 {
  padding: 12px 10px;
  margin-right: 10px;
  background: rgba(64, 110, 169, 0.27);
  border-radius: 6px;
  font-size: 30px;
  font-weight: bold;
}
.is-tit2 {
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 24px;
  color: #00ccff;
  line-height: 48px;
  background: linear-gradient(0deg, #eefdff 0%, #6bffac 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.is-num3 {
  font-family: D;
  font-weight: normal;
  font-size: 28px;
  color: #ffffff;
  background: linear-gradient(
    0deg,
    #ffbf5b 0.4150390625%,
    #ffffff 99.5849609375%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.is-block-item {
  width: 10px;
  height: 12px;
  background: linear-gradient(90deg, #00ffd8, #008bcc);
}
.is-block-item2 {
  width: 10px;
  height: 12px;
  background: #5a656b;
}
.is-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(143, 163, 204, 0.1),
    #8fa3cc,
    rgba(143, 163, 204, 0.1)
  );
  margin-top: 10px;
}

.bar {
  width: 254px; /* 条形的宽度 */
  height: 9px; /* 条形的高度 */
  background: #152b44; /* 透明背景 */
  border-radius: 4px; /* 圆角 */
  // background: linear-gradient(90deg, rgba(0, 56, 76, 0.8) 0%, rgba(64, 110, 169, 0.94) 80%, #AED2FF 100%); /* 渐变 */
  position: relative; /* 方便绝对定位 */
}

.fill {
  height: 100%; /* 填充整个高度 */
  border-radius: 4px; /* 圆角 */
  background: linear-gradient(
    90deg,
    rgba(0, 56, 76, 0.8),
    rgba(64, 110, 169, 0.94),
    #aed2ff
  );
  width: 80%; /* 这里是 8/10 的宽度 */
}
.is-num {
  background: url("@/assets/rou/num1.png") no-repeat center center;
  background-size: 100% 100%;
}
.num-bg {
  width: 58px;
  height: 30px;
  background: url("@/assets/rou/num-bg.png") no-repeat center center;
  background-size: 100% 100%;
}
.is-bg1 {
  // background: linear-gradient(90deg, #406ea9 0%);
  background: url("@/assets/rou/gonggong.png") no-repeat center center;
  background-size: 100% 100%;
  border-radius: 2px;
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
  background: linear-gradient(0deg, #ffbf5b 0%, #ffffff 100%);
  border-radius: 50%;
  margin-right: 10px;
  position: absolute;
  left: 0px;
  top: calc(50% - 5px);
}

.title-1 {
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 34px;
  // color: #00F4FF;
  line-height: 34px;
  background: linear-gradient(
    0deg,
    #ffbf5b 0.4150390625%,
    #ffffff 99.5849609375%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tit-2 {
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 30px;
  color: #50bbff;
  line-height: 48px;
  background: linear-gradient(0deg, #ffffff 0%, #6bb6ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
