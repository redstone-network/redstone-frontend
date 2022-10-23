import React from 'react'
import NavBar from '@/layout/NavBar'
import { Outlet } from 'react-router-dom'
import './index.less'
import { Layout } from 'antd'

const { Header, Content } = Layout

const LayoutIndex: React.FC = () => {
  return (
    <Layout className="layout">
      <Header className="layout-header">
        <NavBar />
      </Header>
      <Content className="layout-con">
        <Outlet />
      </Content>
    </Layout>
  )
}

export default LayoutIndex
