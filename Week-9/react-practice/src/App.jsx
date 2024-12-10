import { useState } from "react";

function App(){
  return <div>
    <Counter></Counter>
  </div>
}

function Counter(){
  const [count, setCount] = useState(0);

  function increaseCount(){
    setCount(count+1);
  }

  // setInterval(function(){
  //   setCount(count+1);
  // },2000)
  return <div>
    <h1 id="text">{count}</h1>
    <button onClick={increaseCount}>Increase Count</button>
  </div>
}

export default App