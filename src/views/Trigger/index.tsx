import './index.css'
import { useState } from 'react'
import React from 'react'
import TriggerList from '@/views/Trigger/components/TriggerList'
import ActionList from '@/views/Trigger/components/ActionList'
import RecipeList from '@/views/Trigger/components/RecipeList'

function App() {
  const [triggers, setTriggers] = useState([])

  const [actions, setActions] = useState([])

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: 'white' }}>GET ONCHAIN MESSAGES AND MANAGE YOUR PLANS</h1>

      <TriggerList triggers={triggers} setTriggers={setTriggers} />

      <ActionList actions={actions} setActions={setActions} />

      <RecipeList triggers={triggers} actions={actions} />
    </div>
  )
}

export default App
