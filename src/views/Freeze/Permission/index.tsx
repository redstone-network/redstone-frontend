import React from 'react'
import './index.less'

import Account from './components/Account'
import CancelAccount from './components/CancelAccount'
import MemberList from './components/MemberList'

const Config: React.FC = () => {
  return (
    <>
      <MemberList />
      <Account />
      <CancelAccount />
    </>
  )
}

export default Config
