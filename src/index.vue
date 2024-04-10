<!-- <template>
  <div class="award_manage">
    <HeaderBar :title="route.meta.title">
      <el-button type="primary" icon="Plus" @click="handelAdd">
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
        <el-table-column label="照片" :width="160">
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
  <el-dialog v-model="dialogFormVisible" title="新增奖项" :width="600">
    <el-form :model="modalForm" :rules="rules" ref="formRef">
      <el-form-item label="队伍" prop="team" required>
        <el-input v-model="modalForm.team" />
      </el-form-item>
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="modalForm.title" />
      </el-form-item>
      <el-form-item label="日期" prop="date" required>
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
          :auto-upload="false"
          list-type="picture"
        >
          <el-button type="primary" icon="Upload">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="video" prop="视频链接">
        <el-input v-model="modalForm.video" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel(formRef)">取消</el-button>
        <el-button
          type="primary"
          @click="handleOk(formRef)"
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
import type { UploadProps, UploadUserFile, FormInstance } from 'element-plus'
import { useCrud } from '@/hooks/useCrud'
import { Award } from '@/api/award/type'
import api from '@/api/award/index'
import { NImage } from 'naive-ui'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// // 表格加载状态
// const loading = ref(false)
// // 是否显示模态框
// const dialogFormVisible = ref(false)
// // 模态框按钮的加载状态
// const btnLoading = ref(false)
// // 是否为添加操作
// const isAdd = ref(false)
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
//当前页码
const currentPage = ref<number>(1)
//每一页展示的数据
const pageSize = ref<number>(6)
// 更新按钮
const handleEdit = (_index: number, row: Award) => {
  dialogFormVisible.value = true
  // 将表格该行的信息赋给表单
  modalForm.value = { ...modalForm.value, ...row }
  // 创建URL对象
  if (row.picture) {
    const url = new URL(row.picture)
    // 使用URLSearchParams获取查询参数
    const picName = url.searchParams.get('pic')
    // 如果需要移除尾部的分号，拿到图片的名字
    const cleanPicName = picName ? picName.replace(/;$/, '') : ''
    // 修改上传列表
    fileList.value = [{ name: cleanPicName, url: row.picture }]
  }
}
// 处理图片上传
const handleUploadChange: UploadProps['onChange'] = (_image, images) => {
  // 更新上传图片列表
  fileList.value = images
}
// 删除按钮事件
const handleDelete = async (_index: number, row: Award) => {
  console.log(row.id)
  ElMessageBox.confirm('请确认是否删除该条数据', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        // 调用删除接口，传入数据的id
        await api.delete(row.id)
        // 重新获取列表
        getDataList()
        // 提示成功信息
        ElMessage({
          message: '删除成功！',
          type: 'success',
        })
      } catch (error) {
        // 提示错误信息
        ElMessage({
          message: '删除失败！',
          type: 'error',
        })
        console.log(error)
      }
    })
    .catch(() => {})
}
//根据当前页码和页大小来分页数据
const pagedTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = currentPage.value * pageSize.value
  // 切割列表
  return awardData.value.slice(start, end)
})
// "添加奖项"按钮事件
const handelAdd = () => {
  dialogFormVisible.value = true
  isAdd.value = true
}
// 处理页码变化
function handleCurrentChange(val: number) {
  currentPage.value = val
}
//模态框"取消"按钮
const handleCancel = (formref: FormInstance | undefined) => {
  if (isAdd.value) {
    isAdd.value = false
  }
  dialogFormVisible.value = false
  // 清空表单数据
  if (!formref) return
  formref.resetFields()
}
//模态框"确定"按钮
const handleOk = async (formref: FormInstance | undefined) => {
  if (!formref) return
  //校验表单
  await formref.validate((valid, fields) => {
    if (valid) {
      addDataList()
      // 清空表单数据
      formref.resetFields()
    } else {
      // 提示错误信息
      ElMessage({
        message: '错误提交！',
        type: 'error',
      })
      console.log('error submit!', fields)
    }
  })
}
// // 添加数据
// const addAwardList = async () => {
//   // 按钮加载
//   btnLoading.value = true
//   const formData = new FormData()
//   // 将模态框表单数据对象转换为JSON字符串并添加到formData
//   formData.append('award', JSON.stringify(modalForm.value))
//   // 添加文件到formData
//   fileList.value.forEach((file: any) => {
//     formData.append('images', file.raw)
//   })
//   try {
//     if (isAdd.value) {
//       // 发送新增请求
//       await api.create(formData)
//     } else {
//       // 修改请求
//       await api.update(formData)
//     }
//     // 重新获取列表
//     getDataList()
//     // 提示成功信息
//     ElMessage({
//       message: isAdd.value ? '添加奖项成功！' : '修改成功！',
//       type: 'success',
//     })
//   } catch (error) {
//     // 提示错误信息
//     ElMessage({
//       message: isAdd.value ? '添加奖项失败！' : '修改失败！',
//       type: 'error',
//     })
//     console.log(error)
//   }
//   // 加载结束
//   btnLoading.value = false
//   isAdd.value = false
//   // 关闭模态框
//   dialogFormVisible.value = false
// }
// // 获取并展示数据
// const getAwardList = async () => {
//   loading.value = true
//   const result = await api.read()
//   if (result.code == 'SUCCESS') {
//     loading.value = false
//     awardData.value = result.data
//     console.log(awardData.value)
//   } else {
//     loading.value = false
//     // 提示错误信息
//     ElMessage({
//       message: '信息获取失败！',
//       type: 'error',
//     })
//   }
// }
// 组件挂载时拿到数据
onMounted(() => {
  getDataList()
})

const {
  dialogFormVisible,
  loading,
  btnLoading,
  isAdd,
  getDataList,
  addDataList,
} = useCrud({
  modalForm: modalForm,
  fileList: fileList,
  tableData: awardData,
  doRead: api.read,
  doCreate: api.create,
  doUpdate: api.update,
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
</style> -->
