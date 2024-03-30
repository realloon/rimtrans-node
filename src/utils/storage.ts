export function createStorage() {
  return new Proxy(Object.create(null), {
    get(_, p: string) {
      const value = localStorage.getItem(p)
      return value ? JSON.parse(value) : undefined
    },
    set(_, p: string, value) {
      localStorage.setItem(p, JSON.stringify(value))
      return true
    },
    deleteProperty(_, p: string) {
      localStorage.removeItem(p)
      return true
    },
  })
}
