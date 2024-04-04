<template>
  <div class="picture_manage">
    <HeaderBar :title="route.meta.title">
      <el-button type="primary" icon="Plus">添加画廊</el-button>
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
        <MeQueryItem label="类型：">
          <el-select v-model="queryItems.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </MeQueryItem>
      </MeSearch>
      <el-table :data="pagedTableData" style="width: 100%" size="large">
        <el-table-column label="标题" prop="title" :width="400" />
        <el-table-column label="照片">
          <template #default="scope">
            <n-image width="100" height="50" :src="scope.row.picture" />
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="type" />
        <el-table-column label="来源" prop="source" :width="600" />
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
        :total="galleryData.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeaderBar, MeSearch, MeQueryItem } from '@/components'
import api from '@/api/picture/index'
import { NImage } from 'naive-ui'
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
const route = useRoute()
const queryItems = ref({ title: '', type: '' })
const options = [
  { label: '竞赛', value: 0 },
  { label: '论文', value: 1 },
  { label: '其他', value: 2 },
]

const galleryData = ref<any>([])
// interface User {
//   title: string
//   picture: string
//   type: string
//   source: string
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
  return galleryData.value.slice(start, end)
})
// 处理页码变化
function handleCurrentChange(val: number) {
  currentPage.value = val
}

const getAwardList = async () => {
  const result = await api.read()
  galleryData.value = result.data
}
onMounted(() => {
  getAwardList()
})
</script>

<style lang="scss" scoped>
.picture_manage {
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
