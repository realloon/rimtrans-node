import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { debounce } from '@/utils'
import type { About } from '@/types'

export const useAboutStore = defineStore('about', () => {
  const local: About | null = JSON.parse(
    localStorage.getItem('rn-workspace-about') as string
  )
  const about = reactive(
    local || {
      name: '',
      author: '',
      description: '',
      packageId: '',
      supportedVersions: [],
      loadAfter: [],
    }
  )

  const replace = (source: About) => {
    Object.assign(about, source)
  }

  // Local cache
  const debounceSave = debounce(() => {
    console.log('保存 About')

    localStorage.setItem('rn-workspace-about', JSON.stringify(about))
  }, 1000)
  watch(about, () => {
    debounceSave()
  })

  return {
    about,
    replace,
  }
})
