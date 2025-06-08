<template>
  <div class="map_container" style="position: relative">
    <div
      id="map"
      class="map"
      style="width: 100%; height: 100%; z-index: 0"
    ></div>
    <div
      id="map1"
      class="map1"
      style="
        width: 50%;
        height: 50%;
        z-index: 0;
        top: 0;
        position: absolute;
        left: 0;
      "
    ></div>
    <div class="note_class">
      <div class="text-[28px] font-400 ml-[18px]">项目数量</div>
      <div class="flex ml-[18px]">
        <span
          class="w-[15px] h-[15px] m-[10px] bg-[#864753] text-[20px] border_r"
        ></span
        >120以上
      </div>
      <div class="flex ml-[18px]">
        <span
          class="w-[15px] h-[15px] m-[10px] bg-[#977951] text-[20px] border_r"
        ></span
        >91-120
      </div>
      <div class="flex ml-[18px]">
        <span
          class="w-[15px] h-[15px] m-[10px] bg-[#306F5A] text-[20px] border_r"
        ></span>
        61-90
      </div>
      <div class="flex ml-[18px]">
        <span
          class="w-[15px] h-[15px] m-[10px] bg-[#356B9C] text-[20px] border_r"
        ></span>
        31-60
      </div>
      <div class="flex ml-[18px]">
        <span
          class="w-[15px] h-[15px] m-[10px] bg-[#999999] text-[20px] border_r"
        ></span>
        0-30
      </div>
    </div>

    <div
      id="popup6"
      class="ol-popup6"
      v-show="informationShow"
      :style="{
        borderColor:
          overlayInformation.project_count < 30
            ? '#bfbfbf'
            : overlayInformation.project_count < 60
            ? '#00b0f0'
            : overlayInformation.project_count < 91
            ? '#00b050'
            : overlayInformation.project_count < 120
            ? '#ffc000'
            : '#c00000',
      }"
    >
      <div id="popup6-content">
        <div style="text-align: center">{{ overlayInformation.name }}</div>
        <div>项目数量：{{ overlayInformation.project_count }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Fill, Stroke, Text } from "ol/style";
import { Select } from "ol/interaction";
import { pointerMove } from "ol/events/condition";
import Overlay from "ol/Overlay";
import Projection from "ol/proj/Projection";
import proj4 from "proj4";
import * as proj from "ol/proj";
import { register } from "ol/proj/proj4";
import { get as getProjection } from "ol/proj";

import geojsonData from "../../assets/json/cq.json";
import geojsonLeftData from "../../assets/json/cq_copy.json";

// 定义 EPSG:4490 投影
proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
register(proj4);

const epsg4490 = getProjection("EPSG:4490");

const informationShow = ref(false);
const overlayInformation = ref({
  name: "",
  project_count: "",
});
let map = ref(null);
let map1 = ref(null);
let overlay = ref(null);
let overlay1 = ref(null);
onMounted(() => {
  init2DMap();
});

onBeforeUnmount(() => {
  if (map.value) {
    map.value.dispose();
  }
  if (map1.value) {
    map1.value.dispose();
  }
});

