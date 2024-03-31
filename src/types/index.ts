export type Def = {
  project: string
  id: string
  folder: string
  tagName: string
  content: string
  translated: string
  completed: boolean
}

export type About = {
  project: string
  name: string
  author: string
  description: string
  packageId: string
  supportedVersions: Array<string>
  loadAfter: Array<string>
}

export type Cover = {
  project: string
  image: Blob
}

export type Project = {
  defs: Def[]
  about: About
  cover: Cover
}
