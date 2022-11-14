import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Avatar, Menu, message, Modal } from 'antd'
import type { RootState } from '@store/index'

import type { MenuProps } from 'antd'
import './NavBar.less'
import { MehOutlined, UserOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { setAccount } from '@store/account'
import { CheckCircleTwoTone } from '@ant-design/icons'
const items: MenuProps['items'] = [
  { label: 'TX LIMIT CONFIG', key: '/Limit' },
  { label: 'FREEZE CONFIG', key: '/Freeze' },
]
const accountList = [
  { value: 'Alice', color: '#52c41a', bg: 'fde3cf' },
  { value: 'Bob', color: '#52c41a', bg: 'fde3cf' },
  { value: 'Charlie', color: '#52c41a', bg: 'fde3cf' },
  { value: 'Dave', color: '#52c41a', bg: 'fde3cf' },
  { value: 'Eve', color: '#52c41a', bg: 'fde3cf' },
]
const NavBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const storeAccount = useAppSelector((state: RootState) => state.account.value)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // 设置account
  useEffect(() => {
    const accountInfoInSession = sessionStorage.getItem('accountInfo')
    if (accountInfoInSession && accountList.map((item) => item.value).includes(accountInfoInSession)) {
      dispatch(setAccount(accountInfoInSession))
    } else {
      setIsModalOpen(true)
    }
  }, [])
  // 改变account
  const changeAccount = function (account: string) {
    if (storeAccount !== account) {
      dispatch(setAccount(account))
      sessionStorage.setItem('accountInfo', account)
    }
    setIsModalOpen(false)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const onCancel = () => {
    if (storeAccount) {
      setIsModalOpen(false)
    } else {
      message.info('place change an account')
    }
  }

  const [current, setCurrent] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    setCurrent(pathname)
  }, [])

  const itemHandler: MenuProps['onClick'] = ({ key }) => {
    setCurrent(key)
    navigate(key)
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
          <span style={{ cursor: 'pointer' }} onClick={showModal}>
            {storeAccount.toUpperCase()}
          </span>
        </div>
      </div>
      <Modal title="change account" footer={null} centered onCancel={onCancel} open={isModalOpen}>
        {accountList.map((item) => {
          return (
            <p
              onClick={() => changeAccount(item.value)}
              className={`accountItem ${storeAccount === item.value ? 'active' : ''}`}
              key={item.value}
            >
              {storeAccount === item.value ? (
                <CheckCircleTwoTone className="itemIcon" twoToneColor="#52c41a" />
              ) : (
                <MehOutlined className="itemIcon" />
              )}
              {item.value.toUpperCase()}
            </p>
          )
        })}
      </Modal>
    </>
  )
}
export default NavBar
