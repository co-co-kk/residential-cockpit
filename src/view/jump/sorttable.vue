<template>
  <div>Height: {{ height }} Width: {{ width }}</div>
  <div class="grid w-[400px] bg-[skyblue]" ref="conBox">
    <div
      class="grid-div grid-item-lm w-[100px] h-[100px] bg-[red]"
      v-for="(item, index) in lidt"
      :key="index"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useElementSize } from "@vueuse/core";

const conBox = ref(null);
const { width, height } = useElementSize(conBox);

import Sortable from "sortablejs";
const lidt = ref(
  Array.from({ length: 10 }, (_, index) => ({
    name: `内容${index}`,
  }))
);
//使用onMounted是因为要等到标签渲染完成后在querySelector才能获取到带有grid类名的div盒子，否则grid常量为null，报错。
onMounted(() => {
  const grid = document.querySelector(".grid");
  //sortable对象
  new Sortable(grid, {
    animation: 150,
    handle: ".grid-item-lm", //对grid的子对象中，带有.grid-item启动拖拽效果
    onEnd: (event) => {
      console.log("🚀 ~ onMounted ~ event:", event);
      // 交换排序后的数据
      const movedItem = lidt.value.splice(event.oldIndex, 1)[0];
      lidt.value.splice(event.newIndex, 0, movedItem);
      // 输出新的排序数据
      console.log("新的排序数据:", lidt.value);
    },
  });
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.grid {
  padding: 20px 10%;
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-items: center;
  /*  声明列的高度  */
  grid-template-columns: repeat(auto-fill, 75px);
  /*  声明行的高度  */
  grid-template-rows: repeat(auto-fill, 75px);
  /*  声明行间距和列间距  */
  grid-gap: 36px;
}

.HotCard {
  /*  声明宽占4个小盒子  */
  grid-column: span 4;
  /*  声明高占2个小盒子  */
  grid-row: span 2;
}

.grid-div {
  /*  声明宽占4个小盒子  */
  grid-column: span 1;
  /*  声明高占2个小盒子  */
  grid-row: span 1;
}

.grid-double {
  grid-column: span 2;
  grid-row: span 2;
}
</style>
