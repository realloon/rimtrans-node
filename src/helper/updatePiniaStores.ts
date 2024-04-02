import useBean from '@/hooks/useBean'
import storage from '@/utils/storage'
import { WORKSPACE_NAME } from '@/constants'
import { useProjectStore } from '@/stores/project'

export default async () => {
  const project = useProjectStore()
  const { storeDefs, storeAbout, storeCover } = await useBean()

  const active = storage[WORKSPACE_NAME]

  // _Defs_
  ;(await storeDefs.getAll(active)).forEach(def => project.defs.push(def))
  // _About_
  Object.assign(project.about, await storeAbout.get(active))
  // _Cover_
  project.cover = await storeCover.get(active)
}
