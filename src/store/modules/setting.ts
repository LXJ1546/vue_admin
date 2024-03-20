import { defineStore } from 'pinia'
const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      fold: false, // 菜单是否折叠
      refresh: false, // 是否点击刷新按钮
    }
  },
})
export default useSettingStore
