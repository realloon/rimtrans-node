import type { About, Cover, Def, Project } from '@/types'
import { nanoid } from 'nanoid'
import extractXmlsFromZip from './extractXmlsFromZip'
import extractNodesFromXmls from './extractNodesFromXmls'
import xmlToAbout from './xmlToAbout'
import {
  extractFolder,
  extractTagName,
  extractContent,
} from './extractFromElement'

// TODO: load project file.
function extractProject(
  name: string,
  source: string | ArrayBuffer
): Promise<Project> {
  return new Promise(async (resolve, reject) => {
    if (typeof source === 'string') {
      resolve(JSON.parse(source))
    } else {
      const { defXmls, aboutXml, sourceCover } = await extractXmlsFromZip(
        source
      )
      const nodes = await extractNodesFromXmls(defXmls)

      const defs: Def[] = nodes.map(node => ({
        project: name,
        id: nanoid(),
        folder: extractFolder(node) as string,
        tagName: extractTagName(node) as string,
        content: extractContent(node),
        translated: '',
        completed: false,
      }))

      const about: About = Object.assign(xmlToAbout(aboutXml), {
        project: name,
      })

      const cover: Cover = {
        project: name,
        image: sourceCover,
      }

      resolve({
        defs,
        about,
        cover,
      })
    }
  })
}

export default extractProject
