import React from 'react'
import './index.less'
import { Tabs } from 'antd'

import Account from './Account'
import Config from './Config'

const Limit: React.FC = () => {
  const items = [
    { label: 'Notification Method Config', key: '1', children: <Account /> },
    { label: 'Transfer Limit Config', key: '2', children: <Config /> },
  ]
  return (
    <div className="limit-container">
      <Tabs tabBarStyle={{ width: '200px' }} defaultActiveKey="item-1" tabPosition="left" items={items} />
    </div>
  )
}

export default Limit
