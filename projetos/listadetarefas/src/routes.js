import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Login/> }/>
                <Route path='/cadastro' element={ <Cadastro/> }/>
                <Route path='/home' element={ <Home/> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;