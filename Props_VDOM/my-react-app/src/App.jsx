import { useState } from 'react'
import './App.css'
import ColorToggle from './components/ColorToggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ColorToggle/>
    </>
  )
}

export default App
