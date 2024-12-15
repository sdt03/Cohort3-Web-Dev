import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './Components/navBar';
import Footer from './Components/Footer';
import Layout from './Components/Layout';
import Programs from './Components/Programs';

function App(){
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<Layout />} />
      {/* <Route path='/courses' element={<Courses />} /> */}
      <Route path='/programs' element={<Programs />} />
    </Routes>
    <Footer />

    </BrowserRouter>
  )
}

export default App
