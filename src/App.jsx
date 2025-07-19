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
import Chat from './components/Chat'
import Verify from './pages/Verify'
import NewPassword from './pages/NewPassword'
import { HomePage } from './pages/HomePage'
import {ThemeProvider} from './contexts/ThemeContext'




function App() {

  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/newpass" element={<NewPassword />} />
          

        {/* Protected Routes */}
          <Route path="/chat" element={
            <ProtectedRoute>
              <ChatLayout/>
            </ProtectedRoute>
          }>
            <Route index element={<Welcome />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            
            
          </Route>

          <Route path="*" element={<h1 className="text-white text-center text-2xl mt-10">404 - Page Not Found</h1>} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App
