<template>
  <el-button
    type="primary"
    icon="Refresh"
    size="large"
    circle
    @click="handleRefreshClick"
  />
  <el-button
    type="primary"
    icon="FullScreen"
    size="large"
    circle
    @click="handleFullScreen"
  />
  <el-button type="primary" icon="Setting" size="large" circle />
  <img
    src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
    alt=""
  />
  <el-dropdown>
    <div class="text">
      <span class="text1">Admin</span>
      <span class="text2">[超级管理员]</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人资料</el-dropdown-item>
        <el-dropdown-item>切换角色</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'
const settingStore = useSettingStore()
const handleRefreshClick = () => {
  settingStore.refresh = !settingStore.refresh
}
const handleFullScreen = () => {
  //DOM对象的一个属性：可以用来判断当前是不是全屏的模式【全屏：true，不是全屏：false】
  const full = document.fullscreenElement
  //切换成全屏
  if (!full) {
    //文档根节点的方法requestFullscreen实现全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 16px;
}
.text {
  margin-left: 12px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  .text1 {
    font-size: 14px;
  }
  .text2 {
    font-size: 12px;
    opacity: 0.5;
  }
}
</style>
