<template>
  <div class="bg-cover">
    <div class="container">
      <div class="left">
        <img src="@/assets/images/visual.svg" alt="可视化图标"/>
      </div>
      <div class="right">
        <div class="title">
          <h2></h2>
          <img />
        </div>
        <el-input></el-input>
        <el-input type="password"></el-input>
      </div>
    </div>
    登录界面
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-cover {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/login_bg.webp') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017;
    min-width: 345px;
    

    .left{
        display: block;
        width: 380px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 35px;
        padding-bottom: 35px;

        img{
            width: 100%;
            height: auto;
        }
    }
  }
}
</style>
