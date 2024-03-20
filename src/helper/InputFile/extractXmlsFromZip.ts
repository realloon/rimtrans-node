import JSZip from 'jszip'

type Xmls = {
  defXmls: Array<string>
  aboutXml: string
}

const regexs = {
  defs: /\d+\.\d+\/Defs\/.+.xml$/,
  about: /About\/About.xml$/,
}

const getVersion = (path: string): number => {
  const match = path.match(/\d+\.\d+/)
  return match ? parseFloat(match[0]) : 0
}

const isNotMeta = ([name]: [string, JSZip.JSZipObject]) =>
  !name.startsWith('__MACOSX/')
const isDefFile = ([name]: [string, JSZip.JSZipObject]) =>
  regexs.defs.test(name)
const isAboutFile = ([name]: [string, JSZip.JSZipObject]) =>
  regexs.about.test(name)

const getLatestDefFiles = (entries: [string, JSZip.JSZipObject][]) => {
  return entries.filter(isDefFile).reduce(
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
}

const extractXmlsFromZip = async (zip: ArrayBuffer): Promise<Xmls> => {
  const target = await new JSZip().loadAsync(zip)

  const entries = Object.entries(target.files).filter(isNotMeta)
  const latestDefEntries = getLatestDefFiles(entries)
  const aboutEntry = entries.find(isAboutFile)?.[1]

  if (!aboutEntry) {
    throw new Error('No valid About.xml file found.')
  }

  const defXmlPromises = latestDefEntries.map(file => file.async('string'))
  const aboutXmlPromise = aboutEntry.async('string')
  const [defXmls, aboutXml] = await Promise.all([
    Promise.all(defXmlPromises),
    aboutXmlPromise,
  ])

  return { defXmls, aboutXml }
}

export default extractXmlsFromZip
