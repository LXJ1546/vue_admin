<template>
  <div class="news_manage">
    <HeaderBar :title="route.meta.title">
      <el-button type="primary" icon="Plus">添加新闻</el-button>
    </HeaderBar>
    <div class="content">
      <MeSearch>
        <MeQueryItem label="标题：">
          <el-input
            v-model="queryItems.title"
            placeholder="请输入标题"
            clearable
          />
        </MeQueryItem>
        <MeQueryItem label="年份：">
          <el-input
            v-model="queryItems.year"
            placeholder="请输入年份"
            clearable
          />
        </MeQueryItem>
      </MeSearch>
      <el-table :data="pagedTableData" style="width: 100%" size="large">
        <el-table-column type="expand">
          <template #default="props">
            <div style="padding: 5px">
              <p>概要：{{ props.row.summary }}</p>
              <p style="padding-top: 8px; line-height: 20px">
                描述：{{ props.row.content }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" :width="600" />
        <el-table-column label="照片">
          <template #default="scope">
            <n-image width="60" height="40" :src="scope.row.picture" />
          </template>
        </el-table-column>
        <el-table-column label="作者" prop="author" />
        <el-table-column label="日期" prop="date" />
        <el-table-column label="标签" prop="tag" />
        <el-table-column label="操作" align="right" :width="300">
          <template #default="scope">
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              icon="EditPen"
              type="primary"
            >
              更新
            </el-button>
            <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              icon="Delete"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        style="margin-top: 15px"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        background
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="newsData.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeaderBar, MeSearch, MeQueryItem } from '@/components'
import api from '@/api/news/index'
import { NImage } from 'naive-ui'
import { useRoute } from 'vue-router'
import { ref, onMounted,computed } from 'vue'
const route = useRoute()
const queryItems = ref({ title: '', year: '' })
// 后端拿到的数据，调整格式之后的数据
const newsData = ref<any>([])

// interface User {
//   title: string
//   picture: string
//   author: string
//   date: string
//   tag: string
//   summary: string
//   content: string
// }

const handleEdit = (index: number, row: any) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: any) => {
  console.log(index, row)
}
//当前页码
const currentPage = ref<number>(1)
//每一页展示的数据
const pageSize = ref<number>(6)

//根据当前页码和页大小来分页数据
const pagedTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = currentPage.value * pageSize.value
  return newsData.value.slice(start, end)
})
// 处理页码变化
function handleCurrentChange(val: number) {
  currentPage.value = val
}

const getNewsList = async () => {
  const result = await api.read()
  newsData.value = result.data
}
onMounted(() => {
  getNewsList()
})
</script>

<style lang="scss" scoped>
.news_manage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    margin: 12px;
    border: 1px solid rgb(239, 239, 245, 1);
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    flex: 1 1 0%;
  }
}
</style>
