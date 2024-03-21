export default function extractTagName(
  element: Element | null,
  prevTags: string[] = []
): string {
  // tagName +> []
  if (element && element.tagName) {
    let tag = element.tagName

    // Handling of <li>
    if (tag === 'li' && element.parentElement) {
      const index = Array.from(element.parentElement.children).indexOf(element)
      tag = index.toString() // li => index
    }

    prevTags.unshift(tag)
  }

  const defNameElement =
    element?.parentElement?.getElementsByTagName('defName')[0]

  if (defNameElement) {
    const value: string = defNameElement.textContent?.trim() ?? ''
    const tagsPrefix: string = prevTags.join('.')
    return tagsPrefix ? `${value}.${tagsPrefix}` : value
  }

  // has parent
  if (element && element.parentElement) {
    return extractTagName(element.parentElement, prevTags)
  }

  return '' // dom root
}
