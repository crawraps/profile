import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import TagElement from '../components/Tag'
import { useAppSelector, usePageInfo } from '../hooks'
import ReactMarkdown from 'react-markdown'

export default function About(): JSX.Element {
  // Get lang
  const lang = useAppSelector(state => state.settings.lang)

  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    setPageInfo({ name: lang === 'en' ? 'About' : 'Обо мне', page: 'about' })
  }, [lang])

  // Translate static text
  const { t } = useTranslation()

  // Get markdown text
  const [mdText, setMdText] = React.useState<string>('')
  React.useMemo(() => {
    let promise = new Promise(() => {})
    if (lang === 'ru') {
      promise = fetch(require('../assets/aboutRu.md'))
    } else {
      promise = fetch(require('../assets/aboutEn.md'))
    }
    promise.then((res: any) => res.text()).then(res => setMdText(res))
  }, [lang])

  return (
    <>
      <Title>{t('about-title')}</Title>
      <Markdown components={{ a: ({ children }) => <TagElement tagId={children[0] as string} type='link' /> }}>
        {mdText}
      </Markdown>
    </>
  )
}

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.text};
  font-family: Montserrat;
  margin-bottom: 20px;
`
const Markdown = styled(ReactMarkdown)`
  color: ${props => props.theme.opacityText};

  h1,
  h2,
  h3 {
    color: ${props => props.theme.text};
  }
`
