import router from '..'
// @ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store/index'
import useUserStore from '@/store/modules/user'
import { settings } from '@/setting'
const userStore = useUserStore(pinia)

nprogress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', //指定进度条的父容器
})
//全局前置守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  const token = userStore.token
  if (token) {
    //登录成功，不能访问login，指向首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
      // if (username) {
      //   next()
      // } else {
      //   //如果没有用户信息就先发请求拿到信息再放行
      //   try {
      //     //获取用户信息
      //     await userStore.userInfo()
      //     next()
      //   } catch (error) {
      //     //可能的原因：token过期|用户手动处理token
      //     //退出登陆->用户相关的数据清空
      //     userStore.userLogout()
      //     next({ path: '/login', query: { redirect: to.path } })
      //   }
      // }
    }
  } else {
    //用户未登录
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
router.beforeEach((to, from) => {
  //设置网页的名字
  document.title = `${settings.title}-${to.meta.title}`
  nprogress.done()
})
