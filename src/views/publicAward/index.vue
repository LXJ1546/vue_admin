<template>
  <NavigationBar>
    <div class="news_container">
      <div class="head">
        <h1 class="title">🏆 奖项</h1>
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
          :key="item.id"
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
                <p class="info_p">
                  {{ item.team }}
                </p>
                <p class="info_p">
                  <strong :style="{ color: '#4169E1' }">
                    {{ item.institutionAbb }}
                  </strong>
                  | {{ item.institution }}
                </p>
                <div class="bottom_info">
                  <div class="info_item">
                    <el-icon :size="20" color="#4169E1"><Medal /></el-icon>
                    <p style="padding-left: 5px">{{ item.grade }}</p>
                  </div>
                  <div class="info_item">
                    <el-icon :size="20" color="#4169E1"><Timer /></el-icon>
                    <p style="padding-left: 5px">{{ item.date }}</p>
                  </div>
                  <div class="info_item">
                    <el-icon :size="20" color="#4169E1"><Link /></el-icon>
                    <a
                      :href="item.link"
                      style="text-decoration: underline; padding-left: 5px"
                      target="_blank"
                    >
                      视频链接
                    </a>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <n-drawer v-model:show="visible" :width="760">
        <n-drawer-content title="🏆 奖项" closable>
          <div class="dialog">
            <img
              :src="infoData[selectYear][selectIndex].picture"
              style="width: 100%; height: 400px"
            />
            <div style="overflow-wrap: break-word">
              <h3
                style="
                  font-weight: bold;
                  padding-top: 10px;
                  font-size: 1.5em;
                  font-family:
                    Trebuchet MS,
                    Helvetica,
                    sans-serif;
                "
              >
                {{ infoData[selectYear][selectIndex].title }}
              </h3>
              <p style="padding-top: 5px; font-size: 17px">
                <b>队伍：</b>
                {{ infoData[selectYear][selectIndex].team }}
              </p>
              <p style="padding-top: 5px; font-size: 17px">
                <b>奖项：</b>
                {{ infoData[selectYear][selectIndex].institution }}
                {{ infoData[selectYear][selectIndex].grade }}
              </p>
              <p style="padding-top: 5px; font-size: 17px">
                <b>获奖时间：</b>
                {{ infoData[selectYear][selectIndex].date }}
              </p>
              <p style="padding-top: 5px; font-size: 17px">
                <b>作品关键词：</b>
                {{ infoData[selectYear][selectIndex].keyword }}
              </p>
              <p style="padding-top: 5px; font-size: 17px; text-align: justify">
                <b>作品描述：</b>
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
import api from '@/api/award/index'
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
          padding: 3px;
          font-weight: bold;
          font-size: 1.6em;
          font-family:
            Trebuchet MS,
            Helvetica,
            sans-serif;
        }
        .info_p {
          padding-top: 15px;
          font-size: large;
        }
        .bottom_info {
          padding-top: 15px;
          font-size: 16px;
          display: flex;
          .info_item {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-right: 30px;
          }
        }
      }
    }
  }
}
</style>
