import './App.css';
import { Button } from './components/Buttons';
import OTPLogin from './components/Otp';

function App(){
  return(
    <>
     <div className='h-screen bg-blue-800'>
      <OTPLogin/>
     </div>
    </>
  )
}

export default App;