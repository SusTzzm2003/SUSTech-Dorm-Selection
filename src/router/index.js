import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import viewDormRouter from './modules/view-dorm'
import teamRouter from '@/router/modules/team'
import Cookies from 'js-cookie'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will become nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Menu', icon: 'guide', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  viewDormRouter
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/faculty-dorm',
    component: Layout,
    redirect: '/faculty-dorm/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/faculty-dorm/index'),
        name: 'faculty-dorm',
        meta: { title: 'Dorm Management', icon: 'list', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/faculty-user',
    component: Layout,
    redirect: '/faculty-user/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/faculty-user/index'),
        name: 'faculty-user',
        meta: { title: 'User Management', icon: 'list', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/faculty-time_range',
    component: Layout,
    redirect: '/faculty-time_range/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/faculty-time_range/index'),
        name: 'faculty-time_range',
        meta: { title: 'Time Management', icon: 'list', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/message/index'),
        name: 'messageBox',
        meta: { title: 'Message Box', icon: 'email', roles: ['editor'] }
      }
    ]
  },
  {
    path: '/dormSelect',
    component: Layout,
    redirect: '/dormSelect/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dormSelect/index'),
        name: 'DormSelect',
        meta: { title: 'Select Dorm', icon: 'list', roles: ['editor'] }
      }
    ]
  },
  {
    path: '/data-export',
    component: Layout,
    redirect: '/excel-export/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/excel-export/index'),
        name: 'DataExport',
        meta: { title: 'Data Export', icon: 'list', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/chat',
    component: Layout,
    redirect: '/chat/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/chat/index'),
        name: 'chat',
        meta: { title: 'Chat', icon: 'message', roles: ['editor'] }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  teamRouter,
  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
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
router.beforeEach((to, from, next) => {
  // 检查是否访问的是需要登录的页面
  // 假设你有一个判断登录状态的方法，比如 isAuthenticated()
  const isToken = Cookies.get('username')
  const isAuthenticated = sessionStorage.getItem('username')

  if (!isAuthenticated && isToken) {
    sessionStorage.setItem('username', isToken)
    // 重定向到登录页面
    next()
  } else {
    // 如果认证通过，继续导航
    next()
  }
})
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
