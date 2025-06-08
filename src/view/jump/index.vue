<template>
  <div id="body" class="relative">
    <iframe
      ref="iframeRef"
      style="border: none;width:100vw;height:100vh;"
    ></iframe>
    <div class="absolute w-[100%] h-[50px] bg-[red] top-0 left-0 "></div>
    <!-- <div class="absolute w-[100%] h-[50px] bg-[red] bottom-0 left-0 "></div> -->
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';

const iframeRef = ref(null);

onMounted(() => {
  // 设置 iframe 的 src 属性为目标 URL
  // iframeRef.value.src = 'https://fwgl.zfcxjw.cq.gov.cn:28081/dataIndicatorsForStaticData/#/project-process';
  iframeRef.value.src = 'http://mars3d.cn/editor-vue.html?key=ex_5_2_2&id=layer-tileset/style/bim-floor';
});
</script>


<style lang="scss" scoped>
#body {
  /* 添加样式以自定义布局 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使 iframe 垂直居中 */
}
</style>
