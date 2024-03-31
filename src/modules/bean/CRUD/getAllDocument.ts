function getAllDocument<T>(
  database: IDBDatabase,
  storeName: string,
  indexName?: string
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)
    const index = store.index('project') // FIXME: var

    const request = index.getAll(indexName ? IDBKeyRange.only(indexName) : null)

    transaction.oncomplete = () => resolve(request.result)
    transaction.onerror = () => reject(request.error)
  })
}

export default getAllDocument
