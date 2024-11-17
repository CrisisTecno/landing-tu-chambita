import { useState } from 'react'
import LandingPage from './pages/landing/main'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandingPage/>
    </>
  )
}

export default App
