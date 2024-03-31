import type { Indexes } from '../type'

function createObjectStore(
  database: IDBDatabase,
  storeName: string,
  keyPath: string | false = false,
  indexes?: Indexes
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (database.objectStoreNames.contains(storeName)) {
      resolve(database)
      return
    }

    database.close()

    const version = database.version + 1
    const request = indexedDB.open(database.name, version)

    request.onupgradeneeded = e => {
      const db = (e.target as IDBRequest).result as IDBDatabase
      const store = db.createObjectStore(
        storeName,
        keyPath ? { keyPath } : { autoIncrement: true }
      )

      if (indexes) {
        indexes.forEach(({ index, unique }) => {
          store.createIndex(index, index, { unique })
        })
      }
    }

    request.onsuccess = () => resolve(request.result)

    request.onerror = () => reject(request.error)
  })
}

export default createObjectStore
