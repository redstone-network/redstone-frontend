import React, { useState } from 'react'
import Login from '@/components/AccountModel'

import { Spin } from 'antd'

const Home: React.FC = () => {
  const [accountModel, setAccountModel] = useState(false)
  const onChange = (value: boolean) => {
    setAccountModel(value)
  }
  return (
    <Spin style={{ width: '100%', paddingTop: '50vh', height: '100vh' }}>
      <Login open={accountModel} changeModal={onChange} />
    </Spin>
  )
}
export default Home
