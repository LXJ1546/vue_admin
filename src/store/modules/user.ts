// 创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入登录接口
import { reqLogin, getUserInfo } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入常量路由
import { BasicRoutes } from '@/router/basic-routes'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: GET_TOKEN(), //用户唯一标识
    menuRoutes: BasicRoutes, //仓库存储生成菜单需要数组（路由）
    username: '',
    avatar: '',
  }),
  getters: {},
  actions: {
    // 登录方法
    async userLogin(data: loginForm) {
      // 拿到请求结果
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token as string
        // 本地存储一下,持久化
        SET_TOKEN(result.data.token as string)
        //保证当前async函数返回一个成功的promise函数
        return 'ok'
      } else {
        // 返回一个失败的Promise对象
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息的方法
    async userInfo() {
      const result = await getUserInfo()
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject('用户信息获取失败')
      }
    },
    userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
})
export default useUserStore
