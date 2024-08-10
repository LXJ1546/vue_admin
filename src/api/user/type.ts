// 登录接口携带参数的类型
export interface loginForm {
  username: string
  password: string
}

// interface dataType {
//   token?: string
//   message?: string
// }

// // 登录接口返回数据类型
// export interface loginResponseData {
//   code: number
//   data: dataType
// }

// 登录接口返回数据类型
export interface loginResponseData {
  code: string
  message: string
  data: userInfo
}

// 定义服务器返回用户信息数据的类型
interface userInfo {
  userId: number
  avatar: string
  name: string
  password: string
  role: string
  sex: string
  email: string
  date: string
  status: string
  token: string
}
// interface user {
//   checkUser: userInfo
// }
// export interface userResponseData {
//   code: number
//   data: user
// }

// // 定义服务器返回用户信息数据的类型
// interface userInfo {
//   userId: number
//   avatar: string
//   username: string
//   password: string
//   desc: string
//   roles: string[]
//   buttons: string[]
//   routes: string[]
//   token: string
// }
