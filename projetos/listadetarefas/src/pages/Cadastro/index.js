import { useState } from 'react';
import { auth } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { Link, useNavigate } from 'react-router-dom';

import {toast} from 'react-toastify'


function Cadastro() {
    const [fields, setFields] = useState({});
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange =(e) => {
        setFields({...fields, [e.target.name]: e.target.value})
    }

    async function createUser(e) {
        e.preventDefault()

        if(fields.email && fields.password) {
            await createUserWithEmailAndPassword(auth, fields.email, fields.password)
            .then(() => {
                navigate('/home', {replace: true})
                toast.success('Bem vindo ao sistema')
            })
            .catch((error) => {
                console.log(error)
                switch (error.code) {
                    case 'auth/weak-password': 
                        setError('a senha deve ter no minimo 6 digitos')
                        break;
                    case 'auth/invalid-email': 
                        setError('insira um email válido')
                        break;
                 
                    default: console.log('houve um erro fora do escopo') ;
                }
                
            })
        }
        else {
            setError('preencha todos os campos')
        }
    }

    return  (
        <div className='container-cadastro container'>
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
            <p className='erro'>{error}</p>
            <Link to='/'>Já possui uma conta? <strong>Entrar</strong></Link>
        </div>
    )
}

export default Cadastro;