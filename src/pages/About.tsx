import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Loader from '../components/Loader'
import TagElement from '../components/Tag'
import { useAppSelector } from '../store'

export default function About(): JSX.Element {
  const [plainText, setPlainText] = React.useState<string | null>(null)
  const [tagNames, setTagNames] = React.useState<string[]>([])
  const lang = useAppSelector(state => state.settingsReducer.lang)
  const text = useAppSelector(state => state.aboutReducer.text)
  const tags = useAppSelector(state => state.projectsReducer.tags)
  React.useEffect(() => {
    text.then(text => setPlainText(lang === 'en' ? text.textEN : text.textRU))
  }, [lang])

  React.useEffect(() => {
    tags.then(tags => setTagNames(tags.map(tag => tag.name)))
  }, [tags])

  // Parse plain text
  const [resultText, setResultText] = React.useState<Array<JSX.Element>>([
    <Loader dots={5} style={{ margin: '300px auto' }} />,
  ])
  React.useEffect(() => {
    if (plainText) setResultText(parseText(plainText, tagNames))
  }, [tagNames, plainText])

  // Translate static text
  const { t } = useTranslation()

  return (
    <StyledContainer fluid>
      <Row>
        <Col sm={2} lg={3}></Col>
        <Col sm={8} lg={6}>
          <Title>{plainText ? t('about-title') : null}</Title>
          {resultText}
        </Col>
        <Col sm={2} lg={3}></Col>
      </Row>
    </StyledContainer>
  )
}

function parseText(text: string, tags: string[]): JSX.Element[] {
  return text.split('/n/').map((part, index) => {
    if (part[0] === '#') {
      return <Subtitle key={`title-${part.split('#')}`}>{part.split('#')}</Subtitle>
    } else {
      return (
        <Paragraph key={`paragraph-${index}`}>
          {part.split('/').map((piece, i) => {
            if (tags.includes(piece)) {
              return <TagElement type='link' tagName={piece} key={`tag-${piece}-${index}-${i}`} />
            }
            return piece
          })}
        </Paragraph>
      )
    }
  })
}

const StyledContainer = styled(Container)`
  min-height: 100vh;
  transition: background-color 0.2s ease-in;
`
const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.text};
  font-family: Montserrat;
  margin-bottom: 20px;
`
const Subtitle = styled.h2`
  font-size: 32px;
  color: ${props => props.theme.text};
`
const Paragraph = styled.p`
  color: ${props => props.theme.opacityText};
  font-size: 16px;
  line-height: 1.5em;
  letter-spacing: 0.2px;
`
