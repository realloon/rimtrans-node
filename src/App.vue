<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppAside from './components/AppAside/AppAside.vue'
import useIndexedDB from '@/hooks/useIndexedDB'
import { useProjectStore } from '@/stores/project'
import storage from './utils/storage'
import { WORKSPACE_NAME } from './constants'

const project = useProjectStore()

onMounted(() => {
  useIndexedDB()
  project.projectName = storage[WORKSPACE_NAME]
})
</script>

<template>
  <app-aside />

  <RouterView />
</template>
