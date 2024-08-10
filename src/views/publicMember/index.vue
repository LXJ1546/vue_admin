<template>
  <NavigationBar>
    <div class="news_container">
      <div class="head">
        <h1 class="title">👤 成员</h1>
        <n-dropdown :options="options" trigger="click" @select="handleSelect">
          <n-button>
            <el-icon :size="20"><Operation /></el-icon>
          </n-button>
        </n-dropdown>
      </div>
      <div
        class="content"
        v-for="sort in options"
        :key="sort.key"
        :id="sort.key"
      >
        <div class="year">{{ sort.key }}</div>
        <div class="card_container">
          <el-card
            v-for="item in infoData[sort.key]"
            :key="item"
            class="card"
            body-style="padding:5px;"
          >
            <el-row>
              <el-col :span="11">
                <img :src="item.avatar" style="width: 120px; height: 150px" />
              </el-col>
              <el-col :span="13">
                <div style="overflow-wrap: break-word">
                  <h3
                    style="
                      font-weight: bold;
                      font-size: 1.2em;
                      padding-top: 3px;
                      font-family:
                        Trebuchet MS,
                        Helvetica,
                        sans-serif;
                    "
                  >
                    {{ item.name }}
                  </h3>
                  <div v-if="item.type == '指导老师'">
                    <p style="padding-top: 6px">
                      {{ item.whereabouts }}{{ item.identity }}
                    </p>
                    <p style="padding-top: 6px">电话：{{ item.phone }}</p>
                    <p style="padding-top: 6px">邮箱：{{ item.email }}</p>
                  </div>
                  <div v-if="item.type != '指导老师'">
                    <p style="padding-top: 6px">
                      {{ item.year }}级{{ item.identity }}
                    </p>
                    <p style="padding-top: 6px">{{ item.research }}</p>
                    <p style="padding-top: 6px">{{ item.whereabouts }}</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
    </div>
  </NavigationBar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NDropdown, NButton } from 'naive-ui'
import NavigationBar from '@/components/navigation/index.vue'
import { publicGetData } from '@/hooks/publicGetData'
import api from '@/api/member/index'
// 展示内容的状态
const infoData = ref<Record<string, any>>({})
// 下拉菜单的状态
const options = ref([
  {
    label: '',
    key: '',
  },
])

// 选择事件，根据key值（年份）跳转到特定年份的新闻
const handleSelect = (key: any) => {
  const element = document.getElementById(key)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  } else {
    console.warn(`Element with id ${key} not found`)
  }
}

// 组件挂载时拿到数据
onMounted(() => {
  getDataList()
})
// 拿到hook，并把参数传递过去
const { getDataList } = publicGetData({
  infoData: infoData,
  options: options,
  doRead: api.read,
})
</script>

<style scoped lang="scss">
.news_container {
  width: 980px;
  display: flex;
  flex-direction: column;
  background: white;
  border-left: 1px solid rgb(218, 218, 222);
  border-right: 1px solid rgb(218, 218, 222);
  padding: 10px 20px 0 20px;
  .head {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(218, 218, 222);
    padding-right: 6px;
    .title {
      color: rgb(73, 78, 82);
      font-size: 30px;
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
      font-weight: bold;
    }
  }
  .content {
    margin-bottom: 20px;
    .year {
      height: 60px;
      font-size: 25px;
      display: flex;
      align-items: flex-end;
      border-bottom: 1px solid rgb(218, 218, 222);
      color: #7a8288;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .card_container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px; /* 卡片之间的间距 */
      .card {
        margin-top: 10px;
      }
    }
  }
}
</style>
