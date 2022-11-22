import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Avatar, Menu } from 'antd'
import type { MenuProps } from 'antd'
import './NavBar.less'
import { UserOutlined } from '@ant-design/icons'
import type { RootState } from '@store/index'
import { useAppSelector } from '@store/hooks'
import Login from '@/components/AccountModel'

const items: MenuProps['items'] = [
  { label: 'TX LIMIT CONFIG', key: '/Limit' },
  { label: 'FREEZE CONFIG', key: '/Freeze' },
]

const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const storeAccount = useAppSelector((state: RootState) => state.account.value)
  const [current, setCurrent] = useState('')
  const [accountModel, setAccountModel] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setCurrent(pathname)
  }, [])

  const itemHandler: MenuProps['onClick'] = ({ key }) => {
    setCurrent(key)
    navigate(key)
  }
  const nameClick = () => {
    setAccountModel(true)
  }
  const changeModal = (open: boolean) => {
    setAccountModel(open)
  }

  return (
    <>
      <div className="nav-bar">
        <Menu
          items={items}
          selectedKeys={[current]}
          onClick={itemHandler}
          className="nav-menu"
          mode="horizontal"
        ></Menu>
        <div className="avatar">
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginRight: '6px' }}>
            <UserOutlined />
          </Avatar>
          <span onClick={nameClick} style={{ cursor: 'pointer' }}>
            {storeAccount.toUpperCase()}
          </span>
        </div>
      </div>
      <Login open={accountModel} changeModal={changeModal} />
    </>
  )
}
export default NavBar
