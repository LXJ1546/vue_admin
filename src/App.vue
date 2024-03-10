<template>
  <div class="box">
    <h1>我是app根组件{{ str }}</h1>
  </div>
</template>

<script setup lang="ts">
const str = '你是我的眼'
</script>

<style scoped lang="scss">
.box {
  width: 100px;
  height: 200px;
}
</style>
