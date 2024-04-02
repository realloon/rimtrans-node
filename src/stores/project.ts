import type { Def, About, Cover, Project } from '@/types'
import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

const defaultAbout: About = {
  project: '',
  name: '',
  author: '',
  description: '',
  packageId: '',
  supportedVersions: [],
  loadAfter: [],
}

export const useProjectStore = defineStore('project', () => {
  // Init.
  const projectName = ref<string | null>(null)
  const defs = reactive<Def[]>([])
  const about = reactive<About>(defaultAbout)
  const cover = ref<Cover | null>()

  // Compute.
  const categories = computed(() => new Set(defs.map(def => def.folder).sort()))
  const coverUrl = computed(() =>
    cover.value ? URL.createObjectURL(cover.value.image) : ''
  )

  const $reset = () => {
    defs.length = 0
  }

  return {
    projectName,
    defs,
    about,
    cover,
    coverUrl,
    categories,
    $reset,
  }
})
