// 登录接口携带参数的类型
export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token: string
}

// 登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: dataType
}

// 定义服务器返回用户信息数据的类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: userInfo
}
export interface userResponseData {
  code: number
  data: user
}
