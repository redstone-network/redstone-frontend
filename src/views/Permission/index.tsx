import React from 'react'
import './index.less'
import { Card } from 'antd'

import Account from './components/Account'
import CancelAccount from './components/CancelAccount'
import MemberList from './components/MemberList'

const Config: React.FC = () => {
  return (
    <>
      <Card>
        <MemberList />
      </Card>
      <Card>
        <Account />
      </Card>
      <Card>
        <CancelAccount />
      </Card>
    </>
  )
}

export default Config
