import type { About, Def, Cover } from '@/types'
import { useBean } from '@/modules/bean'

const DATABASE_NAME = 'rimtrans-node'

const bean = await useBean(DATABASE_NAME)
const storeDefs = await bean.createStore<Def>('defs', 'id', [
  { index: 'project', unique: false },
])
const storeAbout = await bean.createStore<About>('about', 'project')
const storeCover = await bean.createStore<Cover>('cover', 'project')

export { storeDefs, storeAbout, storeCover }
