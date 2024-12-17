import { useRef, useState } from 'react'
import './App.css'

function App() {
  return (
    <div>
      <FocusPoint />
      <hr />

      <StopWatch />
    </div>
  )
}

function FocusPoint(){
  const inputRef = useRef(null);

  function focusOnPoint(){
    inputRef.current.focus();
  }

  return (
    <div>
      <h2>Focus Input</h2>

      <input type="text" id="name" ref={inputRef}></input>
      <button onClick={focusOnPoint}>Submit</button>
    </div>
  );
}

function StopWatch(){
  const [currentCount, setCurrentCount] = useState(0);

  const timer = useRef(null);

  function startClock(){
    let value = setInterval(()=>{
      setCurrentCount((count)=>count+1);
    }, 1000);
    timer.current = value;
  }

  function stopClock(){
    console.log(timer);

    clearInterval(timer.current);
  }

  return (
    <div>
      <h1>StopWatch</h1>

      {currentCount} <br />

      <button onClick={startClock}>Start</button>
      <button onClick={stopClock}>Stop</button>
    </div>
  )
}

export default App
