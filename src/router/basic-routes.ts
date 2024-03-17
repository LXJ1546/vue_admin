export const BasicRoutes = [
  {
    name: 'Login', //命名路由，权限用到
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta:{
      title:'登录',
      icon:'',
      hidden:true
    }
  },
  {
    name: 'Layout',
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta:{
      title:'首页布局',
      icon:'',
      hidden:true
    },
    redirect:'/home',
    children:[
      {
        name:'Home',
        path:'/home',
        component: () => import('@/views/home/index.vue'),
        meta:{
          title:'首页',
          icon:'HomeFilled',
          hidden:false
        }
      }
    ]
  },
  {
    name: 'Resource',
    path: '/res',
    component: () => import('@/layout/index.vue'),
    meta:{
      title:'资源管理',
      icon:'SetUp',
      hidden:false
    },
    children:[
      {
        name:'Homepage',
        path:'/res/homepage',
        component: () => import('@/views/resource/home/index.vue'),
        meta:{
          title:'首页管理',
          icon:'Histogram',
          hidden:false
        }
      },
      {
        name:'Member',
        path:'/res/member',
        component: () => import('@/views/resource/member/index.vue'),
        meta:{
          title:'成员管理',
          icon:'UserFilled',
          hidden:false
        }
      },
      {
        name:'News',
        path:'/res/news',
        component: () => import('@/views/resource/news/index.vue'),
        meta:{
          title:'新闻管理',
          icon:'Monitor',
          hidden:false
        }
      },
      {
        name:'Publish',
        path:'/res/publish',
        component: () => import('@/views/resource/publish/index.vue'),
        meta:{
          title:'发表管理',
          icon:'Document',
          hidden:false
        }
      },
      {
        name:'Award',
        path:'/res/award',
        component: () => import('@/views/resource/award/index.vue'),
        meta:{
          title:'奖项管理',
          icon:'Trophy',
          hidden:false
        }
      },
      {
        name:'Picture',
        path:'/res/picture',
        component: () => import('@/views/resource/picture/index.vue'),
        meta:{
          title:'奖项管理',
          icon:'Picture',
          hidden:false
        }
      }
    ]
  },
  {
    name: 'PMS',
    path: '/pms',
    component: () => import('@/layout/index.vue'),
    meta:{
      title:'权限管理',
      icon:'Lock',
      hidden:false
    },
    children:[
      {
        name:'Menu',
        path:'/pms/menu',
        component: () => import('@/views/pms/menu/index.vue'),
        meta:{
          title:'菜单管理',
          icon:'Grid',
          hidden:false
        }
      },
      {
        name:'Role',
        path:'/pms/role',
        component: () => import('@/views/pms/role/index.vue'),
        meta:{
          title:'角色管理',
          icon:'Avatar',
          hidden:false
        }
      },
      {
        name:'User',
        path:'/pms/user',
        component: () => import('@/views/pms/user/index.vue'),
        meta:{
          title:'用户管理',
          icon:'UserFilled',
          hidden:false
        }
      }
    ]
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta:{
      title:'404',
      icon:'',
      hidden:true
    }
  },
  {
    //任意路由，不匹配上面三个的时候直接重定向
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta:{
      title:'404',
      icon:'',
      hidden:true
    }
  },
]
