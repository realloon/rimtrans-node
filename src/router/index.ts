import { createRouter, createWebHistory } from 'vue-router'
import homeView from '@/views/home/HomeView.vue'
import DefsView from '@/views/defs/DefsView.vue'
import AboutView from '@/views/about/AboutView.vue'
import ExportView from '@/views/export/ExportView.vue'
import SettingView from '@/views/setting/SettingView.vue'

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
      component: AboutView,
    },
    {
      path: '/export',
      name: 'export',
      component: ExportView,
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
    },
  ],
})

export default router
