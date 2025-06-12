<template>
  <div
    class="w-[100%] bg-[#000] relative"
    id="isbody"
    style="height: 1080px"
  >
    <!-- left -->
    <div
      class="w-[45px] top-[15%] h-[70%] left-0 z-2 absolute is-left-bg animate-pulse"
    ></div>
    <!-- right -->
    <div
      class="w-[45px] top-[15%] h-[70%] right-0 z-2 absolute is-right-bg animate-pulse"
    ></div>
    <!-- top -->
    <div
      class="w-[100%] h-[125px] top-0 z-1 absolute px-[54px] w-[calc(100%-108px)] is-top-bg"
    >
      <div class="title_container">
        <div class="is-title1 mt-[5px] pl-[80px] ml-[1800px]">
          东南医院二期
        </div>
        <div
          class="w-[1600px] h-[100%] font-400 flex mt-[20px] justify-end text-[24px] text-[#B1EAFF]"
        >
          <div class="mr-[20px]">
            <span>
              {{ formattedDate }}
            </span>
          </div>
          <div class="flex h-[100%] ml-[50px]">
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
     <!-- bottom -->
    <div
      class="w-[1900px] bottom-0 h-[76px] z-11 right-[calc(50%-950px)] absolute is-bottom-bg animate-pulse"
    ></div>
    <!-- <Bim
      class="h-[1080px]"
      @handleEmitShexiangtou="
        jiankongDialogVisible = true
      "
      @handleEmitYimo="centerDiaShown = true"
      @handleEmitJiqiren="jiqirenDiaShown = true"
    /> -->
    <div
      class="absolute z-99 text-[#fff] top-[20px] left-[50px] text-[24px] flex items-center cursor-pointer"
      @click="router.back()"
    >
      <img src="@/assets/rou/back.png" alt="" />
      <span class="ml-[20px]">返回</span>
    </div>
   
    <!-- 顶部kpi -->
    <div
      class="absolute top-[100px] left-[calc(50%-700px)] grid grid-cols-6 gap-[30px]"
    >
      <div
        class="rounded-[5px] w-[200px] flex items-center cursor-pointer w-[220px]"
        style="
          border: 4px solid
            rgba(61, 133, 207, 0.4);
        "
        v-for="(item, index) in middleOptions"
        :key="index"
      >
        <!-- <img
          :src="item.params4"
          class="mx-[10px] w-[29px] h-[27px]"
          alt=""
        /> -->
        <div class="w-full p-[20px] px-[10px] pt-[10px]">
          <div class="flex w-full">
          <img
          :src="item.params4"
          class="mx-[10px] w-[32px] h-[34px]"
          alt=""
        />
            <div
            class="text-[#FFFFFF] text-[18px] font-bold mt-[5px]"
            >
            {{ item.params1 }}
          </div>
          </div>
          <div class="flex justify-center mt-[22px]">
            <div>
              <span class="tit1">{{
              item.params2
            }}</span>
            <span
              class="tit1 ml-[10px]"
              style="font-size: 14px"
              >{{ item.params3 }}</span
            >
            <div class="tit1 text-center" style="font-size: 16px">实时</div>
            </div>
            <div class="ml-[50px]">
              <span class="tit1">{{
              item.params5
            }}</span>
            <span
              class="tit1 ml-[10px]"
              style="font-size: 14px"
              >{{ item.params6 }}</span
            >
            <div class="tit1 text-center" style="font-size: 16px">总计</div>
            </div>
          </div>
         
        </div>
      </div>
      <!-- <div
        class="rounded-[5px] w-[200px] flex items-center cursor-pointer"
        style="
          border: 4px solid
            rgba(61, 133, 207, 0.4);
        "
        v-for="(item, index) in middleOptions"
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
      </div> -->
    </div>
    <!-- 左 -->
    <div
      class="absolute h-[1080px] left-0 pl-[55px] top-0 box-border pt-[40px] bg-[rgba(0,0,0,0.6)]"
      style="
        background: linear-gradient(
          0deg,
          rgba(4, 29, 60, 0.4) 0%,
          rgba(7, 38, 83, 0.9) 100%
        );
      "
    >
      <leftContent
        @handleEmitJiqirentanchuang="
          jiqirentanchuang = true
        "
        @handleEmitShebeiTanchuang="
          shebeiTanchuang = true
        "
      ></leftContent>
    </div>
    <!-- 右 -->
    <div
      class="absolute h-[1080px] pt-[60px] box-border pl-[20px] pr-[20px] right-0 top-0 pt-[0px] bg-[rgba(0,0,0,0.6)]"
      style="
        background: linear-gradient(
          0deg,
          rgba(4, 29, 60, 0.4) 0%,
          rgba(7, 38, 83, 0.9) 100%
        );
      "
    >
      <rightContent />
    </div>
    <!-- <img
      class="absolute left-[calc(50%-722px)] top-[850px]"
      src="@/assets/rou/icon54.png"
      draggable="false"
      alt=""
    /> -->
    <div
    class="absolute right-[calc(50%-500px)] top-[850px] w-[1000px]"
    >
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
       <div class="flex flex-col items-center cursor-pointer" @click="diaShown=true">
        <img
          src="@/assets/rou/xianshang.png"
          class="w-[65px] h-[65px] mx-[30px] cursor-pointer"
          alt=""
        />
        <div class="text-[16px] text-[#fff] mt-[10px]">线上指挥部</div>
       </div>
      </div>
       </div>
    <img
      class="absolute right-[1400px] top-[770px] w-[72px] h-[58px] cursor-pointer"
      src="@/assets/rou/icon59.png"
      draggable="false"
      alt=""
      @click="imgShown = !imgShown"
    />
    <!-- 图标 -->
    <!-- 楼层切换 -->
    <!-- <img
      class="absolute top-[328px] w-[100px] h-[100px] right-[1255px] cursor-pointer animate-pulse"
      src="@/assets/rou/floor.png"
      @click="floorVisible = true"
      alt=""
    /> -->
    <!-- 飞机 -->
    <!-- <img
      class="absolute top-[228px] w-[100px] h-[100px] right-[1255px] cursor-pointer animate-pulse"
      src="@/assets/rou/feiji.png"
      @click="feijiVisible = true"
      alt=""
    /> -->
    <!-- 弹窗1 -->
    <el-dialog
      v-model="centerDialogVisible"
      style="width: 1500px"
      align-center
      class="video-dialog"
    >
      <video
        v-if="centerDialogVisible"
        src="@/assets/video/yiyuan.mp4"
        style="
          width: 100%;
          height: 500px;
          object-fit: cover;
        "
        controls
        autoplay
        muted
      ></video>
    </el-dialog>
    <!-- 一摸到底弹窗 -->
    <div
      class="w-[1117px] h-[1080px] is-left-dialog absolute top-[0] left-[calc(50%-650px)] z-99"
      v-if="centerDiaShown"
    >
      <div class="relative">
        <img
          src="@/assets/rou/guanbi.png"
          class="absolute right-[100px] top-[20px] cursor-pointer z-[99]"
          @click="centerDiaShown = false"
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
              @click="handleActNav(index, item)"
              >{{ item.name }}</span
            >
          </div>
          <template
            v-if="tabList[activeTabIndex].yitu"
          >
            <div class="text-[#fff]">
              <div
                class="flex justify-center mt-[20px]"
              >
                <div
                  class="h-[85px] w-[495px] title-bg1 text-[18px] flex justify-center pt-[20px] box-border"
                >
                  一图到底
                </div>
              </div>
              <div class="flex justify-center">
                <div
                  class="w-[448px] h-[332px] p-[10px] box-border flex justify-center items-center mr-[30px]"
                  style="border: 1px solid #fff"
                >
                  <!-- <img
                      :src="actImg"
                      alt=""
                    /> -->
                  <img
                    src="@/assets/rou/sheji.jpeg"
                    class="w-[448px] h-[332px]"
                    alt=""
                  />
                </div>
                <div
                  class="h-[332px] overflow-auto hide-scrollbar"
                >
                  <div
                    class="w-[332px] cursor-pointer h-[63px] is-item-5 text-[16px] pl-[50px] pt-[20px] box-border"
                    v-for="(itm, idx) in tabList[
                      activeTabIndex
                    ].yitu"
                    :key="idx"
                    @click="handleChange(item)"
                  >
                    {{ itm.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="text-[#fff]">
              <div
                class="flex justify-center mt-[20px]"
              >
                <div
                  class="h-[85px] w-[495px] title-bg1 text-[18px] flex justify-center pt-[20px] box-border"
                >
                  一模到底
                </div>
              </div>
              <div class="flex justify-center">
                <div
                  class="w-[692px] h-[365px] is-item-6 mr-[30px] p-[30px]"
                >
                  <video
                    :src="videoUrl"
                    style="
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                    "
                    controls
                    autoplay
                    muted
                  ></video>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 监控弹窗 -->
    <el-dialog
      v-model="jiankongDialogVisible"
      style="width: 1500px"
      align-center
      class="video-dialog"
    >
      <div
        class="w-[1500px] h-[800px] grid grid-cols-2 gap-[10px] grid-rows-2"
      >
        <div
          v-for="(url, key) in videoUrls"
          :key="key"
        >
          <video
            :ref="
              (el) => {
                if (el) videoRefs[key] = el;
              }
            "
            class="w-[720px] h-[360px]"
            style="object-fit: cover"
            controls
            autoplay
            muted
          ></video>
        </div>
      </div>
    </el-dialog>
    <!-- 楼层切换 -->
    <el-dialog
      v-model="floorVisible"
      style="width: 2500px"
      align-center
      class="video-dialog"
    >
      <div
        style="width: 100%; height: 900px"
        class="relative"
      >
        <iframe
          src="http://mars3d.cn/editor-vue.html?key=ex_6_3_9&id=graphic/entity/model-moveTo"
          style="
            width: 100%;
            height: 100%;
            border: none;
          "
        ></iframe>
        <div
          class="w-[100%] h-[50px] bg-[#fff] absolute top-0 left-0 text-[#000] text-[28px] flex justify-center items-center"
        >
          BIM楼层展示
        </div>
      </div>
    </el-dialog>
    <!-- 漫游 -->
    <el-dialog
      v-model="feijiVisible"
      style="width: 2500px"
      align-center
      class="video-dialog"
    >
      <div
        style="width: 100%; height: 900px"
        class="relative"
      >
        <iframe
          src="http://mars3d.cn/editor-vue.html?key=ex_1_3_10&id=thing/camera/tween"
          style="
            width: 100%;
            height: 100%;
            border: none;
          "
        ></iframe>
        <div
          class="w-[100%] h-[50px] bg-[#fff] absolute top-0 left-0 text-[#000] text-[28px] flex justify-center items-center"
        >
          漫游巡视
        </div>
      </div>
    </el-dialog>
    <!-- 机器人视频 -->
    <el-dialog
      v-model="jiqirenDiaShown"
      style="width: 1500px"
      align-center
      class="video-dialog"
    >
      <video
        v-if="jiqirenDiaShown"
        src="@/assets/video/jiqiren.mp4"
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
    <div
      v-show="imgShown"
      class="absolute top-[1100px] right-[0px]"
    >
      <div class="relative">
        <img
          class="absolute z-999 right-[1300px] bottom-[350px] w-[534px] h-[333px]"
          src="@/assets/rou/icon60.png"
          draggable="false"
          alt=""
        />
        <span
          class="absolute z-999 right-[1300px] cursor-pointer bottom-[620px] w-[50px] h-[50px]"
          @click="imgShown = false"
        ></span>
        <span
          class="absolute z-999 right-[1300px] cursor-pointer bottom-[400px] w-[100px] h-[200px]"
          @click="diaShown = true"
        ></span>
      </div>
    </div>
    <!-- 右弹窗 -->
    <div
      class="w-[1117px] h-[1080px] is-left-dialog absolute right-[70px] top-0 z-99 text-[#fff]"
      v-if="diaShown"
    >
      <div
        class="relative after:block after:content-[''] after:absolute after:w-[90%] after:h-[1px] after:bg-[rgba(15,97,203,0.4)] after:bottom-0 after:left-[5%]"
      >
        <img
          src="@/assets/rou/guanbi.png"
          class="absolute right-[100px] top-[20px] cursor-pointer z-[99]"
          @click="diaShown = false"
          alt=""
        />
        <span
          class="ml-[50px] nav-item-act cursor-pointer mt-[20px]"
          >多人商会</span
        >
      </div>
      <div class="flex flex-col items-center">
        <div
          class="flex justify-center mt-[10px]"
        >
          <div
            class="h-[85px] w-[495px] text-[18px] flex justify-center pt-[20px] box-border"
          >
            应急指挥部
          </div>
        </div>
        <div class="flex">
          <div
            class="flex w-[300px] h-[125px] bg-[rgba(64,110,169,0.4)] mr-[40px]"
          >
            <img
              src="@/assets/rou/ren.png"
              alt=""
            />
            <div
              class="grid grid-rows-4 p-[10px] text-[20px]"
            >
              <span
                class="text-[#E0ECFF] text-[18px]"
                >总指挥</span
              >
              <span
                class="text-[#E0ECFF] text-[14px]"
                >缪剑峰</span
              >
              <span
                class="text-[#E0ECFF] text-[14px]"
                >18996383232</span
              >
              <span
                class="text-[#73FFB1] text-[14px]"
                >在线</span
              >
            </div>
          </div>
          <div
            class="flex w-[300px] h-[125px] bg-[rgba(64,110,169,0.4)]"
          >
            <img
              src="@/assets/rou/ren.png"
              alt=""
            />
            <div
              class="grid grid-rows-4 p-[10px] text-[20px]"
            >
              <span
                class="text-[#E0ECFF] text-[18px]"
                >副总指挥</span
              >
              <span
                class="text-[#E0ECFF] text-[14px]"
                >郑显潮</span
              >
              <span
                class="text-[#E0ECFF] text-[14px]"
                >15696186503</span
              >
              <span
                class="text-[#73FFB1] text-[14px]"
                >在线</span
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col items-center"
        v-for="(item, index) in peopleList"
        :key="index"
      >
        <div
          class="flex justify-center mt-[10px]"
        >
          <div
            class="h-[85px] w-[495px] text-[18px] flex justify-center pt-[20px] box-border"
          >
            {{ item.type }}
          </div>
        </div>
        <div class="flex">
          <div
            class="flex w-[300px] h-[125px] bg-[rgba(64,110,169,0.4)] mr-[40px]"
          >
            <img
              src="@/assets/rou/ren.png"
              alt=""
            />
            <div
              class="grid grid-rows-4 p-[10px] text-[20px]"
            >
              <span
                class="text-[#E0ECFF] text-[18px]"
                >组长</span
              >
              <span
                class="text-[#E0ECFF] text-[14px]"
                >{{ item.zz }}</span
              >
              <span
                class="text-[#E0ECFF] text-[14px]"
                >{{ item.tel }}</span
              >
              <span
                class="text-[#73FFB1] text-[14px]"
                >在线</span
              >
            </div>
          </div>
          <div>
            <div
              class="is-tit2 w-[550px] pr-[60px] h-[40px] flex items-center text-[18px] pl-[50px] box-border cursor-pointer"
              v-for="(itm, idx) in item.people"
              :key="idx"
            >
              <div>
                <i
                  class="text-[#79C5FF] font-600 mr-[30px]"
                  >{{ itm.type }}</i
                >
                <span class="">{{
                  itm.name
                }}</span>
              </div>
              <div
                class="text-[13px] ml-[10px] text-[#6BFFAC]"
              >
                {{ itm.tel }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-[20px]">
        <div
          class="flex justify-center items-center is-faqi text-[22px] cursor-pointer"
        >
          发起商会
        </div>
      </div>
    </div>
    <!-- 机器人弹窗 -->
    <div
      class="w-[100%] is-robot h-[1080px] is-left-dialog absolute left-[0] top-0 z-99 text-[#fff]"
      v-if="jiqirentanchuang"
    >
      <div class="relative w-[100%] h-[100%]">
        <img
            src="@/assets/rou/guanbi.png"
            @click="jiqirentanchuang = false"
            class="absolute right-[50px] top-[50px] cursor-pointer z-[99]"
            alt=""
          />
        <div
          class="grid grid-cols-4 gap-[80px] absolute bottom-[50px] left-[50%]"
        >
          <img
            src="@/assets/rou/arrow.png"
            class="cursor-pointer"
            alt=""
          />
          <img
            src="@/assets/rou/arrow.png"
            class="cursor-pointer transform-rotate-90"
            alt=""
          />
          <img
            src="@/assets/rou/arrow.png"
            class="cursor-pointer transform-rotate-180"
            alt=""
          />
          <img
            src="@/assets/rou/arrow.png"
            class="cursor-pointer transform-rotate-270"
            alt=""
          />
        </div>
         <video src="http://172.30.41.194:20035/jiqiren1.mp4" class="ml-[1105px] mt-[50px]" style="width: 72%; object-fit: cover;height: 880px;" controls autoplay muted></video>
      </div>
    </div>
    <div
      class="w-[1217px] h-[1080px] is-left-dialog absolute left-[50px] top-0 z-99 text-[#fff]"
      v-if="shebeiTanchuang"
    >
      <div
        class="relative after:block after:content-[''] after:absolute after:w-[90%] after:h-[1px] after:bg-[rgba(15,97,203,0.4)] after:bottom-0 after:left-[5%]"
      >
        <img
          src="@/assets/rou/guanbi.png"
          class="absolute right-[100px] top-[20px] cursor-pointer z-[99]"
          @click="shebeiTanchuang = false"
          alt=""
        />
        <span
          class="ml-[50px] nav-item-act cursor-pointer mt-[20px]"
          >设备总览</span
        >
      </div>
      <div class="pl-[50px]">
        <img
          src="@/assets/rou/icon645.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Bim from "@/components/map/Bim.vue";
import {
  ref,
  reactive,
  onMounted,
  watch,
  onUnmounted,
  nextTick,
  computed
} from "vue";
import autofit from "autofit.js";
import leftContent from "./components/leftContent/index.vue";
import rightContent from "./components/rightContent/index.vue";
import { useRouter } from "vue-router";
import Icon55 from "@/assets/rou/icon55.png";
import Icon56 from "@/assets/rou/icon56.png";
import Hls from "hls.js";
import { useNow } from "@vueuse/core";
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
const router = useRouter();
const centerDialogVisible = ref(false);
const jiankongDialogVisible = ref(false);
const centerDiaShown = ref(false);
const floorVisible = ref(false);
const feijiVisible = ref(false);
const jiqirenDiaShown = ref(false);
const jiqirentanchuang = ref(false);
const shebeiTanchuang = ref(false);
const imgShown = ref(false);
const diaShown = ref(false);
const activeTabIndex = ref(1);
const isLoading = ref(true);
const tabList = ref([
  {
    name: "勘查",
  },
  {
    name: "设计",
    yitu: [
      {
        name: "设计说明(0)",
        url: Icon55,
      },
      {
        name: "效果图(1)",
        url: Icon56,
      },
      {
        name: "立面彩图(1)",
        url: Icon55,
      },
      {
        name: "分析图(8)",
      },
    ],
    yimodel: "http://172.30.41.194:20035/2.mp4",
  },
  {
    name: "施工",
    yitu: [
      {
        name: "建筑说明(0)",
        url: Icon55,
      },
      {
        name: "建筑平面图(1)",
        url: Icon56,
      },
      {
        name: "墙面大样图(1)",
        url: Icon55,
      },
      {
        name: "结构说明(1)",
      },
      {
        name: "基础平面布置图(1)",
      },
      {
        name: "结构平面布置图(1)",
      },
      {
        name: "钢结构设计图(1)",
      },
      {
        name: "竖向构件配筋图(1)",
      },
      {
        name: "楼梯图(1)",
      },
    ],
    yimodel: "http://172.30.41.194:20035/1.mp4",
  },
  {
    name: "验收",
  },
  {
    name: "归档",
  },
]);
const videoRefs = ref({});
const hlsInstances = ref([]);
import ItemImg1 from "@/assets/image/home/zaijian.png";
import ItemImg2 from "@/assets/image/home/canjian.png";
import ItemImg3 from "@/assets/image/home/congye.png";
import ItemImg4 from "@/assets/image/home/ganzhi.png";
import ItemImg5 from "@/assets/image/home/hetong.png";
import ItemImg6 from "@/assets/image/home/quxian.png";
const middleOptions = ref([
  {
    params1: "实名人员检测",
    params2: "80",
    params3: "人",
    params5: "2010",
    params6: "人次",
    params4: ItemImg1,
  },
  {
    params1: "风险隐患",
    params2: "2",
    params3: "个",
    params5: "32",
    params6: "个",
    params4: ItemImg2,
  },
  {
    params1: "风险隐患整改率",
    params2: "96",
    params3: "%",
    params5: "98",
    params6: "%",
    params4: ItemImg3,
  },
  {
    params1: "到场监督次数",
    params2: "1",
    params3: "次",
    params5: "20",
    params6: "次",
    params4: ItemImg4,
  },
  {
    params1: "监督到场率",
    params2: "85",
    params3: "%",
    params5: "95",
    params6: "%",
    params4: ItemImg5,
  },
  // {
  //   params1: "合同履约金额",
  //   params2: "4",
  //   params3: "千亿",
  //   params4: ItemImg6,
  // },
]);
const videoUrls = {
  camera1:
    "https://open.ys7.com/openlive/7b0029d50c6f40189e2907aba1a30205.m3u8",
  camera2:
    "https://open.ys7.com/openlive/25e5e637ec1d4e80845e98bf5ee7de84.m3u8",
  camera3:
    "https://open.ys7.com/openlive/8076028df4744e758ccc0dfe3ac67ad9.m3u8",
  camera4:
    "https://open.ys7.com/openlive/269f64a09d2741288c713248042f672e.m3u8",
};
const videoUrl = ref(
  "http://172.30.41.194:20035/2.mp4"
);
const peopleList = ref([
  {
    zz: "周洋",
    tel: "15023296660",
    type: "救援组",
    people: [
      {
        type: "施工负责",
        name: "王光华",
        tel: "13290007735",
      },
      {
        type: "技术负责",
        name: "邹佳成",
        tel: "13696485366",
      },
      {
        type: "救援负责",
        name: "吴直杰",
        tel: "13372636088",
      },
    ],
  },
  {
    zz: "刘海",
    tel: "18623623561",
    type: "现场保障组",
    people: [
      {
        type: "现场秩序",
        name: "赵炫俊",
        tel: "13981829842",
      },
      {
        type: "通讯联络",
        name: "唐桢",
        tel: "15680738561",
      },
      {
        type: "装备保障",
        name: "唐建",
        tel: "15680738561",
      },
    ],
  },
  {
    zz: "常国强",
    tel: "13883569294",
    type: "物资保障组",
    people: [
      {
        type: "救援装备",
        name: "黄丹兰",
        tel: "18423544710",
      },
      {
        type: "物资运输",
        name: "杨思芸",
        tel: "13594355251",
      },
      {
        type: "生活物资",
        name: "乐鹏飞",
        tel: "19908359884",
      },
    ],
  },
]);
const handleActNav = (index, item) => {
  console.log(
    "🚀 ~ handleActNav ~ item:",
    item.yimodel
  );
  videoUrl.value = item.yimodel;
  activeTabIndex.value = index;
};
const initHls = () => {
  Object.entries(videoUrls).forEach(
    ([key, url]) => {
      const video = videoRefs.value[key];
      if (!video) return;

      if (Hls.isSupported()) {
        const hls = new Hls({
          debug: false,
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
        });

        hls.loadSource(url);
        hls.attachMedia(video);
        hlsInstances.value.push(hls);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          isLoading.value = false;
          video.play().catch((e) => {
            console.error("视频播放失败:", e);
            // 尝试重新加载
            hls.startLoad();
          });
        });

        hls.on(
          Hls.Events.ERROR,
          (event, data) => {
            console.error("HLS错误:", data);
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  console.log(
                    "网络错误，尝试重新加载"
                  );
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  console.log(
                    "媒体错误，尝试恢复"
                  );
                  hls.recoverMediaError();
                  break;
                default:
                  console.log(
                    "致命错误，重新初始化"
                  );
                  hls.destroy();
                  initHls();
                  break;
              }
            }
          }
        );
      } else if (
        video.canPlayType(
          "application/vnd.apple.mpegurl"
        )
      ) {
        video.src = url;
        video.addEventListener(
          "loadedmetadata",
          () => {
            isLoading.value = false;
            video.play().catch((e) => {
              console.error("视频播放失败:", e);
              // 尝试重新加载
              video.load();
            });
          }
        );
      } else {
        console.error(
          "当前浏览器不支持 HLS 播放"
        );
      }
    }
  );
};

