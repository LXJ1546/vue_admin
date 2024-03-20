<template>
  <!-- 考虑到菜单可能很多的情况，所以加上滚动条 -->
  <el-scrollbar class="scrollbar">
    <el-menu
      mode="vertical"
      style="border-right: 0"
      active-text-color="#529b2e"
      :default-active="route.path"
      :collapse="settingStore.fold"
    >
      <!-- 根据路由动态展示菜单 -->
      <Menu :menuList="userStore.menuRoutes"></Menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import Menu from './Menu.vue'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'
import useSettingStore from '@/store/modules/setting'
const userStore = useUserStore()
// 拿到fold状态，用于判断是否折叠菜单
const settingStore = useSettingStore()
const route = useRoute()
</script>

<style lang="scss" scoped>
.scrollbar {
  height: calc(100vh - $base-header-height * 2);
  margin-top: 4px;
}
</style>
