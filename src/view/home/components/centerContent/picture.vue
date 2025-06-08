<template>
  <div>
    <div class="home-cont-new">
      <div
        style="
          position: fixed;
          text-align: center;
          font-size: 3rem;
          top: 20px;
          width: 100%;
        "
        class="title_class"
      >
        一图到底
      </div>
      <div style="flex: 2" class="home-cont-new-left-1"></div>
      <div style="flex: 1; display: flex" class="home-cont-new-right-1">
        <div
          style="flex: 1; display: flex; flex-direction: column; margin: 2rem 0"
        >
          <div style="flex: 3; display: flex; flex-direction: column">
            <div
              style="
                display: flex;
                justify-content: flex-start;
                padding: 0.4rem;
                align-items: center;
                background: #215aa6;
                color: #fff;
                font-weight: bold;
                font-size: 1.2rem;
              "
            >
              图纸目录
            </div>
            <el-tree
              :data="data"
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :props="defaultProps"
              @node-click="handleNodeClick"
              style="width: 100%; background: transparent; color: #ffffff"
            />
          </div>
        </div>
        <div
          style="
            flex: 3.6;
            display: flex;
            flex-direction: column;
            margin: 2rem 0;
          "
        >
          <div style="flex: 3; display: flex">
            <el-image
              style="width: 100%; height: 100%"
              :src="currentImage"
              fit="fill"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
// import bus from "../../../../utils/bus.js";

// 定义树节点的数据类型
interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

// 图片 URL 的类型
type ImageUrl = string;

// 组件状态
const height = ref(window.innerHeight);
const nodeid = ref(2);

// 图片资源
const url01: ImageUrl = new URL('../../assets/image/cad/01.jpg', import.meta.url).href;
const url02: ImageUrl = new URL('../../assets/image/cad/02.jpg', import.meta.url).href;
const url03: ImageUrl = new URL('../../assets/image/cad/03.jpg', import.meta.url).href;
const url04: ImageUrl = new URL('../../assets/image/cad/04.jpg', import.meta.url).href;

// 树形数据
const data: TreeNode[] = [
  {
    id: 0,
    label: '地库',
    children: [
      {
        id: 1,
        label: 'A06-1地块',
        children: [
          { id: 2, label: '1#' },
          { id: 3, label: '2#' },
          { id: 4, label: '3#' },
          { id: 5, label: '4#' },
        ],
      },
      {
        id: 6,
        label: 'B07-1地块',
        children: [
          { id: 2, label: '1#' },
          { id: 3, label: '2#' },
        ],
      },
    ],
  },
];

// 树形组件配置
const defaultProps = {
  children: 'children',
  label: 'label',
};

// 计算当前显示的图片
const currentImage = computed(() => {
  switch (nodeid.value) {
    case 2:
      return url01;
    case 3:
      return url02;
    case 4:
      return url03;
    default:
      return url04;
  }
});

// 处理树节点点击事件
const handleNodeClick = (data: TreeNode) => {
  nodeid.value = data.id;
};

// 监听窗口大小变化
onMounted(() => {
  window.onresize = () => {
    height.value = window.innerHeight;
  };
});
</script>

<style scoped>
.home-cont-new {
  width: 100%;
  height: 1350px;
  overflow: hidden;
  display: flex;
  background-image: url('../../assets/image/new/image.png');
  background-size: 100% 100%;
}

.home-cont-new-left-1 {
  margin-left: 85px;
  margin-right: 85px;
  margin-top: 110px;
  margin-bottom: 60px;
  background-image: url('../../assets/image/new/left.png');
  background-size: 100% 100%;
}

.home-cont-new-right-1 {
  margin-left: 85px;
  margin-right: 85px;
  margin-top: 110px;
  margin-bottom: 60px;
}

.title_class {
  position: fixed;
  text-align: center;
  font-size: 3rem;
  top: 20px;
  width: 100%;
  font-weight: 800;
  background: linear-gradient(to top, #adbecc, #ffffff);
  -webkit-background-clip: text;
  color: transparent;
}
</style>

<style>
.el-card__body {
  padding: 0 !important;
}

.el-tree-node.is-current > .el-tree-node__content {
  background: #215aa6 !important;
  font-size: 1.2rem;
}

.el-tree-node:focus > .el-tree-node__content {
  background: #215aa6 !important;
}

.el-tree-node:hover > .el-tree-node__content {
  background: #215aa6 !important;
}

.el-tree-node__label {
  font-size: 24px !important;
}

.el-tree-node__content {
  height: 32px !important;
}
</style>