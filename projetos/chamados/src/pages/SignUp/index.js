import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import '../SignIn/signin.css';
import logo from '../../assets/logo.png'


function SignUp() {
    const [fields, setFields] = useState({});
    const { signUp, error, setError, loadingAuth } = useContext(AuthContext);

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value} )
    }

    async function handleSignUp(e) {
        e.preventDefault()

        if(fields.email && fields.password && fields.name) {
            await signUp(fields.email, fields.password, fields.name)
        }
        else {
            setError('preencha todos os campos')
        }
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt=''></img>
                </div>

                <form onSubmit={handleSignUp}>
                    <h1>Cadastrar nova conta</h1>

                    <input type='text'
                        placeholder='Nome'
                        name='name'
                        value={fields.name || ''}
                        onChange={handleChange}
                    />
                    <input type='email'
                        placeholder='Email'
                        name='email'
                        value={fields.email || ''}
                        onChange={handleChange}
                    />
                    <input type='password'
                        placeholder='Senha'
                        name='password'
                        value={fields.password || ''}
                        onChange={handleChange}
                    />
                    <p className='error'>{error}</p>
                    <button type='submit'>{loadingAuth ? 'criando...' : 'criar'}</button>
                </form>

                <Link to='/'>Já possui uma conta? <strong>Entrar</strong></Link>
            </div>
        </div>
    )
}

export default SignUp;