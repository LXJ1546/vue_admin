<template>
  <el-form-item :label="label" :style="{ width: contentWidth + 'px' }">
    <slot />
  </el-form-item>
</template>

<script setup lang="ts">
// 定义标签名，长度以及表单长度，并由父组件传入
defineProps({
  label: {
    type: String,
    default: '',
  },
  contentWidth: {
    type: Number,
    default: 250,
  },
})
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
}
</style>
