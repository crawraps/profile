import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './colorscheme'
import { HelmetProvider } from 'react-helmet-async'
import { useAppDispatch, useAppSelector } from './hooks'

import Layout from './components/layouts/Layout'
import About from './pages/About'
import Home from './pages/Home'
import Project from './pages/Project'
import { setNavbar } from './store/settingsReducer'

function App(): JSX.Element {
  const themeName: 'light' | 'dark' = useAppSelector(state => state.settings.theme)
  const isDataLoaded = useAppSelector(state => state.data.loaded)
  const dispatch = useAppDispatch()

  // Set navbar visible on desktops
  React.useEffect(() => {
    if (isDataLoaded && window.innerWidth > 1400) {
      dispatch(setNavbar('visible'))
    }
  }, [isDataLoaded])

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme[themeName]}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='project/:id' element={<Project />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
