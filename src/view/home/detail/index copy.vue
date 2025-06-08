<template>
  <div class="detail-bg text-[80px] text-[#fff] relative">
    <!-- <div class="">内容</div> -->
    <div class="flex h-[100%] w-[100%] absolute z-10 left-[50px] top-[90px]">
      <leftContent class="w-[1100px]" />
      <centerContent @emitHandleJump="centerDialogVisible=true"></centerContent>
      <rightContent />
    </div>
    <div
      class="absolute top-[20px] left-[50px] text-[24px] flex items-center cursor-pointer"
      @click="router.back()"
    >
      <img src="@/assets/rou/back.png" alt="" />
      <span class="ml-[20px]">返回</span>
    </div>
    <div
      class="is-title1 absolute top-[0px] right-[calc(50%-750px)] text-[24px] flex items-center w-[1000px] h-[80px] text-[40px]"
    >
      <span>东南医院二期项目</span>
    </div>
    <el-dialog v-model="centerDialogVisible" style="width: 1500px" align-center class="video-dialog">
      <video
      v-if="centerDialogVisible"
        src="@/assets/video/yiyuan.mp4"
        style="width: 100%; height: 500px; object-fit: cover;"
        controls
        autoplay
        muted
      ></video>
    </el-dialog>
  </div>
</template>

<script setup>
import autofit from "autofit.js";
import leftContent from "./components/leftContent/index.vue";
import centerContent from "./components/centerContent/index.vue";
import rightContent from "./components/rightContent/index.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const centerDialogVisible = ref(false);
onMounted(() => {
  autofit.init({
    dh: 1080,
    dw: 3840,
    el: ".detail-bg",
    resize: true,
  });
});
const handleJump = (item) => {
  console.log(item);
};
</script>

<style lang="scss" scoped>
.detail-bg {
  width: 3840px;
  height: 1080px;
  background: url("@/assets/rou/pro-bg.png") no-repeat rgba($color: #000000, $alpha: 1);
}
.is-title1 {
  color: #fff;
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 48px;
  line-height: 26px;
  letter-spacing: 25px;
}

:deep(.video-dialog) {
  .el-dialog__body {
    padding: 0;
  }
}
</style>
