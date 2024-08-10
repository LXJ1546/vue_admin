import request from '@/utils/request'
import { newsResponseData } from './type'
export default {
  // // 展示数据，参数用于查询
  // read: (params = {}) =>
  //   request.get<any, newsResponseData>('/News/Manage', { params }),
  // // 新增数据
  // create: (data: any) => request.post<any, newsAddData>('/News/Manage', data),
  // // 更新数据
  // update: (data: any) => request.put<any, newsAddData>('/News/Manage', data),
  // //删除数据
  // delete: (id: number) => request.delete(`/News/Manage?id=${id}`),

  // 展示所有数据
  read: () => request.get<any, newsResponseData>('/news/list'),
  // 新增数据
  create: (data: any) => request.post<any, newsResponseData>('/news/add', data),
  // 更新数据
  update: (data: any) =>
    request.post<any, newsResponseData>('/news/update', data),
  //删除数据
  delete: (id: number) => request.delete(`/news/delete?id=${id}`),
  //上传图片
  upload: (data: any) =>
    request.post<any, newsResponseData>('/news/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
}
