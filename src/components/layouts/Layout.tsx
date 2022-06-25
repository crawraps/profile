import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'
import React from 'react'
import { Image } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { Tag } from '../../apis/types'
import { PageInfo, useAppDispatch, useAppSelector } from '../../hooks'
import { setLang, setNavbar, setTheme } from '../../store/settingsReducer'
import MenuButton from '../MenuButton'
import Navbar from '../Navbar'
import NavbarBlock from '../NavbarBlock'
import PatternBackground from '../PatternBackround'
import TagElement from '../Tag'
import TagsContainer from '../TagsContainer'

export default function Layout(): JSX.Element {
  const dispatch = useAppDispatch()
  const [pageInfo, setPageInfo] = React.useState<PageInfo | null>(null)
  const { t } = useTranslation()
  const state = useAppSelector(state => state)
  const theme = useTheme()

  // Functions to toggle language, theme and navbar state
  const toggleLang = () => {
    dispatch(setLang(state.settings.lang === 'en' ? 'ru' : 'en'))
  }
  const toggleTheme = () => {
    dispatch(setTheme(state.settings.theme === 'dark' ? 'light' : 'dark'))
  }
  const toggleNavbar = () => {
    dispatch(setNavbar(state.settings.navbar === 'visible' ? 'hidden' : 'visible'))
  }

  // Close navbar function
  const listItemClickHandler = () => {
    if (window.innerWidth <= 1400) {
      dispatch(setNavbar('hidden'))
    }
  }

  return (
    <Container>
      <Helmet>
        <title>{`${pageInfo?.name} | Crawraps`}</title>
      </Helmet>

      <StylizedHeader
        page={pageInfo?.page ?? 'home'}
        firstColor={theme.background}
        secondColor={theme.primary}
        src='https://images.unsplash.com/photo-1644676748681-7e1d7ab29d1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
        alt='alt'
      />

      <MenuButton
        onClick={toggleNavbar}
        isOpen={state.settings.navbar === 'visible'}
        lineProps={{ strokeWidth: 2 }}
        initial='opened'
      />

      <Navbar isOpen={state.settings.navbar === 'visible'}>
        <NavbarBlock title={t('nav-title-navigation')} as='links'>
          <Link to='/' onClick={listItemClickHandler}>
            {t('home-link')}
          </Link>
          <Link to='about' onClick={listItemClickHandler}>
            {t('about-link')}
          </Link>
        </NavbarBlock>
        <NavbarBlock title={t('nav-title-settings')} as='toggles'>
          <button
            onClick={() => {
              toggleTheme()
              listItemClickHandler()
            }}
            name={state.settings.theme === 'dark' ? 'enable' : 'disable'}
          >
            {t('theme-button')}
          </button>
          <button
            onClick={() => {
              toggleLang()
              listItemClickHandler()
            }}
            name={state.settings.lang === 'ru' ? 'enable' : 'disable'}
          >
            {t('lang-button')}
          </button>
        </NavbarBlock>
      </Navbar>

      <TagsContainer isOpen={state.settings.navbar === 'visible' && pageInfo?.page === 'home'}>
        {state.data.tags.map((tag: Tag) => (
          <TagElement type='tag' tagName={tag.name} key={'container-' + tag.name} />
        )) || null}
      </TagsContainer>

      <Content page={pageInfo?.page ?? 'home'}>
        <Outlet context={setPageInfo} />
      </Content>
    </Container>
  )
}

interface HeaderProps {
  page: 'project' | 'home' | 'about'
  firstColor: string
  secondColor: string
  src: string
  alt: string
  [key: string]: string
}

const Header = React.memo(function Header({
  page,
  firstColor,
  secondColor,
  src,
  alt,
  ...props
}: HeaderProps): JSX.Element {
  page === 'project' ? (
    <img src={src} alt={alt} {...props} />
  ) : (
    <PatternBackground firstColor={firstColor} secondColor={secondColor} {...props} />
  )

  const variants: Variants = {
    hidden: {
      opacity: 0,
      top: '-100%',
    },
    visible: {
      opacity: 1,
      top: '0%',
      transition: { delay: 0.2, ease: 'linear', duration: 0.2 },
    },
  }

  const transition: Transition = {
    ease: 'linear',
    duration: 0.2,
  }

  return (
    <AnimatePresence>
      {page === 'project' ? (
        <motion.img
          src={src}
          alt={alt}
          animate='visible'
          exit='hidden'
          initial='hidden'
          variants={variants}
          transition={transition}
          key={page}
          {...props}
        />
      ) : (
        <PatternBackground
          firstColor={firstColor}
          secondColor={secondColor}
          animate='visible'
          exit='hidden'
          initial='hidden'
          variants={variants}
          transition={transition}
          {...props}
        />
      )}
    </AnimatePresence>
  )
})

const Container = styled.div`
  background-color: ${props => props.theme.background};
  overflow: hidden;
  min-height: 101vh;
  min-width: 100%;
`
const StylizedHeader = styled(Header)<HeaderProps>`
  max-height: ${props => (props.page === 'project' ? 400 : 200)}px;
  position: fixed;
  width: 100%;
  object-fit: cover;
  object-position: center center;
  transition: max-height 0.2s ease-in;

  @media screen and (max-width: 767px) {
    height: 0px;
  }
`
const Content = styled.div<ContentProps>`
  margin-top: ${props => (props.page === 'project' ? 400 : 200)}px;
  width: 100%;
  position: relative;
  z-index: 1;
  background-color: ${props => props.theme.background};
  padding-top: 60px;
  transition: 0.2s ease-in;
  min-height: 400px;

  @media screen and (max-width: 767px) {
    margin-top: 0px;
  }
`

interface ContentProps {
  page: 'project' | 'home' | 'about'
}
