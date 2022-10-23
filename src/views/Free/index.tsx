import React from 'react'
import './index.less'
import { Card } from 'antd'

import Time from './components/Time'

const Config: React.FC = () => {
  return (
    <>
      <Card>
        <Time />
      </Card>
    </>
  )
}

export default Config
