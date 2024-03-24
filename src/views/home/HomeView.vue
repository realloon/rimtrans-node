<script setup lang="ts">
import Introduction from './Introduction.vue'
import Project from './Project.vue'
import { useProjectStore } from '@/stores/project'
const project = useProjectStore()
</script>

<template>
  <main>
    <Introduction v-if="!(project.about.name !== '')" />
    <Project v-if="project.about.name !== ''" />
  </main>
</template>

<style scoped></style>
