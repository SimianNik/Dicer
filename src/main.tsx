import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import App_bkp from './App_bkp'
import './style.css'

const rootElement = document.getElementById('app')

if (!rootElement) {
  throw new Error('Root element "#app" not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
    <hr/>
    <App_bkp/>
  </React.StrictMode>,
)
