type StoreNames = 'defs' | 'about' | 'cover'
const storeNames: StoreNames[] = ['defs', 'about', 'cover']

function openDatabase(): Promise<IDBDatabase> {
  const request = indexedDB.open('rimtrans-node')

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = () => {
      const db = request.result

      storeNames.forEach(name => {
        if (db.objectStoreNames.contains(name)) return
        db.createObjectStore(name, { keyPath: 'id' })
      })
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

async function set<T>(
  storeName: StoreNames,
  value: T,
  id?: string
): Promise<void> {
  const db = await openDatabase()

  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.objectStore(storeName)

  return new Promise((resolve, reject) => {
    console.log(value)
    const request = id
      ? store.put(Object.assign({ id }, value))
      : store.put({ id: 'unique', value })

    request.onsuccess = () => resolve()

    request.onerror = () => reject(request.error)
  })
}

async function get(storeName: StoreNames, key?: string): Promise<any> {
  const db = await openDatabase()
  const transaction = db.transaction(storeName, 'readonly')
  const store = transaction.objectStore(storeName)

  return new Promise((resolve, reject) => {
    const request = store.get(key ?? 'unique')

    request.onsuccess = () => resolve(request.result ?? null)

    request.onerror = () => reject(request.error)
  })
}

async function clear(storeName: StoreNames): Promise<void> {
  const db = await openDatabase()
  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.objectStore(storeName)

  return new Promise((resolve, reject) => {
    const request = store.clear()

    request.onsuccess = () => resolve(request.result)

    request.onerror = () => reject(request.error)
  })
}

async function clearAll() {
  storeNames.forEach(name => clear(name))
}

export default { set, get, clearAll }
