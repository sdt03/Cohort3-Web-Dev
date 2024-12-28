import { useState, createContext, useContext } from 'react'
import './App.css'

const countContext = createContext();

function CountContextProvider({children}){
  const [count, setCount] = useState(0);

  return <countContext.Provider value={{count, setCount}}>
    {children}
  </countContext.Provider>
}

function Parent(){
  return (
    <CountContextProvider>
      <Increase />
      <Decrease />
      <CurrentCounter />
    </CountContextProvider>
  );
}

function Increase(){
  const {count, setCount} = useContext(countContext);

  return <button onClick={()=>setCount(count+1)}>Increase</button>
}

function Decrease(){
  const {count, setCount} = useContext(countContext);

  return <button onClick={()=>setCount(count-1)}>Decrease</button>
}

function CurrentCounter(){
  const {count} = useContext({countContext});

  return <p>Count : {count}</p>
}

const App = () => {
  return <div>
    <Parent />
  </div>
}


export default App
