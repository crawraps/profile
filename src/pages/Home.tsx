import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { usePageInfo, useQuery } from '../components/layouts/Layout'
import Loader from '../components/Loader'
import { List, Item } from '../components/ProjectsList'
import { Project, Tag } from '../firebase/database'
import { useAppSelector } from '../store'

export default function Home(): JSX.Element {
  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    setPageInfo({ name: 'Projects' })
  })

  // Get static text translation
  const { t } = useTranslation()

  // Get lang
  const lang: 'ru' | 'en' = useAppSelector(state => state.settingsReducer.lang)

  // Get query selector
  const query = useQuery()
  const [tags, setTags] = React.useState<string[]>([])
  const [sortType, setSortType] = React.useState<string>('favoriteFirst')
  React.useEffect(() => {
    const tagNames = query.get('tags')?.split(' ') ?? []
    setTags(tagNames)
    setSortType(query.get('sort') ?? 'favoriteFirst')
  }, [query])

  // Get projects by tags
  const projects = useAppSelector(state => state.projectsReducer.projects)
  const [items, setItems] = React.useState<JSX.Element[]>([<Loader style={{ marginTop: 200 }} dots={5} />])
  React.useEffect(() => {
    projects.then(res =>
      setItems(
        res
          .filter(project => tags.filter(tag => project.tags.includes(tag)).length === tags.length)
          .sort((a, b) => compare(a, b, sortType, lang))
          .map(project => <Item project={project} key={project.id} />)
      )
    )
  }, [projects, tags, sortType])

  return (
    <StyledContainer fluid>
      <Row>
        <Col sm={2} lg={3}></Col>
        <Col sm={8} lg={6}>
          <List title={t('list-title')}>{items}</List>
        </Col>
        <Col sm={2} lg={3}></Col>
      </Row>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  background-color: transparent;
  min-height: 100vh;
  transition: background-color 0.2s ease-in;
`

// Compare function to sort projects
function compare(a: Project, b: Project, sortType: string, lang: 'ru' | 'en') {
  switch (sortType) {
    case 'favoriteFirst':
      return a.favoriteIndex - b.favoriteIndex
    case 'favoriteLast':
      return b.favoriteIndex - a.favoriteIndex
    case 'nameFirst':
      if (lang === 'en') {
        return a.nameEN < b.nameEN ? -1 : 1
      } else {
        return a.nameRU < b.nameRU ? -1 : 1
      }
    case 'nameLast':
      if (lang === 'en') {
        return a.nameEN < b.nameEN ? 1 : -1
      } else {
        return a.nameRU < b.nameRU ? 1 : -1
      }
    case 'updateFirst': //! Create update info
      return 0
    case 'updateLast':
      return 0
    default:
      return 0
  }
}
