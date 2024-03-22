import { createRouter, createWebHistory } from 'vue-router'
import homeView from '@/views/home/HomeView.vue'
import DefsView from '@/views/defs/DefsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView,
    },
    {
      path: '/defs/:category?',
      name: 'defs',
      component: DefsView,
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
