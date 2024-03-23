import JSZip from 'jszip'
import { useAboutStore } from '@/stores/about'
import { useNodesStore } from '@/stores/nodes'
import { aboutXml, defsXml } from '@/template'
import { saveFile } from '@/utils'

export default async function outputMod(language: string) {
  const zip = new JSZip()

  // about
  const aboutStore = useAboutStore()
  const about = aboutStore.about
  zip.file('/about/About.xml', aboutXml(about))

  // defs
  const nodesStores = useNodesStore()
  const defs = nodesStores.defs
  nodesStores.categories.forEach(category => {
    const path = `/Languages/${language}/DefInjected/${category}/${category}.xml`
    const content = defsXml(defs.filter(def => def.folder === category))

    zip.file(path, content)
  })

  saveFile(
    `${about.name}_${Date.now()}`,
    await zip.generateAsync({ type: 'blob' })
  )
}
