import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import './NavBar.less'

const NavBar: React.FC = () => {
  const items: MenuProps['items'] = [
    { label: 'TX LIMIT CONFIG', key: '/Limit' },
    { label: 'FREEZE CONFIG', key: '/Freeze' },
  ]
  const [current, setCurrent] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    setCurrent(pathname)
  }, [])

  const navigate = useNavigate()
  const itemHandler: MenuProps['onClick'] = ({ key }) => {
    setCurrent(key)
    navigate(key)
  }

  return (
    <Menu items={items} selectedKeys={[current]} onClick={itemHandler} className="nav-menu" mode="horizontal"></Menu>
  )
}
export default NavBar
