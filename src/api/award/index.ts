import request from '@/utils/request'
import { awardResponseData, awardAddData } from './type'
export default {
  // 展示数据，参数用于查询
  read: (params = {}) =>
    request.get<any, awardResponseData>('/Award/Manage', { params }),
  // 新增数据
  create: (data: any) => request.post<any, awardAddData>('/Award/Manage', data),
  // 更新数据
  update: (data: any) => request.put<any, awardAddData>('/Award/Manage', data),
  //删除数据
  delete: (id: any) => request.delete(`/Award/Manage?id=${id}`),
}