watch(
  () => jiankongDialogVisible.value,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        initHls();
      });
    } else {
      // 清理HLS实例
      hlsInstances.value.forEach((hls) => {
        hls.destroy();
      });
      hlsInstances.value = [];
    }
  }
);

onUnmounted(() => {
  hlsInstances.value.forEach((hls) => {
    hls.destroy();
  });
});
// onMounted(() => {
//   autofit.init({
//     dh: 1080,
//     dw: 3840,
//     el: "#isbody",
//     resize: true,
//   });
// });
</script>

<style lang="scss" scoped>
.is-title1 {
  color: #fff;
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 48px;
  line-height: 26px;
  letter-spacing: 40px;
}
.is-left-dialog {
  background: url("@/assets/rou/maDia.png")
    no-repeat 100% 100% / cover;
}

.nav-item-act {
  padding: 16px;
  height: 42px;
  width: 200px;
  display: block;
  text-align: center;
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
.is-faqi {
  width: 182px;
  height: 54px;
  background: url("@/assets/rou/icon66.png")
    no-repeat center center;
  background-size: 100% 100%;
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
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* 隐藏 Chrome 和 Safari 中的滚动条 */
}

.is-item-6 {
  background: url("@/assets/rou/icon68.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.title-bg1 {
  background: url("@/assets/rou/icon62.png")
    no-repeat 100% 100% / cover;
}
.is-robot {
  background: url("@/assets/rou/jiqiren.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.is-top-bg {
  background: url("@/assets/rou/top-bg.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.title_container {
  text-align: center;
  font-size: 60px;
  // width: 100%;
  display: flex;
  // justify-content: center;
  // justify-content: space-between;
  align-items: center;
  height: 90px;
  font-weight: 800;
  background: linear-gradient(to top, #adbecc, #ffffff);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
