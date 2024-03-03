import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主面板', icon: 'dashboard' }
    }]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/index',
    meta: {
      title: '文章管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/article/index'), // Parent router-view
        name: 'Article',
        meta: { title: '文章' },

      },
      {
        path: 'category',
        component: () => import('@/views/article/category/index'),
        name: 'Category',
        meta: { title: '分类' }
      },
      {
        path: 'tag',
        component: () => import('@/views/article/category/tag'),
        name: 'Tag',
        meta: { title: '标签' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    meta: { title: '用户管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户' }
      },
      {
        path: 'invite',
        name: 'Invite',
        component: () => import('@/views/user/invite-code'),
        meta: { title: '邀请码' }
      },
      {
        path: 'headpicture',
        name: 'Headpicture',
        component: () => import('@/views/user/headpicture'),
        meta: { title: '头像框' }
      }
    ]
  },

  {
    path: '/shop',
    component: Layout,
    redirect: '/shop',
    meta: { title: '商城管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/shop/category'),
        meta: { title: '分类' }
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/shop/index'),
        meta: { title: '商品' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    name: 'System',
    meta: {
      title: '系统设置',
      icon: 'nested'
    },
    children: [
      {
        path: 'general',
        component: () => import('@/views/system/index'), // Parent router-view
        name: 'General',
        meta: { title: '常规设置' },
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/system/upload'),
        meta: { title: '上传设置' }
      },
      {
        path: 'app',
        name: 'App',
        component: () => import('@/views/system/app'),
        meta: { title: 'APP设置' }
      },
      {
        path: 'appHomepage',
        name: 'AppHomepge',
        component: () => import('@/views/system/apphomepage'),
        meta: { title: '应用首页' }
      },
      {
        path: 'pay',
        name: 'Pay',
        component: () => import('@/views/system/pay'),
        meta: { title: '支付设置' }
      },
      {
        path: 'email',
        name: 'Email',
        component: () => import('@/views/system/email'),
        meta: { title: '邮箱设置' }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/system/login'),
        meta: { title: '登录设置' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
