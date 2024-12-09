import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

import './home.css'



function Home() {

    function cadastrarTarefa() {
        alert('teste')
    }

    async function logout() {
        await signOut(auth)
    }

    return  (
        <div className="container-home">
            <h1>Minhas Tarefas</h1>
            <button onClick={logout}>Sair</button>
            <form className='form-tarefas' onSubmit={cadastrarTarefa}>
                <textarea placeholder='Digite sua tarefa...'></textarea>
                <button type='submit'>Registrar Tarefa</button>
            </form>
        </div>
    )
}

export default Home;