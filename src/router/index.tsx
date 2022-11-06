import React from 'react'
import { useRoutes } from 'react-router-dom'

import Home from '@/views/Home'
import Config from '@/views/Config'
import Account from '@/views/Account'
import Free from '@/views/Free'
import Permission from '@/views/Permission'

import Trigger from '@/views/Trigger'
import Approvel from '@/views/Approvel'

import LayoutIndex from '@/layout/index'
import SideBar from '@/layout/SideBar'

export default function App() {
  return useRoutes([
    {
      path: '/',
      element: <LayoutIndex />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: '/Config',
      element: <LayoutIndex />,
      children: [
        {
          element: <SideBar />,
          children: [
            {
              index: true,
              element: <Config />,
            },
            {
              path: 'Limit',
              element: <Config />,
            },
            {
              path: 'Account',
              element: <Account />,
            },
            {
              path: 'Free',
              element: <Free />,
            },
            {
              path: 'Permission',
              element: <Permission />,
            },
            {
              path: 'Approvel',
              element: <Approvel />,
            },
          ],
        },
      ],
    }
  ])
}
