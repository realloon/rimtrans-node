export default function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...funcArgs: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastTime: number = 0

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now()
    const remainingTime = wait - (now - lastTime)

    if (remainingTime <= 0 || remainingTime > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      lastTime = now
      func(...args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastTime = Date.now()
        timeout = null
        func(...args)
      }, remainingTime)
    }
  }

  return throttled
}
