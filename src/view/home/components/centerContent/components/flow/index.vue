<template>
  <div>
    <!-- 流程图 -->
    <el-dialog
      v-model="centerDialogVisible"
      title="Warning"
      width="2730px"
      align-center
      :show-close="false"
      style="box-sizing: border-box"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="flex justify-end mt-[80px]">
          <div class="flex items-center">
            <el-icon
              size="40"
              color="#fff"
              class="cursor-pointer"
              @click="close"
              ><Close
            /></el-icon>
          </div>
        </div>
      </template>
      <div class="w-[2700px] h-[900px] is-bg px-[50px] box-border relative">
        <div class="grid grid-cols-8 gap-[20px]">
          <div class="tit1 col-span-1">勘察阶段</div>
          <div class="tit1 col-span-3">设计阶段</div>
          <div class="tit1 col-span-2">施工阶段</div>
          <div class="tit1 col-span-1">验收阶段</div>
          <div class="tit1 col-span-1">归档阶段</div>
        </div>
        <div class="grid grid-cols-8 gap-[20px] z-[2]">
          <div class="col-span-1">
            <!-- 1 -->
            <Dashed
              :title="item.title"
              :icon="item.icon"
              :dashed="item.dashed"
              :type="item.dashType"
              :oneVideoUrl="item.oneVideoUrl"
              v-for="(item, index) in list1"
              @click="handleClick(item)"
            ></Dashed>
          </div>
          <div class="col-span-3">
            <div class="flex justify-around">
              <div class="flex flex-col">
                <Dashed
                  :title="item.title"
                  :icon="item.icon"
                  :dashed="item.dashed"
                   :type="item.dashType"
                  :oneVideoUrl="item.oneVideoUrl"
                  v-for="(item, index) in list2"
                  @click="handleClick(item)"
                ></Dashed>
              </div>

              <div class="flex flex-col">
                <Dashed
                  :title="item.title"
                  :icon="item.icon"
                  :dashed="item.dashed"
                  :type="item.dashType"
                  :oneVideoUrl="item.oneVideoUrl"
                  v-for="(item, index) in list3"
                  @click="handleClick(item)"
                ></Dashed>
              </div>
            </div>
          </div>
          <div class="col-span-2">
            <div class="flex justify-around">
              <div class="flex flex-col">
                <Dashed
                  :title="item.title"
                  :icon="item.icon"
                  :dashed="item.dashed"
                  :type="item.dashType"
                  :oneVideoUrl="item.oneVideoUrl"
                  v-for="(item, index) in list4"
                  @click="handleClick(item)"
                ></Dashed>
              </div>
              <div class="flex flex-col">
                <Dashed
                  :title="item.title"
                  :icon="item.icon"
                  :dashed="item.dashed"
                  :type="item.dashType"
                  v-for="(item, index) in list5"
                  @click="handleClick(item)"
                ></Dashed>
              </div>
            </div>
          </div>
          <div class="col-span-1">
            <div class="flex justify-around">
              <div class="flex flex-col">
                <Dashed
                  :title="item.title"
                  :icon="item.icon"
                  :dashed="item.dashed"
                  :type="item.dashType"
                  :oneVideoUrl="item.oneVideoUrl"
                  v-for="(item, index) in list6"
                  @click="handleClick(item)"
                ></Dashed>
              </div>
            </div>
          </div>
          <div class="col-span-1">
            <div class="flex justify-around">
              <div class="flex flex-col">
                <Dashed
                  :title="item.title"
                  :icon="item.icon"
                  :dashed="item.dashed"
                  :type="item.dashType"
                  v-for="(item, index) in list7"
                  @click="handleClick(item)"
                ></Dashed>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="longLine absolute left-[40%] z-[1] translate-x-[-50%] top-[200px] translate-y-[-50%]"></div> -->
      </div>
    </el-dialog>
    <!-- 项目信息 -->
    <el-dialog
      v-model="centerDialogVisible2"
      title="Warning"
      width="1100px"
      align-center
      :show-close="false"
      style="box-sizing: border-box"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="flex justify-end">
          <div class="flex items-center">
            <el-icon
              size="40"
              color="#fff"
              class="cursor-pointer"
              @click="close"
              ><Close
            /></el-icon>
          </div>
        </div>
      </template>
      <div class="text-[#fff] px-[30px] box-border">
        <PubTit title="项目信息" :width="1000" />
        <div
          class="px-[50px] my-[20px] text-[22px]"
          v-for="(item, index) in projectInfoData"
        >
          <div>
            <div v-if="item.title.includes('未完成')" class="text-[red] font-bold text-[24px]">项目暂无验收信息...</div>
            <div class="flex justify-between" v-else>
              <div>{{ item.title }}</div>
              <div :class="{ 'text-[#73FFB1]': item.content.includes('合格') }">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 视频 -->
    <el-dialog
      v-model="centerDialogVisible3"
      title="Warning"
      width="1800px"
      align-center
      :show-close="false"
      style="box-sizing: border-box"
    >
      <template #header="{ close, titleId, titleClass }">
        <!-- <div class="flex justify-end ">
          <div class="flex items-center">
            <el-icon size="40" color="#fff" class="cursor-pointer" @click="close"><Close /></el-icon>
          </div>
        </div> -->
      </template>
      <div class="text-[#fff] pt-[0px]">
        <video
          :src="videoUrl"
          style="width: 100%; height: 100%"
          controls
          autoplay
          muted
        ></video>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { Close } from "@element-plus/icons-vue";
