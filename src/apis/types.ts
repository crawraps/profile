export type Project = {
  id: string
  nameEN: string
  nameRU: string
  mainImage: ProjectImage
  links: {
    [key: string]: string
  }
  tags: string[]
  favoriteIndex: number
  updated?: Date
  created?: Date
  pushed?: Date
  descriptions: ProjectDescriptions
  technologies: string[]
}

export type ProjectDescriptions = {
  fullEng?: string
  fullRu?: string
  shortEng?: string
  shortRu?: string
}

export type ProjectImage =
  | {
      light: string
      dark: string
    }
  | string

export type Tag = {
  id: string
  name: string
  link: string
  color: string
}
