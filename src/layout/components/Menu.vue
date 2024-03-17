<template>
  <!-- 遍历所有路由 -->
  <template v-for="item in menuList" :key="item.name">
    <!-- 路由没有孩子的时候 -->
    <template v-if="!item.children">
      <!-- 判断路由是否需要展示 -->
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="goRoute"
      >
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 路由有且仅有一个孩子 -->
    <template v-if="item.children && item.children.length == 1">
      <!-- 判断路由是否需要展示 -->
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 路由有多个孩子 -->
    <el-sub-menu
      v-if="item.children && item.children.length >= 2"
      :index="item.path"
    >
      <template #title>
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 使用递归组件，但需要定义 -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps(['menuList'])
const goRoute = (vc: any) => {
  router.push(vc.index)
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<style lang="scss" scoped></style>
