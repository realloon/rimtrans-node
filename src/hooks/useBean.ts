import type { About, Def, Cover } from '@/types'
import { createBean } from '@/modules/bean'
import { DATABASE_NAME } from '@/constants'

export default async () => {
  const db = await createBean(DATABASE_NAME)

  const storeDefs = await db.createStore<Def>('defs', 'id', [
    { index: 'project', unique: false },
  ])

  const storeAbout = await db.createStore<About>('about', 'project')

  const storeCover = await db.createStore<Cover>('cover', 'project')

  return {
    storeDefs,
    storeAbout,
    storeCover,
  }
}
