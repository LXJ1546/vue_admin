<template>
  <div class="member_manage">
    <HeaderBar :title="route.meta.title">
      <el-button type="primary" icon="Plus" @click="handleAdd">
        添加成员
      </el-button>
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
        v-loading="loading"
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
            <n-image
              v-if="scope.row.avatar"
              width="50"
              height="68"
              :src="scope.row.avatar"
            />
            <div v-else style="width: 50px; height: 68px"></div>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="type" />
        <el-table-column label="身份" prop="level" />
        <el-table-column label="研究方向" prop="research" :width="300" />
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
  <el-dialog
    v-model="dialogFormVisible"
    :title="isAdd ? '新增成员' : '修改成员信息'"
    :width="600"
    @close="handleCancel(formRef)"
  >
    <el-form :model="modalForm" :rules="rules" ref="formRef">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="modalForm.name" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="modalForm.type" placeholder="请选择" clearable>
          <el-option
            v-for="item in ['学生', '老师', '合作老师']"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="身份" prop="level">
        <el-input v-model="modalForm.level" />
      </el-form-item>
      <el-form-item label="年份" prop="year">
        <el-input v-model="modalForm.year" />
      </el-form-item>
      <el-form-item label="就读/就职" prop="whereabouts">
        <el-input v-model="modalForm.whereabouts" />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="modalForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="modalForm.email" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="modalForm.description" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item label="图片" prop="avatar">
        <el-upload
          class="upload-demo"
          action=""
          :limit="1"
          v-model:file-list="fileList"
          :on-change="handleUploadChange"
          :on-remove="handleRemove"
          :auto-upload="false"
          list-type="picture"
        >
          <el-button type="primary" icon="Upload">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel(formRef)">取消</el-button>
        <el-button
          type="primary"
          @click="handleOk(formRef, 'member')"
          :loading="btnLoading"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { HeaderBar, MeSearch, MeQueryItem } from '@/components'
import type { UploadUserFile, FormInstance } from 'element-plus'
import api from '@/api/member/index'
import { NImage } from 'naive-ui'
import { Member } from '@/api/member/type'
import { useCrud } from '@/hooks/useCrud'
import { useRoute } from 'vue-router'
import { onMounted, ref, reactive } from 'vue'
const route = useRoute()
const queryItems = ref({ name: '', identity: '', year: '' })
const options = [
  { label: '教授', value: 0 },
  { label: '在读研究生', value: 1 },
  { label: '硕士', value: 2 },
  { label: '学士', value: 3 },
  { label: '在读本科生', value: 4 },
]

// 后端拿到的数据，调整格式之后的数据
const memberData = ref<Member[]>([])
// 图片文件上传列表
const fileList = ref<UploadUserFile[]>([])
// 表单的引用
const formRef = ref<FormInstance>()
// 模态框表单数据
const modalForm = ref<Member>({
  address: '',
  avatar: '',
  description: '',
  email: '',
  id: 0,
  level: '',
  name: '',
  phone: '',
  research: '',
  type: '',
  whereabouts: '',
  year: '',
})

// 表单校验规则
const rules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  level: [{ required: true, message: '请输入身份', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
})

// 组件挂载时拿到数据
onMounted(() => {
  getDataList()
})

const {
  dialogFormVisible,
  loading,
  btnLoading,
  isAdd,
  currentPage,
  pageSize,
  pagedTableData,
  handleUploadChange,
  handleRemove,
  handleCurrentChange,
  getDataList,
  handleAdd,
  handleEdit,
  handleDelete,
  handleCancel,
  handleOk,
} = useCrud({
  modalForm: modalForm,
  fileList: fileList,
  tableData: memberData,
  doRead: api.read,
  doCreate: api.create,
  doUpdate: api.update,
  doDelete: api.delete,
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
