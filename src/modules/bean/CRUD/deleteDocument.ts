function deleteDocument(
  database: IDBDatabase,
  storeName: string,
  key: IDBValidKey
): Promise<undefined> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.delete(key)

    transaction.oncomplete = () => resolve(request.result)
    transaction.onerror = () => reject(request.error)
  })
}

export default deleteDocument
