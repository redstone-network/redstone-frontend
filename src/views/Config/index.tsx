import React from 'react'
import './index.less'
import { Card } from 'antd'

import AmountLimit from './components/AmountLimit'
import HundredLimit from './components/TimesLimit'

const Config: React.FC = () => {
  return (
    <>
      <Card>
        <AmountLimit />
      </Card>
      <Card>
        <HundredLimit />
      </Card>
    </>
  )
}

export default Config
