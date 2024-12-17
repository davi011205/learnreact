import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Private from './Private';
 
function RoutesApp(){
  return(
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <SignIn/> } />
          <Route path='/register' element={ <SignUp/> } />
        </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;