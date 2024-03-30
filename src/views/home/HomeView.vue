<script setup lang="ts">
import Introduction from './Introduction.vue'
import Project from './Project.vue'
import { useProjectStore } from '@/stores/project'
const project = useProjectStore()
</script>

<template>
  <main>
    <Introduction v-if="!project.hasProject" />
    <Project v-if="project.hasProject" />
  </main>
</template>

<style scoped></style>
