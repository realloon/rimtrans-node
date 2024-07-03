const resovedTag = (element: Element) =>
  element.tagName === 'li'
    ? Array.from((element.parentElement as Element).children)
        .indexOf(element)
        .toString()
    : element.tagName

const owndChildren = (element: Element, tagName: string) =>
  Array.from(element.children).find(children => children.tagName === tagName)

// TODO: Cannot handle cases of abstract inheritance, yet.
export default function extractTagName(
  element: Element | null,
  prevTags: string[] = []
): string {
  if (!element || !element.parentElement) return ''

  prevTags.unshift(resovedTag(element))

  const defNameElement = owndChildren(element?.parentElement, 'defName')

  if (!defNameElement) return extractTagName(element.parentElement, prevTags)

  const value: string = defNameElement.textContent?.trim() ?? ''
  const tagsPrefix: string = prevTags.join('.')
  return tagsPrefix ? `${value}.${tagsPrefix}` : value
}
