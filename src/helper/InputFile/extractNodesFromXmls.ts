import { useSettingStore } from '@/stores/setting'

const extractNodesFromXmls = async (xmls: Array<string>) => {
  const parser = new DOMParser()
  const doms = xmls.map(xml => parser.parseFromString(xml, 'application/xml'))

  const { extractFields } = useSettingStore()
  return doms
    .map(dom => extractFields.map(rule => dom.querySelectorAll(rule)))
    .flat()
    .filter(item => item.length !== 0)
    .map(item => [...item])
    .flat()
}

export default extractNodesFromXmls
