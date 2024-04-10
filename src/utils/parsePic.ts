export const getPictureUrl = (picurl: string) => {
  // 定义正则表达式匹配链接
  const regex = /http[^;]+;/g
  let list = []
  let match
  while ((match = regex.exec(picurl)) !== null) {
    // 使用URLSearchParams获取查询参数
    const url = new URL(match[0])
    const picName = url.searchParams.get('pic')
    // 如果需要移除尾部的分号，拿到图片的名字
    const cleanPicName = picName ? picName.replace(/;$/, '') : ''
    // 修改上传列表
    list.push({ name: cleanPicName, url: match[0] })
  }
  return list
}
