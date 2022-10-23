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
        <Account />
      </Card>
      <Card>
        <CancelAccount />
      </Card>
      <Card>
        <MemberList />
      </Card>
    </>
  )
}

export default Config
