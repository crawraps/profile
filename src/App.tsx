import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from './store'
import { ThemeProvider } from 'styled-components'
import { theme } from './colorscheme'
import { HelmetProvider } from 'react-helmet-async'

import Layout from './components/layouts/Layout'
import About from './pages/About'
import Home from './pages/Home'
import Project from './pages/Project'

function App(): JSX.Element {
  const themeName = useAppSelector(state => state.theme)

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
