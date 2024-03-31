import type { Project, Def, About, Cover } from '@/types'
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
    projectName.value = null
    defs.length = 0
    Object.assign(about, defaultAbout)
    cover.value = null
  }

  const update = ({
    defs: sourceDefs,
    about: sourceAbout,
    cover: sourceCover,
  }: Project) => {
    $reset()
    // defs
    sourceDefs.forEach(def => {
      defs.push(def)
    })
    defs.sort(({ tagName: pre }, { tagName: cur }) => pre.localeCompare(cur))
    // about
    Object.assign(about, sourceAbout)
    // cover
    cover.value = sourceCover
  }

  return {
    projectName,
    defs,
    about,
    cover,
    coverUrl,
    categories,
    $reset,
    update,
  }
})
