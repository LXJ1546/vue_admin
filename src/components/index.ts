//引入项目中全部的全局组件
import SvgIcon from '@/components/svgicon/index.vue'
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
interface Allcomponent {
  [key: string]: object
}
const allGlobalComponents: Allcomponent = { SvgIcon }
// 对外暴露插件对象
export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })
    //将element-plus提供全部图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
export { default as HeaderBar } from './headerbar/index.vue'
export { default as MeModal } from './modal/index.vue'
export { default as MeSearch } from './search/index.vue'
export { default as MeQueryItem } from './search/QueryItem.vue'
