export interface Member {
  avatar: string
  description: string
  email: string
  id: number
  identity: string
  name: string
  phone: string
  research: string
  type: string
  whereabouts: string
  year: string
}

export interface memberResponseData {
  code: string
  msg: string
  data: any
}

// export interface Member {
//   address: string
//   avatar: string
//   description: string
//   email: string
//   id: number
//   level: string
//   name: string
//   phone: string
//   research: string
//   type: string
//   whereabouts: string
//   year: string
// }

// export interface memberResponseData {
//   code: string
//   msg: string
//   data: Member[]
// }

// //“添加奖项”api的返回类型
// export interface memberAddData {
//   code: string
//   msg: string
//   data: Member
// }
