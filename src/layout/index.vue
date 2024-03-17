<template>
  <div class="layout_container">
    <div class="appSide">
      <SideLogo />
      <SideMenu />
    </div>
    <div class="appHeader">你好</div>
    <div class="appMain">
      <div class="content">
        <Main></Main>
      </div>
    </div>
    <div class="appFooter"></div>
  </div>
</template>

<script setup lang="ts">
import SideLogo from './components/SideLogo.vue'
import SideMenu from './components/SideMenu.vue'
import Main from './main/index.vue'
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  display: flex;

  .appSide {
    display: flex;
    flex-direction: column;
    width: $base-menu-width;
    height: 100vh;
    flex-shrink: 0;
    background: white;
    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: rgb(239, 239, 245, 1);
  }
  .appHeader {
    position: fixed;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: $base-header-height;
    width: calc(100% - $base-menu-width);
    top: 0;
    left: $base-menu-width;
    background: white;
    border-radius: 8px;
    padding-left: 12px;
    padding-right: 12px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: rgb(239, 239, 245, 1);
  }
  .appMain {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-header-height * 2);
    background-color: rgba(245, 246, 251, 1);
    left: $base-menu-width;
    top: $base-header-height;
    padding: 12px;
    overflow: auto;
    .content {
      padding: 24px;
      border-radius: 8px;
      background-color: white;
      border-style: solid;
      border-width: 1px;
      border-color: rgb(239, 239, 245, 1);
    }
  }
  .appFooter {
    position: fixed;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: $base-header-height;
    width: calc(100% - $base-menu-width);
    bottom: 0;
    left: $base-menu-width;
    background: white;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: rgb(239, 239, 245, 1);
  }
}
</style>
