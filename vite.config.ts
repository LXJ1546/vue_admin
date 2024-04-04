import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
// 引入svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量
  // mode代表环境模式，默认为开发环境
  // process.cwd()为vite项目的根目录
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //配置代理跨域
    server: {
      proxy: {
        // 中括号拿到关键字
        [env.VITE_APP_BASE_API]: {
          //获取数据服务器地址的设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
        },
      },
    },
  }
})
