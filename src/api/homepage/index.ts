import request from '@/utils/request'
import { carouselResponseData, carouselAddData } from './type'
export default {
  // 展示数据，参数用于查询
  read: (params = {}) =>
    request.get<any, carouselResponseData>('/Carousel/Manage', { params }),
  // 新增数据
  create: (data: any) =>
    request.post<any, carouselAddData>('/Carousel/Manage', data),
  // 更新数据
  update: (data: any) =>
    request.put<any, carouselAddData>('/Carousel/Manage', data),
  //删除数据
  delete: (id: any) => request.delete(`/Carousel/Manage?id=${id}`),
}
