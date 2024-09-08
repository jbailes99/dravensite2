import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import './App.css'
import Navbar from './components/navbar'
import { MatchDataProvider } from './components/MatchDataContext'

function App() {
  return (
    <MatchDataProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </MatchDataProvider>
  )
}

export default App
