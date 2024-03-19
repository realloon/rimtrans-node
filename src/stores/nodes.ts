import type { Def } from '@/types'
import { reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useCategoriesStore } from './categories'
import { debounce } from '@/utils'

export const useNodesStore = defineStore('nodes', () => {
  const local = JSON.parse(localStorage.getItem('rn-workspace-defs') as string)
  const defs: Array<Def> = reactive(local || [])

  // Output by category.
  const categoriesStore = useCategoriesStore()
  const groupedDefs = computed(() =>
    categoriesStore.currentCategory
      ? defs.filter(def => def.folder === categoriesStore.currentCategory)
      : defs
  )

  const $reset = () => {
    defs.length = 0
  }

  const replace = (source: Array<Def>) => {
    $reset()
    source.forEach(def => {
      defs.push(def)
    })
    defs.sort((a, b) => a.tagName.localeCompare(b.tagName))
  }

  // Local cache
  const debounceSave = debounce(() => {
    localStorage.setItem('rn-workspace-defs', JSON.stringify(defs))
  }, 1000)
  watch(defs, () => {
    debounceSave()
  })

  return { defs, groupedDefs, $reset, replace }
})
