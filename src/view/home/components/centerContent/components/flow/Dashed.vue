<template>
  <div class="flex justify-center scale-[]">
    <template v-if="props.type == 'boxOne'">
      <div class="relative flex cursor-pointer" @click="handleOpenVideo">
        <div
          class="bg-[rgba(230,255,255,0.1)] w-[250px] is-dashed mb-[30px] py-[20px] "
          :class="{ 'bottom-dashed2': props.title != '项目归档' }"
        >
          <div>
            <div class="flex flex-col justify-center items-center">
              <img :src="props.icon" alt="" class="w-[70px] h-[70px]" />
              <span class="text-[#fff] text-[16px] mt-[20px]">{{
                props.title
              }}</span>
            </div>
          </div>
        </div>
        <!-- <div class="left-dashed"></div> -->
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col justify-center items-center">
        <div class="">
          <div
            class="flex pb-[30px] cursor-pointer flex-col justify-center items-center w-[100%] relative"
            @click="handleClick"
          >
            <div
              class="rounded-[50%] w-[82px] h-[82px] pt-[10px] px-[10px] flex justify-center"
              style="border: 1px solid #27e3ff"
            >
              <img :src="props.icon" alt="" class="w-[70px] h-[70px]" />
            </div>
            <div
              class="absolute z-2 bottom-[0px] rounded-[44px] w-[184px] bg-[#041F42] text-[#fff] text-[20px] px-[10px] py-[5px] text-center"
              style="border: 1px solid #337fdd"
            >
              {{ props.title }}
            </div>
          </div>
          <!-- <div class="w-[100%] flex justify-center" v-if="props.dashed">
        <div class="dashed-line transform-rotate-90"></div>
      </div> -->
        </div>
        <div class="is-bottom-dashed" v-if="props.dashed"></div>
      </div>
    </template>
    <el-dialog v-model="videoShown" title="视频" width="1800px" align-center :show-close="false" style="box-sizing: border-box">
      <video :src="videoUrl" style="width: 100%; height: 100%" controls autoplay muted></video>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  dashed: {
    type: Boolean,
    default: true,
  },
  oneVideoUrl: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click", props);
};
const videoShown = ref(false);
const videoUrl = ref("");
const handleOpenVideo = () => {
  if (props.oneVideoUrl) {
    videoShown.value = true;
    videoUrl.value = props.oneVideoUrl;
  }
};
</script>

<style lang="scss" scoped>
.dashed-line {
  width: 50px;
  height: 1px; /* 虚线的高度 */
  border-top: 1px dashed #27e3ff; /* 虚线样式 */
  position: relative;
  overflow: hidden;
}

.dashed-line::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%; /* 从左侧开始 */
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, transparent, #27e3ff, transparent);
  animation: flow 2s linear infinite; /* 动画效果 */
}

@keyframes flow {
  0% {
    left: -100%; /* 动画起始位置 */
  }
  100% {
    left: 100%; /* 动画结束位置 */
  }
}
.is-dashed {
  border: 1px dashed #27e3ff;
}

// pb-[40px] relative after:content-['']  after:absolute after:bottom-0 after:left-[50%] after:w-[1px] after:h-[50px]

.bottom-dashed2 {
  position: relative;
  z-index: 2;
}
.bottom-dashed2::after {
  position: absolute;
  display: block;
  content: "";
  height: 30px;
  width: 1px;
  border-left: 1px dashed #27e3ff;
  left: 50%;
  bottom: -30px;
  z-index: -1;
}
.is-bottom-dashed {
  width: 1px;
  height: 30px;
  border-left: 1px dashed #27e3ff;
  position: relative;
  z-index: 1;
}
.left-dashed {
  position: relative;
}
.left-dashed::before {
  display: block;
  content: "";
  top: 50%;
  right: 0;
  position: relative;
  width: 50px;
  height: 1px;
  border-top: 1px dashed #27e3ff;
  margin-left: 200px;
  z-index: -100;
}
</style>
