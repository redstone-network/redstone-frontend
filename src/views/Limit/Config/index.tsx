import React from 'react'
import './index.less'

import AmountLimit from './components/AmountLimit'
import FrequencyLimit from './components/FrequencyLimit'

const Config: React.FC = () => {
  return (
    <>
      <FrequencyLimit />
      <AmountLimit />
    </>
  )
}

export default Config
