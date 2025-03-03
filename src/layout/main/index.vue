<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <!-- 渲染layout一级路由的子路由 -->
      <keep-alive>
        <div style="height: 100%" :key="route.path">
          <component :is="Component" v-if="flag" />
        </div>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
const settingStore = useSettingStore()
const route = useRoute()
const flag = ref(true)
// 监听数据是否发生变化
watch(
  () => settingStore.refresh,
  () => {
    //点击刷新按钮：路由组件销毁
    flag.value = false
    //DOM更新完成之后再将组件展示出来
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
