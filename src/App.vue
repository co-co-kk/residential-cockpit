<template>
  <div class="is-box">
    <!-- 我是路由 -->
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.is-box {
  // 确保内容居中
  display: flex;
  // justify-content: center;
  // align-items: center;
  overflow: hidden; // 隐藏溢出
  width: 100vw;
  height: 100vh;
  background: #0C2A62;  
}
</style>