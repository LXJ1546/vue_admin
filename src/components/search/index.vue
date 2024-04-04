<template>
  <div class="bar">
    <el-form :inline="true" class="form">
      <div>
        <slot />
      </div>
      <div style="flex-shrink: 0">
        <el-button type="primary" plain icon="RefreshLeft">重置</el-button>
        <el-button type="primary" icon="Search">搜索</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.bar {
  background-color: rgb(250 250 252);
  border-radius: 4px;
  border: 1px solid rgb(239 239 245);
  min-height: 60px;
  margin-bottom: 30px;
  .form {
    display: flex;
    justify-content: space-between;
    padding: 16px 16px 0 16px;
  }
}
</style>
