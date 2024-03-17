<template>
  <div class="bg-cover">
    <div class="container">
      <div class="left">
        <img src="@/assets/images/visual.svg" alt="可视化图标" />
      </div>
      <div class="right">
        <div class="title">
          <img src="@/assets/icons/owl.svg" alt="可视化图标" />
          <h2>CQU VIVALAB</h2>
        </div>
        <el-form style="text-align: center; padding-top: 10px">
          <el-form-item>
            <el-input
              class="name"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="User"
              :maxlength="20"
              v-model="formInput.username"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0">
            <el-input
              class="name"
              type="password"
              placeholder="请输入密码"
              size="large"
              :prefix-icon="Lock"
              :maxlength="20"
              v-model="formInput.password"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <el-checkbox v-model="remember" size="large">记住我</el-checkbox>
        <div>
          <el-button size="large" class="btn1" color="#228B22" plain>
            注册
          </el-button>
          <el-button
            :loading="loading"
            size="large"
            class="btn2"
            color="#228B22"
            @click="handleLogin"
            plain
          >
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import Vcode from 'vue3-puzzle-vcode'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification, ElMessage } from 'element-plus'
import { getTime } from '@/utils/time'
// 用户输入表单
const formInput = reactive({ username: '', password: '' })
// 拿到本地化存储对象
const localFormInput = localStorage.getItem('loginInfo')
if (localFormInput) {
  const localInfo = JSON.parse(localFormInput)
  formInput.username = localInfo.username || ''
  formInput.password = localInfo.password || ''
}
//拿到用户仓库
const userStore = useUserStore()
//验证码状态
const isShow = ref(false)
// 登录按钮显示加载
const loading = ref(false)
// 记住我
const remember = ref(false)
// 路由对象,用于跳转
const router = useRouter()

//登录按钮处理逻辑
const handleLogin = async () => {
  if (!formInput.username || !formInput.password) {
    return ElMessage({
      message: '请输入用户名和密码',
      type: 'warning',
    })
  }
  try {
    loading.value = true
    await userStore.userLogin(formInput)
    //判断用户是否勾选了"记住我"
    if (remember.value) {
      // 由于localStorage只能保存字符串,所以需要对formInput进行转换
      localStorage.setItem('loginInfo', JSON.stringify(formInput))
    } else {
      //反之则删除
      localStorage.removeItem('loginInfo')
    }
    isShow.value = true
  } catch (error) {
    loading.value = false
    // 提示错误信息
    ElMessage({
      message: (error as Error).message,
      type: 'error',
    })
  }
}

//验证码关闭
const onClose = () => {
  isShow.value = false
}
//验证成功
const onSuccess = () => {
  onClose() // 验证成功，需要手动关闭模态框
  //跳转到首页
  router.push('/')
  //登录成功的提示信息
  ElNotification({
    type: 'success',
    message: '欢迎回来',
    title: `Hi,${getTime()}好`,
  })
  loading.value = false
}
</script>

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
    padding: 12px;
    box-shadow:
      0 1px 2px -2px #00000029,
      0 3px 6px #0000001f,
      0 5px 12px 4px #00000017;
    min-width: 345px;

    .left {
      display: block;
      width: 380px;
      padding-left: 20px;
      padding-top: 35px;
      padding-bottom: 35px;

      img {
        width: 100%;
        height: auto;
      }
    }
    .right {
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-right: 20px;
      padding-top: 32px;
      padding-bottom: 32px;

      .title {
        display: flex;
        align-items: center;

        img {
          margin-right: 20px;
          width: 100px;
          height: 100px;
        }

        h2 {
          font-weight: 400;
          color: rgb(106 106 106);
        }
      }

      .name {
        width: 300px;
        align-items: center;
      }

      .btn1 {
        width: 100px;
        height: 40px;
        border: 1px solid #228b22;
        font-size: 16px;
        margin-right: 20px;
      }
      .btn2 {
        width: 100px;
        height: 40px;
        border: 1px solid #228b22;
        font-size: 16px;
        margin-left: 20px;
      }
    }
  }
}
</style>
