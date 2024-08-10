// @ts-nocheck
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
export const publicGetData = ({ infoData, options, doRead }) => {
  // 获取并展示数据
  const getDataList = async () => {
    try {
      // 发送请求
      const result = await doRead()
      if (result.code == 'SUCCESS') {
        // 使用 reduce 方法按年份分组数据
        const groupedData = result.data.reduce((acc, item) => {
          let year = ''
          // 提取日期中的年份,发表和成员则不用提取，直接拿到
          if (item.date) {
            year = new Date(item.date).getFullYear().toString()
          } else if (item.identity) {
            year = item.type
          } else {
            year = item.year
          }
          // 检查是否已存在该年份的数据数组，若不存在则创建新数组
          if (!acc[year]) {
            acc[year] = []
          }
          // 将数据项添加到对应年份的数组中
          acc[year].push(item)
          return acc
        }, {})
        // console.log(groupedData)
        // 将存在的年份全部提取出来，用于提供下拉菜单的选项
        const year_list = result.data.reduce((acc, item) => {
          let year = ''
          // 提取日期中的年份,发表和成员则不用提取，直接拿到
          if (item.date) {
            year = new Date(item.date).getFullYear().toString()
          } else if (item.identity) {
            year = item.type
          } else {
            year = item.year
          }
          // 检查是否已存在该年份的数据，若不存在则创建
          const existingYear = acc.find((entry) => entry.key === year)
          if (!existingYear) {
            acc.push({ label: year, key: year })
          }
          return acc
        }, [])
        // console.log(year_list)
        // 将分组后的数据赋给页面的状态
        infoData.value = groupedData
        options.value = year_list
      } else {
        // 提示错误信息
        ElMessage({
          message: '信息获取失败！',
          type: 'error',
        })
      }
    } catch (error) {
      console.log('发生错误：' + error)
    }
  }

  return {
    getDataList,
  }
}
