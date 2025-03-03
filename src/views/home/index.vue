<template>
  <div class="content">
    <div class="home_container">
      <div class="top">
        <el-card class="card">
          <div class="card_content">
            <el-avatar :size="60" :src="userStore.avatar" />
            <div class="text">
              <span class="hello">Hello, {{ userStore.username }}</span>
              <span class="role">当前角色：超级管理员</span>
            </div>
          </div>
          <p class="p1">一个人几乎可以在任何他怀有无限热忱的事情上成功。</p>
          <p class="p2">—— 查尔斯·史考伯</p>
        </el-card>
        <el-card class="card1">
          <div style="margin-top: 8px">
            <p class="p1">✨ 欢迎使用VIVA LAB后台管理系统</p>
            <p class="p2">
              这是一款极简风格的后台管理模板，包含前后端解决方案，前端使用 Vite
              + Vue3 + Pinia +
              Unocss，后端暂时没有，包含资源管理和权限管理两大功能。
            </p>
          </div>
          <div class="doc">
            <el-button plain class="btn">石墨文档</el-button>
            <el-button plain class="btn" style="margin-right: 12px">
              语雀文档
            </el-button>
          </div>
        </el-card>
      </div>
      <div class="middle">
        <el-card class="card">
          <template #header>
            <span style="font-size: 18px">🤩 相关成就</span>
          </template>
          <VChart
            :option="achievementOption"
            style="height: 360px"
            autoresize
          />
        </el-card>
        <el-card class="card" style="margin-left: 12px">
          <template #header>
            <span style="font-size: 18px">🛠️ 技术栈</span>
          </template>
          <VChart :option="skillOption" style="height: 360px" autoresize />
        </el-card>
      </div>
      <el-card style="margin-top: 12px">
        <template #header>
          <span style="font-size: 18px">⚡️ 趋势</span>
        </template>
        <VChart :option="trendOption" style="height: 420px" autoresize />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  PieChart,
])

const skillOption = {
  tooltip: {
    trigger: 'item',
    formatter({ name, value }: { name: string; value: number }) {
      return `${name} ${value}%`
    },
  },
  legend: {
    left: 'center',
  },
  series: [
    {
      top: '12%',
      type: 'pie',
      radius: ['35%', '90%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 36,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 46.8, name: 'Vue' },
        { value: 37.0, name: 'TypeScript' },
        { value: 10.1, name: 'JavaScript' },
        { value: 5.0, name: 'SCSS' },
        { value: 1.1, name: 'Other' },
      ],
    },
  ],
}

const achievementOption = {
  color: ['#91cc75', '#73c0de'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: {},
  yAxis: {
    type: 'value',
  },
  xAxis: {
    type: 'category',
    data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
  },
  series: [
    {
      name: '发表',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      data: [0, 1, 0, 2, 0, 2, 4],
    },
    {
      name: '奖项',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      data: [1, 1, 2, 2, 2, 2, 4],
    },
  ],
}

const trendOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: {
    top: '5%',
    data: ['star', 'fork'],
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 3000,
      interval: 500,
      axisLabel: {
        formatter: '{value}',
      },
    },
    {
      type: 'value',
      min: 0,
      max: 500,
      interval: 100,
      axisLabel: {
        formatter: '{value}',
      },
    },
  ],
  series: [
    {
      name: 'star',
      type: 'line',
      data: [200, 320, 520, 550, 600, 805, 888, 950, 1300, 2503, 2702, 2712],
    },
    {
      name: 'fork',
      yAxisIndex: 1,
      type: 'bar',
      data: [40, 72, 110, 115, 121, 175, 180, 201, 260, 398, 423, 455],
    },
  ],
}
</script>

<style lang="scss" scoped>
.content {
  margin: 12px;
  border-color: rgb(239, 239, 245, 1);
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: auto;
  .home_container {
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      width: 100%;
      .card {
        width: 30%;
        min-width: 200px;
        .card_content {
          display: flex;
          margin-top: 8px;
          align-items: center;
          .text {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            .hello {
              font-size: 20px;
              opacity: 0.8;
            }
            .role {
              margin-top: 12px;
              opacity: 0.5;
              font-size: 14px;
            }
          }
        }
        .p1 {
          margin-top: 28px;
          font-size: 14px;
          opacity: 0.6;
        }
        .p2 {
          margin-top: 12px;
          font-size: 12px;
          text-align: right;
          opacity: 0.4;
        }
      }
      .card1 {
        width: 70%;
        margin-left: 12px;
        flex: 1;
        .p1 {
          font-weight: 500;
          font-size: 18px;
        }
        .p2 {
          margin-top: 19px;
          font-size: 14px;
          opacity: 0.6;
        }
        .doc {
          display: flex;
          margin-top: 20px;
          align-items: center;
          justify-content: flex-end;
          .btn {
            width: 84px;
            height: 34px;
            border: 1px solid #316c72;
            color: #316c72;
          }
        }
      }
    }
    .middle {
      display: flex;
      width: 100%;
      margin-top: 12px;
      .card {
        width: 50%;
      }
    }
  }
}
</style>
