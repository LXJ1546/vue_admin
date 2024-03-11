export const BasicRoutes = [
  {
    name: 'Login', //命名路由，权限用到
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/home/index.vue'),
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
  },
  {
    //任意路由，不匹配上面三个的时候直接重定向
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
