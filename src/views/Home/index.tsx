import React, { useState } from 'react'
import HomeStyle from './index.module.scss'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const goAboutPage = () => {
    navigate('/about')
  }

  return (
    <div className={HomeStyle.home}>
      <h1>redstone</h1>
      <div className={HomeStyle.card}>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <p className="read-the-docs">Click about page</p>
      <button onClick={goAboutPage}>go about</button>
    </div>
  )
}

export default Home
