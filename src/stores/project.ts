import type { Def, About, Project } from '@/types'
import { ref, reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { debounce } from '@/utils'
import { createStorage } from '@/utils/storage'
import indexedDB from './indexedDB'

const PROJECT = 'rn-workspace-project'
const storage = createStorage()

const defaultAbout = {
  name: '',
  author: '',
  description: '',
  packageId: '',
  supportedVersions: [],
  loadAfter: [],
}

export const useProjectStore = defineStore('project', () => {
  const storageProject: Project | null = storage[PROJECT]

  const defs = reactive<Def[]>(storageProject?.defs || [])
  const about = reactive<About>(storageProject?.about || defaultAbout)

  const hasProject = computed<Boolean>(() => defs.length > 0)
  const categories = computed(() => new Set(defs.map(def => def.folder).sort()))

  const cover = ref<Blob | null>(null)
  indexedDB.get('cover').then(source => {
    source && (cover.value = source.value)
  })
  const coverUrl = computed(() =>
    cover.value ? URL.createObjectURL(cover.value) : ''
  )

  const $reset = () => {
    defs.length = 0
    Object.assign(about, defaultAbout)
    cover.value = null
    storage[PROJECT] = null

    // indexedDB.clearAll()
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
      indexedDB.set('defs', def, def.id)
    })
    defs.sort(({ tagName: pre }, { tagName: cur }) => pre.localeCompare(cur))
    // about
    Object.assign(about, sourceAbout)
    indexedDB.set('about', sourceAbout)
    // cover
    cover.value = sourceCover
    indexedDB.set('cover', sourceCover)
  }

  // Local cache
  watch(
    [defs, about],
    debounce(() => {
      storage[PROJECT] = { defs, about }
    }, 600)
  )

  return {
    defs,
    about,
    cover,
    coverUrl,
    categories,
    hasProject,
    $reset,
    update,
  }
})
