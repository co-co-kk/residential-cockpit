<template>
  <div class="body relative w-[100%] h-[100%]">
    <iframe
      ref="iframeRef"
      style="border: none; width: 100vw; height: 100vh"
    ></iframe>
    <!-- <div
      class="bg-[#0E3792] absolute top-0 right-0 z-99 text-[18px] py-4 px-6 w-[400px]"
    >
      <p>建筑高度：<span class="">55米 </span></p>
      <p>建筑层数：<span class="">10层 </span></p>
      <p>标准地址：<span class="">XX市XX区XX街道XX路XX号 </span></p>
      <p>经纬度坐标组：</p>
      <p>
        [[106.5381339105016,29.56474536743493],
        [106.53638068656369,29.571630326905826],
        [106.52817153931619,29.568151208431413],
      </p>
      <p>
        [106.52827828373749,29.5598787666391341],
        [106.5381339105016,29.56474536743493]
      </p>
    </div> -->
    
    <div
      class="color-[#fff] w-[450px] h-[450px] text-[20px] left-[15px] top-[60px] absolute"
      style="background: #003968; opacity: 0.97"
    >
      <div
        class="is-rigbot-bg1 w-[100%] h-[44px] text-[#fff] font-600 pl-[20px] box-border text-[20px] flex items-center"
      >
        预拌混凝土
      </div>
      <div class="flex justify-around flex-col h-[90%] pl-[10px]">
        <div
          class="text-[#CCE8FF] text-[16px] flex"
          v-for="(item, index) in xiangmuInfoList"
          :key="index"
        >
          <div
            class="w-[180px] h-[32px] bg-[#004986] flex items-center is-block pl-[10px]"
          >
            {{ item.ltit }}
          </div>
          <div class="is-right flex items-center ml-[10px] pl-[15px]">
            {{ item.rtit }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="color-[#fff] w-[450px]  text-[20px] right-[15px] top-[258px] absolute"
      style="background: #003968; opacity: 0.97"
    >
      <div
        class="is-rigbot-bg1 w-[100%] h-[44px] text-[#fff] font-600 pl-[20px] box-border text-[20px] flex items-center"
      >
        建筑信息
      </div>
      <div class="flex justify-around flex-col h-[90%]  py-[7px] px-[10px]">
        <div
          class="text-[#CCE8FF] text-[16px] flex mt-[5px]"
          v-for="(item,index) in jianzhuInfoList"
        >
          <div
            class="w-[120px] h-[32px] bg-[#004986] flex items-center is-block pl-[10px]"
          >
          {{item.ltit}}
          </div>
          <div class="is-right flex items-center ml-[10px] pl-[15px]" style="width: 370px;">
            {{item.rtit}}
          </div>
        </div>
        <div
          class="text-[#CCE8FF] text-[16px] flex mt-[5px]"
        >
          <div
            class="w-[120px]  bg-[#004986] flex items-center is-block2 pl-[10px]"
          >
          经纬度坐标组
          </div>
          <div class="is-right flex  ml-[10px] pl-[15px] flex-col pt-[10px]" style="width: 370px;height: 100%;">
            <p>[106.5381339105016,29.56474536743493]</p>
            <p>[106.53638068656369.29.571630326905826]</p>
            <p>[106.52817153931619,29.568151208431413]</p>
            <p>[1106.52827828373749.29.55987876663913417</p>
            <p>[1106.5381339105016,29.56474536743493]</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const iframeRef = ref(null);
const xiangmuInfoList = ref([
  {
    ltit: "项目名称",
    rtit: "中環万象城",
  },
  {
    ltit: "统一项目编码",
    rtit: "2019500111-47-01-153808",
  },
  {
    ltit: "项目立项文号",
    rtit: "2019-500108-88-01-129201",
  },
  {
    ltit: "建设用地规划许可证编号",
    rtit: "4101052024YG0009473",
  },
  {
    ltit: "建设工程规划许可证编号",
    rtit: "1305002024(0046180)",
  },
  {
    ltit: "项目分类",
    rtit: "房屋建筑工程",
  },
  {
    ltit: "项目地点",
    rtit: "重庆市渝中区长江一路40号",
  },
  {
    ltit: "建设单位",
    rtit: "中冶建工集团",
  },
  {
    ltit: "项目经理",
    rtit: "张中华",
  },
  {
    ltit: "项目总面积",
    rtit: "30.89万㎡",
  },
  {
    ltit: "项目总投资",
    rtit: "94808.73万",
  },
]);
const jianzhuInfoList=ref([
    {
        ltit:"建筑高度",
        rtit:"55米"
    },
    {
        ltit:"建筑层数",
        rtit:"10层"
    },
    {
        ltit:"标准地址",
        rtit:"xX市XX区xX街道xX路xX号"
    }
])
onMounted(() => {
  // 设置 iframe 的 src 属性为目标 URL
  iframeRef.value.src = "http://125.211.217.17:20043/citylevel";
});
</script>

<style lang="scss" scoped>
.body {
  /* 添加样式以自定义布局 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使 iframe 垂直居中 */
}
p {
  padding: 0;
  margin: 10px;
}
.is-rigbot-bg1 {
  background: linear-gradient(92deg, #055ae6, #01b4ff);
  opacity: 0.59;
}
.is-block2{
    position: relative;
}
.is-block2::after {
  position: absolute;
  display: block;
  content: "";
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: #269bff;
}
.is-block {
  position: relative;
}
.is-block::after {
  position: absolute;
  display: block;
  content: "";
  left: 0;
  top: 0;
  width: 3px;
  height: 32px;
  background: #269bff;
}
.is-right {
  width: 240px;
  height: 32px;
  background: linear-gradient(
    90deg,
    #004986 0%,
    rgba(0, 73, 134, 0.8) 20%,
    rgba(0, 73, 134, 0.6) 45%,
    rgba(0, 73, 134, 0.4) 71%,
    rgba(0, 73, 134, 0.2) 100%
  );
}
p{
    padding: 0;
    margin: 0 0 10px 0;
}
</style>
