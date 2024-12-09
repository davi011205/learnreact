import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Home from '../pages/Home'

import Private from './Private'
 
function RoutesApp(){
  return(
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login/> } />
          <Route path='/cadastro' element={ <Cadastro/> } />

          <Route path='/home' element={ <Private> <Home/> </Private> } />
        </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;