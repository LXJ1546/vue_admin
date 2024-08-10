<template>
  <NavigationBar>
    <div class="home">
      <div class="top">
        <div class="picture">
          <el-carousel trigger="click" height="350px">
            <el-carousel-item v-for="item in carousel" :key="item.id">
              <img :src="item.picture" alt="carouel" class="image" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="bottom">
        <div class="news">
          <div class="title">
            <div class="icon_news">
              <img src="/news.png" alt="news" width="25" />
              <h3>新闻</h3>
            </div>
            <div class="more">
              <router-link to="/news" class="more_link">更多</router-link>
              <img src="/more.png" alt="more" width="15" />
            </div>
          </div>
          <div class="news_content">
            <el-card
              v-for="item in newsData.slice(0, 6)"
              :key="item.id"
              class="card"
              body-style="padding:15px;"
            >
              <el-row>
                <el-col :span="8">
                  <n-image :src="item.picture" width="210" height="130" />
                </el-col>
                <el-col :span="16">
                  <div class="info_column">
                    <h3>
                      {{ item.title }}
                    </h3>
                    <div class="info_item">
                      <el-icon :size="16" color="#4169E1"><Avatar /></el-icon>
                      <p style="padding-left: 5px">{{ item.author }}</p>
                    </div>
                    <div style="display: flex">
                      <div class="info_item">
                        <el-icon :size="16" color="#4169E1">
                          <Tickets />
                        </el-icon>
                        <p style="padding-left: 5px">{{ item.type }}</p>
                      </div>
                      <div class="info_item">
                        <el-icon :size="16" color="#4169E1"><Timer /></el-icon>
                        <p style="padding-left: 5px">{{ item.date }}</p>
                      </div>
                      <div class="info_item">
                        <el-icon :size="16" color="#4169E1">
                          <Location />
                        </el-icon>
                        <p style="padding-left: 5px">{{ item.place }}</p>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
        <div class="info">
          <div class="lab_title">
            <el-icon style="margin-right: 4px">
              <InfoFilled />
            </el-icon>
            <span style="font-size: 14px">关于我们</span>
          </div>
          <div style="font-size: 14px">
            <p style="padding-top: 15px">信息可视化与可视分析实验室</p>
            <p style="padding-top: 15px">研究方向: 数据可视化与可视分析</p>
            <p style="padding-top: 15px">
              B站账号:
              <a
                href="https://space.bilibili.com/3461569927187108"
                style="color: rgb(87, 148, 245)"
              >
                CQU-VIVALab
              </a>
            </p>
            <p style="padding-top: 15px">
              地址: 重庆大学虎溪校区 大数据与软件学院
            </p>
            <p style="padding-top: 15px">联系方式: haibo.hu@cqu.edu.cn</p>
          </div>
          <div class="member_title">
            <div style="display: flex; align-items: center">
              <el-icon style="margin-right: 4px">
                <Avatar />
              </el-icon>
              <span style="font-size: 14px">成员</span>
            </div>
            <router-link to="/member" class="more_link">查看全部></router-link>
          </div>
          <div class="member">
            <div
              v-for="item in memberData.slice(0, 4)"
              :key="item.id"
              class="item"
            >
              <img :src="item.avatar" :alt="item.name" />
              <div class="info">
                <div class="name">{{ item.name }}</div>
                <div class="alias">{{ item.type }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NavigationBar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { NImage } from 'naive-ui'
import NavigationBar from '@/components/navigation/index.vue'
import api1 from '@/api/homepage/index'
import api2 from '@/api/news/index'
import api3 from '@/api/member/index'
//走马灯状态
const carousel = ref<any>([])
//新闻信息状态
const newsData = ref<any>([])
//成员信息状态
const memberData = ref<any>([])

// 获取走马灯图片
const getCarousel = async () => {
  // 发送请求
  const result = await api1.read()
  if (result.code == 'SUCCESS') {
    carousel.value = result.data
  } else {
    // 提示错误信息
    ElMessage({
      message: '信息获取失败！',
      type: 'error',
    })
  }
}

// 获取新闻
const getNews = async () => {
  // 发送请求
  const result = await api2.read()
  if (result.code == 'SUCCESS') {
    newsData.value = result.data
  } else {
    // 提示错误信息
    ElMessage({
      message: '信息获取失败！',
      type: 'error',
    })
  }
}

// 获取成员
const getMember = async () => {
  // 发送请求
  const result = await api3.read()
  if (result.code == 'SUCCESS') {
    memberData.value = result.data
  } else {
    // 提示错误信息
    ElMessage({
      message: '信息获取失败！',
      type: 'error',
    })
  }
}
// 组件挂载时拿到数据
onMounted(() => {
  getNews()
  getCarousel()
  getMember()
})
</script>

<style scoped lang="scss">
.home {
  width: 980px;
  display: flex;
  flex-direction: column;
  background: white;
  border-left: 1px solid rgb(218, 218, 222);
  border-right: 1px solid rgb(218, 218, 222);
  .top {
    height: 350px;
    .picture {
      box-sizing: border-box;
      width: 100%;
      height: 350px;
      .image {
        width: 100%;
      }
    }
  }
  .bottom {
    display: flex;
    .news {
      width: 730px;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 10px;
      border-right: 1px solid rgb(218, 218, 222);
      .title {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
        border-bottom: 1px solid rgb(218, 218, 222);
        .icon_news {
          display: flex;
          align-items: center;
          h3 {
            margin-left: 8px;
          }
        }
        .more {
          display: flex;
          align-items: center;
          .more_link {
            font-size: 14px;
            margin-right: 6px;
            &:hover {
              text-decoration: underline; /* 悬浮时展示下划线 */
              color: #228b22;
            }
          }
        }
      }
      .news_content {
        margin-top: 10px;
        .card {
          margin-top: 6px;
          .info_column {
            overflow-wrap: break-word;
            h3 {
              font-weight: bold;
              font-size: 20px;
              padding-bottom: 15px;
              font-family:
                Trebuchet MS,
                Helvetica,
                sans-serif;
            }
            .info_item {
              display: flex;
              align-items: center;
              padding-top: 14px;
              padding-right: 30px;
              font-size: 15px;
            }
          }
        }
      }
    }
    .info {
      width: 250px;
      padding-left: 5px;
      padding-right: 5px;
      display: flex;
      flex-direction: column;
      .lab_title {
        height: 45px;
        display: flex; /* 设置容器为弹性布局 */
        align-items: center; /* 垂直居中对齐 */
        border-bottom: 1px solid rgb(218, 218, 222);
      }
      .member_title {
        height: 45px;
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 5px;
        border-bottom: 1px solid rgb(218, 218, 222);
        .more_link {
          font-size: 12px;
          margin-right: 6px;
          &:hover {
            text-decoration: underline; /* 悬浮时展示下划线 */
            color: #228b22;
          }
        }
      }
      .member {
        .item {
          display: flex;
          height: 62px;
          margin-top: 14px;
          background-color: #fafafa;
          text-decoration: none;

          img {
            width: 50px;
            height: 62px;
          }

          .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 3px 12px;
            border: 1px solid #e9e9e9;
            border-left: none;
            overflow: hidden;

            .name {
              font-size: 14px;
              font-weight: 700;
              color: #000;
            }

            .alias {
              font-size: 12px;
              color: #666;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
