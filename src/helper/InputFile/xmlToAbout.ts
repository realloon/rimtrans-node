import type { About } from '@/types'

const xmlToAbout = (xml: string): About => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(xml, 'application/xml')

  const originalName = dom.querySelector('name')?.textContent as string
  const name = originalName + ' Hans'

  const packageId =
    (dom.querySelector('packageId')?.textContent as string) + '.ZH'

  const description = `Translated "${originalName}" Mod.`

  const supportedVersions = Array.from(
    (dom.querySelector('supportedVersions') as Element).children
  ).map(li => li.textContent as string)

  const loadAfter = [dom.querySelector('packageId')?.textContent as string]

  return {
    name,
    packageId,
    author: '',
    description,
    supportedVersions,
    loadAfter,
  }
}

export default xmlToAbout
