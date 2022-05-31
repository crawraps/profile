import { AppDispatch, RootState } from './../store/index'
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

export async function fetchProjects(dispatch: AppDispatch, getState: () => RootState) {
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

  dispatch({ type: 'addProjects', value: projects })
  if (getState().data.tags.length !== 0) {
    dispatch({ type: 'setLoaded', value: true })
  }
}

export async function fetchTags(dispatch: AppDispatch, getState: () => RootState) {
  const tags: Tag[] = []
  await getDocs(collection(db, 'tags'))
    .then(res =>
      res.forEach(doc => {
        const tag = { ...doc.data() } as Tag
        tags.push(tag)
      })
    )
    .catch(err => console.log(`An error occurred while getting tags. ${err}`))

  dispatch({ type: 'addTags', value: tags })
  if (getState().data.projects.length !== 0) {
    dispatch({ type: 'setLoaded', value: true })
  }
}

export async function fetchAboutText(dispatch: AppDispatch, getState: () => RootState) {
  let text: AboutText = { textEN: '', textRU: '' }
  await getDocs(collection(db, 'about'))
    .then(res => res.forEach(doc => (text = doc.data() as AboutText)))
    .catch(err => console.log(`An error occurred while getting about text. ${err}`))

  dispatch({ type: 'addAboutText', value: text })
}
