import request from '@/utils/request'
import { galleryResponseData, galleryAddData } from './type'
export default {
  // 展示数据，参数用于查询
  read: (params = {}) =>
    request.get<any, galleryResponseData>('/Gallery/Manage', { params }),
  // 新增数据
  create: (data: any) =>
    request.post<any, galleryAddData>('/Gallery/Manage', data),
  // 更新数据
  update: (data: any) =>
    request.put<any, galleryAddData>('/Gallery/Manage', data),
  //删除数据
  delete: (id: number) => request.delete(`/Gallery/Manage?id=${id}`),
}
