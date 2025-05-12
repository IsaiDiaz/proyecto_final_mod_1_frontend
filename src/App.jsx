import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/home'
import Login from './pages/Login/login'
import Register from './pages/Register/register'
import Tasks from './pages/Tasks/tasks'
import { getAccessToken } from './services/authService'

function AppRoutes() {
  const token = getAccessToken();
  return (
    <Routes>
      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={token ? <Tasks /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    </Routes>
  )
}


function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
