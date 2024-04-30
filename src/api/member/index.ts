import request from '@/utils/request'
import { memberResponseData, memberAddData } from './type'
export default {
  // 展示数据，参数用于查询
  read: (params = {}) =>
    request.get<any, memberResponseData>('/Member/Manage', { params }),
  // 新增数据
  create: (data: any) =>
    request.post<any, memberAddData>('/Member/Manage', data),
  // 更新数据
  update: (data: any) =>
    request.put<any, memberAddData>('/Member/Manage', data),
  //删除数据
  delete: (id: number) => request.delete(`/Member/Manage?id=${id}`),
}
