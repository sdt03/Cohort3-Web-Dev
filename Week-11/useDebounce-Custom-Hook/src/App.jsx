import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useDebounce from './hooks/useDebounce';
import { useEffect } from 'react';

function App() {
  const [inputValue, setInputValue] = useState("");

  const useDebouncedValue = useDebounce(inputValue, 200)
  function change(e){
    setInputValue(e.target.value);
  }

  useEffect(()=>{
    console.log("Expensive Operation");
  }, [useDebouncedValue]);

  return (
    <div>
      <input type="text" onChange={change} />
    </div>
  )
}

export default App
