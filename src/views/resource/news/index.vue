<template>
  <div class="news_manage">
    <HeaderBar :title="route.meta.title">
      <el-button type="primary" icon="Plus" @click="handleAdd">
        添加新闻
      </el-button>
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
      <el-table
        v-loading="loading"
        :data="pagedTableData"
        style="width: 100%"
        size="large"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div style="padding: 5px">
              <p style="padding-top: 8px; line-height: 20px">
                描述：{{ props.row.description }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" :width="600" />
        <el-table-column label="照片">
          <template #default="scope">
            <n-image
              v-if="scope.row.picture"
              width="120"
              height="70"
              :src="scope.row.picture"
            />
            <div v-else style="width: 60px; height: 40px"></div>
          </template>
        </el-table-column>
        <el-table-column label="作者" prop="author" :width="400" />
        <el-table-column label="日期" prop="date" sortable />
        <el-table-column label="类型" prop="type" />
        <el-table-column label="地点" prop="place" />
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
  <el-dialog
    v-model="dialogFormVisible"
    :title="isAdd ? '添加新闻' : '修改新闻信息'"
    :width="600"
    @close="handleCancel(formRef)"
  >
    <el-form :model="modalForm" :rules="rules" ref="formRef">
      <el-form-item label="标题" prop="title">
        <el-input v-model="modalForm.title" />
      </el-form-item>
      <el-form-item label="照片" prop="picture">
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

      <el-form-item label="作者" prop="author">
        <el-input v-model="modalForm.author" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="modalForm.type" />
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="modalForm.date"
          type="date"
          label="日期"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="地点" prop="place">
        <el-input v-model="modalForm.place" />
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input v-model="modalForm.description" type="textarea" :rows="4" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel(formRef)">取消</el-button>
        <el-button
          type="primary"
          @click="handleOk(formRef, 'news')"
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
import api from '@/api/news/index'
import { NImage } from 'naive-ui'
import { News } from '@/api/news/type'
import { useCrud } from '@/hooks/useCrud'
import { useRoute } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'
const route = useRoute()
const queryItems = ref({ title: '', year: '' })
// 后端拿到的数据，调整格式之后的数据
const newsData = ref<News[]>([])

// 图片文件上传列表
const fileList = ref<UploadUserFile[]>([])
// 表单的引用
const formRef = ref<FormInstance>()
// 模态框表单数据
const modalForm = reactive<News>({
  author: '',
  // content: '',
  description: '',
  date: '',
  id: 0,
  picture: '',
  type: '',
  place: '',
  title: '',
})

// 表单校验规则
const rules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
  date: [{ required: true, message: '请选择日期', trigger: 'change' }],
  place: [{ required: true, message: '请输入地点', trigger: 'blur' }],
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
  tableData: newsData,
  doRead: api.read,
  doUpload: api.upload,
  doCreate: api.create,
  doUpdate: api.update,
  doDelete: api.delete,
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
