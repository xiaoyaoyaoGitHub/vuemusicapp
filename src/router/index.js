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
    component: () => import('@/views/recommend')
  },
  {
    path: '/top-list',
    component: () => import('@/views/top-list')
  },
  {
    path: '/search',
    component: () => import('@/views/search')
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
