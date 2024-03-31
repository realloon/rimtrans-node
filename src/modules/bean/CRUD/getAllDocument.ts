function getAllDocument<T>(
  database: IDBDatabase,
  storeName: string,
  indexName?: string
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)

    const target =
      indexName && store.indexNames.contains(indexName)
        ? store.index(indexName)
        : store

    const request = target.getAll()

    transaction.oncomplete = () => resolve(request.result)
    transaction.onerror = () => reject(request.error)
  })
}

export default getAllDocument
