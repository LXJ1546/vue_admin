import request from '@/utils/request'
import { publishResponseData } from './type'
export default {
  // // 展示数据，参数用于查询
  // read: (params = {}) => request.get<any, any>('/Publish/Manage', { params }),
  // // 新增数据
  // create: (data: any) =>
  //   request.post<any, publishResponseData>('/Publish/Manage', data),
  // // 更新数据
  // update: (data: any) =>
  //   request.put<any, publishAddData>('/Publish/Manage', data),
  // //删除数据
  // delete: (id: number) => request.delete(`/Publish/Manage?id=${id}`),

  // 展示所有数据
  read: () => request.get<any, publishResponseData>('/publication/list'),
  // 新增数据
  create: (data: any) =>
    request.post<any, publishResponseData>('/publication/add', data),
  // 更新数据
  update: (data: any) =>
    request.post<any, publishResponseData>('/publication/update', data),
  //删除数据
  delete: (id: number) => request.delete(`/publication/delete?id=${id}`),
  //上传图片
  upload: (data: any) =>
    request.post<any, publishResponseData>('/publication/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
}
