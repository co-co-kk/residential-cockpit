<template>
    <div class="left_bottom_container" :style="containerStyle">
       <slot></slot>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    width: {
        type: String,
        default: '1382px'
    },
    height: {
        type: String,
        default: '727px'
    }
})

// 计算样式对象，提高代码可维护性
const containerStyle = computed(() => ({
    width: props.width,
    height: props.height
}))
</script>

<style lang="scss" scoped>
.left_bottom_container {
    // background-image: url("../../../../assets/image/home/left_bottom_border.png");
    // background-size: 100% 100%;
    display: flex;
    position: relative; // 添加相对定位
}
</style>