import { useProjectStore } from '@/stores/project'

import readFile from './readFile'
import extractProject from './extractProject'

export default async function loadFile(event: Event) {
  const target = event.target as HTMLInputElement
  const file = (target.files as FileList)[0]
  if (!file) return

  const content = await readFile(file)
  const project = await extractProject(content)

  const projectStore = useProjectStore()
  projectStore.update(project)
}
