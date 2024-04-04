<template>
  <div class="header_bar">
    <div class="content">
      <div class="bar"></div>
      <h2 style="font-size: 21px">{{ title }}</h2>
    </div>
    <slot></slot>
    <!-- 用来加按钮 -->
  </div>
</template>

<script setup lang="ts">
defineProps(['title'])
</script>

<style lang="scss" scoped>
.header_bar {
  display: flex;
  top: 0;
  background-color: white;
  padding-left: 24px;
  padding-right: 24px;
  border-bottom: 1px solid rgb(239 239 245);
  align-items: center;
  min-height: 60px;
  position: sticky;
  z-index: 1;
  justify-content: space-between;
  .content {
    display: flex;
    align-items: center;
    .bar {
      width: 4px;
      height: 16px;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      margin-right: 12px;
      background-color: #316c72;
    }
  }
}
</style>
