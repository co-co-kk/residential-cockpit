<template>
  <div class="">
    <div class="flex height-[56%]">
      <div>
        <PubTit
          style="width: 555px"
          :title="'质量管理'"
          :width="555"
        ></PubTit>
        <div>
          <div class="flex w-[555px] text-[#fff]">
            <div
              class="w-[100%] flex flex-col text-center mt-[10px]"
            >
              <div class="w-[100%] flex">
                <div
                  class="tab-items w-[50%] text-[16px] h-[44px] leading-[42px]"
                  @click="qualityTabIndex = index"
                  :class="{
                    'is-tab-active':
                      qualityTabIndex === index,
                  }"
                  v-for="(
                    item, index
                  ) in qualityTab"
                >
                  {{ item }}
                </div>
              </div>
              <div
                class="w-full"
                v-if="qualityTabIndex === 0"
              >
                <div
                  class="w-[100%] mt-[10px] flex justify-center flex-col items-center"
                >
                  <div
                    class="grid grid-cols-4 grid-rows-1 gap-[10px] w-[100%]"
                  >
                    <div
                      class="flex flex-col relative after:absolute after:right-[30px] after:top-[12.5%] after:block after:content-[''] after:w-[1px] after:h-[75%] after:bg-[rgba(110,181,233,0.3)]"
                      v-for="(
                        item, index
                      ) in listData"
                    >
                      <div class="flex items-end">
                        <span
                          class="text-[30px] tit-2"
                          >{{ item.value }}</span
                        >
                        <span
                          class="text-[18px] tit-2 ml-[5px]"
                          >个</span
                        >
                      </div>
                      <span
                        class="text-[18px] mt-[5px] text-left"
                        >{{ item.name }}</span
                      >
                    </div>
                    <div
                      class="flex flex-col items-center"
                    >
                      <div
                        class="flex items-end text-[rgba(86,209,146,1)]"
                      >
                        <span class="text-[30px]"
                          >99.43</span
                        >
                        <span
                          class="text-[18px] ml-[5px]"
                          >%</span
                        >
                      </div>
                      <span
                        class="text-[18px] mt-[5px]"
                        >整改率</span
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="w-[100%] flex mt-[10px]"
                  style="flex-wrap: wrap"
                >
                  <div
                    class="slices-bg w-[40%] h-[75px] flex text-sm items-center pl-[50px] mt-[6px] pt-[5px]"
                    v-for="(
                      item, inde
                    ) in projectItem"
                    :key="inde"
                  >
                    <div>
                      <img
                        :src="item.icon"
                        alt=""
                        draggable="false"
                      />
                    </div>
                    <div
                      class="text-[#E1EEFF] pl-[20px] text-left w-[120px]"
                    >
                      <div
                        :title="item.title"
                        class="truncate"
                      >
                        {{ item.title }}
                      </div>
                      <div>
                        {{ item.num
                        }}{{ item.unit }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="h-[78px]">
                  <img
                    src="@/assets/sxk-qph/bhgs.png"
                    draggable="false"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="w-full"
                v-if="qualityTabIndex === 1"
              >
                <div
                  class="w-full mt-[18px] slices-bgs"
                >
                  <div
                    class="material-bg h-[42px] text-[16px] text-[#fff] leading-[42px]"
                  >
                    建筑材料
                  </div>
                  <div
                    class="flex justify-between px-[20px]"
                  >
                    <div
                      class="flex my-[20px]"
                      v-for="item in buildingMaterial"
                    >
                      <img
                        class="w-[50px] h-[50px] cursor-pointer"
                        @click="handleCailiao"
                        src="@/assets/images/shield.png"
                      />
                      <div class="ml-[10px]">
                        <div class="text-[14px]">
                          {{ item.title }}
                        </div>
                        <div
                          class="flex items-end mt-[5px] building-tit"
                        >
                          <div
                            class="text-[23px] text-[#EEFDFF]"
                          >
                            {{ item.num }}
                          </div>
                          <div
                            class="text-[14px] ml-[5px]"
                          >
                            项
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="my-[15px] flex justify-center"
                >
                  <div
                    class="text-center text-[16px] text-[#83d9ff] title-bg-img w-[130px] leading-[30px]"
                  >
                    <span class="tit-bg-color"
                      >预拌混泥土</span
                    >
                  </div>
                </div>
                <div class="w-full flex">
                  <div
                    class="flex"
                    v-for="(
                      item, index
                    ) in concreteList"
                  >
                    <div
                      class="frame-bg w-[95px] h-[178px]"
                    >
                      <div
                        class="text-[16px] leading-[34px]"
                      >
                        {{ item.title }}
                      </div>
                      <div
                        class="text-[16px] my-[14px]"
                      >
                        {{ item.title1 }}
                      </div>
                      <div
                        class="flex justify-center text-[#6BFFAC] items-end"
                      >
                        <div
                          class="text-[20px] leading-[20px] num-color"
                        >
                          {{ item.title1Num }}
                        </div>
                        <div
                          class="text-[14px] num-color"
                        >
                          份
                        </div>
                      </div>
                      <div
                        class="text-[16px] mt-[22px]"
                      >
                        {{ item.title2 }}
                      </div>
                      <div
                        class="flex justify-center text-[#6BFFAC] items-end mt-[8px]"
                      >
                        <div
                          class="text-[20px] leading-[20px] num-color"
                        >
                          {{ item.title2Num }}
                        </div>
                        <div
                          class="text-[14px] num-color"
                        >
                          {{ item.title2Unit }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="ml-[3px] mr-[2px]"
                      v-if="
                        index !==
                        concreteList.length - 1
                      "
                    >
                      <img
                        src="@/assets/images/arrow.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="w-[100%] flex justify-center flex-col items-center">
                <div class="text-[18px] is-title-bg mt-[10px] mb-[10px]">
                  质量问题情况
                </div>
                <div class="grid grid-cols-4 grid-rows-1 gap-[10px] w-[100%]">
                  <div
                    class="flex flex-col relative after:absolute after:right-[30px] after:top-[12.5%] after:block after:content-[''] after:w-[1px] after:h-[75%] after:bg-[rgba(110,181,233,0.3)]"
                    v-for="(item, index) in listData"
                  >
                    <div class="flex items-end">
                      <span class="text-[30px] tit-2">{{ item.value }}</span>
                      <span class="text-[18px] tit-2 ml-[5px]">个</span>
                    </div>
                    <span class="text-[18px] mt-[5px]">{{ item.name }}</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="flex items-end text-[rgba(86,209,146,1)]">
                      <span class="text-[30px]">99.43</span>
                      <span class="text-[18px] ml-[5px]">%</span>
                    </div>
                    <span class="text-[18px] mt-[5px]">整改率</span>
                  </div>
                </div>
              </div> -->

              <!-- <div class="h-[276px] w-[100%] mt-[31px]">
                <EcharsWrapper :chartData="coverageData5"></EcharsWrapper>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div>
        <PubTit
          style="width: 555px"
          :title="'安全管理'"
          :width="555"
        ></PubTit>
        <div class="mt-[20px] mr-[29px]">
          <img
            src="@/assets/sxk-qph/qnjc.png"
            draggable="false"
            class="mr-[50px] h-[205px]"
            alt=""
          />
          <div>
            <div class="flex text-[#fff]">
              <div
                class="w-[100%] flex flex-col items-center justify-center h-[255px]"
              >
                <div
                  class="w-[100%] flex justify-center flex-col items-center"
                >
                  <div
                    class="text-[18px] is-title-bg mt-[10px] mb-[10px]"
                  >
                    安全隐患
                  </div>
                  <div
                    class="flex justify-between w-[100%] "
                  >
                    <div
                      class="flex flex-col relative after:absolute after:right-[30px] after:top-[12.5%] after:block after:content-[''] after:w-[1px] after:h-[75%] after:bg-[rgba(110,181,233,0.3)]"
                      v-for="(
                        item, index
                      ) in listData1"
                    >
                      <div class="flex items-end">
                        <span
                          class="text-[30px] tit-2"
                          >{{ item.value }}</span
                        >
                        <span
                          class="text-[18px] tit-2 ml-[5px]"
                          >个</span
                        >
                      </div>
                      <span
                        class="text-[18px] mt-[5px]"
                        >{{ item.name }}</span
                      >
                    </div>
                    <div
                      class="flex flex-col items-center"
                    >
                      <div
                        class="flex items-end text-[rgba(86,209,146,1)]"
                      >
                        <span class="text-[30px]"
                          >97.14</span
                        >
                        <span
                          class="text-[18px] ml-[5px]"
                          >%</span
                        >
                      </div>
                      <span
                        class="text-[18px] mt-[5px]"
                        >整改率</span
                      >
                    </div>
                  </div>
                </div>
                <!-- 新 -->
                <div class="">
                  <img
                    src="@/assets/xulei/ricon1.png"
                    draggable="false"
                    class="mt-[20px] w-[560px]"
                    alt=""
                  />
                </div>
                <!-- <div class="flex h-[166px]">
                  <EcharsWrapper
                    class="w-[110px] h-[166px]"
                    :chartData="coverageData4"
                  ></EcharsWrapper>
                  <div>
                    <div class="mt-[10px]">
                      <div class="flex mt-[35px]">
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              材料管理
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              77
                            </div>
                          </div>
                        </div>
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              现场防火
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              36
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex mt-[21px]">
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              洞口防护
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              25
                            </div>
                          </div>
                        </div>
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              扣件式钢管脚手架
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              20
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex mt-[21px]">
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              临边防护
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              16
                            </div>
                          </div>
                        </div>
                        <div class="flex mt-[10px] ml-[30px]">
                          <div class="flex justify-center items-center">
                            <div class="text-[#BAC3C4] text-[17px] is-dot">
                              未分类
                            </div>
                            <div class="text-[17px] color-[#488CF7] ml-2">
                              15
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex height-[54%]">
      <div>
        <PubTit
          style="width: 555px"
          :title="'施工进度'"
          :width="555"
        ></PubTit>
        <div class="w-full">
          <div
            class="flex mt-[28px] text-[16px] justify-between items-center"
          >
            <!-- <img
              src="@/assets/sxk-qph/gjjd2x.png"
              draggable="false"
              class="w-[400px] h-[50px]"
              alt=""
            /> -->
            <div
              class="w-[176px] flex items-center"
            >
              <dev class="text-[#6BB6ED] mr-[5px]"
                >总工期</dev
              >
              <div
                class="flex items-center gap-[5px] color-[#fff]"
              >
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  4
                </div>
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  7
                </div>
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  3
                </div>
                <span class="pl-[5px]">天</span>
              </div>
            </div>
            <div
              class="w-[176px] flex items-center"
            >
              <span
                class="text-[#6BB6ED] mr-[5px]"
                >已施工</span
              >
              <div
                class="flex items-center gap-[5px] color-[#fff]"
              >
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  2
                </div>
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  1
                </div>
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  4
                </div>
                <span class="pl-[5px]">天</span>
              </div>
            </div>
            <div
              class="w-[176px] flex items-center"
            >
              <span
                class="text-[#6BB6ED] mr-[5px]"
                >项目进度</span
              >
              <div
                class="flex items-center gap-[5px] color-[#fff]"
              >
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  4
                </div>
                <div
                  class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                >
                  7
                </div>
                <!-- <div
                    class="number-bg w-[26px] h-[30px] flex items-center justify-center"
                  >
                    3
                  </div> -->
                <span class="pl-[5px]">%</span>
              </div>
            </div>
          </div>
          <div
            class="h-[276px] w-[100%] mt-[21px]"
          >
            <img
              src="@/assets/xulei/ricon2.png"
              alt=""
            />
            <!-- <EcharsWrapper :chartData="coverageData5"></EcharsWrapper> -->
          </div>
        </div>
      </div>
      <div>
        <PubTit
          style="width: 555px"
          :title="'项目支付情况'"
          :width="555"
        ></PubTit>
        <div
          class="pl-[15px] w-[555px] pr-[15px]"
        >
          <div class="text-[#fff]">
            <div
              class="w-full flex flex-col text-center mt-[10px]"
            >
              <div class="w-full flex">
                <div
                  class="tab-items w-[50%] text-[16px] h-[44px] leading-[42px]"
                  @click="paymentIndex = index"
                  :class="{
                    'is-tab-active':
                      paymentIndex === index,
                  }"
                  v-for="(
                    item, index
                  ) in paymentTab"
                >
                  {{ item }}
                </div>
              </div>
              <div
                class="w-full"
                v-if="paymentIndex === 0"
              >
                <div class="w-full">
                  <div class="flex mt-[17px]">
                    <div class="w-[50%] flex">
                      <div
                        class="title-bg-img w-[130px]"
                      >
                        <span class="tit-bg-color"
                          >专项户信息</span
                        >
                      </div>
                    </div>
                    <div class="w-[50%]">
                      <div
                        class="title-bg-img w-[160px]"
                      >
                        <span class="tit-bg-color"
                          >合同人员记录考核</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="w-full flex justify-between mt-[12px]"
                >
                  <div
                    class="text-left flex-1 min-w-0"
                    v-for="item in specialBank"
                  >
                    <div
                      class="text-[14px] text-[#4CAFF9] truncate"
                      :title="item.name"
                    >
                      {{ item.name }}
                    </div>
                    <div
                      class="text-[14px] text-[#6BB6ED] mt-[10px] truncate"
                      :title="item.value"
                    >
                      {{ item.value }}
                    </div>
                  </div>
                </div>
                <div
                  class="w-full flex justify-between mt-[30px] text-[14px] items-center"
                >
                  <div
                    class="title-bg-img w-[150px]"
                  >
                    <span class="tit-bg-color"
                      >用工考勤工资发放</span
                    >
                  </div>
                  <div class="text-[#E2AF2C]">
                    工资到账及时率：<span
                      class="text-[#00D2FF]"
                      >98%</span
                    >
                  </div>
                  <div class="text-[#E2AF2C]">
                    工资确认准确率：<span
                      class="text-[#00D2FF]"
                      >100%</span
                    >
                  </div>
                </div>
                <div class="w-full">
                  <table
                    class="text-[14px] w-full border-collapse"
                  >
                    <thead
                      class="text-[#A0C4E1] leading-[36px]"
                    >
                      <tr>
                        <th>姓名</th>
                        <th>实际出勤</th>
                        <th>计薪方式</th>
                        <th>考勤工时</th>
                        <th>工资代发流水号</th>
                        <th>工资表签收</th>
                      </tr>
                    </thead>
                    <tbody
                      class="text-[#DDE5F3] leading-[27px]"
                    >
                      <tr
                        v-for="(
                          item, index
                        ) in paymentTable"
                        :class="{
                          'bg-[rgba(174,210,255,0.10)]':
                            index % 2 !== 0,
                        }"
                        @click="handleKaoqin"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.day }}</td>
                        <td>{{ item.way }}</td>
                        <td>
                          {{ item.workingHours }}
                        </td>
                        <td
                          class="truncate max-w-[80px]"
                          :title="
                            item.serialNumber
                          "
                        >
                          {{ item.serialNumber }}
                        </td>
                        <td>{{ item.type }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="w-full"
                v-if="paymentIndex === 1"
              >
                <div class="w-full">
                  <div class="flex mt-[17px]">
                    <div class="w-[50%] flex">
                      <div
                        class="title-bg-img w-[130px]"
                      >
                        <span class="tit-bg-color"
                          >进度节点款</span
                        >
                      </div>
                    </div>
                    <div class="w-[50%]">
                      <div
                        class="title-bg-img w-[160px]"
                      >
                        <span class="tit-bg-color"
                          >劳务工程款</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="w-full flex justify-between mt-[12px]"
                >
                  <div
                    class="text-left flex-1 min-w-0"
                    v-for="item in paymentList"
                  >
                    <div
                      class="text-[14px] text-[#4CAFF9]"
                      :title="item.name"
                    >
                      {{ item.name }}
                    </div>
                    <div
                      class="text-[14px] text-[#6BB6ED] mt-[10px]"
                      :title="item.value"
                    >
                      {{ item.value }}
                    </div>
                  </div>
                </div>
                <div
                  class="w-full flex mt-[30px]"
                >
                  <div class="w-[50%] flex">
                    <div
                      class="title-bg-img w-[130px]"
                    >
                      <span class="tit-bg-color"
                        >供应链款项</span
                      >
                    </div>
                  </div>
                  <div class="w-[50%]">
                    <div
                      class="title-bg-img w-[160px]"
                    >
                      <span class="tit-bg-color"
                        >政策达标率</span
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="w-full flex mt-[10px]"
                  style="flex-wrap: wrap"
                >
                  <div
                    class="slices-bg w-[40%] h-[70px] flex text-sm items-center pl-[50px] pt-[5px]"
                    v-for="(
                      item, inde
                    ) in paymentItem"
                    :key="inde"
                  >
                    <div>
                      <img
                        :src="item.icon"
                        alt=""
                        draggable="false"
                      />
                    </div>
                    <div
                      class="text-[#E1EEFF] pl-[20px] text-left w-[120px]"
                    >
                      <div
                        :title="item.title"
                        class="truncate"
                      >
                        {{ item.title }}
                      </div>
                      <div>
                        {{ item.num
                        }}{{ item.unit }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="cailiaoDiaShown"
      title=""
      :width="diaImgWidth"
      align-center
    >
      <img
        :src="currentDiaImg"
        alt=""
        draggable="false"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PubTit from "@/components/public/PubTit.vue";
import EcharsWrapper from "@/components/echars/EcharsWrapper.vue";
import xuanzhaun from "@/view/home/detail/components/rightContent/xuanzhaun.vue";
import {
  coverageData,
  coverageData3,
  coverageData4,
  coverageData5,
  coverageData6,
  coverageData7,
} from "./echarsOptions.js";
import SeamlessScroll from "@/components/SeamlessScroll.vue";
const KeyProgress = [
  "关键进度一",
  "关键进度二",
  "关键进度三",
  "关键进度四",
];
import rebar from "@/assets/images/rebar.png";
import template from "@/assets/images/template.png";
import concrete from "@/assets/images/concrete.png";
import foundation from "@/assets/images/foundation.png";
import drainage from "@/assets/images/drainage.png";
import fund from "@/assets/images/fund.png";
import quality from "@/assets/images/quality.png";
import supplier from "@/assets/images/supplier.png";
import policy from "@/assets/images/policy.png";
import ricon3 from "@/assets/xulei/ricon3.png";
import ricon4 from "@/assets/xulei/ricon4.png";
const diaImgWidth = ref(1117);
const cailiaoDiaShown = ref(false);
const currentDiaImg = ref(ricon3);
const handleCailiao = () => {
  currentDiaImg.value = ricon3;
  cailiaoDiaShown.value = true;
};
const handleKaoqin = () => {
  currentDiaImg.value = ricon4;
  cailiaoDiaShown.value = true;
};
const projectItem = ref([
  {
    title: "钢筋工程",
    num: 90,
    unit: "个",
    icon: rebar,
  },
  {
    title: "模板工程",
    num: 85,
    unit: "个",
    icon: template,
  },
  {
    title: "混凝土工...",
    num: 110,
    unit: "个",
    icon: concrete,
  },
  {
    title: "地基与基...",
    num: 65,
    unit: "个",
    icon: foundation,
  },
  {
    title: "给排水及...",
    num: 95,
    unit: "个",
    icon: drainage,
  },
]);
const buildingMaterial = ref([
  {
    title: "建材监测报告数",
    num: "519",
  },
  {
    title: "检测合格率",
    num: "505",
  },
  {
    title: "合规资料归档数",
    num: "501",
  },
]);

const qualityTab = ref([
  "质量问题情况",
  "材料溯源",
]);
const qualityTabIndex = ref(1);
const concreteList = ref([
  {
    title: "原材料",
    title1: "检测报告",
    title1Num: "99",
    title2: "合格率",
    title2Num: "98",
    title2Unit: "%",
  },
  {
    title: "砼生产",
    title1: "砼企业",
    title1Num: "99",
    title2: "年度产量",
    title2Num: "565",
    title2Unit: "万M²",
  },
  {
    title: "砼出厂",
    title1: "送货单",
    title1Num: "121",
    title2: "检测报告",
    title2Num: "218",
    title2Unit: "份",
  },
  {
    title: "砼工地浇筑",
    title1: "见证取样",
    title1Num: "125",
    title2: "不合格",
    title2Num: "5",
    title2Unit: "份",
  },
  {
    title: "实体成型",
    title1: "强度检测",
    title1Num: "115",
    title2: "不合格",
    title2Num: "5",
    title2Unit: "份",
  },
]);
const paymentTab = ref([
  "农民工工资支付",
  "工程款支付",
]);
const paymentIndex = ref(0);
const specialBank = ref([
  {
    name: "专户名称",
    value: "中建八局第四...",
  },
  {
    name: "专户账号",
    value: "31060...",
  },
  {
    name: "资金余额",
    value: "216.04万元",
  },
  {
    name: "实名制人数",
    value: "304人",
  },
  {
    name: "季度考勤人数",
    value: "512人",
  },
]);
const paymentTable = ref([
  {
    name: "孙志虹",
    day: "63天",
    way: "计时",
    workingHours: "504时",
    serialNumber: "3116215764...",
    type: "已签收",
  },
  {
    name: "徐磊",
    day: "63天",
    way: "计时",
    workingHours: "540时",
    serialNumber: "3116215764...",
    type: "已签收",
  },
  {
    name: "齐达内",
    day: "63天",
    way: "计时",
    workingHours: "524时",
    serialNumber: "3116215764...",
    type: "已签收",
  },
  {
    name: "林平之",
    day: "63天",
    way: "计时",
    workingHours: "408时",
    serialNumber: "3116215764...",
    type: "已签收",
  },
]);
const paymentList = ref([
  {
    name: "关键节点达...",
    value: "12 个",
  },
  {
    name: "质量验收...",
    value: "95%",
  },
  {
    name: "资金余额",
    value: "216.04万元",
  },
  {
    name: "专户资金充足率",
    value: "98%",
  },
  {
    name: "欠薪预警指数",
    value: "2%",
  },
]);
const paymentItem = ref([
  {
    title: "供应商履约率",
    num: 98,
    unit: "%",
    icon: supplier,
  },
  {
    title: "资金用途匹配度",
    num: 99,
    unit: "%",
    icon: fund,
  },
  {
    title: "质量缺陷退货率",
    num: 2,
    unit: "%",
    icon: quality,
  },
  {
    title: "政策达标率",
    num: 2,
    unit: "%",
    icon: policy,
  },
]);
const scrollTableList = ref([
  {
    a: "1",
    b: "环境监控",
    c: "工程施工图审查",
    d: "设计绿建处",
  },
  {
    a: "2",
    b: "一般",
    c: "渝中七号库房建设项目",
    d: "质安总站",
  },
  {
    a: "3",
    b: "一般",
    c: "渝北胜景大楼建设项目",
    d: "质安总站",
  },
]);

const scrollTableListHeader = ref([
  "排名",
  "设备类型",
  "设备数量",
  "本月新增",
]);

const listData = ref([
  {
    name: "问题总数",
    value: 350,
  },
  {
    name: "严重问题",
    value: 0,
  },
  {
    name: "已整改",
    value: 348,
  },
]);
const listData1 = ref([
  {
    name: "隐患总数",
    value: 7,
  },
  {
    name: "重大隐患",
    value: 0,
  },
  {
    name: "已整改",
    value: 5,
  },
]);
const listData2 = ref([
  {
    name: "隐患总数",
    value: 350,
  },
  {
    name: "重大隐患",
    value: 0,
  },
  {
    name: "已整改",
    value: 306,
  },
]);
const activeTab = ref(0);
const staffData = ref([
  {
    name: "履约支付",
    id: "1",
    data: [
      {
        name: "项目负责人",
        value: "1人",
        number: 340,
        unit: "人",
        describe: "实名制人数",
      },
      {
        name: "工程管理工程师",
        value: "2人",
        number: 205,
        unit: "万元",
        describe: "合同人员总薪资",
      },
      {
        name: "造价工程师",
        value: "2人",
        number: 87,
        unit: "万元",
        describe: "累积发放金额",
      },
      {
        name: "安全专员",
        value: "2人",
        number: 2037,
        unit: "人次",
        describe: "履约总人次",
      },
      {
        name: "报建专员",
        value: "2人",
        number: 47,
        unit: "条",
        describe: "欠薪线索移交",
      },
    ],
  },
  {
    name: "支付预警",
    id: "2",
    data: [],
  },
]);
</script>

<style lang="scss" scoped>
.shenjikeng {
  background: url("@/assets/rou/ricon6.png")
    no-repeat center center;
  padding: 5px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-box {
  // font-weight: bold;
  // font-size: 24px;
  // color: #f6f9fe;
  // text-shadow: 0px 2px 8px rgba(5, 28, 55, 0.42);
  width: 132px;
  height: 29px;
  background: linear-gradient(
    0deg,
    rgba(44, 96, 140, 0.92) 0%,
    rgba(55, 177, 255, 0.77) 100%
  );
  border-radius: 1px;
  border: 1px solid;
  opacity: 0.58;
  border-image: linear-gradient(
      0deg,
      #79caf0,
      #06baff,
      #79caf0
    )
    10 10;
}
.title-text {
  width: 100%;
  // height: 15px;
  font-family: Alibaba PuHuiTi;
  font-weight: 400;
  color: #83d9ff;
  background: linear-gradient(
    0deg,
    rgba(107, 182, 237, 0.96) 0%,
    rgba(255, 255, 255, 0.96) 82.6904296875%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.bt-title-bg2 {
  background: linear-gradient(
    0deg,
    rgba(44, 96, 140, 0.92) 0%,
    rgba(55, 177, 255, 0.77) 100%
  );
  border-radius: 1px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  opacity: 0.58;
  border-image: linear-gradient(
      0deg,
      #79caf0,
      #06baff,
      #79caf0
    )
    10 10;
}
.tit-2 {
  font-family: Source Han Sans CN;
  font-weight: bold;
  // font-size: 24px;
  color: #50bbff;
  // line-height: 48px;
  background: linear-gradient(
    0deg,
    #ffffff 0%,
    #6bb6ed 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tit1 {
  font-family: Source Han Sans CN;
  font-weight: bold;
  font-size: 24px;
  color: #17b99a;
  background: linear-gradient(
    0deg,
    #eefdff 0%,
    #6bffac 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.border-bg-op {
  background: linear-gradient(
    0deg,
    rgba(21, 171, 250, 0) 0%,
    rgba(109, 199, 246, 0.78) 50%,
    rgba(21, 171, 250, 0) 100%
  );
  opacity: 0.4;
}
.is-dot {
  position: relative;
  padding-left: 20px;
}
.is-dot::before {
  display: block;
  content: "";
  width: 10px;
  height: 10px;
  background: linear-gradient(
    0deg,
    #488cf7 0%,
    #ffffff 100%
  );
  border-radius: 50%;
  margin-right: 10px;
  position: absolute;
  left: 0px;
  top: calc(50% - 5px);
}
.key-progress {
  width: 76px;
  height: 13px;
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  background: linear-gradient(
    0deg,
    #79c5ff 0%,
    #ffffff 59.8388671875%,
    #ffffff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.key-progress-item {
  // background: rgba(255, 255, 255, 0.1);
  // border: 1px solid rgba(255, 255, 255, 0.2);
  // background: radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.1));
  background: radial-gradient(
    circle,
    rgb(1, 19, 42, 0.1),
    rgba(255, 255, 255, 0.3)
  );
}
.number-bg {
  background: url("@/assets/images/staffPng/numberbg.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.title-bg-img {
  background: url("@/assets/sxk-qph/z.png")
    no-repeat center center;
  background-size: 100% 100%;
  font-size: 14px;
  height: 37px;
  text-align: center;
  line-height: 37px;
}

.tabs-header {
  display: flex;
  position: relative;
  background-color: #051833;
  border-bottom: 1px solid #004392;
}

.tab-item {
  position: relative;
  padding: 12px 10px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  flex: 1;
  transition: all 0.3s;
  border-right: 1px solid #004392;
  border-top: 1px solid #004392;
  user-select: none;
}

.is-nth-child {
  border-left: 1px solid #004392;
}

.tab-item:last-child {
  border-right: none;
}

.tab-item.is-active {
  color: #fff;
  background-color: rgba(43, 118, 226, 0.29);
  font-weight: 500;
}

.tab-item.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #f5f7fa;
}

.tab-underline {
  position: absolute;
  bottom: -1px;
  left: 0;
  height: 2px;
  background-color: #409eff;
  transition: transform 0.3s;
  z-index: 1;
}

.close-icon {
  margin-left: 8px;
  font-size: 12px;
  color: #c0c4cc;
  transition: color 0.3s;
}

.close-icon:hover {
  color: #909399;
}

.tab-pane.is-active {
  display: block;
}
.tab-items {
  background: url("@/assets/images/tab.png");
  background-size: 100% 100%;
}
.is-tab-active {
  background: url("@/assets/images/activeTab.png");
  background-size: 100% 100%;
}
.slices-bg {
  background: url("@/assets/images/staffPng/slices.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.slices-bgs {
  background: url("@/assets/images/staffPng/slices.png")
    no-repeat center center;
  background-size: 105% 107%;
}
.material-bg {
  background: url("@/assets/images/shield-bg.png");
  background-size: 100% 100%;
}
.frame-bg {
  background: url("@/assets/images/bg-frame.jpg");
  background-size: 100% 100%;
}
.building-tit {
  background: linear-gradient(
    0deg,
    #6bb6ed 0%,
    #eefdff 100%
  );
  font-family: Alibaba PuHuiTi 2,
    Alibaba PuHuiTi 2-55 Regular;
  font-weight: normal;
  color: #00d2ff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.num-color {
  background: linear-gradient(
    0deg,
    #6bffac 0%,
    #eefdff 100%
  );
  font-family: Alibaba PuHuiTi 2,
    Alibaba PuHuiTi 2-45 Light;
  color: #17b99a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tit-bg-color {
  background: linear-gradient(
    0deg,
    rgba(107, 182, 237, 0.96) 0%,
    rgba(255, 255, 255, 0.96) 83%
  );
  font-family: Alibaba PuHuiTi 2,
    Alibaba PuHuiTi 2-45 Light;
  color: #83d9ff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
:deep(.el-dialog) {
  padding: 0;
  background: transparent !important;
}
:deep(.el-dialog__headerbtn) {
  margin-top: 20px;
}
</style>
