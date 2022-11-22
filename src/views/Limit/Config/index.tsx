import React from 'react'
import './index.less'

import AmountLimit from './components/AmountLimit'
import HundredLimit from './components/TimesLimit'

const Config: React.FC = () => {
  return (
    <>
      <HundredLimit />
      <AmountLimit />
    </>
  )
}

export default Config
