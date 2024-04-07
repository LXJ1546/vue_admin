<template>
  <el-dialog v-model="dialogFormVisible" :title="title" :width="width">
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const dialogFormVisible = ref(false)
defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '500',
  },
  onOk: {
    type: Function,
    default: () => {},
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
})
defineExpose({ dialogFormVisible })
</script>

<style lang="scss" scoped></style>
