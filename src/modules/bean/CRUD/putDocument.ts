function putDocument<T>(
  database: IDBDatabase,
  storeName: string,
  value: T,
  key?: IDBValidKey
): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.put(value, key)

    transaction.oncomplete = () => resolve(request.result)
    transaction.onerror = () => reject(request.error)
  })
}

export default putDocument
