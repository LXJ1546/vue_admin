// @ts-nocheck
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, FormInstance } from 'element-plus'
import { getPictureUrl } from '@/utils/parsePic'
export const useCrud = ({
  initialForm,
  tableData,
  modalForm,
  fileList,
  doRead,
  doCreate,
  doUpdate,
  doDelete,
}) => {
  // 是否显示模态框
  const dialogFormVisible = ref(false)
  // 表格加载状态
  const loading = ref(false)
  // 模态框按钮的加载状态
  const btnLoading = ref(false)
  // 是否为添加操作
  const isAdd = ref(false)
  //当前页码
  const currentPage = ref<number>(1)
  //每一页展示的数据
  const pageSize = ref<number>(6)
  //   // 图片列表,用于拼接
  //   const list = ref([])
  // 处理图片上传
  const handleUploadChange: UploadProps['onChange'] = (_image, images) => {
    // 更新上传图片列表
    fileList.value = images
  }

  // 删除上传图片
  const handleRemove: UploadProps['onRemove'] = (_image, images) => {
    fileList.value = images // 更新上传列表数据
  }

  //根据当前页码和页大小来分页数据
  const pagedTableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = currentPage.value * pageSize.value
    // 切割列表
    return tableData.value.slice(start, end)
  })

  // 处理页码变化
  function handleCurrentChange(val: number) {
    currentPage.value = val
  }

  // 获取并展示数据
  const getDataList = async () => {
    loading.value = true
    const result = await doRead()
    if (result.code == 'SUCCESS') {
      loading.value = false
      tableData.value = result.data
      console.log(tableData.value)
    } else {
      loading.value = false
      // 提示错误信息
      ElMessage({
        message: '信息获取失败！',
        type: 'error',
      })
    }
  }
  // 重置表单
  const resetForm = () => {
    // 清空表单数据
    modalForm.value = initialForm
    fileList.value = []
  }
  // "添加"按钮事件
  const handleAdd = () => {
    dialogFormVisible.value = true
    isAdd.value = true
    // 清空表单数据
    resetForm()
  }

  // 添加或者更新数据
  const handleDataList = async () => {
    // 按钮加载
    btnLoading.value = true
    const formData = new FormData()
    //构造新的图片链接，当更新的时候才执行
    let newPicture = ''
    if (fileList.value) {
      for (const pic of fileList.value) {
        // 排除上传的情况
        if (pic.raw == undefined) {
          newPicture += `${pic.url}`
        }
      }
    }
    modalForm.value.picture = newPicture
    // 将模态框表单数据对象转换为JSON字符串并添加到formData
    formData.append('award', JSON.stringify(modalForm.value))
    // 添加文件到formData
    fileList.value.forEach((file: any) => {
      formData.append('images', file.raw)
    })
    try {
      if (isAdd.value) {
        // 发送新增请求
        await doCreate(formData)
      } else {
        // 修改请求
        await doUpdate(formData)
      }
      // 重新获取列表
      getDataList()
      // 提示成功信息
      ElMessage({
        message: isAdd.value ? '添加成功！' : '修改成功！',
        type: 'success',
      })
    } catch (error) {
      // 提示错误信息
      ElMessage({
        message: isAdd.value ? '添加失败！' : '修改失败！',
        type: 'error',
      })
      console.log(error)
    }
    // 加载结束
    btnLoading.value = false
    isAdd.value = false
    // 关闭模态框
    dialogFormVisible.value = false
  }

  // 更新按钮事件
  const handleEdit = (_index: number, row: any) => {
    dialogFormVisible.value = true
    isAdd.value = false
    let list = []
    // 将表格该行的信息赋给表单
    modalForm.value = { ...modalForm.value, ...row }
    // 创建URL对象
    if (row.picture) {
      // 拿到图片链接和名字
      list = getPictureUrl(row.picture)
      // 更新上传列表
      fileList.value = list
    }
  }

  // 删除按钮事件
  const handleDelete = async (_index: number, row: any) => {
    ElMessageBox.confirm('请确认是否删除该条数据', 'Warning', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          // 调用删除接口，传入数据的id
          await doDelete(row.id)
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

  //模态框"取消"按钮
  const handleCancel = () => {
    if (isAdd.value) {
      isAdd.value = false
    }
    dialogFormVisible.value = false
    // 清空表单数据
    resetForm()
  }

  //模态框"确定"按钮
  const handleOk = async (formref: FormInstance | undefined) => {
    if (!formref) return
    //校验表单
    await formref.validate((valid, fields) => {
      if (valid) {
        handleDataList()
        // 清空表单数据
        resetForm()
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

  return {
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
  }
}
