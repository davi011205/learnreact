import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { useState } from 'react'

import './home.css'



function Home() {
    const [tarefa, setTarefa] = useState('');

    function cadastrarTarefa(e) {
        e.preventDefault()
    }

    async function logout() {
        await signOut(auth)
    }

    return  (
        <div className="container-home">
             <button onClick={logout} className='btn-logout'>Sair</button>
            <h1>Minhas Tarefas</h1>
            <form className='form-tarefas' onSubmit={cadastrarTarefa}>
                <textarea 
                    placeholder='Digite sua tarefa...'
                    value={tarefa}
                    onChange={ (e) => setTarefa(e.target.value) }
                />
                <button type='submit'>Registrar Tarefa</button>
            </form>

            <article className='list'>
                <p>estudar js e ty hj a noite</p>
                <div>
                    <button>editar</button>
                    <button className='conclui'>concluir</button>
                </div>
            </article>
        </div>
    )
}

export default Home;