import type { Def, Project } from '@/types'
import { nanoid } from 'nanoid'
import extractXmlsFromZip from './extractXmlsFromZip'
import extractNodesFromXmls from './extractNodesFromXmls'
import xmlToAbout from './xmlToAbout'
import {
  extractFolder,
  extractTagName,
  extractContent,
} from './extractFromElement'

function extractProject(source: string | ArrayBuffer): Promise<Project> {
  return new Promise(async (resolve, reject) => {
    if (typeof source === 'string') {
      resolve(JSON.parse(source))
    } else {
      const { defXmls, aboutXml } = await extractXmlsFromZip(source)
      const nodes = await extractNodesFromXmls(defXmls)

      const defs: Def[] = nodes.map(node => ({
        id: nanoid(),
        folder: extractFolder(node) as string,
        tagName: extractTagName(node) as string,
        content: extractContent(node),
        translated: '',
        completed: false,
      }))

      resolve({
        defs,
        about: xmlToAbout(aboutXml),
      })
    }
  })
}

export default extractProject
