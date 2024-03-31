function addDocument<T>(
  db: IDBDatabase,
  storeName: string,
  value: T,
  key?: IDBValidKey
): Promise<IDBValidKey> {
  return new Promise(async (resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.add(value, key)

    transaction.oncomplete = () => resolve(request.result)
    transaction.onerror = () => reject(request.error)
  })
}

export default addDocument
