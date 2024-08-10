import request from '@/utils/request'
import { carouselResponseData } from './type'
export default {
  // // 展示数据，参数用于查询
  // read: (params = {}) =>
  //   request.get<any, carouselResponseData>('/Carousel/Manage', { params }),
  // // 新增数据
  // create: (data: any) =>
  //   request.post<any, carouselAddData>('/Carousel/Manage', data),
  // // 更新数据
  // update: (data: any) =>
  //   request.put<any, carouselAddData>('/Carousel/Manage', data),
  // //删除数据
  // delete: (id: any) => request.delete(`/Carousel/Manage?id=${id}`),

  // 展示所有数据
  read: () => request.get<any, carouselResponseData>('/carousel/list'),
  // 新增数据
  create: (data: any) =>
    request.post<any, carouselResponseData>('/carousel/add', data),
  // 更新数据
  update: (data: any) =>
    request.post<any, carouselResponseData>('/carousel/update', data),
  //删除数据
  delete: (id: number) => request.delete(`/carousel/delete?id=${id}`),
  //上传图片
  upload: (data: any) =>
    request.post<any, carouselResponseData>('/carousel/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
}
