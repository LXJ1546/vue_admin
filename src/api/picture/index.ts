import request from '@/utils/request'
export default {
  // 展示数据，参数用于查询
  read: (params = {}) => request.get<any, any>('/Gallery/Manage', { params }),
}
