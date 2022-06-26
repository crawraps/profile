import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { Tag } from '../../apis/types'
import { PageInfo, useAppDispatch, useAppSelector } from '../../hooks'
import { setLang, setNavbar, setTheme } from '../../store/settingsReducer'
import Header, { HeaderProps } from '../Header'
import MenuButton from '../MenuButton'
import Navbar from '../Navbar'
import NavbarBlock from '../NavbarBlock'
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
    <MainContainer>
      <Helmet>
        <title>{`${pageInfo?.name} | Crawraps`}</title>
      </Helmet>

      <StylizedHeader
        page={pageInfo?.page ?? 'home'}
        firstColor={theme.background}
        secondColor={theme.primary}
        src={pageInfo?.project?.mainImage ?? ''}
        alt='Project image'
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
        <StyledContainer fluid>
          <Row>
            <Col sm={1} md={2} xl={3}></Col>
            <Col sm={10} md={8} xl={6}>
              <Outlet context={setPageInfo} />
            </Col>
            <Col sm={1} md={2} xl={3}></Col>
          </Row>
        </StyledContainer>
      </Content>
    </MainContainer>
  )
}

const StyledContainer = styled(Container)`
  background-color: transparent;
  min-height: 100vh;
  transition: background-color 0.2s ease-in;
`
const MainContainer = styled.div`
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
    max-height: ${props => (props.page === 'project' ? '200px' : '0px')};
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
