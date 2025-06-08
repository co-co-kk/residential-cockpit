<template>
  <div class="right_container">
    <div class="right_top_container1">
      <div class="right_code">
        <el-image :src="url" fit="fill"></el-image>
      </div>
      <div class="right_top_container_tit">
        <div class="right_top_container_tit1">
          <span>项目名称: 业务综合楼项目 </span>
          <span>统一项目编码: 2019500111-47-01-153808 </span>
        </div>
        <div class="right_top_container_tit2">
          <span>立项文号: 2019-500108-88-01-129201</span>
          <span>立项批复机关: 重庆市渝中区发改委</span>
          <span>立项批复时间: 2019-3-31</span>
          <span>建设单位: 中冶建工集团</span>
          <span>项目分类: 房屋建筑工程</span>
          <span>项目地点: 重庆市渝中区长江一路40号</span>
          <span>建设用地规划许可证编号: 4101052024YG0009473</span>
          <span>建设工程规划许可证编号: 915001080824498557</span>
        </div>
      </div>
    </div>
    <div class="right_bottom_container1">
      <div class="map_box">
        <el-image style="width: 984px; height: 887px" :src="url5" fit="fill"></el-image>
      </div>
      <div class="data_box">
        <div class="table_box">
          <div class="roll_table">
            <span class="roll_ta" style="flex: 1">序号</span>
            <span class="roll_ta" style="flex: 2">单体编码</span>
            <span class="roll_ta" style="flex: 2">单体名称</span>
            <span class="roll_ta" style="flex: 2">地上层数</span>
            <span class="roll_ta" style="flex: 2">地下层数</span>
            <span class="roll_ta" style="flex: 2">建筑高度</span>
            <span class="roll_ta" style="flex: 2">规划面积</span>
          </div>
          <vue-seamless-scroll class="scroll_box1" :data="tableData" :class-option="defineScroll">
            <div class="ssswjc">
              <div v-for="(item, index) in tableData" :key="index" class="ssswjc_box">
                <div class="ssswjc_item">
                  <span class="roll_ta" style="flex: 1">{{ index + 1 }}</span>
                  <span class="roll_ta" style="flex: 2">{{ item.params1 }}</span>
                  <span class="roll_ta" style="flex: 2">{{ item.params2 }}</span>
                  <span class="roll_ta" style="flex: 2">{{ item.params3 }}</span>
                  <span class="roll_ta" style="flex: 2">{{ item.params4 }}</span>
                  <span class="roll_ta" style="flex: 2">{{ item.params5 }}</span>
                  <span class="roll_ta" style="flex: 2">{{ item.params6 }}</span>
                </div>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
        <div class="info_box">
          <div class="info">
            <el-image :src="url" fit="fill"></el-image>
            <div class="monomer_box">
              <span>单体编码: 1201149202212000001</span>
              <span>单体名称: 1号楼</span>
            </div>
            <div class="content_class">
              <div>建筑层数（地上）：17</div>
              <div>建筑高度（米）：101m</div>
            </div>
            <div class="content_class">
              <div>建筑层数（地下）：2</div>
              <div>规划面积：18687㎡</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import qrCode from '../../../../assets/image/passthrough/qr_code.png';
import twoDImg from '../../../../assets/image/passthrough/2D_img.png';
import bg1 from '../../../../assets/image/passthrough/bg1.png';
import bg2 from '../../../../assets/image/passthrough/bg2.png';
import bg3 from '../../../../assets/image/passthrough/bg3.png';
import rightTopRightTopContainer from '../../../../assets/image/passthrough/right_top_right_top_container.png';

// 静态资源
const url = ref(qrCode);
const url5 = ref(twoDImg);

// 表格数据
const tableData = ref([
  {
    params1: '1201149202212000001',
    params2: '1号楼',
    params3: '30',
    params4: '2',
    params5: '101m',
    params6: '18687㎡',
  },
  {
    params1: '1201149202212000002',
    params2: '2号楼',
    params3: '27',
    params4: '2',
    params5: '95m',
    params6: '15487㎡',
  },
  {
    params1: '1201149202212000003',
    params2: '3号楼',
    params3: '21',
    params4: '2',
    params5: '76m',
    params6: '12687㎡',
  },
  {
    params1: '1201149202212000004',
    params2: '4号楼',
    params3: '27',
    params4: '2',
    params5: '95m',
    params6: '15487㎡',
  },
  {
    params1: '1201149202212000005',
    params2: '5号楼',
    params3: '21',
    params4: '2',
    params5: '76m',
    params6: '12687㎡',
  },
]);

