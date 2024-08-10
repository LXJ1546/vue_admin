<template>
  <router-link to="/admin" class="logo_container">
    <img :src="settings.logo" class="image" />
    <h2 class="title" :class="{ fold: settingStore.fold ? true : false }">
      {{ settings.title }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { settings } from '@/setting'
import useSettingStore from '@/store/modules/setting'
// 拿到fold状态，用于判断是否折叠菜单,并隐藏logo旁边的文字
const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.logo_container {
  height: $base-header-height;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgb(239, 239, 245, 1);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.4s;
  .image {
    width: 50px;
    height: 50px;
    border-radius: 8px;
  }
  .title {
    font-weight: 700;
    font-size: 18px;
    flex-shrink: 0;
    max-width: 140px;
    margin-left: 10px;
    color: #316c72;
    &.fold {
      display: none;
    }
  }
}
</style>
