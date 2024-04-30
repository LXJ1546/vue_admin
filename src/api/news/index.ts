import request from '@/utils/request'
import { newsResponseData, newsAddData } from './type'
export default {
  // 展示数据，参数用于查询
  read: (params = {}) =>
    request.get<any, newsResponseData>('/News/Manage', { params }),
  // 新增数据
  create: (data: any) => request.post<any, newsAddData>('/News/Manage', data),
  // 更新数据
  update: (data: any) => request.put<any, newsAddData>('/News/Manage', data),
  //删除数据
  delete: (id: number) => request.delete(`/News/Manage?id=${id}`),
}
