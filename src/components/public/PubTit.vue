<template>
  <div class="relative">
    <div class="bt-tit-bg2  h-[38px] animate-pulse" :style="{width:props.width + 'px',} "></div>
    <!-- <img src="@/assets/rou/title-bg.png" alt=""> -->
    <div class="absolute left-[30px] top-[-10px] is-title">{{ title }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "质量监督",
  },
  width:{
    type:Number,
    default:1100
  }
});
</script>

<style lang="scss" scoped>
.is-title {
  // font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 24px;
  color: #f6f9fe;
  text-shadow: 0px 2px 8px rgba(5, 28, 55, 0.42);
  // font-style: italic;
  // background: linear-gradient(
  //   0deg,
  //   rgba(14, 197, 236, 0.36) 0%,
  //   rgba(49, 190, 255, 0.36) 0%,
  //   rgba(239, 252, 254, 0.36) 58.7646484375%
  // );
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
}

.bt-tit-bg2 {
  // padding-top: 20px;
  margin-top: 30px;
  background: url("@/assets/rou/title-bg.png") no-repeat center center;
  background-size: 100% 100%;
}
</style>
