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
      name: 'export',
      component: () => import('@/views/export/ExportView.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/setting/SettingView.vue'),
    },
  ],
})

export default router
