// @ts-nocheck
import { ref, computed, toRaw } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, FormInstance } from 'element-plus'
// import { getPictureUrl } from '@/utils/parsePic'
export const useCrud = ({
  tableData,
  modalForm,
  fileList,
  doRead,
  doCreate,
  doUpload,
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
    try {
      const result = await doRead()
      if (result.code == 'SUCCESS') {
        loading.value = false
        tableData.value = result.data
        // console.log(tableData.value)
      } else {
        loading.value = false
        // 提示错误信息
        ElMessage({
          message: '信息获取失败！',
          type: 'error',
        })
      }
    } catch (error) {
      // 请求出现错误时
      loading.value = false
    } finally {
      // 无论请求成功或失败，都将loading.value设置为false
      loading.value = false
    }
  }
  // 重置表单
  const resetForm = () => {
    // 清空表单数据
    // 获取modalForm中的所有属性名
    const keys = Object.keys(modalForm)
    // 逐个清空属性值
    keys.forEach((key) => {
      if (key == 'id') {
        modalForm[key] = 0
      } else {
        modalForm[key] = ''
      }
    })
    fileList.value = []
  }
  // "添加"按钮事件
  const handleAdd = () => {
    // 清空表单数据
    resetForm()
    dialogFormVisible.value = true
    // 判断为添加操作
    isAdd.value = true
  }

  //添加和更新时涉及到图片上传操作，需要先上传拿到相对地址
  const handleUpload = async () => {
    const formData = new FormData()
    // 添加文件到formData
    fileList.value.forEach((file: any) => {
      formData.append('file', file.raw)
    })
    // 先调用接口将图片上传到本地文件夹，并获取到相对路径
    const response = await doUpload(formData)
    if (response.code == 'SUCCESS') {
      return response.data
    } else {
      // 提示错误信息
      ElMessage({
        message: '图片上传失败！',
        type: 'error',
      })
      console.log(response.message)
      return null
    }
  }

  const handleAddAndUpdate = async (modalFormCopy: any) => {
    let response1
    if (isAdd.value) {
      // 将表单数据通过添加api添加到数据库中
      response1 = await doCreate(modalFormCopy)
    } else {
      response1 = await doUpdate(modalFormCopy)
    }
    if (response1.code == 'SUCCESS') {
      // 重新获取列表
      getDataList()
      // 提示成功信息
      ElMessage({
        message: isAdd.value ? '添加成功！' : '修改成功！',
        type: 'success',
      })
    } else {
      // 提示错误信息
      ElMessage({
        message: isAdd.value ? '添加失败！' : '修改失败！',
        type: 'error',
      })
      console.log(response1.message)
    }
  }

  // 添加或者更新数据
  const handleDataList = async (mark: string) => {
    // 按钮加载
    btnLoading.value = true
    // 创建 modalForm 的副本,在副本的基础上进行修改
    let modalFormCopy = { ...toRaw(modalForm) }
    // 如果改动了图片，则会调用上传api
    if (fileList.value.length != 0) {
      // console.log('yes', modalFormCopy)
      const uploadResult = await handleUpload()
      if (uploadResult) {
        if (mark == 'member') {
          modalFormCopy.avatar = uploadResult
        } else {
          modalFormCopy.picture = uploadResult
        }
      }
    }
    // 最后再执行数据写入操作
    await handleAddAndUpdate(modalFormCopy)
    // 加载结束
    btnLoading.value = false
    isAdd.value = false
    // 关闭模态框
    dialogFormVisible.value = false

    // const formData = new FormData()
    // //构造新的图片链接，当更新的时候才执行
    // let newPicture = ''
    // if (fileList.value) {
    //   for (const pic of fileList.value) {
    //     // 排除上传的情况
    //     if (pic.raw == undefined) {
    //       newPicture += `${pic.url}`
    //     }
    //   }
    // }
    // if (mark == 'member') {
    //   modalForm.value.avatar = newPicture
    // } else {
    //   modalForm.value.picture = newPicture
    // }
    // // 将模态框表单数据对象转换为JSON字符串并添加到formData
    // formData.append(mark, JSON.stringify(modalForm.value))
    // // 添加文件到formData
    // fileList.value.forEach((file: any) => {
    //   formData.append('images', file.raw)
    // })
    // try {
    //   if (isAdd.value) {
    //     // 发送新增请求
    //     const response = await doCreate(formData)
    //     console.log(response)
    //   } else {
    //     // 修改请求
    //     await doUpdate(formData)
    //   }
    //   // 重新获取列表
    //   getDataList()
    //   // 提示成功信息
    //   ElMessage({
    //     message: isAdd.value ? '添加成功！' : '修改成功！',
    //     type: 'success',
    //   })
    // } catch (error) {
    //   // 提示错误信息
    //   ElMessage({
    //     message: isAdd.value ? '添加失败！' : '修改失败！',
    //     type: 'error',
    //   })
    //   console.log(error)
    // }
    // // 加载结束
    // btnLoading.value = false
    // isAdd.value = false
    // // 关闭模态框
    // dialogFormVisible.value = false
  }

  // 更新按钮事件
  const handleEdit = (_index: number, row: any) => {
    dialogFormVisible.value = true
    isAdd.value = false
    // let list = []
    // 将表格该行的信息赋给表单
    Object.assign(modalForm, row) // 合并对象
    // modalForm = { ...modalForm, ...row }
    // // 创建URL对象
    // if (row.picture) {
    //   // 拿到图片链接和名字
    //   list = getPictureUrl(row.picture)
    //   // 更新上传列表
    //   fileList.value = list
    // }
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
          const result = await doDelete(row.id)
          console.log(result)
          if (result.code == 'SUCCESS') {
            // 重新获取列表
            getDataList()
            // 提示成功信息
            ElMessage({
              message: '删除成功！',
              type: 'success',
            })
          } else {
            // 提示错误信息
            ElMessage({
              message: '删除失败！',
              type: 'error',
            })
            console.log(result.message)
          }
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
  const handleCancel = (formref: FormInstance | undefined) => {
    // 重置表单检验
    if (!formref) return
    formref.resetFields()
    if (isAdd.value) {
      isAdd.value = false
    }
    dialogFormVisible.value = false
    // 清空表单数据
    resetForm()
  }

  //模态框"确定"按钮
  const handleOk = async (formref: FormInstance | undefined, mark: string) => {
    if (!formref) return
    //校验表单
    await formref.validate((valid, fields) => {
      if (valid) {
        handleDataList(mark)
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
