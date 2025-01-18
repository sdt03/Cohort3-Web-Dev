import './App.css';
import { Button } from './components/Buttons';
import { Otp } from './components/Otp';

function App(){
  return(
    <>
     <div className='h-screen bg-blue-800'>
      <Otp number={6}/>
     </div>
    </>
  )
}

export default App;