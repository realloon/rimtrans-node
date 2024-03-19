import { useNodesStore } from '@/stores/nodes'
import { useAboutStore } from '@/stores/about'

import readFile from './readFile'
import extractProject from './extractProject'

export default async function loadFile(event: Event) {
  const target = event.target as HTMLInputElement
  const file = (target.files as FileList)[0]
  if (!file) return alert('未检测到上传文件！')

  const content = await readFile(file)
  const { defs, about } = await extractProject(content)

  const nodesStore = useNodesStore()
  nodesStore.replace(defs)

  const aboutStore = useAboutStore()
  aboutStore.replace(about)
}
