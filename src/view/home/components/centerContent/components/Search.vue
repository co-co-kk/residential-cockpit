<template>
  <div>
    <div class="text-[#fff] text-[30px] flex flex-col">
      <div class="flex">
        <!-- <input
          type="text"
          placeholder="输入搜索"
          
        /> -->
        <!-- <el-input v-model="searchContent" style="width: 400px; color: #fff; padding-left: 10px" placeholder="输入搜索" size="normal" clearable @change=""></el-input>
        
        <el-button
          class="ml-[10px]"
          type="primary"
          size="default"
          @click="handleShowSearch"
          >搜索</el-button
        > -->
      </div>
      <div
        class="w-[100%] p-[10px] z-999 mt-[20px] triangle relative"
        style="
          border: 1px solid rgba(10, 102, 131, 1);
          background: rgba(4, 42, 107, 0.8);
        "
        v-if="showSearch"
      >
        <div class="flex justify-between items-center">
          <div></div>
          <div
            class="left_top_container_right_bottom_title_1 first_level"
            style="width: 149px; height: 40px"
          >
            项目信息
          </div>
          <el-icon class="cursor-pointer" @click="showSearch = false"
            ><Close
          /></el-icon>
        </div>
        <p class="text-[16px] leading-[30px]">项目名称: 业务综合楼项目</p>
        <p class="text-[16px] leading-[30px]">
          项目立项文号: 2019-500108-88-01-129201
        </p>
        <p class="text-[16px] leading-[30px]">项目分类: 房屋建筑工程</p>
        <p class="text-[16px] leading-[30px]">
          建设用地规划许可证编号: 4101052024YG0009473
        </p>
        <p class="text-[16px] leading-[30px]">建设单位: 中冶建工集团</p>
        <p class="text-[16px] leading-[30px]">项目总面积: 30.89万m</p>
        <p class="text-[16px] leading-[30px]">
          统一项目编码: 2019500111-47-01-153808
        </p>
        <p class="text-[16px] leading-[30px]">项目登记日期: 2019-3-31</p>
        <p class="text-[16px] leading-[30px]">
          项目地点: 重庆市渝中区长江一路40号
        </p>
        <p class="text-[16px] leading-[30px]">
          建设工程规划许可证编号: 1305002024(0046180)
        </p>
        <p class="text-[16px] leading-[30px]">项目经理: 张中华</p>
        <p class="text-[16px] leading-[30px]">项目总投资: 94808.73万元</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Close } from "@element-plus/icons-vue";
const showSearch = ref(false);
const searchContent = ref("");
const handleShowSearch = () => {
  showSearch.value = true;
};
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  background: rgba(10, 102, 131, 0.4);
  box-shadow: none;
}
:deep(.el-input__inner){
  color: #fff;
}
:deep(.el-input__wrapper) {
  background: rgba(10, 102, 131, 0.4);
  box-shadow: none;
}
.triangle::after{
  display: block;
  content: "";
  width: 0;
  height: 0;
  border-left: 10px solid transparent; /* 三角形的左边 */
  border-right: 10px solid transparent; /* 三角形的右边 */
  border-bottom: 20px solid rgba(4, 42, 107, 0.8); /* 三角形的底边 */
  position: absolute;
  top: -20px;
  left: calc(50% - 15px);
}
</style>
