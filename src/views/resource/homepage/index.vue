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
                <n-image width="300" height="113" :src="item.picture" />
              </div>
              <n-space justify="space-evenly" style="margin-top: 16px">
                <el-button @click="show">修改</el-button>
                <el-button>删除</el-button>
              </n-space>
            </n-card>
          </n-space>
        </n-image-group>
      </n-card>
      <el-upload class="upload-demo" drag multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or
          <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="更新图片" :width="500">
    <el-upload
      v-model:file-list="fileList"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      :limit="3"
    >
      <el-button type="primary" plain>
        点击上传
        <el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
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
const route = useRoute()
// 是否显示模态框
const dialogFormVisible = ref(false)
const imgList = ref<any>([])
const fileList = ref([])
const show = () => {
  dialogFormVisible.value = true
}
const handleCancel = () => {
  dialogFormVisible.value = false
}
const handleOk = () => {
  dialogFormVisible.value = false
}
const getImgList = async () => {
  const result = await api.read()
  console.log(result)
  imgList.value = result.data
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
