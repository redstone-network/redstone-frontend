import React from 'react'
import MyRoutes from '@/router'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

import './App.css'

const { Header, Content } = Layout

const App: React.FC = () => {
  const navigate = useNavigate()
  const goHomePage = () => {
    navigate('/')
  }
  const goTriggerPage = () => {
    navigate('/trigger')
  }
  const goAboutPage = () => {
    navigate('/about')
  }
  return (
    <Layout className="layout">
      <Header className="layout-header">
        <div className="logo" />
        <Menu
          style={{ backgroundColor: 'transparent', borderBottom: '1px solid transparent', color: '#fff' }}
          mode="horizontal"
        >
          <Menu.Item onClick={goHomePage}>Home</Menu.Item>
          <Menu.Item onClick={goTriggerPage}>Trigger</Menu.Item>
          <Menu.Item onClick={goAboutPage}>About</Menu.Item>

        </Menu>
      </Header>
      <Content>
        <div className="site-layout-content">
          <MyRoutes />
        </div>
      </Content>
    </Layout>
  )
}

export default App
