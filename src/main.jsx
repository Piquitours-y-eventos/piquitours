import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Importar y configurar AOS
import 'aos/dist/aos.css'
import AOS from 'aos'
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
