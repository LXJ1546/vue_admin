import request from '@/utils/request'
import { publishResponseData, publishAddData } from './type'
export default {
  // 展示数据，参数用于查询
  read: (params = {}) => request.get<any, any>('/Publish/Manage', { params }),
  // 新增数据
  create: (data: any) =>
    request.post<any, publishResponseData>('/Publish/Manage', data),
  // 更新数据
  update: (data: any) =>
    request.put<any, publishAddData>('/Publish/Manage', data),
  //删除数据
  delete: (id: number) => request.delete(`/Publish/Manage?id=${id}`),
}
