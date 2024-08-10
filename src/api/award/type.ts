export interface Award {
  id: number
  title: string
  picture: string
  institution: string
  team: string
  date: string
  link: string
  keyword: string
  description: string
  institutionAbb: string
  grade: string
}

export interface awardResponseData {
  code: string
  msg: string
  data: any
}

// export interface awardResponseData {
//   code: string
//   msg: string
//   data: Award[]
// }

//“添加奖项”api的返回类型
// export interface awardAddData {
//   code: string
//   msg: string
//   data: Award
// }

// export interface Award {
//   content: string
//   date: string
//   description: string
//   id: number
//   picture: string
//   tag: string
//   team: string
//   title: string
//   video: string
// }
