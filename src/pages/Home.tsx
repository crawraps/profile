import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAppSelector, usePageInfo, useQuery } from '../hooks'
import Loader from '../components/Loader'
import { List, Item } from '../components/ProjectsList'
import { Project } from '../apis/types'

export default function Home(): JSX.Element {
  // Get static text translation
  const { t } = useTranslation()

  // Get lang and data loading state
  const lang: 'ru' | 'en' = useAppSelector(state => state.settings.lang)
  const isReady: boolean = useAppSelector(state => state.data.loaded)

  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    setPageInfo({ name: lang === 'en' ? 'Projects' : 'Проекты', page: 'home' })
  }, [lang])

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
  const projects: Project[] = useAppSelector(state => state.data.projects)
  const [items, setItems] = React.useState<JSX.Element[] | null>(null)
  React.useEffect(() => {
    setItems(
      projects
        .filter(project => tags.filter(tag => project.tags.includes(tag)).length === tags.length)
        .sort((a, b) => compare(a, b, sortType, lang))
        .map(project => <Item project={project} key={project.id} />)
    )
  }, [projects, tags, sortType, lang])

  // Get filler placeholder component
  const [placeholder, setPlaceholder] = React.useState<JSX.Element>(<Loader style={{ marginTop: 200 }} dots={5} />)
  React.useEffect(() => {
    setPlaceholder(isReady ? <Nothing>{t('nothing-text')}</Nothing> : <Loader style={{ marginTop: 200 }} dots={5} />)
  }, [isReady, lang])

  return <List title={t('list-title')}>{items?.length ? items : placeholder}</List>
}

const Nothing = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin: 100px 0;
  color: ${props => props.theme.opacityText};
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
    case 'updateFirst':
      console.log(a.created?.getTime(), b.created?.getTime())
      return (a.created?.getTime() ?? 0) - (b.created?.getTime() ?? 0)
    case 'updateLast':
      return -((a.created?.getTime() ?? 0) - (b.created?.getTime() ?? 0))
    default:
      return 0
  }
}
