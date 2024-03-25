import type { Def, About, Project } from '@/types'
import { ref, reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { debounce } from '@/utils'
import imgsDB from './imgs'

const defaultAbout = {
  name: '',
  author: '',
  description: '',
  packageId: '',
  supportedVersions: [],
  loadAfter: [],
}

export const useProjectStore = defineStore('project', () => {
  const local: Project | null = JSON.parse(
    localStorage.getItem('rn-workspace-project') as string
  )

  const defs = reactive<Def[]>(local?.defs || [])

  const about = reactive<About>(local?.about || defaultAbout)

  const cover = ref<Blob | null>(null)
  imgsDB.get('cover').then(coverBlob => (cover.value = coverBlob))

  const coverUrl = computed(() =>
    cover.value ? URL.createObjectURL(cover.value) : ''
  )

  const categories = computed(() => new Set(defs.map(def => def.folder).sort()))

  const hasProject = computed(() => defs.length > 0)

  const $reset = () => {
    defs.length = 0
  }

  const update = ({
    defs: sourceDefs,
    about: sourceAbout,
    cover: sourceCover,
  }: Project) => {
    $reset()
    // defs
    sourceDefs.forEach(def => defs.push(def))
    defs.sort(({ tagName: pre }, { tagName: cur }) => pre.localeCompare(cur))
    // about
    Object.assign(about, sourceAbout)
    // cover
    cover.value = sourceCover
  }

  // Local cache
  watch(
    [defs, about],
    debounce(() => {
      localStorage.setItem(
        'rn-workspace-project',
        JSON.stringify({ defs, about })
      )
    }, 600)
  )

  watch(cover, value => value && imgsDB.set('cover', value))

  return { defs, about, cover, coverUrl, categories, hasProject, update }
})
