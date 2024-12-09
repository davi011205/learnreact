import { use, useState } from 'react';
import { db, auth } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Link, replace, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

import './login.css'

function Login() {
    const [fields, setFields] = useState({});
    const navigate = useNavigate();

    const handleChange =(e) => {
        setFields({...fields, [e.target.name]: e.target.value})
    }

    async function userLogin() {
        await signInWithEmailAndPassword(auth, fields.email, fields.password)
        .then(() => {
            toast.success('Bem vindo ao sistema')
            navigate('/home', {replace: true})
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/weak-password': 
                    toast.error('a senha deve ter no minimo 6 digitos')
                    break;
             
                default: console.log('houve um erro fora do escopo') ;
            }
            
        })
    }

    return  (
        <div className='container-login'>
            <header>
                <h1>Lista de Tarefas</h1>
                <h2>Gerencia sua agenda de forma facil</h2>
            </header>

            <form onSubmit={userLogin}>
                <input type='email' 
                    name='email' 
                    value={fields.email} 
                    onChange={handleChange}
                    placeholder='email'
                />
                <input type='password' 
                    name='password' 
                    value={fields.password} 
                    onChange={handleChange}
                    placeholder='senha'
                />
                <button type='submit'>Acessar</button>
            </form>
            <Link to='/cadastro'>Não possui uma conta? <strong>Cadastre-se</strong></Link>
            
        </div>
    )
}

export default Login;