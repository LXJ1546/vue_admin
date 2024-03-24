//对axios进行封装，使用请求和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
//利用create方法创建axios实例（进行其他配置：基础路径、超时时间等）
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  timeout: 5000, //超时时间的设置
})
//请求拦截器
request.interceptors.request.use((config) => {
  // 返回配置对象
  // config配置对象，headers请求头，经常给服务器端携带公共的请求参数
  const useStore = useUserStore()
  if (useStore.token) {
    config.headers.token = useStore.token
  }
  return config
})
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 处理http网络错误的
    let msg = ''
    let status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '网络出现问题'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)
export default request
