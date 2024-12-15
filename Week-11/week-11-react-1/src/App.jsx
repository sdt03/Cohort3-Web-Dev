import { useState } from "react"
import "./App.css"

function useCounter(){
  const [count, setCount] = useState(0);

  function increaseCounter(){
    setCount(count + 1);
  }
  return {count, increaseCounter};
}

function App(){
  return(
    <div>
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}

function Counter(){
  const {count, increaseCounter} = useCounter();
  return(
    <div>
      <button onClick={increaseCounter}>Increase {count}</button>
    </div>
  );
}

export default App