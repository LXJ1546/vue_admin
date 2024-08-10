export const BasicRoutes = [
  {
    name: 'Home', //命名路由，权限用到
    path: '/',
    component: () => import('@/views/publicHome/index.vue'),
    meta: {
      title: '首页',
      icon: '',
      hidden: true,
    },
  },
  {
    name: 'News', //命名路由，权限用到
    path: '/news',
    component: () => import('@/views/publicNews/index.vue'),
    meta: {
      title: '新闻',
      icon: '',
      hidden: true,
    },
  },
  {
    name: 'Member', //命名路由，权限用到
    path: '/member',
    component: () => import('@/views/publicMember/index.vue'),
    meta: {
      title: '成员',
      icon: '',
      hidden: true,
    },
  },
  {
    name: 'Publication', //命名路由，权限用到
    path: '/publication',
    component: () => import('@/views/publicPublication/index.vue'),
    meta: {
      title: '发表',
      icon: '',
      hidden: true,
    },
  },
  {
    name: 'Award', //命名路由，权限用到
    path: '/award',
    component: () => import('@/views/publicAward/index.vue'),
    meta: {
      title: '奖项',
      icon: '',
      hidden: true,
    },
  },
  {
    name: 'Login', //命名路由，权限用到
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      icon: '',
      hidden: true,
    },
  },
  // 后台管理的主页
  {
    name: 'Admin',
    path: '/admin',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '',
      icon: '',
      hidden: true,
    },
    redirect: '/admin/home',
    children: [
      {
        name: 'AdminHome',
        path: '/admin/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false,
        },
      },
    ],
  },
  // 后台管理的资源管理
  {
    name: 'Resource',
    path: '/admin/res',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '资源管理',
      icon: 'SetUp',
      hidden: false,
    },
    redirect: '/admin/res/homepage',
    children: [
      {
        name: 'AdminHomepage',
        path: '/admin/res/homepage',
        component: () => import('@/views/resource/homepage/index.vue'),
        meta: {
          title: '首页管理',
          icon: 'Histogram',
          hidden: false,
        },
      },
      {
        name: 'AdminMember',
        path: '/admin/res/member',
        component: () => import('@/views/resource/member/index.vue'),
        meta: {
          title: '成员管理',
          icon: 'UserFilled',
          hidden: false,
        },
      },
      {
        name: 'AdminNews',
        path: '/admin/res/news',
        component: () => import('@/views/resource/news/index.vue'),
        meta: {
          title: '新闻管理',
          icon: 'Monitor',
          hidden: false,
        },
      },
      {
        name: 'AdminPublish',
        path: '/admin/res/publish',
        component: () => import('@/views/resource/publish/index.vue'),
        meta: {
          title: '发表管理',
          icon: 'Document',
          hidden: false,
        },
      },
      {
        name: 'AdminAward',
        path: '/admin/res/award',
        component: () => import('@/views/resource/award/index.vue'),
        meta: {
          title: '奖项管理',
          icon: 'Trophy',
          hidden: false,
        },
      },
      {
        name: 'AdminPicture',
        path: '/admin/res/picture',
        component: () => import('@/views/resource/picture/index.vue'),
        meta: {
          title: '画廊管理',
          icon: 'Picture',
          hidden: false,
        },
      },
    ],
  },
  {
    name: 'PMS',
    path: '/admin/pms',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      icon: 'Lock',
      hidden: false,
    },
    redirect: '/admin/pms/menu',
    children: [
      {
        name: 'AdminMenu',
        path: '/admin/pms/menu',
        component: () => import('@/views/pms/menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Grid',
          hidden: false,
        },
      },
      {
        name: 'AdminRole',
        path: '/admin/pms/role',
        component: () => import('@/views/pms/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Avatar',
          hidden: false,
        },
      },
      {
        name: 'AdminUser',
        path: '/admin/pms/user',
        component: () => import('@/views/pms/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
          hidden: false,
        },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      icon: '',
      hidden: true,
    },
  },
  {
    //任意路由，不匹配上面三个的时候直接重定向
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '404',
      icon: '',
      hidden: true,
    },
  },
]
