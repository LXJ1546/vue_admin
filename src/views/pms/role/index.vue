<template>
  <div class="role_manage">
    <HeaderBar :title="route.meta.title">
      <el-button type="primary" icon="Plus">创建新角色</el-button>
    </HeaderBar>
    <div class="content">
      <MeSearch>
        <MeQueryItem label="角色名：">
          <el-input
            v-model="queryItems.name"
            placeholder="请输入角色名"
            clearable
          />
        </MeQueryItem>
        <MeQueryItem label="状态：">
          <el-select v-model="queryItems.enable" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </MeQueryItem>
      </MeSearch>
      <el-table :data="tableData" style="width: 100%" size="large">
        <el-table-column label="角色名" prop="name" />
        <el-table-column label="角色编码" prop="code" />
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch v-model="scope.row.state" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="right" :width="400">
          <template #default="scope">
            <el-button
              @click="handleAllocate(scope.$index, scope.row)"
              icon="User"
              type="primary"
              plain
            >
              分配用户
            </el-button>
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              icon="Edit"
              type="primary"
            >
              编辑
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeaderBar, MeSearch, MeQueryItem } from '@/components'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const route = useRoute()
const queryItems = ref({ name: '', enable: '' })
const options = [
  { label: '启用', value: 1 },
  { label: '停用', value: 0 },
]
interface Role {
  name: string
  code: string
  state: boolean
}

const handleAllocate = (index: number, row: Role) => {
  console.log(index, row)
}
const handleEdit = (index: number, row: Role) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: Role) => {
  console.log(index, row)
}

const tableData: Role[] = [
  {
    name: '超级管理员',
    code: 'SUPER_ADMIN',
    state: true,
  },
  {
    name: '质检员',
    code: 'ROLE_QA',
    state: true,
  },
]
</script>

<style lang="scss" scoped>
.role_manage {
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
