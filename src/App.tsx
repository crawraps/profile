import React from 'react'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { store, useAppSelector } from './store'
import { ThemeProvider } from 'styled-components'
import { theme } from './colorscheme'

import Layout from './components/layouts/Layout'
import About from './pages/About'
import Home from './pages/Home'
import Project from './pages/Project'

function App(): JSX.Element {
  const themeName = useAppSelector(state => state.theme)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme[themeName]}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='project/:id' element={<Project />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Provider>
  )
}

export default App
