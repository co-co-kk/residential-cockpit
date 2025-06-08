<template>
  <div id="body">
    <!-- 后改的：px-[50px] -->
    <div class="screen_container box-border">
      <div class="flex  h-[100%] w-[100%] relative">
        <leftContent class="w-[1100px] h-[95%]  p-[20px] box-border top-[55px] absolute z-10 left-[50px]" />
        <centerContent  />
         <rightContent class="absolute z-10 top-[55px] right-[50px]  p-[20px]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import leftContent from "./components/leftContent/index.vue";
import rightContent from "./components/rightContent/index.vue";
import centerContent from "./components/centerContent/index.vue";
import { ref, onMounted, computed, nextTick } from "vue";

import autofit from "autofit.js";
onMounted(()=>{
  autofit.init({
        dh: 1080,
        dw: 3840,
        el:"#body",
        resize: true
    })
})


</script>

<style lang="scss" scoped>
.screen_container {
  // width: 7680px;
  // height: 2160px;
  width: 3840px;
  height: 1080px;
  box-sizing: border-box;
  // overflow: auto;
  display: flex;
  flex-direction: column;
  // background-image: url("../../assets/image/new/image.png");
  // background-size: 100% 100%;
  // background: url("@/assets/rou/bg.png") no-repeat center center;
  // background-size: 100% 100%;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
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

.video_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 确保视频覆盖整个容器 */
  z-index: -1;
  
  /* 确保视频在背景 */
}

::-webkit-scrollbar {
  display: none;
}

</style>
