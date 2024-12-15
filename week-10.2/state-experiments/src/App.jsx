import { useState } from 'react'
import './App.css'

function App() {
  return <div>
    <LightBulb />
  </div>
}

function LightBulb(){
  const [bulbOn, setBulbOn] = useState(true);
  return <div>
    <BulbState bulbOn={bulbOn}/>
    <ToggleBulbState bulbOn={bulbOn} setBulbOn={setBulbOn}/>
  </div>
}

function BulbState({bulbOn}){
  return <div>
    {bulbOn ? "Bulb on":"Bulb off"}
  </div>
} 

function ToggleBulbState({bulbOn, setBulbOn}){
  function toggle(){
    setBulbOn(currentState => !currentState)
  }
  
  return <div>
    <button onClick={toggle}>Toggle Button</button>
  </div>
}
export default App
