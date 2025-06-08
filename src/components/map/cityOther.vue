<template>
  <div class="statisic_container">
    <div class="videoContainer">
      <video
        class="fullscreenVideo"
        id="bgVid"
        playsinline=""
        autoplay=""
        muted=""
        loop=""
      >
        <!-- <source :src="src" type="video/mp4" style="height: 100vw" /> -->
      </video>
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 40vw;
      "
    >
      <div style="display: flex; flex-direction: column">
        <div class="online_class" :style="{ width: width * 0.4 + 'px' }">
          <div style="width: 200px; text-align: center">在线设备数</div>
          <div class="number_class">
            <div
              v-for="(item, index) in onlineArray"
              :key="index"
              class="number_item_class"
            >
              <CountTo
                :start-val="startVal"
                :end-val="item"
                :duration="3000"
                :auto="true"
                class="count-number"
              ></CountTo>
            </div>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            align-items: flex-start;
            width: 100%;
            height: 120px;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
            "
          >
            <div
              style="
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #62d2a2;
              "
            ></div>
            <div
              style="
                font-size: 14px;
                font-weight: 500;
                color: #c9e5ff;
                margin-left: 5px;
              "
            >
              正常:
            </div>
            <div style="font-size: 14px; font-weight: 500; color: #c9e5ff">
              20℃ - 26℃
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
            "
          >
            <div
              style="
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #6eb6ff;
              "
            ></div>
            <div
              style="
                font-size: 14px;
                font-weight: 500;
                color: #c9e5ff;
                margin-left: 5px;
              "
            >
              低温:
            </div>
            <div style="font-size: 14px; font-weight: 500; color: #c9e5ff">
              18℃ - 20℃
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
            "
          >
            <div
              style="
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #005691;
              "
            ></div>
            <div
              style="
                font-size: 14px;
                font-weight: 500;
                color: #c9e5ff;
                margin-left: 5px;
              "
            >
              超低温:
            </div>
            <div style="font-size: 14px; font-weight: 500; color: #c9e5ff">
              < 18℃
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
            "
          >
            <div
              style="
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #ff0000;
              "
            ></div>
            <div
              style="
                font-size: 14px;
                font-weight: 500;
                color: #c9e5ff;
                margin-left: 5px;
              "
            >
              高温:
            </div>
            <div
              style="
                font-size: 14px;
                font-weight: 500;
                color: #c9e5ff;
                margin-left: 2px;
              "
            >
              > 26℃
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        position: fixed;
        top: 40vh;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <!-- <dv-percent-pond :config="config" style="width: 25vw; height: 35px" ref="percentPond" /> -->
      <div
        style="
          font-size: 26px;
          margin-top: 30px;
          letter-spacing: 5px;
          color: #c9e5ff;
        "
      >
        设备在线率
      </div>
      <div class="rate_class">
        <CountTo
          :start-val="startVal"
          :end-val="rate"
          :duration="3000"
          :auto="true"
          class="count-number"
        ></CountTo
        >%
      </div>
      <div>
        <div
          style="
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 20px;
            color: #c9e5ff;
            width: 500px;
            margin-top: 20px;
          "
        >
          <div>设备总数</div>
          <div style="color: #22b2da; font-weight: 800">
            <CountTo
              :start-val="startVal"
              :end-val="equipNumber"
              :duration="3000"
              :auto="true"
              class="count-number"
            ></CountTo
            ><span style="color: #c9e5ff; margin-left: 10px">个</span>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 20px;
            color: #c9e5ff;
            width: 500px;
            margin-top: 20px;
          "
        >
          <div>离线设备</div>
          <div style="color: #22b2da; font-weight: 800">
            <CountTo
              :start-val="startVal"
              :end-val="equipNumber - online"
              :duration="3000"
              :auto="true"
              class="count-number"
            ></CountTo
            ><span style="color: #c9e5ff; margin-left: 10px">个</span>
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        position: fixed;
        top: 32vh;
        left: 22vw;
        height: 95px;
        width: 180px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-size: 30px;
        font-weight: 700;
      "
      class="item_class1"
    >
      <CountTo
        :start-val="startVal"
        :end-val="normal"
        :duration="3000"
        :auto="true"
      ></CountTo>
      <div style="margin-top: 70px; font-size: 16px">正常</div>
    </div>
    <div
      style="
        position: fixed;
        top: 32vh;
        left: 69vw;
        height: 95px;
        width: 180px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-size: 30px;
        font-weight: 700;
      "
      class="item_class2"
    >
      <CountTo
        :start-val="startVal"
        :end-val="high"
        :duration="3000"
        :auto="true"
      ></CountTo>
      <div style="margin-top: 70px; font-size: 16px">高温</div>
    </div>
    <div
      style="
        position: fixed;
        top: 76vh;
        left: 22vw;
        height: 95px;
        width: 180px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-size: 30px;
        font-weight: 700;
      "
      class="item_class3"
    >
      <CountTo
        :start-val="startVal"
        :end-val="low"
        :duration="3000"
        :auto="true"
      ></CountTo>
      <div style="margin-top: 70px; font-size: 16px">低温</div>
    </div>
    <div
      style="
        position: fixed;
        top: 76vh;
        left: 69vw;
        height: 95px;
        width: 180px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-size: 30px;
        font-weight: 700;
      "
      class="item_class4"
    >
      <CountTo
        :start-val="startVal"
        :end-val="superLow"
        :duration="3000"
        :auto="true"
      ></CountTo>
      <div style="margin-top: 70px; font-size: 16px">超低温</div>
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import { deviceOnline } from "@/api/statistics";
export default {
  name: "MapWms",
  props: {
    current: {
      type: Number,
      required: true,
    },
  },
  components: {
    CountTo,
  },
  data() {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
      // src: require("@/assets/video/4.mp4"),
      startVal: 0,
      equipNumber: 0,
      online: 0,
      rate: 0,
      onlineArray: [],
      high: 0,
      normal: 0,
      low: 0,
      superLow: 0,
      config: {
        value: 0,
        colors: ["#01c4f9", "#c135ff"],
        formatter: "{value}%",
      },
      options: [
        {
          value: 7,
          label: "",
        },
        {
          value: 0,
          label: "临河区",
        },
        {
          value: 1,
          label: "五原县",
        },
        {
          value: 2,
          label: "磴口县",
        },
        {
          value: 3,
          label: "乌拉特前旗",
        },
        {
          value: 4,
          label: "乌拉特中旗",
        },
        {
          value: 5,
          label: "乌拉特后旗",
        },
        {
          value: 6,
          label: "杭锦后旗",
        },
      ],
    };
  },
  watch: {
    current: {
      //监听的对象
      deep: true, //深度监听设置为 true
      // immediate: true,
      handler: function (newV, oldV) {
        this.refreshData();
      },
    },
  },

  created() {},
  beforeDestroy() {},
  mounted() {
    this.refreshData();
  },
  methods: {
    splitNumberToArray(online) {
      // 将数字转换为字符串，拆分为数组
      const strNum = online.toString().split("");
      // 将字符串数组转换为数字数组
      const numArray = strNum.map(Number);

      // 计算需要补充的0的数量
      const zerosToAdd = 8 - numArray.length;

      // 在数组前面补充0
      const resultArray = Array(zerosToAdd > 0 ? zerosToAdd : 0)
        .fill(0)
        .concat(numArray);
      console.log("resultArray", resultArray);
      // 确保最终数组长度为8
      return resultArray.slice(0, 8);
    },

    refreshData() {
      let district = this.options.find((item) => item.value === this.current);
      deviceOnline({
        district: district.label,
      }).then((response) => {
        this.equipNumber = response.data.count;
        this.online = response.data.online;
        this.onlineArray = this.splitNumberToArray(this.online);
        this.high = response.data.temperatureG;
        this.normal = response.data.temperature;
        this.low = response.data.temperatureD;
        this.superLow = response.data.temperatureCD;
        console.log(111111, this.online);
        this.rate =
          this.online == 0
            ? 0
            : ((this.online / this.equipNumber) * 100).toFixed(2);
        console.log(this.$refs.percentPond.config);
      });
    },
  },
};
</script>

