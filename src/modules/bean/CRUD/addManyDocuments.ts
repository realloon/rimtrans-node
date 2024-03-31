function addManyDocument<T>(
  db: IDBDatabase,
  storeName: string,
  value: T[]
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)

    value.forEach(item => store.add(item))

    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
}

export default addManyDocument
