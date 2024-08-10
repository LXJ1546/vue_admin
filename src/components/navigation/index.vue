<template>
  <div class="headbar">
    <div class="center">
      <div class="logo">
        <img src="/cqu.png" alt="重庆大学" width="65" />
        <a class="title" href="/#">信息可视化与可视分析实验室</a>
      </div>
      <div class="menu">
        <nav>
          <router-link to="/news" class="item">新闻</router-link>
          <router-link to="/member" class="item">成员</router-link>
          <router-link to="/publication" class="item">发表</router-link>
          <router-link to="/award" class="item">奖项</router-link>
          <router-link to="/login" class="item">登录</router-link>
        </nav>
      </div>
    </div>
  </div>
  <div class="content"><slot></slot></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.headbar {
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(218, 218, 222);
  .center {
    width: 980px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      .title {
        font-size: 23px;
        font-weight: 600;
        padding-left: 5px;
      }
    }
    .menu {
      display: flex;
      line-height: 70px;
      nav {
        display: flex;
      }
      .router-link-active {
        color: #228b22;
        background: rgb(228, 226, 226);
        text-decoration: none;
      }
      .item {
        width: 80px;
        height: 70px;
        font-size: 16px;
        text-align: center;
        &:hover {
          color: #228b22;
          background: rgb(228, 226, 226);
          text-decoration: none;
        }
      }
    }
  }
}
.content {
  width: 100%;
  height: calc(100% - 70px);
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  overflow: auto;
}
</style>
