import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Spin } from 'antd'

const Home: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/Limit')
  }, [])
  return <Spin style={{ width: '100%', paddingTop: '50vh', height: '100vh' }} />
}
export default Home
