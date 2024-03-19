import { createRouter, createWebHistory } from 'vue-router'
import homeView from '@/views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView,
    },
    {
      path: '/defs',
      name: 'defs',
      component: () => import('@/views/defs/DefsView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/AboutView.vue'),
    },
    {
      path: '/export',
      name: 'aboexportut',
      component: () => import('@/views/export/ExportView.vue'),
    },
  ],
})

export default router
