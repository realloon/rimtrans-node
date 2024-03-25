import type { Def, About, Project } from '@/types'
import { ref, reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { debounce } from '@/utils'

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

  const cover = ref('')

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
    cover.value = URL.createObjectURL(sourceCover)
  }

  // Local cache
  const debounceSave = debounce(() => {
    const project = {
      defs,
      about,
    }
    localStorage.setItem('rn-workspace-project', JSON.stringify(project))
  }, 600)
  watch([defs, about], () => {
    debounceSave()
  })

  return { defs, about, cover, categories, hasProject, update }
})
