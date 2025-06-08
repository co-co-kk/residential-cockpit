<template>
  <div class="">
    <div>
      <PubTit style="width: 870px" :title="'人员管控'" :width="1088"></PubTit>
      <div class="mt-[20px] flex">
        <img src="@/assets/rou/icon57.png"  draggable="false" class="mr-[50px]" alt="" />
        <div
          class="w-[40%] h-[180px] flex flex-col items-center justify-center"
        >
          <!-- <div class="text-[20px] mb-[20px] is-title-bg text-[#fff]">特殊工种分布</div> -->
          <!-- <EcharsWrapper :chartData="coverageData"></EcharsWrapper> -->
           <img src="@/assets/rou/icon641.png" alt="">
        </div>
      </div>
    </div>
    <div>
      <PubTit
        style="width: 670px"
        :title="'安全监管'"
        :width="1088"
      ></PubTit>
      <div class="flex items-center">
      <img src="@/assets/rou/icon58.png" class="ml-[50px] w-[330px] h-[212px]" alt="">
        <EcharsWrapper class="w-[350px] h-[250px]" :chartData="coverageData4"></EcharsWrapper>
        <img src="@/assets/rou/icon642.png"  draggable="false" alt="">
      </div>

    </div>
    <div>
      <PubTit style="width: 670px" :title="'质量监测'" :width="1088"></PubTit>
      <div class="flex text-[#fff]">
        <div
          class="w-[50%] h-[350px] flex flex-col items-center justify-center"
        >
          <div class="w-[100%] flex justify-center flex-col items-center">
            <div class="text-[18px] is-title-bg mt-[10px] mb-[10px]">质量问题情况</div>
            <div class="grid grid-cols-4 grid-rows-1 gap-[10px] w-[100%] ">
              <div class="flex flex-col relative after:absolute after:right-[30px] after:top-[12.5%] after:block after:content-[''] after:w-[1px] after:h-[75%] after:bg-[rgba(110,181,233,0.3)]"  v-for="(item,index) in listData">
                <div class="flex items-end">
                  <span class="text-[30px]">{{item.value}}</span>
                  <span class="text-[18px] ml-[5px]">个</span>
                </div>
                <span class="text-[18px] mt-[5px]">{{item.name}}</span>
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
          <EcharsWrapper :chartData="coverageData3"></EcharsWrapper>
        </div>
        <div class="flex">
          <img  draggable="false" src="@/assets/rou/icon643.png" alt="">
          <img  draggable="false" src="@/assets/rou/icon644.png" alt="">
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from "vue";
import PubTit from "@/components/public/PubTit.vue";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import { coverageData,coverageData3,coverageData4 } from "./echarsOptions.js";
import SeamlessScroll from "@/components/SeamlessScroll.vue";
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
  }
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
  }
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

</style>
