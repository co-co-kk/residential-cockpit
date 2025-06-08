<template>
  <div class="w-[100%] h-[100%] ">
    <!-- 质量监督 -->
    <block class="w-[100%]  h-[100%] text-[50px] text-[#fff]">
      <PubTit :title="'质量监督'"></PubTit>
      <div class="flex justify-between w-[100%] mt-[30px]">
        <div class="flex w-[50%] justify-around flex-wrap">
          <div
            class="w-[200px] h-[80px] bg-[rgba(64,110,169,0.29)] flex justify-center items-center"
            v-for="(item, index) in zhiliangjianduList"
            :key="index"
          >
            <img :src="item.icon" class="h-[74px] mt-[10px]" alt="" />
            <div class="text-[18px]">{{ item.name }}</div>
          </div>
        </div>
        <div class="relative">
          <img src="@/assets/rou/yuan.png" class="rotate-animation" alt="" />
          <div
            class="absolute top-[-10px] left-[calc(50%-30px)] text-[18px] font-bold"
          >
            施工六
          </div>
          <div class="absolute top-[55px] left-[125px] flex items-center">
            <div class="text-[14px] font-bold">施工二</div>
            <img src="@/assets/rou/rig-arrow.png" class="mx-[10px]" alt="" />
            <div class="text-[14px] font-bold">施工三</div>
            <img src="@/assets/rou/rig-arrow.png" class="mx-[10px]" alt="" />
            <div class="text-[14px] font-bold">施工五</div>
          </div>
          <div
            class="absolute top-[120px] left-[calc(50%-30px)] text-[18px] font-bold"
          >
            施工一
          </div>
        </div>
      </div>
    </block>
    
    <!-- 安全管控 -->
    <block class="w-[100%] h-[100%] text-[50px] text-[#fff]">
      <PubTit :title="'安全管控'"></PubTit>
      <div class="flex justify-between w-[100%] mt-[20px]">
        <xuanzhuan></xuanzhuan>
        <div class="flex flex-col">
          <div
            class="flex items-center bg-[rgba(18,68,101,0.38)] px-[16px] py-[8px] rounded-[2px]"
          >
            <div class="is-rounded"></div>
            <span class="text-[14px] ml-[10px]"
              >人员：未戴安全帽、违规动火</span
            >
          </div>
          <div
            class="flex items-center bg-[rgba(18,68,101,0.38)] mt-[13px] px-[16px] py-[8px] rounded-[2px]"
          >
            <div class="is-rounded2"></div>
            <span class="text-[14px] ml-[10px]"
              >设备：塔吊超载</span
            >
          </div>
          <div
            class="flex items-center bg-[rgba(18,68,101,0.38)] mt-[13px] px-[16px] py-[8px] rounded-[2px]"
          >
            <div class="is-rounded3"></div>
            <span class="text-[14px] ml-[10px]"
              >环境：粉尘超标、噪音超标</span
            >
          </div>
          <div
            class="flex items-center bg-[rgba(18,68,101,0.38)] mt-[13px] px-[16px] py-[8px] rounded-[2px]"
          >
            <div class="is-rounded4"></div>
            <span class="text-[14px] ml-[10px]"
              >危大工程：深基坑位移</span
            >
          </div>
        </div>
        <div class="flex flex-wrap justify-between w-[50%]">
          <div class="relative" v-for="item in 6">
            <div class="shenjikeng">
              <div class="tit-3">深基坑</div>
            </div>
            <img src="@/assets/rou/icon1.png" class="animate-pulse" alt="" />
            <div
              class="text-[18px] font-bold absolute top-[35px] left-[calc(50%-20px)]"
            >
              156 <span class="text-[#5FC8FF]">个</span>
            </div>
          </div>
        </div>
      </div>
    </block>
    <!-- 数字工地 -->
    <!-- <block class="w-[100%] h-[100%] text-[50px] text-[#fff]">
      
      <PubTit :title="'数字工地'"></PubTit>
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
          </div>
          <div
            class="flex flex-col w-[104px] items-center mt-[80px] text-center"
          >
            <div class="tit-2">40%</div>
            <div class="text-[18px]">跨部⻔协同效率提升</div>
          </div>
        </div>
        <div class="w-[50%] h-[260px]">
          <EcharsWrapper :chartData="coverageData"></EcharsWrapper>
        </div>
      </div>
    </block> -->
    <block class="w-[100%] h-[100%] text-[50px] text-[#fff]">
      <PubTit :title="'预警处置'"></PubTit>
      <div class="w-[100%] flex">
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
            <div class="text-[#AECBE2] text-[16px] w-[70px]">已办结</div>
            <div class="flex ml-[30px]">
              <div class="is-block-item mr-[5px]" v-for="item in 13"></div>
            </div>
            <div class="flex">
              <div class="is-block-item2 mr-[5px]" v-for="item in 7"></div>
            </div>
            <div class="is-tit2 ml-[40px] w-[100px]">85.5 <span>%</span></div>
          </div>
          <div class="is-line"></div>
          <div class="">
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
              某商业综合体项目因模板支撑系统设计缺陷，导致局部楼板坍塌....
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
              某地铁站深基坑施工中因降水不当导致边坡滑坡，威胁周边建筑...
            </div>
          </div>
          <div class="is-line"></div>
        </div>
        <div class="w-[50%] pl-[20px] pt-[20px]">
          <div class="flex flex-col justify-around space-y-[30px]">
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
                <!-- 这里根据不同的份数调整宽度 -->
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
    </block>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, reactive, toRefs } from "vue";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import xuanzhuan from "../../../test/xuanzhaun.vue";
import { coverageData } from "./echarsOptions.js";
import PubTit from "../../../../components/public/PubTit.vue";
import cance from "@/assets/rou/kancesheji.png";
import shigong from "@/assets/rou/shigongjianshe.png";
import yanshou from "@/assets/rou/gongchengyanshou.png";
import yunying from "@/assets/rou/xiangmuyunying.png";

const data = reactive({
  num1: "12345",
  zhiliangjianduList: [
    {
      name: "勘测设计",
      icon: cance,
    },
    {
      name: "施工建设",
      icon: shigong,
    },
    {
      name: "工程验收",
      icon: yanshou,
    },
    {
      name: "项目运营",
      icon: yunying,
    },
  ],
});
const unitListData = ref([
  {
    name: "质监站",
    num: "8",
  },
  {
    name: "特种设备检测...",
    num: "6",
  },
  {
    name: "中建四局",
    num: "4",
  },
  {
    name: "市政工程监理...",
    num: "2",
  },
  {
    name: "地方工程质量...",
    num: "1",
  },
]);
const { zhiliangjianduList,num1 } = toRefs(data);
</script>

<style lang="scss" scoped>
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
.tit-3 {
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 14px;
  color: #83d9ff;
  background: linear-gradient(
    0deg,
    rgba(107, 182, 237, 0.96) 0%,
    rgba(255, 255, 255, 0.96) 82.6904296875%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.shenjikeng {
  background: url("@/assets/rou/icon2.png") no-repeat center center;
  background-size: 100% 100%;
  padding: 5px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.is-rounded {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 5px solid #6bb6ed;
}
.is-rounded2 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 5px solid #1EA59D;
}
.is-rounded3 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 5px solid #FFBF5B;
}
.is-rounded4 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 5px solid #FF855B;
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
</style>