const init2DMap = () => {
  const gridNames = [
    "EPSG:4490_dzdt_lll_fdcjyzx:0",
    "EPSG:4490_dzdt_lll_fdcjyzx:1",
    "EPSG:4490_dzdt_lll_fdcjyzx:2",
    "EPSG:4490_dzdt_lll_fdcjyzx:3",
    "EPSG:4490_dzdt_lll_fdcjyzx:4",
    "EPSG:4490_dzdt_lll_fdcjyzx:5",
    "EPSG:4490_dzdt_lll_fdcjyzx:6",
    "EPSG:4490_dzdt_lll_fdcjyzx:7",
    "EPSG:4490_dzdt_lll_fdcjyzx:8",
    "EPSG:4490_dzdt_lll_fdcjyzx:9",
    "EPSG:4490_dzdt_lll_fdcjyzx:10",
    "EPSG:4490_dzdt_lll_fdcjyzx:11",
    "EPSG:4490_dzdt_lll_fdcjyzx:12",
    "EPSG:4490_dzdt_lll_fdcjyzx:13",
    "EPSG:4490_dzdt_lll_fdcjyzx:14",
    "EPSG:4490_dzdt_lll_fdcjyzx:15",
    "EPSG:4490_dzdt_lll_fdcjyzx:16",
    "EPSG:4490_dzdt_lll_fdcjyzx:17",
    "EPSG:4490_dzdt_lll_fdcjyzx:18",
    "EPSG:4490_dzdt_lll_fdcjyzx:19",
    "EPSG:4490_dzdt_lll_fdcjyzx:20",
    "EPSG:4490_dzdt_lll_fdcjyzx:21",
  ];

  const resolutions = [
    0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625,
    0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625,
    6.866455078125e-4, 3.4332275390625e-4, 1.71661376953125e-4,
    8.58306884765625e-5, 4.291534423828125e-5, 2.1457672119140625e-5,
    1.0728836059570312e-5, 5.364418029785156e-6, 2.682209014892578e-6,
    1.341104507446289e-6, 6.705522537231445e-7, 3.3527612686157227e-7,
  ];

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(geojsonData, {
        featureProjection: epsg4490,
      }),
    }),
    style: (feature) => {
      const name = feature.get("name");
      const number = feature.get("number");
      return new Style({
        fill: new Fill({
          color:
            number < 30
              ? "#999999"
              : number < 60
              ? "#356B9C"
              : number < 91
              ? "#306F5A"
              : number < 120
              ? "#977951"
              : "#864753",
        }),
        stroke: new Stroke({
          color: "rgba(255, 255, 255, 0.1)",
          width: 1,
        }),
        text: new Text({
          text: name,
          font: "13px Arial",
          fill: new Fill({
            color: "white",
          }),
          offsetX: 0,
          offsetY: 0,
        }),
      });
    },
  });

  const vectorLeftLayer = new VectorLayer({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(geojsonLeftData, {
        featureProjection: epsg4490,
      }),
    }),
    style: (feature) => {
      const name = feature.get("name");
      const number = feature.get("number");
      return new Style({
        fill: new Fill({
          color:
            number < 30
              ? "#999999"
              : number < 60
              ? "#356B9C"
              : number < 91
              ? "#306F5A"
              : number < 120
              ? "#977951"
              : "#864753",
        }),
        stroke: new Stroke({
          color: "rgba(255, 255, 255, 0.1)",
          width: 1,
        }),
        text: new Text({
          text: name,
          font: "13px Arial",
          fill: new Fill({
            color: "white",
          }),
          offsetX: 0,
          offsetY: 0,
        }),
      });
    },
  });

  const highlightStyle = (feature) => {
    const name = feature.get("name");
    const number = feature.get("number");
    return new Style({
      fill: new Fill({
        color: "#74FFF0",
      }),
      stroke: new Stroke({
        color: "rgba(255, 255, 255, 0.1)",
        width: 1,
      }),
      text: new Text({
        text: name,
        font: "13px Arial",
        fill: new Fill({
          color: "white",
        }),
        offsetX: 0,
        offsetY: 0,
      }),
    });
  };

  const selectHover = new Select({
    layers: [vectorLayer],
    condition: pointerMove,
    style: highlightStyle,
  });

  const selectHover1 = new Select({
    layers: [vectorLeftLayer],
    condition: pointerMove,
    style: highlightStyle,
  });

  const container = document.getElementById("popup6");
  overlay.value = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });
  overlay1.value = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });

  map.value = new Map({
    layers: [
      new TileLayer({
        source: new WMTS({
          url: "http://25.26.26.45:8080/agserver/gwc/service/wmts",
          layer: "dzdt_lll_fdcjyzx",
          matrixSet: "EPSG:4490_dzdt_lll_fdcjyzx",
          format: "image/png",
          projection: epsg4490,
          tileGrid: new WMTSTileGrid({
            tileSize: [256, 256],
            extent: [-180.0, -90.0, 180.0, 90.0],
            origin: [-180.0, 90.0],
            resolutions: resolutions,
            matrixIds: gridNames,
          }),
        }),
      }),
      vectorLayer,
    ],
    target: "map",
    interactions: ol.interaction.defaults.defaults().extend([selectHover]),
    view: new View({
      center: [107.88574441406251, 30.172117940545082],
      zoom: 8,
      minZoom: 1,
      maxZoom: 17,
      projection: epsg4490, // 使用 EPSG:4490 投影
    }),
    overlays: [overlay.value],
  });

  // map1.value = new Map({
  //   layers: [vectorLeftLayer],
  //   target: "map1",
  //   interactions: ol.interaction.defaults.defaults().extend([selectHover1]),
  //   view: new View({
  //     center: [106.53399574329652, 29.54980421299442],
  //     zoom: 8.5,
  //     minZoom: 1,
  //     maxZoom: 17,
  //     projection: epsg4490, // 使用 EPSG:4490 投影
  //   }),
  //   overlays: [overlay1.value],
  // });

  map.value.on("singleclick", (evt) => {
    informationShow.value = false;
    const longitude = evt.coordinate[0];
    const latitude = evt.coordinate[1];
    console.log("longitude", longitude, latitude);
    map.value.forEachFeatureAtPixel(evt.pixel, (feature) => {
      const properties = feature.getProperties();
      informationShow.value = true;
      setTimeout(() => {
        overlayInformation.value.name = properties.name;
        overlayInformation.value.project_count = properties.number;
        overlay.value.setPosition([longitude, latitude]);
      }, 1000);
    });
  });
};
</script>

<style scoped>
.map_container {
  width: 100%;
  height: 100vh;
}

.ol-popup6 {
  position: absolute;
  padding: 10px;
  border-radius: 4px;
  width: 14rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  font-size: 1.2rem;
  color: #ffffff;
  border: 4px solid;
  background: rgba(4, 42, 107, 0.8);
}

.note_class {
  /* background-image: url("../../assets/image/home/left_bottom_right_bottom.png");
  background-size: 100% 100%; */
  background: #0a2351;
  position: absolute;
  top: 50%;
  right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  color: #9abbdb;
}
.border_r {
  display: block;
  border-radius: 50%;
}
::v-deep .ol-zoom {
  display: none;
}
</style>