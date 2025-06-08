<template>
    <div ref="mainRef" class="w-[100%] h-[100%]"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
import 'echarts-gl';
// Define a prop to receive data
const props = defineProps({
    chartData: {
        type: Object,
        required: true
    }
});

const mainRef = ref(null);
const myChart = ref(null);

onMounted(() => {
    myChart.value = echarts.init(mainRef.value);
    myChart.value.setOption(props.chartData);
});

// Watch for changes in chartData and update the chart
watch(() => props.chartData, (newData) => {
    if (myChart.value) {
        myChart.value.setOption(newData);
    }
});
</script>

<style lang="scss" scoped></style>