import JSZip from 'jszip'
import { useProjectStore } from '@/stores/project'
import { aboutXml, defsXml } from '@/template'
import { saveFile } from '@/utils'

export default async function outputMod(language: string) {
  const zip = new JSZip()

  const { defs, about, categories } = useProjectStore()

  // defs
  categories.forEach(category => {
    const path = `/Languages/${language}/DefInjected/${category}/${category}.xml`
    const content = defsXml(defs.filter(def => def.folder === category))

    zip.file(path, content)
  })

  // about
  zip.file('/about/About.xml', aboutXml(about))

  saveFile(
    `${about.name}_${Date.now()}`,
    await zip.generateAsync({ type: 'blob' })
  )
}
