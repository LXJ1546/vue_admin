<template>
  <div class="award_manage">
    <HeaderBar :title="route.meta.title">
      <el-button type="primary" icon="Plus" @click="handleAdd">
        添加奖项
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
                摘要：{{ props.row.content }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="队伍" prop="team" :width="300" />
        <el-table-column label="标题" prop="title" :width="400" />
        <el-table-column label="照片" :width="350">
          <template #default="scope">
            <n-image
              v-for="(item, index) in getPictureUrl(scope.row.picture)"
              v-show="item.url"
              :key="index"
              width="100"
              height="60"
              :src="item.url"
              style="margin-left: 2px"
            />
            <div
              v-if="!scope.row.picture"
              style="width: 100px; height: 60px"
            ></div>
          </template>
        </el-table-column>
        <el-table-column label="日期" prop="date" sortable />
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
  <el-dialog
    v-model="dialogFormVisible"
    :title="isAdd ? '新增奖项' : '修改奖项信息'"
    :width="600"
    @close="handleCancel(formRef)"
  >
    <el-form :model="modalForm" :rules="rules" ref="formRef">
      <el-form-item label="队伍" prop="team">
        <el-input v-model="modalForm.team" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="modalForm.title" />
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="modalForm.date"
          type="date"
          label="日期"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="modalForm.content" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item label="图片" prop="picture">
        <el-upload
          class="upload-demo"
          action=""
          multiple
          :limit="3"
          v-model:file-list="fileList"
          :on-change="handleUploadChange"
          :on-remove="handleRemove"
          :auto-upload="false"
          list-type="picture"
        >
          <el-button type="primary" icon="Upload">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频链接" prop="video">
        <el-input v-model="modalForm.video" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel(formRef)">取消</el-button>
        <el-button
          type="primary"
          @click="handleOk(formRef, 'award')"
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
import { getPictureUrl } from '@/utils/parsePic'
import { useCrud } from '@/hooks/useCrud'
import { Award } from '@/api/award/type'
import api from '@/api/award/index'
import { NImage } from 'naive-ui'
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// 表单数据
const queryItems = ref({ title: '', year: '' })
// 存储表格数据
const awardData = ref<Award[]>([])
// 图片文件上传列表
const fileList = ref<UploadUserFile[]>([])
// 表单的引用
const formRef = ref<FormInstance>()
// 模态框表单数据
const modalForm = ref<Award>({
  content: '',
  date: '',
  description: '',
  picture: '',
  id: 0,
  tag: '',
  team: '',
  title: '',
  video: '',
})

// 表单校验规则
const rules = reactive({
  team: [{ required: true, message: '请输入队伍', trigger: 'blur' }],
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  date: [{ required: true, message: '请选择时间', trigger: 'change' }],
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
  tableData: awardData,
  doRead: api.read,
  doCreate: api.create,
  doUpdate: api.update,
  doDelete: api.delete,
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
    overflow: auto;
  }
}
</style>
