<template>
  <div>
    <el-dialog
      v-model="diaShown"
      :title="props.title"
      align-center
      :width="props.width"
      :show-close="false"
      style="
        background: radial-gradient(
          100% 100% at 50% 0%,
          rgba(9, 61, 124, 1) 0%,
          rgba(13, 43, 94, 1) 58.83%
        );
      "
      :style="{
        height:props.height
      }"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="flex justify-between items-center">
          <div class="flex items-center h-[67px]">
            <img src="@/assets/image/home/diaLogo.png" class="mt-[10px]" alt="" />
            <div class="text-[#fff] text-[32px] font-700">{{props.title}}</div>
          </div>
          <el-icon class="el-icon--left" :size="32" color="#fff" @click="close"
            ><CircleCloseFilled
          /></el-icon>
        </div>
      </template>
      <slot name="content"></slot>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref,defineExpose } from "vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
const diaShown = ref(false);
const formLabelWidth = "140px";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  height:{
    type: String,
    default: "",
  },
  width:{
    type: String,
    default: "1359",
  },
  
});
defineExpose({
  diaShown,
});
</script>

<style lang="scss" scoped></style>
