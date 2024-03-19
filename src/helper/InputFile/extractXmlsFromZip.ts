import JSZip from 'jszip'

const unzip = new JSZip()

const regexs = {
  defs: /^\d+\/1.\d\/Defs\/.+.xml/,
  about: /^\d+\/About\/About.xml/,
}

type Xmls = {
  defXmls: Array<string>
  aboutXml: string
}

type ZipObj = JSZip.JSZipObject

// TODO: 未处理不合规目录结构
const extractXmlsFromZip = async (zip: ArrayBuffer): Promise<Xmls> =>
  new Promise((resolve, reject) => {
    unzip.loadAsync(zip).then(async targrt => {
      // defs
      const defXmls = await Promise.all(
        Object.values(targrt.files)
          .filter(({ name }) => regexs.defs.test(name))
          .map(file => (targrt.file(file.name) as ZipObj).async('string'))
      )

      // about
      const aboutPath = (
        Object.values(targrt.files).find(({ name }) =>
          regexs.about.test(name)
        ) as ZipObj
      ).name
      const aboutXml = await (targrt.file(aboutPath) as ZipObj).async('string')

      resolve({
        defXmls: defXmls,
        aboutXml,
      })
    })
  })

export default extractXmlsFromZip
