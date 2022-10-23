import React from 'react'
import './index.less'
import { Card } from 'antd'

import Mail from './components/Mail'
import Slack from './components/Slack'
import Discord from './components/Discord'

const Config: React.FC = () => {
  return (
    <>
      <Card>
        <Mail />
      </Card>
      <Card>
        <Slack />
      </Card>
      <Card>
        <Discord />
      </Card>
    </>
  )
}

export default Config
