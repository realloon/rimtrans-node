export default function extractFolder(element: Element | null): string | null {
  if (!element || !element.parentElement) return null

  const parentTagName = element.parentElement.tagName

  return parentTagName.endsWith('Def')
    ? parentTagName
    : extractFolder(element.parentElement)
}