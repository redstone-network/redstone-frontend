import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '@/assets/fonts/font.less'
import '@styles/reset.less'
import '@styles/common.less'
import '@styles/theme/theme-dark.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_PUBLIC_PATH as string}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
