// 创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入登录接口
import { reqLogin } from '@/api/user'
import type { loginForm } from '@/api/user/type'

const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('TOKEN'), //用户唯一标识
  }),
  getters: {},
  actions: {
    // 登录方法
    async userLogin(data: loginForm) {
      // 拿到请求结果
      const result: any = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token
        // 本地存储一下,持久化
        localStorage.setItem('TOKEN', result.data.token)
        //保证当前async函数返回一个成功的promise函数
        return 'ok'
      } else {
        // 返回一个失败的Promise对象
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
})
export default useUserStore
