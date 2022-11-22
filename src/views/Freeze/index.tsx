import React from 'react'
import { Tabs } from 'antd'

import Account from './Freeze'
import Config from './Permission'
import Approval from './Approval'

const APP: React.FC = () => {
  const items = [
    { label: 'FREEZE CONFIG', key: '1', children: <Account /> },
    { label: 'PERMISSIONS CONFIG', key: '2', children: <Config /> },
    { label: 'APPROVAL CONFIG', key: '3', children: <Approval /> },
  ]
  return (
    <div className="limit-container">
      <Tabs
        style={{ background: '#f7f7f9' }}
        tabBarStyle={{ width: '200px' }}
        defaultActiveKey="item-1"
        tabPosition="left"
        items={items}
      />
    </div>
  )
}

export default APP