import { reactive, toRefs, ref } from "vue";
import Dashed from "./Dashed.vue";
import icon1 from "@/assets/rou/flow-icon1.png";
import video1 from "@/assets/video/01-01.mp4";
import video2 from "@/assets/video/02-01.mp4";
import video3 from "@/assets/video/03-01.mp4";
import video4 from "@/assets/video/03-02.mp4";
import video5 from "@/assets/video/04-01.mp4";
import video6 from "@/assets/video/04-02.mp4";
import video7 from "@/assets/video/06-01.mp4";
import video8 from "@/assets/video/06-02.mp4";
import oneVideoUrl1 from "./video/01-01.mp4";
import oneVideoUrl2 from "./video/02-01.mp4";
import oneVideoUrl3 from "./video/03-01.mp4";
import oneVideoUrl4 from "./video/04-01.mp4";
import oneVideoUrl5 from "./video/06-01.mp4";
import PubTit from "@/components/public/PubTit.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const projectInfoData = ref([
  {
    title: "项目编号（勘察）:",
    content: "KC(2022)-08-0002701C",
  },
  {
    title: "工程名称（勘察）:",
    content: "重庆市东南医院二期建设项目工程地质勘察",
  },
  {
    title: "工程详细地址:",
    content: "重庆市南岸区通江大道",
  },
  {
    title: "勘查阶段/勘察类别:",
    content: "详细勘察",
  },
  {
    title: "勘查等级:",
    content: "甲级(一级)",
  },
  {
    title: "建设单位:",
    content: "重庆市东南医院",
  },
  {
    title: "勘查单位:",
    content: "重庆市设计院有限公司",
  },
  {
    title: "劳务单位:",
    content: "重庆广德岩土工程有限公司",
  },
  {
    title: "试验室:",
    content: "重庆卓华工程勘测有限公司",
  },
  {
    title: "外业进场时间:",
    content: "2022/4/11",
  },
  {
    title: "外业出场时间:",
    content: "2022/4/20",
  },
  {
    title: "勘查结论:",
    content: "合格",
  },
]);
const data = reactive({
  list1: [
    {
      title: "工程勘查",
      icon: icon1,
      dashed: true,
      type: "text",
      dashType: "boxOne",
      oneVideoUrl: oneVideoUrl1,
    },
    {
      title: "获取立项信息，生成统一项目编码",
      icon: icon1,
      dashed: true,
      type: "video",
      videoUrl: video1,
    },
    {
      title: "项目数据展示",
      icon: icon1,
      dashed: false,
      type: "message",
      content: [
        {
          title: "项目编号（勘察）:",
          content: "KC(2022)-08-0002701C",
        },
        {
          title: "工程名称（勘察）:",
          content: "重庆市东南医院二期建设项目工程地质勘察",
        },
        {
          title: "工程详细地址:",
          content: "重庆市南岸区通江大道",
        },
        {
          title: "勘查阶段/勘察类别:",
          content: "详细勘察",
        },
        {
          title: "勘查等级:",
          content: "甲级(一级)",
        },
        {
          title: "建设单位:",
          content: "重庆市东南医院",
        },
        {
          title: "勘查单位:",
          content: "重庆市设计院有限公司",
        },
        {
          title: "劳务单位:",
          content: "重庆广德岩土工程有限公司",
        },
        {
          title: "试验室:",
          content: "重庆卓华工程勘测有限公司",
        },
        {
          title: "外业进场时间:",
          content: "2022/4/11",
        },
        {
          title: "外业出场时间:",
          content: "2022/4/20",
        },
        {
          title: "勘查结论:",
          content: "合格",
        },
      ],
    },
  ],
  list2: [
    {
      title: "初步设计审查",
      icon: icon1,
      dashed: true,
      type: "text",
      dashType: "boxOne",
      oneVideoUrl: oneVideoUrl2,
    },
    {
      title: "超限高设计审查",
      icon: icon1,
      dashed: true,
      type: "video",
      videoUrl: video2,
    },
    {
      title: "编码关联+项目信息调取",
      icon: icon1,
      dashed: true,
      type: "video",
    },
    {
      title: "项目数据展示",
      icon: icon1,
      dashed: false,
      type: "message",
      content: [
        {
          title: "项目名称:",
          content: "重庆市东南医院二期建设项目",
        },
        {
          title: "设计单位（初步设计审查）:",
          content: "重庆市设计院有限公司",
        },
        {
          title: "建设单位（初步设计审查）:",
          content: "重庆市东南医院",
        },
        {
          title: "审查结果（初步设计审查）:",
          content: "合格",
        },
        {
          title: "批复文号（初步设计审查）:",
          content: "20231221150457300000",
        },
        {
          title: "批复时间（初步设计审查）:",
          content: "2024/3/21",
        },
        {
          title: "审查机构（初步设计审查）:",
          content: "重庆市渝州工程勘察设计技术服务中心",
        },
      ],
    },
  ],
  list3: [
    {
      title: "施工图审查",
      icon: icon1,
      dashed: true,
      type: "text",
      dashType: "boxOne",
      oneVideoUrl: oneVideoUrl3,
    },
    {
      title: "编码关联+项目信息调取",
      icon: icon1,
      dashed: true,
      type: "video",
      videoUrl: video3,
    },
    {
      title: "上传图膜+图斑落图",
      icon: icon1,
      dashed: true,
      type: "video",
      videoUrl: video4,
    },
    {
      title: "项目数据展示",
      icon: icon1,
      dashed: false,
      type: "message",
      content: [
        {
          title: "项目编号（施工图审查）:",
          content: "",
        },
        {
          title: "工程名称（施工图审查）:",
          content: "重庆市东南医院二期建设项目",
        },
        {
          title: "建设单位（施工图审查）:",
          content: "重庆市东南医院",
        },
        {
          title: "审查机构（施工图审查）:",
          content: "重庆市渝州工程勘察设计技术服务中心",
        },
        {
          title: "设计单位（施工图审查）:",
          content: "重庆市设计院有限公司",
        },
        {
          title: "重大设计变更:",
          content: "否",
        },
        {
          title: "审查结论:",
          content: "合格",
        },
        {
          title: "施工图审查合格书编号:",
          content: "00202401080082",
        },
        {
          title: "审查完成日期:",
          content: "2024/9/20",
        },
        {
          title: "建设规模:",
          content: "72077.00平方米",
        },
      ],
    },
  ],
  list4: [
    {
      title: "施工许可",
      icon: icon1,
      dashed: true,
      type: "text",
      dashType: "boxOne",
      oneVideoUrl: oneVideoUrl4,
    },
    {
      title: "编码关联+项目信息调取",
      icon: icon1,
      dashed: true,
      type: "video",
      videoUrl: video5,
    },
    {
      title: "项目数据展示",
      icon: icon1,
      dashed: false,
      type: "message",
      content: [
        {
          title: "施工许可证编号:",
          content: "500108202504030201",
        },
        {
          title: "施工许可批复时间:",
          content: "2025-04-03",
        },
        {
          title: "工程名称（施工）:",
          content: "重庆市东南医院二期建设项目",
        },
        {
          title: "项目编号（施工）:",
          content: "2104-500108-04-01-439202",
        },
        {
          title: "建设用地规划许可证编号:",
          content: "地字第500108202400015号",
        },
        {
          title: "建设工程规划许可证编号:",
          content: "建字第500108202400011号",
        },
        {
          title: "合同金额(万元):",
          content: "42866.82",
        },
        {
          title: "面积(平方米):",
          content: "72077",
        },
        {
          title: "建设规模:",
          content: "72077.00平方米",
        },
      ],
    },
  ],
  list5: [
    {
      title: "质量安全",
      icon: icon1,
      dashed: true,
      type: "text",
      dashType: "boxOne",
    },
    
    {
      title: "施工管控",
      icon: icon1,
      dashed: true,
      type: "jiankong",
    },
    {
      title: "项目数据展示",
      icon: icon1,
      dashed: false,
      type: "message",
      content: [
        {
          title: "项目编号:",
          content: "5001082501060012",
        },
        {
          title: "施工单位:",
          content: "中建八局第四建设有限公司",
        },
        {
          title: "监理单位:",
          content: "上海建浩工程顾问有限公司",
        },
        {
          title: "建设单位:",
          content: "重庆市东南医院",
        },
        {
          title: "质量报监受理部门:",
          content: "重庆市南岸区建设施工安全质量服务中心",
        },
        {
          title: "智慧工地星级:",
          content: "三星级（审核中）",
        },
      ],
    },
  ],
  list6: [
    {
      title: "竣工验收",
      icon: icon1,
      dashed: true,
      type: "text",
      dashType: "boxOne",
      oneVideoUrl: oneVideoUrl5,
    },
    {
      title: "编码关联+项目信息调取",
      icon: icon1,
      dashed: true,
      type: "video",
      videoUrl: video7,
    },
   
    {
      title: "项目数据展示",
      icon: icon1,
      dashed: false,
      type: "none",
    },
  ],
  list7: [
    {
      title: "项目归档",
      icon: icon1,
      dashed: false,
      dashType: "boxOne",
      // type: "message",
    },
  ],
});
const { list1, list2, list3, list4, list5, list6, list7 } = toRefs(data);

