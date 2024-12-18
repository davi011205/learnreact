import { useState } from 'react';
import { Link } from 'react-router-dom'

import '../SignIn/signin.css';
import logo from '../../assets/logo.png'


function SignUp() {
    const [fields, setFields] = useState({});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value} )
        
    }

    function loginUser(e) {
        e.preventDefault()
        console.log(fields)
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
                    <input type='text'
                        placeholder='******'
                        name='password'
                        value={fields.password || ''}
                        onChange={handleChange}
                    />
                    <button type='submit'>Acessar</button>
                </form>

                <Link to='/'>Já possui uma conta? <strong>Entrar</strong></Link>
            </div>
        </div>
    )
}

export default SignUp;