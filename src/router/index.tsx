import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '@/views/Home'
import About from '@/views/About'
import Trigger from '@/views/Trigger'

export default function App() {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/Trigger',
      element: <Trigger />,
    },
  ])
}
