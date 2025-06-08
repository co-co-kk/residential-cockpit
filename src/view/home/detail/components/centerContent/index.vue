<template>
  <div class="text-[#fff]">
    <div class="w-[100%] h-[1080px]">
      <Bim @handleEmitShexiangtou="centerDiaShown = true" />

      <div class="px-[30px] box-border">
        <!-- <img
          class="absolute top-[267px] left-[1915px] cursor-pointer animate-pulse"
          src="@/assets/rou/icon55.png"
          alt=""
          @click="centerDialogVisible2 = true"
        /> -->
        <!-- <img
          class="absolute top-[267px] left-[2215px] cursor-pointer w-[100px] animate-pulse"
          src="@/assets/rou/bimviz.png"
          alt=""
          @click="centerDialogVisible4 = true"
        /> -->
        <img
          class="absolute top-[498px] right-[1155px] cursor-pointer animate-pulse"
          src="@/assets/rou/icon56.png"
          @click="centerDialogVisible = true"
          alt=""
        />
        <!-- 楼层切换 -->
        <img
          class="absolute top-[368px] w-[100px] h-[100px] right-[1155px] cursor-pointer animate-pulse"
          src="@/assets/rou/floor.png"
          @click="floorVisible = true"
          alt=""
        />
         <!-- 飞机 -->
         <img
          class="absolute top-[268px] w-[100px] h-[100px] right-[1155px] cursor-pointer animate-pulse"
          src="@/assets/rou/feiji.png"
          @click="feijiVisible = true"
          alt=""
        />
        <!-- <img
          class="absolute top-[568px] left-[1915px] cursor-pointer animate-pulse w-[100px]"
          src="@/assets/rou/bimviz.png"
          @click="centerDialogVisible3 = true"
          alt=""
        /> -->
        <img
          class="absolute left-[1180px] bottom-[0px] w-[1550px]"
          src="@/assets/rou/icon54.png"
          alt=""
        />
        <div v-show="imgShown" class="relative">
          <img
            class="absolute right-[1200px] bottom-[350px] w-[534px] h-[333px]"
            src="@/assets/rou/icon60.png"
            alt=""
          />
          <span
            class="absolute right-[1200px] cursor-pointer bottom-[620px] w-[50px] h-[50px]"
            @click="imgShown = false"
          ></span>
          <span
            class="absolute right-[1200px] cursor-pointer bottom-[400px] w-[100px] h-[200px]"
            @click="diaShown = true"
          ></span>
        </div>
        <img
          class="absolute right-[1300px] bottom-[270px] w-[72px] h-[58px] cursor-pointer"
          src="@/assets/rou/icon59.png"
          alt=""
          @click="imgShown = !imgShown"
        />
        <!-- 右弹窗 -->
        <div
          class="w-[1117px] h-[1080px] is-left-dialog absolute right-[40px] top-0 z-99 text-[#fff]"
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
            <span class="ml-[50px] nav-item-act cursor-pointer mt-[20px]"
              >多人商会</span
            >
          </div>
          <div class="flex flex-col items-center">
            <div class="flex justify-center mt-[10px]">
              <div
                class="h-[85px] w-[495px] is-title1 text-[18px] flex justify-center pt-[20px] box-border"
              >
                应急指挥部
              </div>
            </div>
            <div class="flex">
              <div
                class="flex w-[300px] h-[125px] bg-[rgba(64,110,169,0.4)] mr-[40px]"
              >
                <img src="@/assets/rou/ren.png" alt="" />
                <div class="grid grid-rows-4 p-[10px] text-[20px]">
                  <span class="text-[#E0ECFF] text-[18px]">总指挥</span>
                  <span class="text-[#E0ECFF] text-[14px]">缪剑峰</span>
                  <span class="text-[#E0ECFF] text-[14px]">18996383232</span>
                  <span class="text-[#73FFB1] text-[14px]">在线</span>
                </div>
              </div>
              <div class="flex w-[300px] h-[125px] bg-[rgba(64,110,169,0.4)]">
                <img src="@/assets/rou/ren.png" alt="" />
                <div class="grid grid-rows-4 p-[10px] text-[20px]">
                  <span class="text-[#E0ECFF] text-[18px]">副总指挥</span>
                  <span class="text-[#E0ECFF] text-[14px]">郑显潮</span>
                  <span class="text-[#E0ECFF] text-[14px]">15696186503</span>
                  <span class="text-[#73FFB1] text-[14px]">在线</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col items-center"
            v-for="(item, index) in peopleList"
            :key="index"
          >
            <div class="flex justify-center mt-[10px]">
              <div
                class="h-[85px] w-[495px] is-title1 text-[18px] flex justify-center pt-[20px] box-border"
              >
                {{ item.type }}
              </div>
            </div>
            <div class="flex">
              <div
                class="flex w-[300px] h-[125px] bg-[rgba(64,110,169,0.4)] mr-[40px]"
              >
                <img src="@/assets/rou/ren.png" alt="" />
                <div class="grid grid-rows-4 p-[10px] text-[20px]">
                  <span class="text-[#E0ECFF] text-[18px]">组长</span>
                  <span class="text-[#E0ECFF] text-[14px]">{{ item.zz }}</span>
                  <span class="text-[#E0ECFF] text-[14px]">{{ item.tel }}</span>
                  <span class="text-[#73FFB1] text-[14px]">在线</span>
                </div>
              </div>
              <div>
                <div
                  class="is-tit2 w-[550px] pr-[60px] h-[40px] flex items-center text-[18px] pl-[50px] box-border cursor-pointer"
                  v-for="(itm, idx) in item.people"
                  :key="idx"
                >
                  <div>
                    <i class="text-[#79C5FF] font-600 mr-[30px]">{{
                      itm.type
                    }}</i>
                    <span class="">{{ itm.name }}</span>
                  </div>
                  <div class="text-[13px] ml-[10px] text-[#6BFFAC]">
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
      </div>

      <!-- 中间弹窗 -->
      <div
        class="w-[1117px] h-[1080px] is-left-dialog absolute top-[0] left-[1400px] z-99"
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
                  'nav-item-act': activeTabIndex == index,
                }"
                v-for="(item, index) in tabList"
                :key="index"
                @click="handleActNav(index, item)"
                >{{ item.name }}</span
              >
            </div>
            <template v-if="tabList[activeTabIndex].yitu">
              <div class="text-[#fff]">
                <div class="flex justify-center mt-[20px]">
                  <div
                    class="h-[85px] w-[495px] is-title1 text-[18px] flex justify-center pt-[20px] box-border"
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
                  <div class="h-[332px] overflow-auto">
                    <div
                      class="w-[332px] cursor-pointer h-[63px] is-item-5 text-[16px] pl-[50px] pt-[20px] box-border"
                      v-for="(itm, idx) in tabList[activeTabIndex].yitu"
                      :key="idx"
                      @click="handleChange(item)"
                    >
                      {{ itm.name }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-[#fff]">
                <div class="flex justify-center mt-[20px]">
                  <div
                    class="h-[85px] w-[495px] is-title1 text-[18px] flex justify-center pt-[20px] box-border"
                  >
                    一模到底
                  </div>
                </div>
                <div class="flex justify-center">
                  <div class="w-[692px] h-[365px] is-item-6 mr-[30px] p-[30px]">
                    <video
                      :src="videoUrl"
                      style="width: 100%; height: 100%; object-fit: cover"
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
        v-model="centerDialogVisible"
        style="width: 1500px"
        align-center
        class="video-dialog"
      >
        <div
          class="w-[1500px] h-[800px] grid grid-cols-2 gap-[10px] grid-rows-2"
        >
          <div v-for="(url, key) in videoUrls" :key="key">
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
      <el-dialog
        v-model="centerDialogVisible2"
        style="width: 1500px"
        align-center
        class="video-dialog"
      >
        <video
          v-if="centerDialogVisible2"
          src="@/assets/video/jiqiren.mp4"
          style="width: 100%; height: 800px; object-fit: cover"
          controls
          autoplay
          muted
        ></video>
      </el-dialog>
      <el-dialog
        v-model="centerDialogVisible3"
        style="width: 1500px"
        align-center
        class="video-dialog"
      >
        <video
          v-if="centerDialogVisible3"
          src="http://172.30.41.194:20035/3.mp4"
          style="width: 100%; height: 800px; object-fit: cover"
          controls
          autoplay
          muted
        ></video>
      </el-dialog>
      <el-dialog
        v-model="centerDialogVisible4"
        style="width: 1500px"
        align-center
        class="video-dialog"
      >
        <video
          v-if="centerDialogVisible4"
          src="http://172.30.41.194:20035/1.4.mp4"
          style="width: 100%; height: 800px; object-fit: cover"
          controls
          autoplay
          muted
        ></video>
      </el-dialog>
      <!-- 楼层切换 -->
      <el-dialog
        v-model="floorVisible"
        style="width: 2500px"
        align-center
        class="video-dialog"
      >
        <div style="width: 100%; height: 900px" class="relative">
          <iframe
            src="http://mars3d.cn/editor-vue.html?key=ex_6_3_9&id=graphic/entity/model-moveTo"
            style="width: 100%; height: 100%; border: none"
          ></iframe>
          <div class="w-[101%] h-[50px] bg-[#fff] absolute top-0 left-0 text-[#000] text-[28px] flex justify-center items-center">
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
        <div style="width: 100%; height: 900px" class="relative">
          <iframe
            src="http://mars3d.cn/editor-vue.html?key=ex_1_3_10&id=thing/camera/tween"
            style="width: 100%; height: 100%; border: none"
          ></iframe>
          <div class="w-[100%] h-[50px] bg-[#fff] absolute top-0 left-0 text-[#000] text-[28px] flex justify-center items-center">
              漫游巡视
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { BorderBox1, Decoration1 } from "@kjgl77/datav-vue3";

import Icon55 from "@/assets/rou/icon55.png";
import Icon56 from "@/assets/rou/icon56.png";
import PubTit from "@/components/public/PubTit.vue";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import { coverageData } from "./echarsOptions.js";
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import Bim from "@/components/map/Bim.vue";
const diaShown = ref(false);
const centerDiaShown = ref(false);
import Hls from "hls.js";
const centerDialogVisible = ref(false);
const floorVisible = ref(false);
const feijiVisible=ref(false)
// 机器人
const centerDialogVisible2 = ref(false);
const centerDialogVisible3 = ref(false);
const centerDialogVisible4 = ref(false);
const videoRef1 = ref(null);
const videoRefs = ref({});
const hlsInstances = ref([]);
const imgShown = ref(false);
const isLoading = ref(true);

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
const videoUrl = ref("http://172.30.41.194:20035/2.mp4");
const handleChange = (item) => {
  console.log("🚀 ~ handleChange ~ item:", item);
  actImg.value = itm.url;
};
const handleActNav = (index, item) => {
  console.log("🚀 ~ handleActNav ~ item:", item.yimodel);
  videoUrl.value = item.yimodel;
  activeTabIndex.value = index;
};
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
const activeTabIndex = ref(1);
const activeImgIndex = ref(0);
const actImg = ref(Icon55);
const initHls = () => {
  Object.entries(videoUrls).forEach(([key, url]) => {
    const video = videoRefs.value[key];
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hlsInstances.value.push(hls);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        isLoading.value = false;
        video.play().catch((e) => console.log("播放失败:", e));
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS错误:", data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              initHls();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        isLoading.value = false;
        video.play().catch((e) => console.log("播放失败:", e));
      });
    }
  });
};

watch(
  () => centerDialogVisible.value,
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
</script>

<style lang="scss" scoped>
.video-container {
  position: relative;
  width: 100%;
  height: 800px;
  background: #000;

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 16px;
    z-index: 1;
  }

  .video-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.is-left-dialog {
  background: url("@/assets/rou/maDia.png") no-repeat 100% 100% / cover;
}

.nav-item-act {
  padding: 16px;
  height: 42px;
  width: 200px;
  display: block;
  text-align: center;
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
.is-faqi {
  width: 182px;
  height: 54px;
  background: url("@/assets/rou/icon66.png") no-repeat center center;
  background-size: 100% 100%;
}
.is-item-5 {
  background: url("@/assets/rou/icon67.png") no-repeat center center;
  background-size: 100% 100%;
}
.is-item-6 {
  background: url("@/assets/rou/icon68.png") no-repeat center center;
  background-size: 100% 100%;
}
</style>
