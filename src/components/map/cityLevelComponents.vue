<template>
<div class="screen_container">
    <component :is="dynamicComponent" :supply-data="supplyData" :current="current"></component>
    <div style="position: fixed; top: 1.5vh; left: 65vw; z-index: 300">
        <el-select v-model="current" placeholder="请选择" @change="changeCity" style="width: 15vw">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
    <div style="position: fixed; bottom: 2vh; left: 73vw" v-if="this.current == 0 || this.current == 5">
        <el-link type="primary" @click="changeDimensional">{{
        dimensional == 0 ? "3D" : "图表"
      }}</el-link>
    </div>
</div>
</template>

<script>
import bus from "@/utils/bus";
export default {
    data() {
        return {
            supplyData: {},
            dimensional: 0,
            currentJson: require("@/assets/json/city.json"),
            current: 7,
            options: [{
                    value: 7,
                    label: "市级",
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
                if (this.current != 0 || this.current != 5) {
                    this.dimensional = 0
                }
                bus.$emit("currentSelect", newV);
            },
        },
    },
    computed: {
        dynamicComponent() {
            return this.current == 7 ?
                () => import("./echartsMapCityLevel.vue") :
                this.dimensional == 1 ?
                () => import("./citySupplyHeat3D.vue") :
                () => import("./cityOther.vue");
        },
    },
    created() {
        bus.$on("cityLevelShowMap", (val) => {
            this.current = val.dataIndex;
            this.supplyData = val;
        });
    },
    methods: {
        changeDimensional() {
            if (this.dimensional == 0) {
                this.dimensional = 1
            } else {
                this.dimensional = 0
            }

        },
        changeCity(e) {
            this.current = e;
            if (e == 0 || e == 5) {
                let features = this.deepClone(this.currentJson).features[e].properties;
                let obj = {};
                obj.dataIndex = e;
                obj.name = features.name;
                this.supplyData = obj;
            }
        },
        deepClone(source) {
            if (!source && typeof source !== "object") {
                throw new Error("error arguments", "deepClone");
            }
            const targetObj = source.constructor === Array ? [] : {};
            Object.keys(source).forEach((keys) => {
                if (source[keys] && typeof source[keys] === "object") {
                    targetObj[keys] = this.deepClone(source[keys]);
                } else {
                    targetObj[keys] = source[keys];
                }
            });
            return targetObj;
        },
    },
};
</script>

<style lang="scss">
.el-select-dropdown__list {
    color: #7cd9fb !important;
    background-color: rgba(1, 28, 82, 0);
}

//下拉框
.el-select-dropdown {
    border-color: #7cd9fb;
    color: #7cd9fb !important;
    background-color: rgba(1, 28, 82, 0);
}

//输入框
.el-input__inner {
    border-color: #7cd9fb;
    color: #7cd9fb !important;
    background-color: rgba(1, 28, 82, 0);
}

//聚焦时的样式
.el-select .el-input.is-focus .el-input__inner {
    background-color: rgba(1, 28, 82, 0);
    border-color: #7cd9fb;
    color: #7cd9fb !important;
}

//下拉框选中
.el-select-dropdown__item {
    color: #7cd9fb !important;
}

//鼠标经过下拉框
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
    color: #7cd9fb;
    border-color: #7cd9fb;
    background-color: #0f3360;
}

.el-icon-arrow-up {
    color: #7cd9fb;
}

.el-tag.el-tag--info {
    color: #7cd9fb;
    background-color: #0f3360;
}
.el-select .el-input__inner:focus{
    color: #7cd9fb;
    border-color: #7cd9fb;
}
.el-select .el-input .el-select__caret {
    color: #7cd9fb;
}
.el-scrollbar {}
</style>
