<script setup lang="ts">
import { computed } from 'vue'
import { useProjectStore } from '@/stores/project'

const project = useProjectStore()

const total = computed(() => project.defs.length)

const completed = computed(
  () => project.defs.filter(def => def.completed).length
)
</script>

<template>
  <section class="card">
    <h3 style="font-size: 1.25rem">{{ project.about.name }}</h3>
    <p>已翻译 {{ completed }} / {{ total }} 条</p>
    <progress :max="total" :value="completed" style="width: 100%"></progress>
  </section>
</template>
