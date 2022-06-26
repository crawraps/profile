import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Loader from '../components/Loader'
import TagElement from '../components/Tag'
import { Tag } from '../apis/types'
import { useAppDispatch, useAppSelector, usePageInfo } from '../hooks'
import { fetchAboutText } from '../apis/database'

export default function About(): JSX.Element {
  const [plainText, setPlainText] = React.useState<string | null>(null)
  const [tagNames, setTagNames] = React.useState<string[]>([])
  const state = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    setPageInfo({ name: state.settings.lang === 'en' ? 'About' : 'Обо мне', page: 'about' })
  }, [state.settings.lang])

  // Translate static text
  const { t } = useTranslation()

  // Fetch about text on first visit
  React.useEffect(() => {
    // Check if about text doesn't exist in the store
    if (!state.data.aboutText['text' + state.settings.lang.toUpperCase()]) {
      dispatch(fetchAboutText)
    }
  })

  // Get current text by language
  React.useEffect(() => {
    setPlainText(state.settings.lang === 'en' ? state.data.aboutText.textEN : state.data.aboutText.textRU)
  }, [state.settings.lang, state.data.aboutText])

  // Get tags
  React.useEffect(() => {
    setTagNames(state.data.tags.map((tag: Tag) => tag.name))
  }, [state.data.tags])

  // Parse plain text
  const [resultText, setResultText] = React.useState<JSX.Element[] | JSX.Element>(
    <Loader dots={5} style={{ margin: '300px auto' }} />
  )
  React.useEffect(() => {
    if (plainText) setResultText(parseText(plainText, tagNames))
  }, [tagNames, plainText])

  return (
    <>
      <Title>{plainText ? t('about-title') : null}</Title>
      {resultText}
    </>
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
  line-height: 1.7em;
  letter-spacing: 0.2px;
`
