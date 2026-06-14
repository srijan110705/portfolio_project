import React from 'react'
import { Route, Routes, Outlet, BrowserRouter } from 'react-router-dom'

import Navbar from './components/Navbar'
import AdminLayout from './components/AdminLayout' // <-- Import your new layout
import ProtectedRoute from './components/ProtectedRoute' // <-- Import your new layout

import About from './pages/About'
import Achievements from './pages/Achievements'
import Education from './pages/Education'
import Position from './pages/Position'
import Projects from './pages/Projects'
import Skills from './pages/Skills'

import AdminLogin from './pages/pages.admin/AdminLogin'
import AdminHome from './pages/pages.admin/AdminHome'
import EditAbout from './pages/pages.admin/EditAbout'
import EditAchievements from './pages/pages.admin/EditAchievements'
import EditEducation from './pages/pages.admin/EditEducation'
import EditPosition from './pages/pages.admin/EditPosition'
import EditProjects from './pages/pages.admin/EditProjects'
import EditSkills from './pages/pages.admin/EditSkills'



const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      {/* PUBLIC ROUTES: These get the standard Navbar */}
        <Route path='/' element={<About />}/>
        <Route path='/achievements' element={<Achievements />}/>
        <Route path='/education' element={<Education />}/>
        <Route path='/position' element={<Position />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route path='/skills' element={<Skills />}/>
        <Route path='/adminLogin' element={<AdminLogin />}/>

      {/* ADMIN ROUTES: These get the Admin Navbar via AdminLayout */}
      <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route path='/adminHome' element={<AdminHome />}/>
        <Route path='/edit_about' element={<EditAbout />}/>
        <Route path='/edit_achievements' element={<EditAchievements />}/>
        <Route path='/edit_education' element={<EditEducation />}/>
        <Route path='/edit_position' element={<EditPosition />}/>
        <Route path='/edit_projects' element={<EditProjects />}/>
        <Route path='/edit_skills' element={<EditSkills />}/>
      </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App