import request from '@/utils/request'
import { awardResponseData } from './type'
export default {
  // // 展示数据，参数用于查询
  // read: (params = {}) =>
  //   request.get<any, awardResponseData>('/Award/Manage', { params }),
  // // 新增数据
  // create: (data: any) => request.post<any, awardAddData>('/Award/Manage', data),
  // // 更新数据
  // update: (data: any) => request.put<any, awardAddData>('/Award/Manage', data),
  // //删除数据
  // delete: (id: number) => request.delete(`/Award/Manage?id=${id}`),

  // 展示所有数据
  read: () => request.get<any, awardResponseData>('/award/list'),
  // 新增数据
  create: (data: any) =>
    request.post<any, awardResponseData>('/award/add', data),
  // 更新数据
  update: (data: any) =>
    request.post<any, awardResponseData>('/award/update', data),
  //删除数据
  delete: (id: number) => request.delete(`/award/delete?id=${id}`),
  //上传图片
  upload: (data: any) =>
    request.post<any, awardResponseData>('/award/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
}
