import { useSettingStore } from '@/stores/setting'

async function extractNodesFromXmls(xmls: Array<string>) {
  const dom = mergedDom(xmls)
  const { extractFields } = useSettingStore()

  return extractFields
    .map((rule: string) => dom.getElementsByTagName(rule))
    .filter(elements => elements.length > 0)
    .flatMap(elements => [...elements])
}

function mergedDom(xmls: Array<string>): XMLDocument {
  const parser = new DOMParser()

  const targetDom = document.implementation.createDocument(null, 'Defs', null)
  const targetDefsEl = targetDom.getElementsByTagName('Defs')[0]

  xmls.forEach(xml => {
    const dom = parser.parseFromString(xml, 'application/xml')
    const defsEl = dom.getElementsByTagName('Defs')[0]

    if (!defsEl) return

    Array.from(defsEl.children).forEach(defEl =>
      targetDefsEl.appendChild(defEl)
    )
  })

  return targetDom
}

export default extractNodesFromXmls