const centerDialogVisible = ref(false);
const centerDialogVisible2 = ref(false);
const centerDialogVisible3 = ref(false);
const videoUrl = ref(video1);

const handleClick = (item) => {
  if (item.type === "text") {
    // centerDialogVisible2.value = true;
  } else if (item.type === "video") {
    console.log(item.videoUrl);
    videoUrl.value = item.videoUrl;
    centerDialogVisible3.value = true;
  } else if (item.type === "message") {
    centerDialogVisible2.value = true;
    projectInfoData.value = item.content;
  } else if (item.type === "jiankong") {
    router.push("/projectDetail");
  } else if (item.type === "none") {
    centerDialogVisible2.value = true;
    projectInfoData.value = [
      {
        title: "未完成",
        content: "",
      },
    ];
  }
};
const handleOpenFlow = () => {
  centerDialogVisible.value = true;
};
defineExpose({
  handleOpenFlow,
});
</script>

<style lang="scss" scoped>
// .is-bg {
//   background: url("@/assets/rou/flow-bg.png") no-repeat center center;
// }
.dashed-line {
  width: 50px;
  height: 2px; /* 虚线的高度 */
  border-top: 2px dashed #27e3ff; /* 虚线样式 */
  position: relative;
  overflow: hidden;
}

.dashed-line::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%; /* 从左侧开始 */
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, transparent, #27e3ff, transparent);
  animation: flow 2s linear infinite; /* 动画效果 */
}

@keyframes flow {
  0% {
    left: -100%; /* 动画起始位置 */
  }
  100% {
    left: 100%; /* 动画结束位置 */
  }
}
:deep(.el-dialog) {
  background: url("@/assets/rou/flow-bg.png") no-repeat center center;
}

.tit1 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  margin-bottom: 30px;
  font-size: 30px;
  background: linear-gradient(0deg, #3deaff 0%, rgba(61, 126, 255, 0.3) 100%);
  border: 1px solid #aed2ff;
  // text-shadow: 3px 3px 0px rgba(6,27,48,0.38);
  color: #fff;
}
.longLine{
  width: 80%;
  height: 1px;
  border-top: 1px dashed #27e3ff;
  margin-left: 200px;
}
</style>
