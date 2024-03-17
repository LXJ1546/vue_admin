<template>
  <router-link to="/" class="logo_container">
    <img :src="settings.logo" class="image" />
    <h2 class="title">{{ settings.title }}</h2>
  </router-link>
</template>

<script setup lang="ts">
import { settings } from '@/setting'
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
  }
}
</style>
