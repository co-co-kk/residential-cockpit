<template>
  <div class="">
    <div class="is-bg w-[1442px] h-[1000px] relative px-[30px] box-border">
    <img
      class="absolute top-[167px] left-[615px] cursor-pointer"
      src="@/assets/rou/icon55.png"
      alt=""
    />
    <img
      class="absolute top-[468px] left-[315px] cursor-pointer"
      src="@/assets/rou/icon56.png"
      @click="handleJump"
      alt=""
    />
    <img
      class="absolute left-[50px] bottom-[70px] w-[100%]"
      src="@/assets/rou/icon54.png"
      alt=""
    />
    <div v-show="imgShown" class=" ">
      <img
        class="absolute right-[0px] bottom-[350px] w-[534px] h-[333px]"
        src="@/assets/rou/icon60.png"
        alt=""
      />
      <span
        class="absolute right-0 cursor-pointer bottom-[620px] w-[50px] h-[50px]"
        @click="imgShown = false"
      ></span>
      <span
        class="absolute right-0  cursor-pointer bottom-[400px] w-[100px] h-[200px]"
        @click="diaShown = true"
      ></span>
    </div>
    <img
      class="absolute right-[70px] bottom-[270px] w-[72px] h-[58px] cursor-pointer"
      src="@/assets/rou/icon59.png"
      alt=""
      @click="imgShown = !imgShown"
    />
    <!-- 右弹窗 -->
    <div
      class="w-[1117px] h-[1080px] is-left-dialog absolute top-[-90px] right-[-1250px] z-99"
      v-if="diaShown"
    >
      <div
        class="relative  after:block after:content-[''] after:absolute after:w-[90%] after:h-[1px] after:bg-[rgba(15,97,203,0.4)] after:bottom-0 after:left-[5%]"
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
              <span class="text-[#E0ECFF] text-[14px]">张伟</span>
              <span class="text-[#E0ECFF] text-[14px]">133xxxxxxxx</span>
              <span class="text-[#73FFB1] text-[14px]">在线</span>
            </div>
          </div>
          <div class="flex w-[300px] h-[125px] bg-[rgba(64,110,169,0.4)]">
            <img src="@/assets/rou/ren.png" alt="" />
            <div class="grid grid-rows-4 p-[10px] text-[20px]">
              <span class="text-[#E0ECFF] text-[18px]">总指挥</span>
              <span class="text-[#E0ECFF] text-[14px]">张伟</span>
              <span class="text-[#E0ECFF] text-[14px]">133xxxxxxxx</span>
              <span class="text-[#73FFB1] text-[14px]">在线</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center" v-for="item in 3">
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
              <span class="text-[#E0ECFF] text-[14px]">张伟</span>
              <span class="text-[#E0ECFF] text-[14px]">133xxxxxxxx</span>
              <span class="text-[#73FFB1] text-[14px]">在线</span>
            </div>
          </div>
          <div>
            <div
              class="is-tit2 w-[550px] pr-[60px] h-[40px] flex items-center text-[18px] pl-[50px] box-border cursor-pointer"
              v-for="item in 3"
            >
              <div>
                <i class="text-[#79C5FF] font-600 mr-[30px]">施工负责</i>
                <span class="">刘宇航</span>
              </div>
              <div class="text-[13px] ml-[10px] text-[#6BFFAC]">
                152525242899
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-[20px]">
        <div class="flex justify-center items-center is-faqi text-[22px] cursor-pointer">
        发起商会
      </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import PubTit from "@/components/public/PubTit.vue";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import { coverageData } from "./echarsOptions.js";
import { ref, onMounted, onUnmounted } from "vue";
const diaShown = ref(false);
import Hls from "hls.js";
const centerDialogVisible = ref(false);
const videoRef1 = ref(null);
const videoRef2 = ref(null);
const videoRef3 = ref(null);
const videoRef4 = ref(null);
const hlsInstances = ref([]);

const imgShown = ref(false);

const emits = defineEmits(["emitHandleJump"]);
const handleJump = () => {
  emits("emitHandleJump");
};
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

const initHls = (videoRef, url) => {
  if (Hls.isSupported()) {
    const hls = new Hls({
      debug: false,
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 90,
    });

    hls.loadSource(url);
    hls.attachMedia(videoRef);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoRef.play().catch((error) => {
        console.log("播放失败:", error);
      });
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.log("网络错误，尝试恢复...");
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log("媒体错误，尝试恢复...");
            hls.recoverMediaError();
            break;
          default:
            console.log("无法恢复的错误");
            hls.destroy();
            break;
        }
      }
    });

    hlsInstances.value.push(hls);
    return hls;
  } else if (videoRef.canPlayType("application/vnd.apple.mpegurl")) {
    videoRef.src = url;
  }
};

onMounted(() => {
  initHls(videoRef1.value, videoUrls.camera1);
  initHls(videoRef2.value, videoUrls.camera2);
  initHls(videoRef3.value, videoUrls.camera3);
  initHls(videoRef4.value, videoUrls.camera4);
});

onUnmounted(() => {
  hlsInstances.value.forEach((hls) => {
    if (hls) {
      hls.destroy();
    }
  });
});
</script>

<style lang="scss" scoped>
.video-container {
  width: 400px;
  height: 300px;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.is-bg {
   //background: url("@/assets/rou/city-bg.png") no-repeat center center;
//  background-size: 100% 100%;
 background: red;
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
.is-faqi{
  width: 182px;
  height: 54px;
  background: url('@/assets/rou/icon66.png') no-repeat center center ;
  background-size: 100% 100%;
  
}
</style>
