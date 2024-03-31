function createDatabase(name: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name)

    request.onsuccess = () => resolve(request.result)

    request.onerror = () => reject(request.error)
  })
}

export default createDatabase
