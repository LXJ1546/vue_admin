import request from '@/utils/request'
import { memberResponseData } from './type'
export default {
  // // 展示数据，参数用于查询
  // read: (params = {}) =>
  //   request.get<any, memberResponseData>('/Member/Manage', { params }),
  // // 新增数据
  // create: (data: any) =>
  //   request.post<any, memberAddData>('/Member/Manage', data),
  // // 更新数据
  // update: (data: any) =>
  //   request.put<any, memberAddData>('/Member/Manage', data),
  // //删除数据
  // delete: (id: number) => request.delete(`/Member/Manage?id=${id}`),

  // 展示所有数据
  read: () => request.get<any, memberResponseData>('/member/list'),
  // 新增数据
  create: (data: any) =>
    request.post<any, memberResponseData>('/member/add', data),
  // 更新数据
  update: (data: any) =>
    request.post<any, memberResponseData>('/member/update', data),
  //删除数据
  delete: (id: number) => request.delete(`/member/delete?id=${id}`),
  //上传图片
  upload: (data: any) =>
    request.post<any, memberResponseData>('/member/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
}
