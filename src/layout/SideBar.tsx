import React, { useState } from 'react'
import './index.less'
import { Layout, Menu } from 'antd'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'

const { Content, Sider } = Layout

const SideBar: React.FC = () => {
  const items: MenuProps['items'] = [
    { label: 'ACCOUNT CONFIG', key: '/Config/Account' },
    { label: 'LIMIT CONFIG', key: '/Config/Limit' },
    { label: 'FREE CONFIG', key: '/Config/Free' },
    { label: 'PERMISSION CONFIG', key: '/Config/Permission' },
    { label: 'APPROVEL', key: '/Config/Approvel' },
  ]
  const navigate = useNavigate()
  const itemHandler: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <Layout className="content">
      <Sider>
        <Menu onClick={itemHandler} items={items} className="content"></Menu>
      </Sider>
      <Content className="content-body">
        <Outlet />
      </Content>
    </Layout>
  )
}

export default SideBar
