import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector, usePageInfo } from '../hooks'
import { Project as ProjectType } from '../apis/types'

export default function Project(): JSX.Element {
  // Get all projects
  const projects: ProjectType[] = useAppSelector(state => state.data.projects)

  // Get current lang
  const lang = useAppSelector(state => state.settings.lang)

  // Get current project by id
  const location = useLocation()
  const project = React.useMemo(() => {
    let id: any = location.pathname.split('/')
    id = id[id.length - 1] as string
    return projects.find(pr => pr.id === id) ?? null
  }, [location, projects])

  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    let name = (lang === 'en' ? project?.nameEN : project?.nameRU) ?? 'Project'
    setPageInfo({ name: name.charAt(0).toUpperCase() + name.slice(1) })
  }, [project])

  return <></>
}
