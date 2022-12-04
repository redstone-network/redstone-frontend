import React from 'react'
import './index.less'

import Time from './components/Time'
import Account from './components/Account'
import AccountNow from './components/AccountNow'

const Config: React.FC = () => {
  return (
    <>
      <Time />
      <Account />
      <AccountNow />
    </>
  )
}

export default Config
