import { AppDispatch, RootState } from '../store/index'
import { getFirestore, getDocs, collection, doc, getDoc } from 'firebase/firestore'
import app from '.'
import { Project, ProjectDescriptions, Tag } from './types'
import { getGitFetchingFunctions } from './git'
import _ from 'lodash'

const db = getFirestore(app)
let fetchRepo: (gitUrl: string) => Promise<void | { created: Date; updated: Date; pushed: Date; contents: any }>
let fetchDescription: (gitUrl: string, name: keyof ProjectDescriptions) => Promise<string | void>
getGitFetchingFunctions().then(res => {
  fetchRepo = res.fetchRepo
  fetchDescription = res.fetchDescription
})

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
          ...project.descriptions,
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

export async function addDescription(dispatch: AppDispatch, getState: () => RootState, project: Project | null) {
  const projects: Project[] = _.cloneDeep(getState().data.projects)
  const lang = getState().settings.lang

  const newProjects = await Promise.all(
    projects.map(async pr => {
      if (project?.id === pr.id) {
        if (lang === 'en' && !pr.descriptions.fullEng) {
          const description = await fetchDescription(pr.links.git, 'fullEng')
          pr.descriptions.fullEng = description ?? 'Error while getting description'
        } else if (lang === 'ru' && !pr.descriptions.fullRu) {
          const description = await fetchDescription(pr.links.git, 'fullRu')
          pr.descriptions.fullRu = description ?? 'Ошибка при чтении описания'
        }
      }

      return pr
    })
  )

  dispatch({ type: 'addProjects', value: newProjects })
}

export async function addDescriptions(dispatch: AppDispatch, getState: () => RootState) {
  const projects: Project[] = _.cloneDeep(getState().data.projects)

  const newProjects = await Promise.all(
    projects.map(async pr => {
      const descriptionEn = (await fetchDescription(pr.links.git, 'fullEng')) ?? ''
      const descriptionRu = (await fetchDescription(pr.links.git, 'fullRu')) ?? ''

      return { ...pr, descriptions: { ...pr.descriptions, fullEng: descriptionEn, fullRu: descriptionRu } }
    })
  )

  dispatch({ type: 'addProjects', value: newProjects })
}

export async function fetchTags(dispatch: AppDispatch, getState: () => RootState) {
  const tags: Tag[] = []
  await getDocs(collection(db, 'tags'))
    .then(res =>
      res.forEach(doc => {
        const tag = { ...doc.data(), id: doc.id } as Tag
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

export async function fetchGitToken() {
  const docRef = doc(db, 'internal-data', 'github-access-token')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data().token as string
  } else {
    return 'Error while fetching token'
  }
}
