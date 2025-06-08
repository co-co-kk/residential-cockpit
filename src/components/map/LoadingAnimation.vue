<template>
  <div class="loading-container" v-if="loading">
    <div class="loading-content">
      <div class="loading-ring"></div>
      <div class="loading-text">地图加载中...</div>
      <div class="loading-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="progress-text">{{ Math.round(progress) }}%</div>
      </div>
      <div class="loading-particles">
        <div v-for="n in 8" :key="n" class="particle" :style="{ '--delay': `${n * 0.2}s` }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['loadingComplete']);

const progress = ref(0);
let progressTimer = null;

onMounted(() => {
  // 模拟加载进度，3秒完成
  progressTimer = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 2.5; // 每100ms增加0.8%，这样3秒可以完成
    } else {
      clearInterval(progressTimer);
      // 进度条加载完成后，等待一小段时间再触发完成事件
      setTimeout(() => {
        emit('loadingComplete');
      }, 300);
    }
  }, 100);
});

onUnmounted(() => {
  if (progressTimer) {
    clearInterval(progressTimer);
  }
});
</script>

<style scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(4, 42, 107, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease-out;
}

.loading-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-ring {
  width: 120px;
  height: 120px;
  border: 4px solid transparent;
  border-top-color: #0086ff;
  border-radius: 50%;
  animation: rotate 4s linear infinite;
}

.loading-ring::before,
.loading-ring::after {
  content: '';
  position: absolute;
  border: 4px solid transparent;
  border-radius: 50%;
}

.loading-ring::before {
  top: -12px;
  left: -12px;
  right: -12px;
  bottom: -12px;
  border-top-color: #00ffff;
  animation: rotate 6s linear infinite;
}

.loading-ring::after {
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  border-top-color: #00ff00;
  animation: rotate 3s linear infinite;
}

.loading-text {
  margin-top: 20px;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  animation: pulse 2s ease-in-out infinite;
}

.loading-progress {
  margin-top: 15px;
  width: 200px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0086ff, #00ffff);
  transition: width 0.3s ease-out;
}

.progress-text {
  margin-top: 5px;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
}

.loading-particles {
  position: absolute;
  width: 200px;
  height: 200px;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00ffff;
  border-radius: 50%;
  animation: particle-rotate 4s linear infinite;
  animation-delay: var(--delay);
}

.particle:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
.particle:nth-child(2) { top: 14%; right: 14%; }
.particle:nth-child(3) { top: 50%; right: 0; transform: translateY(-50%); }
.particle:nth-child(4) { bottom: 14%; right: 14%; }
.particle:nth-child(5) { bottom: 0; left: 50%; transform: translateX(-50%); }
.particle:nth-child(6) { bottom: 14%; left: 14%; }
.particle:nth-child(7) { top: 50%; left: 0; transform: translateY(-50%); }
.particle:nth-child(8) { top: 14%; left: 14%; }

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

@keyframes particle-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style> 