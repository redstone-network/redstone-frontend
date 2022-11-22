import React from 'react'

import Mail from './components/Mail'
import Slack from './components/Slack'
import Discord from './components/Discord'

const Config: React.FC = () => {
  return (
    <div>
      <Mail />
      <Slack />
      <Discord />
    </div>
  )
}

export default Config
