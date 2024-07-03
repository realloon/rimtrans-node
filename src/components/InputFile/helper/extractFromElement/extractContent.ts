const extractContent = (element: Element): string =>
  (element.textContent as string).trim()

export default extractContent
