<template>
  <div class="user_manage">
    <HeaderBar :title="route.meta.title">
      <el-button type="primary" icon="Plus">创建新用户</el-button>
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
        <el-table-column label="头像">
          <template #default="scope">
            <el-avatar shape="square" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="name" />
        <el-table-column label="角色">
          <template #default="scope">
            <el-tag type="success" size="large">{{ scope.row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="gender" />
        <el-table-column label="邮箱" prop="mail" />
        <el-table-column label="创建时间" prop="ctime" />
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
              分配角色
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
interface User {
  avatar: string
  name: string
  role: string
  gender: string
  mail: string
  ctime: string
  state: boolean
}

const handleAllocate = (index: number, row: User) => {
  console.log(index, row)
}
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    name: 'admin',
    role: '超级管理员',
    gender: '男',
    mail: '2991239755@qq.com',
    ctime: '2024-04-01',
    state: true,
  },
]
</script>

<style lang="scss" scoped>
.user_manage {
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