// 滚动配置
const defineScroll = computed(() => ({
  step: 0.1, // 数值越大速度滚动越快
  limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
  hoverStop: true, // 是否开启鼠标悬停stop
  direction: 1, // 0向下 1向上 2向左 3向右
  openWatch: true, // 开启数据实时监控刷新dom
  singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
  singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
  waitTime: 3000, // 单步运动停止的时间(默认值1000ms)
}));
</script>

<style scoped lang="scss">
.right_container {
  color: #ffffff;
  margin-left: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .right_top_container1 {
    height: 233px;
    margin-bottom: 20px;

    .right_code {
      position: absolute;
      width: 233px;
      height: 233px;
    }

    .right_top_container_tit {
      margin-left: 238px;
      margin-top: 123px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 4296px;
      height: 110px;
      background-image: url("../../../assets/image/passthrough/right_top_right_top_container.png");
      background-size: 100% 100%;

      .right_top_container_tit1,
      .right_top_container_tit2 {
        margin-left: 70px;
        margin-right: 70px;

        span {
          margin-right: 96px;
          font-family: Source Han Sans CN;
          font-weight: 900;
          font-size: 24px;
          line-height: 36px;
          letter-spacing: 1px;
        }
      }

      .right_top_container_tit2 {
        span {
          font-weight: 400;
          margin-right: 96px;
        }
      }
    }
  }
}

.right_bottom_container1 {
  flex: 1;
  display: flex;
  justify-content: space-between;

  .map_box {
    width: 1042px;
    height: 100%;
    background-image: url("../../../assets/image/passthrough/bg1.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .data_box {
    width: 3464px;
    height: 100%;
    margin-right: 86px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .table_box {
      width: 3464px;
      height: 586px;
      background-image: url("../../../assets/image/passthrough/bg2.png");
      background-size: 100% 100%;
    }

    .info_box {
      width: 3464px;
      height: 354px;
      background-image: url("../../../assets/image/passthrough/bg3.png");
      background-size: 100% 100%;

      .info {
        width: 100%;
        height: 100%;
        padding: 57px 110px 67px 110px;
        display: flex;

        .monomer_box {
          margin-left: 51px;
          width: 636px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          font-family: Source Han Sans CN;
          font-weight: 900;
          font-size: 24px;
        }

        .content_class {
          width: 562px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          font-family: Source Han Sans CN;
          font-weight: 400;
          font-size: 24px;
          line-height: 50px;
        }
      }
    }
  }
}

.roll_table {
  display: flex;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 90%;
  margin-left: 109px;
  color: #ffffff;
  font-weight: bold;
  border-bottom: 0.5px solid #1761c0;

  .roll_ta {
    text-align: center;
    font-size: 28px;
    font-weight: 400;
    line-height: 36px;
    padding: 18px 0;
  }
}

.ssswjc {
  width: 100%;
  height: auto;
  color: #ffffff;

  .ssswjc_box {
    display: flex;
    flex-direction: column;
    font-size: 24px;
    width: 100%;

    .ssswjc_item {
      display: flex;
      font-size: 26px;
      justify-content: space-around;
      align-items: center;
      padding: 18px 0;
      width: 90%;
      border-bottom: 0.5px solid #1761c0;
      margin-left: 109px;
      font-family: Source Han Sans CN;
      line-height: 36px;
      letter-spacing: 1px;
      text-align: center;
    }
  }
}

.selet_box {
  width: 585px;
  height: 80px;
  background-color: rgba(52, 182, 255, 0.15);
  margin-top: 19px;
  margin-left: 109px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .self_select {
    width: 220px;
    height: 56px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    border: 2px solid rgba(52, 219, 255, 0.1);
    box-shadow: 0px 0px 20px 0px rgba(52, 219, 255, 0.5) inset;
    background: rgba(52, 182, 255, 0.15);
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    color: #ffffff;
  }
}

select option {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: #fff;
  background-color: rgb(5, 40, 99);
}

select option:hover {
  background-color: rgb(5, 40, 99);
}

.scroll_box1 {
  height: 440px;
  overflow: hidden;
  font-size: 18px;
  width: 100%;
  padding: 5px;
  color: #ffffff;
}
</style>