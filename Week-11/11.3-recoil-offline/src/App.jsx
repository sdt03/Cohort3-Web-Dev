import './App.css'
import { useRecoilValue, useRecoilState, RecoilRoot } from 'recoil'
import { messageAtom, notificationCountAtom, jobsAtom, networkAtom, notificationCountSelector } from './store/atoms/topbar' 

function App() {
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

function MainApp(){
  const networkAtomCount = useRecoilValue(networkAtom);
  const notificationAtomCount = useRecoilValue(notificationCountAtom);
  const jobsAtomCount = useRecoilValue(jobsAtom);
  const messageAtomCount = useRecoilValue(messageAtom);

  return <>
    <button>Home</button>

    <button>My Network ({networkAtomCount >= 100 ? "99+" : networkAtomCount})</button>
    <button>Notifications {notificationAtomCount}</button>
    <button>Jobs {jobsAtomCount}</button>
    <button>Message {messageAtomCount}</button>

    <button>Me</button>
  </>
}

export default App
