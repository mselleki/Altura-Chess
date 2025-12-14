import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AppFormal from './AppFormal.tsx'
import './index.css'

// Détecter si on est sur la version formelle
const isFormal = window.location.pathname === '/formal'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isFormal ? <AppFormal /> : <App />}
  </React.StrictMode>,
)

