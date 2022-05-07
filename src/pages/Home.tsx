import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { usePageInfo } from '../components/layouts/Layout'
import { List, Item } from '../components/ProjectsList'
import { useAppSelector } from '../store'

export default function Home(): JSX.Element {
  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    setPageInfo({ name: 'Projects' })
  })

  // Get static text
  const { t } = useTranslation()

  const projects = useAppSelector(state => state.projectsReducer.projects)
  const [items, setItems] = React.useState<JSX.Element[]>([<div key='loader'>Loading...</div>])
  React.useEffect(() => {
    projects.then(res => setItems(res.map(project => <Item project={project} key={project.id} />)))
  }, [projects])

  return (
    <StyledContainer fluid>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <List title={t('list-title')}>{items}</List>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  background-color: ${props => props.theme.background};
  min-height: 100vh;
  transition: background-color 0.2s ease-in;
`
