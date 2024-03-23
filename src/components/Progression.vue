<script setup lang="ts">
import { useNodesStore } from '@/stores/nodes'
import { useAboutStore } from '@/stores/about'
import { computed } from 'vue'

const nodesStores = useNodesStore()
const aboutStore = useAboutStore()

const total = computed(() => nodesStores.defs.length)

const completed = computed(
  () => nodesStores.defs.filter(def => def.completed).length
)
</script>

<template>
  <section class="card">
    <h3 style="font-size: 1.25rem">{{ aboutStore.about.name }}</h3>
    <p>已翻译 {{ completed }} / {{ total }} 条</p>
    <progress :max="total" :value="completed" style="width: 100%"></progress>
  </section>
</template>