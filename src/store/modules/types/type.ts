// 定义小仓库数据state的类型
import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  sex: string
  email: string
  role: string
}
