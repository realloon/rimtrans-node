import type { Indexes } from './type'
import { createDatabase, createObjectStore } from './create'
import {
  addDocument,
  addManyDocuments,
  deleteDocument,
  putDocument,
  putManyDocuments,
  getDocument,
  getAllDocument,
} from './CRUD'

async function useBean(name: string = 'bean-db') {
  let db = await createDatabase(name)

  return {
    createStore: async <T>(
      name: string,
      keyPath: string | false = false,
      indexes?: Indexes
    ) => {
      try {
        db = await createObjectStore(db, name, keyPath, indexes)
      } catch (error) {
        throw error
      }

      return {
        add: (value: T, key?: IDBValidKey) => {
          return addDocument<T>(db, name, value, key)
        },
        addMany: (value: T[]) => {
          return addManyDocuments<T>(db, name, value)
        },
        delete: (key: IDBValidKey) => {
          return deleteDocument(db, name, key)
        },
        put: (value: T, key?: IDBValidKey) => {
          return putDocument<T>(db, name, value, key)
        },
        putMany: (value: T[]) => {
          return putManyDocuments<T>(db, name, value)
        },
        get: (key: IDBValidKey) => {
          return getDocument<T>(db, name, key)
        },
        getAll: (index?: string) => {
          return getAllDocument<T>(db, name, index)
        },
      }
    },
  }
}

export { useBean }
