import { createRouter, createWebHashHistory } from 'vue-router'
// import Singer from "@/views/singer"

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/singer',
    component: () => import(/* webpackChunkName:"singer" */'@/views/singer'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName:"singer-detail" */'@/views/singer-detail')
      }
    ]
  },
  {
    path: '/recommend',
    component: () => import(/* webpackChunkName:"recommend" */'@/views/recommend'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName:"album" */'@/views/album')
      }
    ]
  },
  {
    path: '/top-list',
    component: () => import(/* webpackChunkName:"top-list" */'@/views/top-list'),
    children: [{
      path: ':id',
      component: () => import(/* webpackChunkName:"top-detail" */'@/views/top-detail')
    }]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:"search" */'@/views/search')
  },
  {
    path: '/user',
    // component: () => import('@/views/user-content')
    components: {
      user: () => import(/* webpackChunkName:"user-content" */'@/views/user-content')
    }
  },
  // not found
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
