import { createWebHashHistory, createRouter } from 'vue-router'

import Home from "../view/home/index.vue"
import Jump from "../view/jump/index.vue";
import Test from "../view/test/index.vue";
import Detail from "../view/home/detail/index.vue";
import Flow from "../view/test/flow.vue"



const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'child', // 子路由的路径
        // component: Jump // 子路由对应的组件
      }
    ]
  },
  { path: '/jump', component: Jump },
  { path: '/test', component: Test },
  { path: '/projectDetail', component: Detail },
  { path: '/flow', component: Flow }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router