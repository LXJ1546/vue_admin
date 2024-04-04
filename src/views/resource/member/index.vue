<template>
  <div class="member_manage">
    <HeaderBar :title="route.meta.title">
      <el-button type="primary" icon="Plus">添加成员</el-button>
    </HeaderBar>
    <div class="content">
      <MeSearch>
        <MeQueryItem label="姓名：">
          <el-input
            v-model="queryItems.name"
            placeholder="请输入姓名"
            clearable
          />
        </MeQueryItem>
        <MeQueryItem label="身份：">
          <el-select
            v-model="queryItems.identity"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </MeQueryItem>
        <MeQueryItem label="年份：">
          <el-input
            v-model="queryItems.year"
            placeholder="请输入年份"
            clearable
          />
        </MeQueryItem>
      </MeSearch>
      <el-table
        :data="pagedTableData"
        style="width: 100%"
        size="large"
        :default-sort="{ prop: 'year', order: 'ascending' }"
      >
        <el-table-column type="expand">
          <template #default="props">
            <p>描述：{{ props.row.description }}</p>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="照片">
          <template #default="scope">
            <n-image width="50" height="68" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column label="身份" prop="level" />
        <el-table-column label="研究方向" prop="research" />
        <el-table-column label="年份" prop="year" sortable />
        <el-table-column label="就读/就职" prop="whereabouts" />
        <el-table-column label="手机" prop="phone" />
        <el-table-column label="邮箱" prop="email" />
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
        :total="memberData.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeaderBar, MeSearch, MeQueryItem } from '@/components'
import api from '@/api/member/index'
import { NImage } from 'naive-ui'
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
const route = useRoute()
const queryItems = ref({ name: '', identity: '', year: '' })
const options = [
  { label: '教授', value: 0 },
  { label: '在读研究生', value: 1 },
  { label: '硕士', value: 2 },
  { label: '学士', value: 3 },
  { label: '在读本科生', value: 4 },
]
// interface User {
//   name: string
//   picture: string
//   identity: string
//   research: string
//   year: string
//   where: string
//   phone: string
//   mail: string
//   describe: string
// }
// 后端拿到的数据，调整格式之后的数据
const memberData = ref<any>([])
//当前页码
const currentPage = ref<number>(1)
//每一页展示的数据
const pageSize = ref<number>(6)

const handleEdit = (index: number, row: any) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: any) => {
  console.log(index, row)
}

//根据当前页码和页大小来分页数据
const pagedTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = currentPage.value * pageSize.value
  return memberData.value.slice(start, end)
})
// 处理页码变化
function handleCurrentChange(val: number) {
  currentPage.value = val
}

const getMemberList = async () => {
  const result = await api.read()
  memberData.value = result.data
}
onMounted(() => {
  getMemberList()
})
</script>

<style lang="scss" scoped>
.member_manage {
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
    overflow: auto;
  }
}
</style>
