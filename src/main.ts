import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
// main.ts
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import DataVVue3 from '@kjgl77/datav-vue3';
import 'element-plus/dist/index.css'
import router from './router'
import './style.scss';
import './style.css';
import "./normalize.css"
import vue3SeamlessScroll from "vue3-seamless-scroll";
const app = createApp(App)
app.use(DataVVue3);
app.use(router)
app.use(ElementPlus)
app.use(vue3SeamlessScroll)
app.mount('#app')
