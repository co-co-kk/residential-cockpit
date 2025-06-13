<template>
  <div>
    <div class="scroll">
      <div class="absolute z-2 bg-[#0C2A62] is-header" :style="{ width }">
        <div
          class="flex justify-around items-center h-[43px] leading-[43px] text-[#C9ECFF] text-[14px]"
        >
          <span
            v-for="(item, index) in initHeader"
            :key="index"
            class="flex justify-center flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <vue3-seamless-scroll class="pt-[100px] box-border" :list="initData" :singleHeight="30"   :classOptions="classOptions" hover>
        <template v-for="(item, index) in initData" :key="index">
          <div
            class="item flex justify-around items-center h-[43px] leading-[43px] text-[#C9ECFF] text-[14px]"
          >
            <div
              v-for="(itm, itmIndex) in item"
              :key="itm"
              class="flex-1 flex items-center justify-center overflow-hidden text-[red] whitespace-nowrap"
              @mouseenter="showTooltip(itm, $event)"
              @mouseleave="hideTooltip"
            >
              <el-tooltip
                v-if="tooltipVisible && tooltipItem === itm"
                :content="tooltipContent"
                placement="top"
                @mouseleave="hideTooltip"
              >
                <div class=" is-ellipsis text-[#fff]">
                  {{ itm }}
                </div>
              </el-tooltip>
              <div
                v-else
                class=" text-[#fff] is-ellipsis"
              >
                {{ itm }}
              </div>
            </div>
          </div>
        </template>
      </vue3-seamless-scroll>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  initData: {
    type: Array,
    default: () => [],
  },
  initHeader: {
    type: Array,
    default: () => [],
  },
  width: {
    type: String,
    default: "590px",
  },
});
const classOptions = ref({
  step: 20
});
const tooltipVisible = ref(false);
const tooltipContent = ref("");
const tooltipItem = ref("");

const showTooltip = (item, event) => {
  tooltipVisible.value = true;
  tooltipContent.value = item;
  tooltipItem.value = item; // Store the current hovered item
};

const hideTooltip = () => {
  tooltipVisible.value = false;
  tooltipContent.value = "";
  tooltipItem.value = ""; // Clear the current hovered item
};
</script>

<style lang="scss" scoped>
.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.item {
  border-bottom: 1px solid #1761c0;

  > div {
    min-width: 0; /* Ensure div can shrink to fit */
  }
}

.flex-1 {
  flex: 1; /* Each div occupies equal space */
  display: flex; /* Ensure flex layout */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.overflow-hidden {
  overflow: hidden; /* Hide overflowed parts */
}

.text-ellipsis {
  text-overflow: ellipsis; /* Show ellipsis */
}

.whitespace-nowrap {
  white-space: nowrap; /* Prevent line breaks */
}

.is-ellipsis{
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 5px;
}
.is-header{
  background: url("@/assets/xulei/icon2.png") no-repeat center center;
  background-size: 100% 100%;
}
</style>
