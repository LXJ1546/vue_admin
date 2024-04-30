export interface Publish {
  id: number
  author: string
  title: string
  institution: string
  content: string
  picture: string
  linkURL: string
  keywords: string
  linkPDF: string
  date: string
}

export interface publishResponseData {
  code: string
  msg: string
  data: Publish[]
}
//“添加奖项”api的返回类型
export interface publishAddData {
  code: string
  msg: string
  data: Publish
}
