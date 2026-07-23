import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import './App.css'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import CheckStorage from './pages/CheckStorage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import Notes from './pages/Notes'

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={ <LandingPage/> } />
      <Route path="/login" element={ <LoginPage/> } />
      <Route path="/register" element={ <RegisterPage/> } />
      <Route path="/home" 
        element={ <ProtectedRoute> <Layout/> </ProtectedRoute>  } 
      />
      <Route path="/notes" 
        element={ <ProtectedRoute> <Notes/> </ProtectedRoute>  } 
      />
      {/* <Route path="/" element={ <Layout/> } /> */}
      <Route path="/storage" element={ <CheckStorage/> } />
    </Routes>
  )
}
