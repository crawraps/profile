export type Project = {
  id: string
  nameEN: string
  nameRU: string
  mainImage: string
  images: string[]
  links: {
    [key: string]: string
  }
  tags: string[]
  favoriteIndex: number
  updated: string
  created: string
  pushed: string
  descriptions: ProjectDescriptions
}

export type ProjectDescriptions = {
  fullEng?: string
  fullRu?: string
  shortEng?: string
  shortRu?: string
}

export type Tag = {
  name: string
  link: string
  color: string
}

export interface AboutText {
  textRU: string
  textEN: string
}
