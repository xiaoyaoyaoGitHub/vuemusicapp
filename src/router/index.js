import { createRouter, createWebHashHistory } from 'vue-router'
// import Singer from "@/views/singer"

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/singer',
    component: () => import('@/views/singer'),
    children: [
      {
        path: ':id',
        component: () => import('@/views/singer-detail')
      }
    ]
  },
  {
    path: '/recommend',
    component: () => import('@/views/recommend'),
    children: [
      {
        path: ':id',
        component: () => import('@/views/album')
      }
    ]
  },
  {
    path: '/top-list',
    component: () => import('@/views/top-list'),
    children: [{
      path: ':id',
      component: () => import('@/views/top-detail')
    }]
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/user',
    component: () => import('@/views/user-content')
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
