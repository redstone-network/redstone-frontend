import React from 'react'
import { useRoutes } from 'react-router-dom'

import Limit from '@/views/Limit'

import LayoutIndex from '@/layout/index'

export default function App() {
  return useRoutes([
    {
      path: '/Limit',
      element: <LayoutIndex />,
      children: [
        {
          index: true,
          element: <Limit />,
        },
      ],
    },
  ])
}
