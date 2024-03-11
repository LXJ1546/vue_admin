//引入项目中全部的全局组件
import SvgIcon from '@/components/svgicon/index.vue'

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
  },
}
