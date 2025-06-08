<template>
  <div class="flow-page">
    <!-- <img src="@/assets/rou/dicon1.png" alt=""> -->
    <!-- <div class="flow-title">三个一整体实现过程</div>
    <div class="flow-stages">
      <div class="stage stage1">勘察阶段</div>
      <div class="stage stage2">设计阶段</div>
      <div class="stage stage3">施工阶段</div>
      <div class="stage stage4">验收阶段</div>
      <div class="stage stage5">归档阶段</div>
    </div> -->
    <div class="flow-container">
      <div id="container" class="graph-container"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Graph, Cell, CellView, Node } from "@antv/x6";
import autofit from "autofit.js";
import dicon1 from '@/assets/rou/dicon1.png'

onMounted(() => {
  const container = document.getElementById("container");
  if (!container) {
    console.error("找不到容器元素");
    return;
  }

  container.style.width = "100vw";
  container.style.height = "100vh";

  // 标题方框
  Graph.registerNode(
    "lane",
    {
      inherit: "rect",
      markup: [
        {
          tagName: "rect",
          selector: "body",
        },
        {
          tagName: "rect",
          selector: "name-rect",
        },
        {
          tagName: "text",
          selector: "name-text",
        },
      ],
      attrs: {
        body: {
          fill: "#FFF",
          stroke: "#5F95FF",
          strokeWidth: 1,
        },
        "name-rect": {
          width: 200,
          height: 30,
          fill: "#5F95FF",
          stroke: "#fff",
          strokeWidth: 1,
          x: -1,
        },
        "name-text": {
          ref: "name-rect",
          refY: 0.5,
          refX: 0.5,
          textAnchor: "middle",
          fontWeight: "bold",
          fill: "#fff",
          fontSize: 12,
        },
      },
      
    },
    true
  );

  // 方框节点
  Graph.registerNode(
    "lane-rect",
    {
      inherit: "rect",
      width: 100,
      height: 60,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
          selector: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "blue",
          fill: "red",
        },
        image: {
          width: 30,
          height: 30,
          x: 10,
          y: 5,
          'xlink:href': '/src/assets/rou/dicon1.png',
        },
        label: {
          fontSize: 12,
          fill: "#fff",
          refX: 0.5,
          refY: 0.5,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
        },
      },
    },
    true
  );

  // 菱形节点
  Graph.registerNode(
    "lane-polygon",
    {
      inherit: "polygon",
      width: 80,
      height: 80,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
          refPoints: "0,10 10,0 20,10 10,20",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      
    },
    true
  );

  // 连接线
  Graph.registerEdge(
    "lane-edge",
    {
      inherit: "edge",
      attrs: {
        line: {
          stroke: "#A2B1C3",
          strokeWidth: 2,
        },
      },
      label: {
        attrs: {
          label: {
            fill: "#A2B1C3",
            fontSize: 12,
          },
        },
      },
      
    },
    true
  );

  // HTML节点
  Graph.registerNode(
    'html-node',
    {
      inherit: 'html',
      width: 100,
      height: 60,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: 'blue',
          fill: 'blue',
        },
      },
      label: {
        attrs: {
          label: {
            fill: "#A2B1C3",
            fontSize: 12,
          },
        },
      },
      
    },
    true
  )

  const graph = new Graph({
    container,
    width: window.innerWidth,
    height: window.innerHeight,
    grid: true,
    connecting: {
      router: "orth",
    },
    translating: {
      restrict(cellView) {
        const cell = cellView.cell;
        const parentId = cell.prop("parent");
        if (parentId) {
          const parentNode = graph.getCellById(parentId);
          if (parentNode) {
            return parentNode.getBBox().moveAndExpand({
              x: 0,
              y: 30,
              width: 0,
              height: -30,
            });
          }
        }
        return cell.getBBox();
      },
    },
  });

  window.addEventListener("resize", () => {
    graph.resize(window.innerWidth, window.innerHeight);
  });

  const data = [
    {
      id: "1",
      shape: "lane",
      width: 500,
      height: 500,
      position: {
        x: 60,
        y: 60,
      },
      label: "勘察阶段",
      
    },
    
    {
      id: "2",
      shape: "lane",
      width: 200,
      height: 500,
      position: {
        x: 260,
        y: 60,
      },
      label: "<Function>",
    },
    {
      id: "3",
      shape: "lane",
      width: 200,
      height: 500,
      position: {
        x: 460,
        y: 60,
      },
      label: "<Function>",
    },
    {
      id: "4",
      shape: "lane",
      width: 200,
      height: 500,
      position: {
        x: 660,
        y: 60,
      },
      label: "<Function>",
    },
    {
      id: "5",
      shape: "lane-rect",
      width: 100,
      height: 60,
      position: {
        x: 110,
        y: 120,
      },
      label: "Start",
      attrs: {
        body: {
          rx: 30,
          ry: 30,
        },
        image: {
          'xlink:href': '/src/assets/rou/dicon2.png'
        }
      },
      parent: "1",
    },
    {
      id: "6",
      shape: "lane-rect",
      width: 100,
      height: 60,
      position: {
        x: 110,
        y: 200,
      },
      label: "Process",
      parent: "1",
    },
    {
      id: "7",
      shape: "lane-polygon",
      width: 80,
      height: 80,
      position: {
        x: 520,
        y: 110,
      },
      label: "Judge",
      parent: "3",
    },
    {
      id: "8",
      shape: "lane-rect",
      width: 100,
      height: 60,
      position: {
        x: 510,
        y: 240,
      },
      label: "父级为3",
      parent: "3",
    },
    {
      id: "9",
      shape: "lane-rect",
      width: 100,
      height: 60,
      position: {
        x: 720,
        y: 240,
      },
      label: "Process",
      parent: "4",
    },
    {
      id: "10",
      shape: "lane-rect",
      width: 100,
      height: 60,
      position: {
        x: 720,
        y: 350,
      },
      label: "Process",
      parent: "4",
    },
    {
      id: "11",
      shape: "lane-polygon",
      width: 80,
      height: 80,
      position: {
        x: 520,
        y: 340,
      },
      label: "Judge",
      parent: "3",
    },
    {
      id: "12",
      shape: "lane-rect",
      width: 100,
      height: 60,
      position: {
        x: 510,
        y: 470,
      },
      label: "Process",
      parent: "3",
    },
    {
      id: "13",
      shape: "lane-rect",
      width: 100,
      height: 60,
      position: {
        x: 300,
        y: 470,
      },
      label: "End",
      attrs: {
        body: {
          rx: 30,
          ry: 30,
        },
      },
      parent: "2",
    },
    {
      id: "14",
      shape: "lane-edge",
      source: "5",
      target: "11",
    },
    {
      id: "15",
      shape: "lane-edge",
      source: "6",
      target: "7",
    },
    {
      id: "16",
      shape: "lane-edge",
      source: "7",
      target: "8",
      label: "Yes",
    },
    {
      id: "17",
      shape: "lane-edge",
      source: "7",
      target: "9",
      label: "No",
    },
    {
      id: "18",
      shape: "lane-edge",
      source: "8",
      target: "9",
    },
    {
      id: "19",
      shape: "lane-edge",
      source: "9",
      target: "10",
    },
    {
      id: "20",
      shape: "lane-edge",
      source: "10",
      target: "11",
    },
    {
      id: "21",
      shape: "lane-edge",
      source: "11",
      target: "12",
      label: "Yes",
    },
    {
      id: "22",
      shape: "lane-edge",
      source: "11",
      target: "13",
      label: "No",
    },
    {
      id: "23",
      shape: "lane-edge",
      source: "12",
      target: "13",
    },
    {
      id: "24",
      shape: "html-node",  // 使用新注册的HTML节点类型
      width: 100,
      height: 60,
      position: {
        x: 760,
        y: 460,
      },
      attrs: {
        label: {
          text: "勘察阶段222"
        }
      }
    },
  ];

  const cells = [];
  data.forEach((item) => {
    if (item.shape === "lane-edge") {
      cells.push(graph.createEdge(item));
    } else {
      cells.push(graph.createNode(item));
    }
  });
  graph.resetCells(cells);
  graph.zoomToFit({ padding: 10, maxScale: 1 });
});
</script>

<style lang="scss" scoped>
.flow-page {
  width: 100vw;
  height: 100vh;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
.flow-title {
  width: 100vw;
  background: #234a8e;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 12px 0 8px 0;
  letter-spacing: 4px;
}
.flow-stages {
  display: flex;
  width: 100vw;
  height: 36px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.stage1 {
  background: #7eb6f6;
}
.stage2 {
  background: #b6e3a5;
}
.stage3 {
  background: #f6a5a5;
}
.stage4 {
  background: #f6e7a5;
  color: #234a8e;
}
.stage5 {
  background: #e5f6f6;
  color: #234a8e;
}

.flow-container {
  width: 100vw;
  height: calc(100vh - 80px);
  position: relative;
  .graph-container {
    width: 100%;
    height: 100%;
  }
}
</style>
