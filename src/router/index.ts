import { createRouter, createWebHashHistory } from 'vue-router'
import { BasicRoutes } from './basic-routes'
// 创建路由器
const router = createRouter({
  // 路由hash模式
  history: createWebHashHistory(),
  routes: BasicRoutes,
  // 滚动行为
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
export default router
