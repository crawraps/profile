import React from 'react'
import { AppDispatch, RootState } from '../store/index'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector, usePageInfo } from '../hooks'
import { Project as ProjectType } from '../apis/types'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { addDescription } from '../apis/database'
import Loader from '../components/Loader'
import { Col, Container, Row } from 'react-bootstrap'

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

  // Parse and add description to storage
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch((dispatch: AppDispatch, getState: () => RootState) => addDescription(dispatch, getState, project))
  }, [lang])

  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    let name = (lang === 'en' ? project?.nameEN : project?.nameRU) ?? 'Project'
    setPageInfo({ name: name.charAt(0).toUpperCase() + name.slice(1), page: 'project' })
  }, [project])

  // Set default content
  const [Content, setContent] = React.useState<JSX.Element>(<Loader style={{ marginTop: 200 }} dots={5} />)

  // Calculate content
  React.useEffect(() => {
    if (lang === 'en' && project?.descriptions.fullEng) {
      setContent(<Markdown>{project?.descriptions.fullEng ?? ''}</Markdown>)
    } else if (lang === 'ru' && project?.descriptions.fullRu) {
      setContent(<Markdown>{project?.descriptions.fullRu ?? ''}</Markdown>)
    } else {
      setContent(
        <LoaderContainer>
          <Loader style={{ marginTop: 200 }} dots={5} />
        </LoaderContainer>
      )
    }
  }, [lang, project?.descriptions.fullEng, project?.descriptions.fullRu])

  return Content
}
const StyledContainer = styled(Container)`
  background-color: transparent;
  min-height: 100vh;
  transition: background-color 0.2s ease-in;
`
const Markdown = styled(ReactMarkdown)`
  margin: 0 auto;
  width: 100%;
  color: ${props => props.theme.opacityText};
  line-height: 1.7em;
  letter-spacing: 0.2px;

  h1,
  h2,
  h3 {
    color: ${props => props.theme.text};
  }

  pre {
    margin: 1.25em 0;
    background-color: ${props => props.theme.opacityBackground};
    padding: 1em;
    border-radius: 6px;
  }

  blockquote {
    margin: 1.2em 0;
    padding: 0.4em;
    border-left: 2px solid ${props => props.theme.primary};

    p {
      margin: 0;
      margin-left: 0.25em;
    }
  }

  img {
    width: 100%;
    object-position: center center;
    object-fit: cover;
    margin: 0.5em 0;
  }
`
const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
