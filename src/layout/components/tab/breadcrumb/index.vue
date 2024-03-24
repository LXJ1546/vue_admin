<template>
  <div class="icon">
    <el-icon @click="handleExpand">
      <component :is="settingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
  </div>
  <div class="bread">
    <el-breadcrumb separator-icon="ArrowRight" style="font-size: 16px">
      <!-- 拿到路由对象的信息并动态展示标题和对应的图标 -->
      <el-breadcrumb-item
        v-for="(item, index) in route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <div class="crumb">
          <el-icon style="padding-right: 2px">
            <component :is="item.meta.icon" v-if="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
const settingStore = useSettingStore()
// 拿到路由对象,使用对象的matched属性
const route = useRoute()
const handleExpand = () => {
  //状态进行切换
  settingStore.fold = !settingStore.fold
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 22px;
  cursor: pointer;
  height: 34px;
  padding: 6px;
  border-radius: 4px;
  &:hover {
    background-color: rgb(234 240 241);
  }
}
.bread {
  padding-left: 12px;
  padding-right: 12px;
  .crumb {
    display: flex;
  }
}
</style>
