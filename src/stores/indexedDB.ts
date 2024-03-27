function openDatabase(): Promise<IDBDatabase> {
  const request = indexedDB.open('rimtrans-node')

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('imgs')) {
        db.createObjectStore('imgs', { keyPath: 'id' })
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

async function set(id: string, blob: Blob): Promise<void> {
  const db = await openDatabase()

  const transaction = db.transaction('imgs', 'readwrite')
  const store = transaction.objectStore('imgs')

  return new Promise((resolve, reject) => {
    const request = store.put({ id, image: blob })

    request.onsuccess = () => resolve()

    request.onerror = () => reject(request.error)
  })
}

async function get(id: string): Promise<Blob | null> {
  const db = await openDatabase()
  const transaction = db.transaction('imgs', 'readonly')
  const store = transaction.objectStore('imgs')

  return new Promise((resolve, reject) => {
    const request = store.get(id)

    request.onsuccess = () =>
      resolve(request.result ? request.result.image : null)

    request.onerror = () => reject(request.error)
  })
}

export default { set, get }
