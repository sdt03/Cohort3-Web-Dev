import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import { networkAtom } from './atom'
import './App.css'

function App() {
  const [notifications, setNotifications] = useRecoilState(networkAtom);

  return (
    <>
      <button>Home</button>
      
      <button>My network ({networkCount.networks >= 100 ? "99+" : networkCount.networks})</button>
      <button>Jobs {networkCount.jobs}</button>
      <button>Messaging ({networkCount.messaging})</button>
      <button>Notifications ({networkCount.notifications})</button>

      <button>Me ({totalNotificationCount})</button>
    </>
  )
}

export default App
