export type Def = {
  folder: string
  tagName: string
  content: string
  translated: string
  completed: boolean
}

export type About = {
  name: string
  author: string
  description: string
  packageId: string
  supportedVersions: Array<string>
  loadAfter: Array<string>
}

export type Project = {
  defs: Array<Def>
  about: About
}
