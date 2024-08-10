<template>
  <div class="home_manage">
    <HeaderBar :title="route.meta.title" />
    <div class="content">
      <n-card v-if="imgList && imgList.length">
        <n-image-group>
          <!-- 使用图片组，参考naiveui -->
          <n-space align="center" style="overflow: auto">
            <n-card v-for="(item, index) in imgList" :key="index" class="card">
              <div class="picture">
                <n-image width="300" height="150" :src="item.picture" />
              </div>
              <n-space justify="space-evenly" style="margin-top: 16px">
                <el-button @click="handleEdit(item.id)">修改</el-button>
                <el-button @click="handleDelete(item.id)">删除</el-button>
              </n-space>
            </n-card>
          </n-space>
        </n-image-group>
      </n-card>
      <el-upload
        class="upload-demo"
        drag
        multiple
        :limit="1"
        v-model:file-list="fileList1"
        :on-change="addImage"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽文件到此处或者
          <em>点击上传</em>
        </div>
      </el-upload>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="更新图片" :width="500">
    <el-upload
      v-model:file-list="fileList"
      action=""
      multiple
      :limit="1"
      :on-change="handleUploadChange"
      :on-remove="handleRemove"
      :auto-upload="false"
      list-type="picture"
    >
      <el-button type="primary" plain>
        点击上传
        <el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { HeaderBar } from '@/components'
import api from '@/api/homepage/index'
import { useRoute } from 'vue-router'
// 按需引入naiveUI组件
import { NCard, NImageGroup, NSpace, NImage } from 'naive-ui'
import type { UploadUserFile, UploadProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
// import { getPictureUrl } from '@/utils/parsePic'

const route = useRoute()
// 是否显示模态框
const dialogFormVisible = ref(false)
// 后端拿到的数据
const imgList = ref<any>([])
// 小的文件上传列表
const fileList = ref<UploadUserFile[]>([])
// 大的文件上传列表
const fileList1 = ref<UploadUserFile[]>([])
// 需要进行操作的图片的id
const imgId = ref(0)

// 处理图片上传
const handleUploadChange: UploadProps['onChange'] = (_image, images) => {
  // 更新上传图片列表
  fileList.value = images
}

// 删除上传图片
const handleRemove: UploadProps['onRemove'] = (_image, images) => {
  fileList.value = images // 更新上传列表数据
}

// 添加新图片
const addImage: UploadProps['onChange'] = async (_image, images) => {
  // 更新上传图片列表
  fileList1.value = images
  if (!fileList1.value) return
  const formData = new FormData()
  // 添加文件到formData
  fileList1.value.forEach((file: any) => {
    // formData.append('images', file.raw)
    formData.append('file', file.raw)
  })
  try {
    // 先调用接口将图片上传到本地文件夹，并获取到相对路径
    const response = await api.upload(formData)
    if (response.code == 'SUCCESS') {
      // 构建Award对象，包含图片地址
      const award = {
        picture: response.data,
      }
      // await api.create(formData)
      // 再将路径通过创建方法添加到数据库中
      const response1 = await api.create(award)
      if (response1.code == 'SUCCESS') {
        // 重新获取列表
        getImgList()
        // 提示成功信息
        ElMessage({
          message: '添加成功！',
          type: 'success',
        })
      } else {
        // 提示错误信息
        ElMessage({
          message: '添加失败！',
          type: 'error',
        })
      }
    } else {
      // 提示错误信息
      ElMessage({
        message: '添加失败！',
        type: 'error',
      })
    }
    // 清空上传列表
    fileList1.value = []
  } catch (error) {
    // 提示错误信息
    ElMessage({
      message: '添加失败！',
      type: 'error',
    })
    console.log(error)
  }
}

// 点击修改按钮
const handleEdit = (id: number) => {
  dialogFormVisible.value = true
  // 拿到该图片id,用于后续更新匹配
  imgId.value = id
  // let list = []
  // // 创建URL对象
  // if (item.picture) {
  //   // 拿到图片链接和名字
  //   list = getPictureUrl(item.picture)
  //   // 更新上传列表
  //   fileList.value = list
  // }
}

//删除图片逻辑
const handleDelete = (id: number) => {
  ElMessageBox.confirm('请确认是否删除该条数据', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        // 调用删除接口，传入数据的id
        await api.delete(id)
        // 重新获取列表
        getImgList()
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

const updateImage = async () => {
  // 只能通过length判断，不能判断是否为空
  if (fileList.value.length == 0) return
  const formData = new FormData()
  // let item = { id: imgId.value, picture: '' }
  // // 将模态框表单数据对象转换为JSON字符串并添加到formData
  // formData.append('carousel', JSON.stringify(item))
  // 添加文件到formData
  fileList.value.forEach((file: any) => {
    // formData.append('images', file.raw)
    formData.append('file', file.raw)
  })
  try {
    // 先调用接口将图片上传到本地文件夹，并获取到相对路径
    const response = await api.upload(formData)
    if (response.code == 'SUCCESS') {
      // 构建Award对象，包含图片地址
      const award = {
        id: imgId.value,
        picture: response.data,
      }
      // await api.create(formData)
      // 再将路径通过创建方法添加到数据库中
      const response1 = await api.update(award)
      if (response1.code == 'SUCCESS') {
        // 重新获取列表
        getImgList()
        // 提示成功信息
        ElMessage({
          message: '修改成功！',
          type: 'success',
        })
      } else {
        // 提示错误信息
        ElMessage({
          message: '修改失败！',
          type: 'error',
        })
      }
    } else {
      // 提示错误信息
      ElMessage({
        message: '修改失败！',
        type: 'error',
      })
    }
    // await api.update(formData)
    // // 重新获取列表
    // getImgList()
    // // 提示成功信息
    // ElMessage({
    //   message: '修改成功！',
    //   type: 'success',
    // })
  } catch (error) {
    // 提示错误信息
    ElMessage({
      message: '修改失败！',
      type: 'error',
    })
    console.log(error)
  }
}

const handleCancel = () => {
  dialogFormVisible.value = false
  fileList.value = []
}

const handleOk = () => {
  updateImage()
  fileList.value = []
  dialogFormVisible.value = false
}

const getImgList = async () => {
  const result = await api.read()
  if (result.code == 'SUCCESS') {
    imgList.value = result.data
  } else {
    // 提示错误信息
    ElMessage({
      message: '信息获取失败！',
      type: 'error',
    })
  }
}
onMounted(() => {
  getImgList()
})
</script>

<style lang="scss" scoped>
.home_manage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 12px;
    border: 1px solid rgb(239, 239, 245, 1);
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    flex: 1 1 0%;
    .card {
      width: 350px;
      margin-left: 8px;
      &:hover {
        box-shadow:
          0 1px 2px -2px #00000029,
          0 3px 6px #0000001f,
          0 5px 12px 4px #00000017;
      }

      .picture {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .upload-demo {
      margin-top: 18px;
      width: 70%;
    }
  }
}
</style>
