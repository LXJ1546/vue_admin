<template>
  <NavigationBar>
    <div class="news_container">
      <div class="head">
        <h1 class="title">📰 新闻</h1>
        <n-dropdown :options="options" trigger="click" @select="handleSelect">
          <n-button>
            <el-icon :size="20"><Operation /></el-icon>
          </n-button>
        </n-dropdown>
      </div>
      <div
        class="content"
        v-for="year in options"
        :key="year.key"
        :id="year.key"
      >
        <div class="year">{{ year.key }}</div>
        <el-card
          v-for="(item, index) in infoData[year.key]"
          :key="item"
          class="card"
          body-style="padding:15px;"
        >
          <el-row>
            <el-col :span="6">
              <n-image :src="item.picture" width="210" height="130" />
            </el-col>
            <el-col :span="18">
              <div class="info_column" @click="handleClick(year.key, index)">
                <h3>
                  {{ item.title }}
                </h3>
                <div class="info_item">
                  <el-icon :size="16" color="#4169E1"><Avatar /></el-icon>
                  <p style="padding-left: 5px">{{ item.author }}</p>
                </div>
                <div style="display: flex">
                  <div class="info_item">
                    <el-icon :size="16" color="#4169E1"><Tickets /></el-icon>
                    <p style="padding-left: 5px">{{ item.type }}</p>
                  </div>
                  <div class="info_item">
                    <el-icon :size="16" color="#4169E1"><Timer /></el-icon>
                    <p style="padding-left: 5px">{{ item.date }}</p>
                  </div>
                  <div class="info_item">
                    <el-icon :size="16" color="#4169E1"><Location /></el-icon>
                    <p style="padding-left: 5px">{{ item.place }}</p>
                  </div>
                </div>
                <p class="show">
                  {{ item.description }}
                </p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <n-drawer v-model:show="visible" :width="760">
        <n-drawer-content title="📰 组会" closable>
          <div class="dialog">
            <img
              :src="infoData[selectYear][selectIndex].picture"
              style="width: 100%; height: 400px"
            />
            <div style="overflow-wrap: break-word">
              <h3
                style="
                  font-weight: bold;
                  font-size: 1.5em;
                  padding-top: 10px;
                  font-family:
                    Trebuchet MS,
                    Helvetica,
                    sans-serif;
                "
              >
                {{ infoData[selectYear][selectIndex].title }}
              </h3>
              <p style="padding-top: 5px; font-size: 17px">
                <b>参与者：</b>
                {{ infoData[selectYear][selectIndex].author }}
              </p>
              <p style="padding-top: 5px; font-size: 17px">
                <b>类型：</b>
                {{ infoData[selectYear][selectIndex].type }}
              </p>
              <p style="padding-top: 5px; font-size: 17px">
                <b>时间：</b>
                {{ infoData[selectYear][selectIndex].date }}
              </p>
              <p style="padding-top: 5px; font-size: 17px">
                <b>地点：</b>
                {{ infoData[selectYear][selectIndex].place }}
              </p>
              <p style="padding-top: 5px; font-size: 17px; text-align: justify">
                <b>描述：</b>
                {{ infoData[selectYear][selectIndex].description }}
              </p>
            </div>
          </div>
        </n-drawer-content>
      </n-drawer>
    </div>
  </NavigationBar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NDropdown, NButton, NDrawer, NDrawerContent, NImage } from 'naive-ui'
import NavigationBar from '@/components/navigation/index.vue'
import { publicGetData } from '@/hooks/publicGetData'
import api from '@/api/news/index'
// 展示内容的状态
const infoData = ref<Record<string, any>>({})
// 下拉菜单的状态
const options = ref([
  {
    label: '',
    key: '',
  },
])
//对话框状态
const visible = ref(false)
// 点击事件选择的年份
const selectYear = ref('')
// 点击事件选择的年份
const selectIndex = ref(0)
// 选择事件，根据key值（年份）跳转到特定年份的新闻
const handleSelect = (key: any) => {
  const element = document.getElementById(key)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  } else {
    console.warn(`Element with id ${key} not found`)
  }
}

// 点击事件，点击卡片传递年份和索引index
const handleClick = (year: string, index: number) => {
  visible.value = true
  selectYear.value = year
  selectIndex.value = index
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
    .card {
      margin-top: 10px;
      .info_column {
        overflow-wrap: break-word;
        h3 {
          font-weight: bold;
          font-size: 1.6em;
          font-family:
            Trebuchet MS,
            Helvetica,
            sans-serif;
          white-space: nowrap; /* 禁止换行 */
          overflow: hidden; /* 隐藏溢出内容 */
          text-overflow: ellipsis;
        }
        .info_item {
          display: flex;
          align-items: center;
          padding-top: 14px;
          padding-right: 30px;
        }
        .show {
          padding-top: 14px;
          line-height: 1.2em; /* 行高 */
          width: 660px; /* 固定宽度 */
          height: 45px; /* 固定高度 */
          overflow: hidden; /* 隐藏超出内容 */
          text-overflow: ellipsis; /* 用省略号表示溢出部分 */
        }
      }
    }
  }
}
</style>
