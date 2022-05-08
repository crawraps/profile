import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store'
import MenuButton from '../MenuButton'
import Navbar from '../Navbar'
import NavbarBlock from '../NavbarBlock'
import TagElement from '../Tag'
import TagsContainer from '../TagsContainer'

export default function Layout(): JSX.Element {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state)
  const { i18n, t } = useTranslation()
  const [pageInfo, setPageInfo] = React.useState<PageInfo | null>(null)
  const [isNavOpen, setIsNavOpen] = React.useState<boolean>(false)
  console.log(window.innerWidth)
  const toggleNavOpen = () => setIsNavOpen(!isNavOpen)

  // Set body background
  const theme = useTheme()
  React.useState(() => {
    document.body.style.backgroundColor = theme.background
  })

  // Function to toggle language and theme
  const toggleLang = () => {
    const newLang = state.settingsReducer.lang === 'ru' ? 'en' : 'ru'
    dispatch({ type: 'lang', value: newLang })
    i18n.changeLanguage(newLang)
  }
  const toggleTheme = () =>
    dispatch({ type: 'theme', value: state.settingsReducer.theme === 'dark' ? 'light' : 'dark' })

  // Get tags
  const [tagItems, setTagItems] = React.useState<JSX.Element[] | null>(null)
  React.useEffect(() => {
    state.projectsReducer.tags
      .then(tags => setTagItems(tags.map(tag => <TagElement tagName={tag.name} key={tag.name} />)))
      .then(_ => setIsNavOpen(window.innerWidth > 1400)) // Show layout when tags loaded
  }, [state.projectsReducer.tags])

  return (
    <Container>
      <Helmet>
        <title>{`Crawraps | ${pageInfo?.name}`}</title>
      </Helmet>

      <MenuButton onClick={toggleNavOpen} isOpen={isNavOpen} lineProps={{ strokeWidth: 2 }} initial='opened' />
      <Navbar isOpen={isNavOpen}>
        <NavbarBlock title={t('nav-title-navigation')} as='links'>
          <Link to='/'>{t('home-link')}</Link>
          <Link to='about'>{t('about-link')}</Link>
        </NavbarBlock>
        <NavbarBlock title={t('nav-title-settings')} as='toggles'>
          <button onClick={toggleTheme} name={state.settingsReducer.theme === 'dark' ? 'enable' : 'disable'}>
            {t('theme-button')}
          </button>
          <button onClick={toggleLang} name={state.settingsReducer.lang === 'ru' ? 'enable' : 'disable'}>
            {t('lang-button')}
          </button>
        </NavbarBlock>
      </Navbar>

      <TagsContainer isOpen={isNavOpen}>{tagItems}</TagsContainer>

      <Outlet context={setPageInfo} />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.background};
  overflow: hidden;
  min-height: 101vh;
  min-width: 100%;
`

// Create custom hook to access page information

type PageInfo = {
  name: string
}

export function usePageInfo() {
  return useOutletContext<React.Dispatch<React.SetStateAction<PageInfo | null>>>()
}

// Custom hook to parse query string
export function useQuery(): URLSearchParams {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}
