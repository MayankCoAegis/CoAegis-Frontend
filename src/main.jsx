import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoaderProvider } from './contexts/LoaderContext.jsx'
import { AlertProvider } from './contexts/AlertContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderProvider>
    <AlertProvider>
    <App />
    </AlertProvider>
    </LoaderProvider>
  </StrictMode>,
)
