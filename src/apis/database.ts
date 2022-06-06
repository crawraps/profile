import { AppDispatch, RootState } from '../store/index'
import { getFirestore, getDocs, collection, getDoc, doc } from 'firebase/firestore'
import app from '.'
import { AboutText, Project, Tag } from './types'
import { fetchDescription, fetchRepo } from './git'

const db = getFirestore(app)

export async function fetchProjects(dispatch: AppDispatch, getState: () => RootState) {
  let projects: Project[] = []
  await getDocs(collection(db, 'projects'))
    .then(res => {
      res.forEach(doc => {
        let pr = { ...doc.data() } as Project
        pr.id = doc.id
        projects.push(pr)
      })
    })
    .catch(err => console.log(`An error occurred while getting projects. ${err}`))

  // Get markdown descriptions
  projects = await Promise.all(
    projects.map(async project => {
      const repo = await fetchRepo(project.links.git)
      return {
        ...project,
        created: repo?.created,
        updated: repo?.updated,
        pushed: repo?.pushed,
        descriptions: {
          shortEng:
            (await fetchDescription(project.links.git, 'shortEng')) ?? 'Error occurred while getting description',
          shortRu: (await fetchDescription(project.links.git, 'shortRu')) ?? 'Возникла ошибка при чтении описания',
        },
      }
    })
  )

  dispatch({ type: 'addProjects', value: projects })

  // Set data loaded if projects and tags are loaded
  if (getState().data.tags.length !== 0) {
    dispatch({ type: 'setLoaded', value: true })
  }
}

export async function addDescription(
  dispatch: AppDispatch,
  getState: () => RootState,
  lang: 'en' | 'ru',
  project: Project
) {
  const projects: Project[] = getState().data.projects

  const newProjects = await Promise.all(
    projects.map(async pr => {
      if (project.id === pr.id) {
        if (lang === 'en') {
          const description = await fetchDescription(pr.links.git, 'fullEng')
          pr.descriptions.fullEng = description ?? 'Error while getting description'
        } else {
          const description = await fetchDescription(pr.links.git, 'fullRu')
          pr.descriptions.fullRu = description ?? 'Ошибка при чтении описания'
        }
      }

      return pr
    })
  )

  dispatch({ type: 'addProjects', value: newProjects })
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

  // Set data loaded if projects and tags are loaded
  if (getState().data.projects.length !== 0) {
    dispatch({ type: 'setLoaded', value: true })
  }
}

// Fetch about text
export async function fetchAboutText(dispatch: AppDispatch, getState: () => RootState) {
  const aboutText: AboutText = Object.assign({}, getState().data.aboutText)
  const lang = getState().settings.lang
  const text = await getDoc(doc(db, 'about', lang === 'en' ? 'textEN' : 'textRU'))
    .then(res => res.data()?.text as string)
    .catch(err => console.log(`An error occurred while fetching aboutTextRu ${err}`))

  if (lang === 'en') {
    aboutText.textEN = text ?? 'Apparently I have not added about me text'
  } else {
    aboutText.textRU = text ?? 'Похоже, что я не добавил текст о себе'
  }

  dispatch({ type: 'addAboutText', value: aboutText })
}
