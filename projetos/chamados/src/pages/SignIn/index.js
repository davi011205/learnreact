import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../services/firebaseConfig';

import './signin.css';
import logo from '../../assets/logo.png'


function SignIn() {
    const [fields, setFields] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value} )
    }

    async function loginUser(e) {
        e.preventDefault()

        if(fields.email && fields.password) {
            await signInWithEmailAndPassword(auth, fields.email, fields.password)
            .then(() => {
                toast.success('Bem vindo ao sistema')
                navigate('/dashboard', {replace: true})
            })
            .catch((error) => {
                console.log(error)
                switch (error.code) {
                    case 'auth/invalid-credential': 
                        setError('usuário ou senha incorretos')
                        break;
                 
                    default: console.log('houve um erro fora do escopo') ;
                }
                
            })
        } else {
            setError('preencha todos os campos')
        }
        
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt=''></img>
                </div>

                <form onSubmit={loginUser}>
                    <h1>Entrar</h1>

                    <input type='email'
                        placeholder='Email'
                        name='email'
                        value={fields.email || ''}
                        onChange={handleChange}
                    />
                    <input type='password'
                        placeholder='******'
                        name='password'
                        value={fields.password || ''}
                        onChange={handleChange}
                    />
                    <p className='error'>{error}</p>
                    <button type='submit'>Acessar</button>
                </form>
                <Link to='/register'>Não possui uma conta? <strong>Cadastre-se</strong></Link>
            </div>
        </div>
    )
}

export default SignIn;