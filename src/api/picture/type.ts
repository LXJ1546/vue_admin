export interface Gallery {
  id: number
  type: string
  title: string
  picture: string
  source: string
}

export interface galleryResponseData {
  code: string
  msg: string
  data: Gallery[]
}
//“添加奖项”api的返回类型
export interface galleryAddData {
  code: string
  msg: string
  data: Gallery
}
