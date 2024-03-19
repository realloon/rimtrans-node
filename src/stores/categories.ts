import { ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { useNodesStore } from './nodes'

export const useCategoriesStore = defineStore('categories', () => {
  const currentCategory = ref<string | null>(null)

  const nodesStore = useNodesStore()
  const categories: ComputedRef = computed<Set<string>>(
    () => new Set(nodesStore.defs.map(def => def.folder))
  )

  return { currentCategory, categories }
})
