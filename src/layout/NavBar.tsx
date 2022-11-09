import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Avatar, Menu } from 'antd'
import type { MenuProps } from 'antd'
import './NavBar.less'
import { UserOutlined } from '@ant-design/icons'

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
    <div className="nav-bar">
      <Menu items={items} selectedKeys={[current]} onClick={itemHandler} className="nav-menu" mode="horizontal"></Menu>
      <div className="avatar">
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginRight: '6px' }}>
          <UserOutlined />
        </Avatar>
        Alice
      </div>
    </div>
  )
}
export default NavBar
