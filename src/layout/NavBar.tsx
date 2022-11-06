import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import './NavBar.less'

export default function NavBar() {
  const items: MenuProps['items'] = [
    { label: 'HOME', key: '/' },
    { label: 'CONFIG', key: '/Config' },
  ]
  const navigate = useNavigate()
  const itemHandler: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return <Menu items={items} onClick={itemHandler} className="nav-menu" mode="horizontal"></Menu>
}
