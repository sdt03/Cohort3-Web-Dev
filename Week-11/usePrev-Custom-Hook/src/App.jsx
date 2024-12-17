import { useState } from 'react'
import  usePrev from "./Hooks/usePrev"
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const prev = usePrev(count);

  return (
    <div>
      <p>{count}</p>
      <button onClick={()=>setCount(count+1)}>Increase counter</button>
      <p>Previous value: {prev}</p>
    </div>
  )
}

export default App
