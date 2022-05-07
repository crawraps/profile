import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useOutletContext } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import MenuButton from '../MenuButton'
import Navbar from '../Navbar'
import NavbarBlock from '../NavbarBlock'

export default function Layout(): JSX.Element {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state)
  const { i18n, t } = useTranslation()
  const [pageInfo, setPageInfo] = React.useState<PageInfo | null>(null)
  const [isNavOpen, setIsNavOpen] = React.useState<boolean>(true)
  const toggleNavOpen = () => setIsNavOpen(!isNavOpen)

  const toggleLang = () => {
    const newLang = state.settingsReducer.lang === 'ru' ? 'en' : 'ru'
    dispatch({ type: 'lang', value: newLang })
    i18n.changeLanguage(newLang)
  }
  const toggleTheme = () =>
    dispatch({ type: 'theme', value: state.settingsReducer.theme === 'dark' ? 'light' : 'dark' })

  return (
    <>
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

      <Outlet context={setPageInfo} />
    </>
  )
}

// Create custom hook to access page information

type PageInfo = {
  name: string
}

export function usePageInfo() {
  return useOutletContext<React.Dispatch<React.SetStateAction<PageInfo | null>>>()
}
