<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppAside from './components/AppAside/AppAside.vue'
import { useProjectStore } from '@/stores/project'
import updatePiniaStores from '@/helper/updatePiniaStores'
import storage from '@/utils/storage'
import { WORKSPACE_NAME } from '@/constant'

const project = useProjectStore()

onMounted(() => {
  project.projectName = storage[WORKSPACE_NAME]
  updatePiniaStores()
})
</script>

<template>
  <app-aside />

  <RouterView />
</template>
