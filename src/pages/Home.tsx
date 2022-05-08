import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { usePageInfo, useQuery } from '../components/layouts/Layout'
import { List, Item } from '../components/ProjectsList'
import { Tag } from '../firebase/database'
import { useAppSelector } from '../store'

export default function Home(): JSX.Element {
  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    setPageInfo({ name: 'Projects' })
  })

  // Get static text
  const { t } = useTranslation()

  // Get query selector
  const query = useQuery()
  const [tags, setTags] = React.useState<string[]>([])
  React.useEffect(() => {
    const tagNames = query.get('tags')?.split(' ') ?? []
    setTags(tagNames)
  }, [query])

  // Get projects by tags
  const projects = useAppSelector(state => state.projectsReducer.projects)
  const [items, setItems] = React.useState<JSX.Element[]>([<div key='loader'>Loading...</div>])
  React.useEffect(() => {
    projects.then(res =>
      setItems(
        res
          .filter(project => tags.filter(tag => project.tags.includes(tag)).length === tags.length)
          .map(project => <Item project={project} key={project.id} />)
      )
    )
  }, [projects, tags])

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
  background-color: ${props => props.theme.background};
  min-height: 100vh;
  transition: background-color 0.2s ease-in;
`
