<template>
  <div class="award_manage">
    <HeaderBar :title="route.meta.title">
      <el-button type="primary" icon="Plus">添加奖项</el-button>
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
              <p style="padding-top: 8px; line-height: 20px">
                摘要：{{ props.row.content }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="队伍" prop="team" :width="300" />
        <el-table-column label="标题" prop="title" :width="400" />
        <el-table-column label="照片">
          <template #default="scope">
            <n-image width="100" height="60" :src="scope.row.picture" />
          </template>
        </el-table-column>
        <el-table-column label="日期" prop="date" />
        <el-table-column label="视频链接" prop="video" :width="600" />
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
        :total="awardData.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeaderBar, MeSearch, MeQueryItem } from '@/components'
import api from '@/api/award/index'
import { NImage } from 'naive-ui'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

// 表单数据
const queryItems = ref({ title: '', year: '' })

// 存储表格数据
const awardData = ref<any>([])
// interface User {
//   author: string
//   title: string
//   picture: string
//   date: string
//   content: string
//   video: string
// }

// 编辑按钮
const handleEdit = (index: number, row: any) => {
  console.log(index, row)
}
// 删除按钮事件
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
  return awardData.value.slice(start, end)
})

// 处理页码变化
function handleCurrentChange(val: number) {
  currentPage.value = val
}
// 获取并展示数据
const getAwardList = async () => {
  const result = await api.read()
  awardData.value = result.data
}
// 组件挂载时拿到数据
onMounted(() => {
  getAwardList()
})
</script>

<style lang="scss" scoped>
.award_manage {
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
