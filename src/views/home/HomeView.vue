<script setup lang="ts">
import Introduction from './Introduction.vue'
import Project from './Project.vue'
import { useAboutStore } from '@/stores/about'
const aboutStore = useAboutStore()
</script>

<template>
  <main>
    <Introduction v-if="!(aboutStore.about.name !== '')" />
    <Project v-if="aboutStore.about.name !== ''" />
  </main>
</template>

<style scoped></style>
