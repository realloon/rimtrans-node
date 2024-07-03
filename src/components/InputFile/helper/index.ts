import { useProjectStore } from '@/stores/project'
import readFile from './readFile'
import extractProject from './extractProject'
import { capitalized } from '@/utils'
import storage from '@/utils/storage'
import { WORKSPACE_NAME, PROJECTS } from '@/constant'
import useBean from '@/hooks/useBean'
import updatePiniaStores from '@/helper/updatePiniaStores'

const defaultProjectName = (file: File): string =>
  capitalized(file.name.split('.')[0])

export default async function loadFile(event: Event) {
  const projcetStore = useProjectStore()

  const target = event.target as HTMLInputElement
  const file = (target.files as FileList)[0]
  if (!file) return
  const name = prompt('请输入项目名称', defaultProjectName(file))
  if (!name) return
  const projects = storage[PROJECTS] || []
  if (projects.includes(name)) return alert('已有同名项目！')

  storage[WORKSPACE_NAME] = name
  projcetStore.projectName = name
  storage[PROJECTS] = projects.push(name) && projects

  const content = await readFile(file)
  const { defs, about, cover } = await extractProject(name, content)

  const { storeDefs, storeAbout, storeCover } = await useBean()
  storeDefs.putMany(defs)
  storeAbout.put(about)
  storeCover.put(cover)

  updatePiniaStores()
}
