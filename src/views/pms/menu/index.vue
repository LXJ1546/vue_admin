<template>
  <div class="menu_manage">
    <HeaderBar :title="route.meta.title" />
    <div class="content"><p>菜单管理</p></div>
  </div>
</template>

<script setup lang="ts">
import { HeaderBar } from '@/components'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss" scoped>
.menu_manage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    margin: 12px;
    border: 1px solid rgb(239, 239, 245, 1);
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    flex: 1 1 0%;
  }
}
</style>
