import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoute from './routes/ProtectedRoute'
import ChatLayout from './pages/ChatLayout'
import Welcome from './components/Welcome'


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

        {/* Protected Routes */}
          <Route path="/chat" element={
            <ProtectedRoute>
              <ChatLayout/>
            </ProtectedRoute>
          }>
            <Route index element={<Welcome />} />
            <Route path="/chat" element={<Welcome />} />
          </Route>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
