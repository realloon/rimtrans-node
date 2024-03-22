import type { Def } from '@/types'
import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { debounce } from '@/utils'

export const useNodesStore = defineStore('nodes', () => {
  const local = JSON.parse(localStorage.getItem('rn-workspace-defs') as string)

  const defs: Array<Def> = reactive(local || [])
  const categories: Set<string> = reactive(new Set(defs.map(def => def.folder)))

  const $reset = () => {
    defs.length = 0
    categories.clear()
  }

  const replace = (source: Array<Def>) => {
    $reset()

    source.forEach(def => {
      defs.push(def)
      categories.add(def.folder)
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

  return { defs, categories, $reset, replace }
})
