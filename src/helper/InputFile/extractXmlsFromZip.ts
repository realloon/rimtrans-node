import JSZip from 'jszip'

type Xmls = {
  defXmls: Array<string>
  aboutXml: string
  cover: string
}

const regexs = {
  defs: /\d+\.\d+\/Defs\/.+.xml$/,
  about: /About\/About.xml$/,
  cover: /About\/preview.png$/,
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

const getLatestDefFiles = (entries: [string, JSZip.JSZipObject][]) =>
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

const extractXmlsFromZip = async (zip: ArrayBuffer): Promise<Xmls> => {
  const target = await new JSZip().loadAsync(zip)

  const entries = Object.entries(target.files).filter(isNotMeta)

  // defs
  const latestDefEntries = getLatestDefFiles(entries)
  const defXmlPromises = latestDefEntries.map(file => file.async('string'))

  // about
  const aboutEntry = entries.find(isAboutFile)?.[1]
  if (!aboutEntry) throw new Error('No valid About.xml file found.')
  const aboutXmlPromise = aboutEntry.async('string')

  // cover
  const coverEntrt = entries.find(isCoverFile)?.[1]
  if (!coverEntrt) throw new Error('No valid preview.png file found.')
  const cover = (await readAsDataUrl(coverEntrt.async('blob'))) as string

  const [defXmls, aboutXml] = await Promise.all([
    Promise.all(defXmlPromises),
    aboutXmlPromise,
  ])

  return { defXmls, aboutXml, cover }
}

const readAsDataUrl = (blob: Promise<Blob>) =>
  new Promise(async (resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(await blob)

    reader.onload = () => resolve(reader.result)

    reader.onerror = err => reject(err)
  })

export default extractXmlsFromZip
