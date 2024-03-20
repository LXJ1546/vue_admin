<template>
  <div class="tabbar">
    <div class="left">
      <BreadCrumb />
    </div>
    <div class="right">
      <TabRight />
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './tab/breadcrumb/index.vue'
import TabRight from './tab/tabright/index.vue'
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right {
    display: flex;
    align-items: center;
  }
}
</style>
