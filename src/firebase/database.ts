import { getFirestore, getDocs, collection } from 'firebase/firestore'
import app from '.'

const db = getFirestore(app)
export type Project = {
  id: string
  nameEN: string
  nameRU: string
  descriptionEN: string
  descriptionRU: string
  shortDescriptionEN: string
  shortDescriptionRU: string
  mainImage: string
  images: string[]
  links: string[]
  tags: string[]
  favoriteIndex: number
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

export async function getProjects(): Promise<Project[]> {
  const projects: Project[] = []
  await getDocs(collection(db, 'projects'))
    .then(res => {
      res.forEach(doc => {
        const pr = { ...doc.data() } as Project
        pr.id = doc.id
        projects.push(pr)
      })
    })
    .catch(err => console.log(`An error occurred while getting projects. ${err}`))

  return projects
}

export async function getTags(): Promise<Tag[]> {
  const tags: Tag[] = []
  await getDocs(collection(db, 'tags'))
    .then(res =>
      res.forEach(doc => {
        const tag = { ...doc.data() } as Tag
        tags.push(tag)
      })
    )
    .catch(err => console.log(`An error occurred while getting tags. ${err}`))

  return tags
}

export async function getAboutText(): Promise<AboutText> {
  let text: AboutText = { textEN: '', textRU: '' }
  await getDocs(collection(db, 'about'))
    .then(res => res.forEach(doc => (text = doc.data() as AboutText)))
    .catch(err => console.log(`An error occurred while getting about text. ${err}`))

  return text
}
