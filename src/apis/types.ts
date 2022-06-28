export type Project = {
  id: string
  nameEN: string
  nameRU: string
  mainImage: string
  links: {
    [key: string]: string
  }
  tags: string[]
  favoriteIndex: number
  updated?: Date
  created?: Date
  pushed?: Date
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
