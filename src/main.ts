import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 导入svg配置
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目全局组件
import globalCompoent from '@/components/index'
import '@/styles/index.scss'
import router from './router'
import pinia from './store'
import './router/guard/index'
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
// 注册路由
app.use(router)
app.use(pinia)
// 安装自定义插件
app.use(globalCompoent)
app.mount('#app')
