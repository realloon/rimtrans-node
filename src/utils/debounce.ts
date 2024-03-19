export default function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: number | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer as number)
    timer = window.setTimeout(() => fn.apply(this, args), delay)
  }
}
