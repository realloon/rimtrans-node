function getDocument<T>(
  database: IDBDatabase,
  storeName: string,
  key: IDBValidKey
): Promise<T> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.get(key)

    transaction.oncomplete = () => resolve(request.result)
    transaction.onerror = () => reject(request.error)
  })
}

export default getDocument
