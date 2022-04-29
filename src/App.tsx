import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from './components/layouts/Layout'
import About from './pages/About'
import Home from './pages/Home'
import Project from './pages/Project'

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='project/:id' element={<Project />} />
      </Route>
    </Routes>
  )
}

export default App
