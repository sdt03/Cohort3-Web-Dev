import { useEffect, useState } from 'react'
import './App.css'
import MainContent from './components/maincontent'
import SideToggle from './components/SideToggle'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listner = () => setMatches(media.matches)
    media.addListener(listner)
    return () => media.removeListener(listner)
  }, [matches, query])

  return matches
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width:786px)")

  console.error(isDesktop)

  useEffect(()=> {
    if(isDesktop==false){
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true);
    }
  }, [isDesktop])

  return (
    <div className='flex'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainContent sidebarOpen={sidebarOpen} />
    </div>
  )
}

function Sidebar({sidebarOpen, setSidebarOpen}){
  if(!sidebarOpen){
    return <div className='fixed top-0 left-0'>
      <div className='cursor-pointer hover:bg-slate-200' onClick={()=>{
        setSidebarOpen(!sidebarOpen)
      }}>
        <SideToggle />
      </div>
    </div>
  }
  return <div className='w-96 h-screen bg-red-100 fixed top-0 left-0 md:relative'>
    <div>
      <div className='cursor-pointer hover:bg-slate-200' onClick={()=>{
        setSidebarOpen(!sidebarOpen)
      }}>
        <SideToggle />
      </div>
    </div>
  </div>
}

export default App
