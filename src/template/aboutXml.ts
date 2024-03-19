import type { About } from '@/types'

const aboutXml = (about: About) => `
<ModMetaData>
  <name>${about.name}</name>
  <author>${about.author}</author>
  <packageId>${about.packageId}</packageId>
  <supportedVersions>
    ${about.supportedVersions.map(version => `<li>${version}</li>`).join('')}
  </supportedVersions>
  <loadAfter>
    ${about.loadAfter.map(item => `<li>${item}</li>`).join('')}
  </loadAfter>
  <description>${about.description}</description>
</ModMetaData>`.replace('\n', '')

export default aboutXml
