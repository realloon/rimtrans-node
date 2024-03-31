import { useProjectStore } from '@/stores/project'
import { storeDefs, storeAbout, storeCover } from '@/utils/bean'
import storage from '@/utils/storage'
import { WORKSPACE_NAME } from '@/constants'

export default async () => {
  const projectName = storage[WORKSPACE_NAME]
  if (!projectName) return

  const project = useProjectStore()

  const defs = await storeDefs.getAll(projectName)
  defs.forEach(def => project.defs.push(def))

  const about = await storeAbout.get(projectName)
  Object.assign(project.about, about)

  const cover = await storeCover.get(projectName)
  project.cover = cover

  
}
