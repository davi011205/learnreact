import { use, useState } from 'react';
import { db, auth } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { Link, useNavigate } from 'react-router-dom';

import {toast} from 'react-toastify'

import './cadastro.css';

function Cadastro() {
    const [fields, setFields] = useState({});
    const navigate = useNavigate();

    const handleChange =(e) => {
        setFields({...fields, [e.target.name]: e.target.value})
    }

    async function createUser() {
        await createUserWithEmailAndPassword(auth, fields.email, fields.password)
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
        <div className='container-cadastro'>
            <header>
                <h1>Lista de Tarefas</h1>
                <h2>Gerencia sua agenda de forma facil</h2>
                <h4>Vamos criar sua conta</h4>
            </header>

            <form onSubmit={createUser}>
                <input type='email' 
                    name='email' 
                    value={fields.email} 
                    onChange={handleChange}
                    placeholder='digite seu email'
                />
                <input type='password' 
                    name='password' 
                    value={fields.password} 
                    onChange={handleChange}
                    placeholder='digite sua senha'
                />
                <button type='submit'>Criar conta</button>
            </form>
            <Link to='/'>Já possui uma conta? <strong>Entrar</strong></Link>
        </div>
    )
}

export default Cadastro;