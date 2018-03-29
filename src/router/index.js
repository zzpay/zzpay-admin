import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      meta: { title: '首页', icon: 'setting' },
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    hidden: true,
    path: '/basic',
    component: Layout,
    redirect: '/manage/app',
    name: 'basic',
    meta: { title: '基础信息', icon: 'setting' },
    children: [
      {
        path: 'channel',
        name: 'channel',
        component: () => import('@/views/channel/index'),
        meta: { title: '支付渠道', icon: 'money' }
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/app',
    name: 'mer',
    meta: { title: '商户及应用', icon: 'tree' },
    children: [
      {
        path: 'channel',
        name: 'channel',
        component: () => import('@/views/channel/index'),
        meta: { title: '支付渠道', icon: 'payment' }
      },
      {
        path: 'channelconfig',
        name: 'channelconfig',
        component: () => import('@/views/channelconfig/index'),
        meta: { title: '支付配置', icon: 'payment' }
      },
      {
        hidden: true,
        path: 'channelconfig/new',
        name: 'channelconfig-new',
        component: () => import('@/views/channelconfig/edit'),
        meta: { title: '添加支付配置', icon: 'payment' }
      },
      {
        hidden: true,
        path: 'channelconfig/:id',
        name: 'channelconfig-edit',
        component: () => import('@/views/channelconfig/edit'),
        meta: { title: '编辑支付配置', icon: 'payment' }
      }
    ]
  },
  {
    path: '/bill',
    component: Layout,
    redirect: '/bill/pay',
    name: 'bill',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        path: 'pay',
        name: 'payBill',
        component: () => import('@/views/bill/index'),
        meta: { title: '支付订单', icon: 'bill' }
      },
      {
        path: 'refund',
        name: 'refundBill',
        component: () => import('@/views/refundbill/index'),
        meta: { title: '退款订单', icon: 'bill' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

