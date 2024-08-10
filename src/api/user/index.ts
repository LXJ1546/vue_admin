import request from '@/utils/request'
import type { loginForm, loginResponseData } from './type'
// import type { loginForm, loginResponseData, userResponseData } from './type'
//统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}
// 暴露请求函数
// 登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息方法
export const getUserInfo = () =>
  request.get<any, loginResponseData>(API.USERINFO_URL)

//   // 获取用户信息方法
// export const getUserInfo = () =>
// request.get<any, userResponseData>(API.USERINFO_URL)
