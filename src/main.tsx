import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './store'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '@/assets/fonts/font.less'
import '@styles/reset.less'
import '@styles/common.less'
import '@styles/theme/theme-default.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.VITE_PUBLIC_PATH as string}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
