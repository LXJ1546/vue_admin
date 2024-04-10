<template>
  <el-pagination
    @current-change="handleCurrentChange"
    style="margin-top: 15px"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[3, 5, 7, 9]"
    background
    layout=" prev, pager, next, jumper,->,total, sizes,"
    :total="tableData.length"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps(['tableData'])
//当前页码
const currentPage = ref<number>(1)
//每一页展示的数据
const pageSize = ref<number>(6)
// 处理页码变化
function handleCurrentChange(val: number) {
  currentPage.value = val
}
//根据当前页码和页大小来分页数据
const pagedTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = currentPage.value * pageSize.value
  // 切割列表
  return props.tableData.slice(start, end)
})
defineExpose({ pagedTableData })
</script>

<style lang="scss" scoped></style>
