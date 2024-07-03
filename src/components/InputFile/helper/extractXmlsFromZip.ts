import JSZip from 'jszip'

const regexs = {
  defs: /\d+\.\d+\/Defs\/.+\.xml$/,
  about: /About\/About\.xml$/,
  cover: /About\/(?:P|p)review\.(?:png|gif)$/,
}

type Name = [string, JSZip.JSZipObject]

const isNotMeta = ([name]: Name) => !name.startsWith('__MACOSX/')
const isDefFile = ([name]: Name) => regexs.defs.test(name)
const isAboutFile = ([name]: Name) => regexs.about.test(name)
const isCoverFile = ([name]: Name) => regexs.cover.test(name)

const getVersion = (path: string): number => {
  const match = path.match(/\d+\.\d+/)
  return match ? parseFloat(match[0]) : 0
}

const getLatestDefFiles = (entries: Array<Name>) =>
  entries.filter(isDefFile).reduce(
    (latestFiles, [name, zipEntry]) => {
      const version = getVersion(name)
      if (!latestFiles.version || version > latestFiles.version) {
        return { version, files: [zipEntry] }
      }
      if (version === latestFiles.version) {
        latestFiles.files.push(zipEntry)
      }
      return latestFiles
    },
    { version: 0, files: [] as JSZip.JSZipObject[] }
  ).files

const extractXmlsFromZip = async (
  zip: ArrayBuffer
): Promise<{
  defXmls: string[]
  aboutXml: string
  sourceCover: Blob
}> => {
  const target = await new JSZip().loadAsync(zip)
  const entries = Object.entries(target.files).filter(isNotMeta)

  // defs
  const latestDefEntries = getLatestDefFiles(entries)
  const defXmlPromises = latestDefEntries.map(file => file.async('string'))
  const defXmls = await Promise.all(defXmlPromises)

  // about
  const aboutEntry = entries.find(isAboutFile)?.[1]
  if (!aboutEntry) throw new Error('No valid About.xml file found.')
  const aboutXmlPromise = aboutEntry.async('string')
  const aboutXml = await aboutXmlPromise

  // cover
  const coverEnter = entries.find(isCoverFile)?.[1]
  if (!coverEnter) throw new Error('No valid preview.png file found.')
  const sourceCover = await coverEnter.async('blob')

  return { defXmls, aboutXml, sourceCover }
}

export default extractXmlsFromZip
