export interface News {
    author: string
    content: string
    date: string
    id: number
    picture: string
    summary: string
    tag: string
    title: string
  }
  
  export interface newsResponseData {
    code: string
    msg: string
    data: News[]
  }
  //“添加奖项”api的返回类型
  export interface newsAddData {
    code: string
    msg: string
    data: News
  }