<style lang="scss">
.statisic_container {
  height: 100vh;
  width: 100vw;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.videoContainer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;
  z-index: -100;
}

.videoContainer:before {
  content: "";
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: block;
  z-index: -1;
  top: 0;
  left: 0;
  background: rgba(25, 29, 34, 0.65);
}

#bgVid {
  width: 100vw;
  height: 100vh;
}

.online_class {
  display: flex;
  margin-top: 14vh;
  justify-content: flex-start;
  align-items: center;
  font-size: 36px;
  color: #c9e5ff;
  padding-left: 10px;
  height: 10vh;
  font-weight: 500;
  letter-spacing: 1px;
  background: url("../../assets/images/cityLevel/online_bg.png") no-repeat;
  background-size: 100% 100%;
}

.number_class {
  display: flex;
  justify-content: space-around;
  flex: 1;
  text-shadow: 0 0 5px #7cd9fb, /* 发光效果的颜色和强度 */ 0 0 10px #7cd9fb,
    0 0 15px #7cd9fb, 0 0 20px #7cd9fb;
}

.number_item_class {
  background: url("../../assets/images/cityLevel/number_bg.png") no-repeat;
  padding: 5px 8px;
  font-weight: 300;
  background-size: 100% 100%;
}

.rate_class {
  font-size: 40px;
  color: #c9e5ff;
  font-style: italic;
  margin-top: -60px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 304px;
  height: 203px;
  background: url("../../assets/images/cityLevel/rate_bg.png") no-repeat;
  background-size: 100% 100%;
}

.item_class1 {
  background: url("../../assets/images/cityLevel/2.png") no-repeat;
  background-size: 100% 100%;
  text-shadow: 0 0 5px #73ddb5, /* 发光效果的颜色和强度 */ 0 0 10px #73ddb5,
    0 0 15px #73ddb5, 0 0 20px #73ddb5;
}

.item_class2 {
  background: url("../../assets/images/cityLevel/4.png") no-repeat;
  background-size: 100% 100%;
  background-size: 100% 100%;
  text-shadow: 0 0 5px #f0c855, /* 发光效果的颜色和强度 */ 0 0 10px #f0c855,
    0 0 15px #f0c855, 0 0 20px #f0c855;
}

.item_class3 {
  background: url("../../assets/images/cityLevel/1.png") no-repeat;
  background-size: 100% 100%;
  background-size: 100% 100%;
  text-shadow: 0 0 5px #0278ae, /* 发光效果的颜色和强度 */ 0 0 10px #0278ae,
    0 0 15px #0278ae, 0 0 20px #0278ae;
}

.item_class4 {
  background: url("../../assets/images/cityLevel/3.png") no-repeat;
  background-size: 100% 100%;
  background-size: 100% 100%;
  text-shadow: 0 0 5px #07689f, /* 发光效果的颜色和强度 */ 0 0 10px #07689f,
    0 0 15px #07689f, 0 0 20px #07689f;
}
</style>
