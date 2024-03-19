const parser = new DOMParser()

const extractRules = [
  'label',
  'description',
  'jobString',
  'helpText',
  'formatString',
]

const extractNodesFromXmls = async (xmls: Array<string>) => {
  const doms = xmls.map(xml => parser.parseFromString(xml, 'application/xml'))

  return doms
    .map(dom => extractRules.map(rule => dom.querySelectorAll(rule)))
    .flat()
    .filter(item => item.length !== 0)
    .map(item => [...item])
    .flat()
}

export default extractNodesFromXmls
