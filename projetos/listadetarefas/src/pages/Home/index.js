import { signOut } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import { useState, useEffect } from 'react'
import { 
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
 } from 'firebase/firestore'

import './home.css'
import { toast } from 'react-toastify';



function Home() {
    const [tarefa, setTarefa] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        async function loadUser() {
            const userDetail = localStorage.getItem('detailUser')
            setUser(JSON.parse(userDetail))

            if(userDetail) {
                const data = JSON.parse(userDetail)
                const q = query(collection(db, 'tarefas'), orderBy('dataTarefa', 'desc'), where('userUid', '==', data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    let listaTarefas = [];

                    snapshot.forEach((doc) => {
                        listaTarefas.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    }) 
                    console.log(listaTarefas)
                    setTarefas(listaTarefas)
                })
            }
        
        }
        loadUser()
    }, [])


    async function createTarefa(e) {
        e.preventDefault()

        await addDoc(collection(db, 'tarefas'), {
            tarefa: tarefa,
            dataTarefa: new Date(),
            userUid: user?.uid
        })
        .then(() => {
            toast.success('tarefa cadastrada com sucesso')
            setTarefa('')
        })
        .catch(() => {
            toast.error('nao foi possivel cadastrar a tarefa')
        })

    }
    
    async function deleteTarefa(id) {
        await deleteDoc(doc(db, 'tarefas', id))
    }

    async function logout() {
        await signOut(auth)
    }

    return  (
        <div className="container-home">
             <button onClick={logout} className='btn-logout'>Sair</button>
            <h1>Minhas Tarefas</h1>
            <form className='form-tarefas' onSubmit={createTarefa}>
                <textarea 
                    placeholder='Digite sua tarefa...'
                    value={tarefa}
                    onChange={ (e) => setTarefa(e.target.value) }
                />
                <button type='submit'>Registrar Tarefa</button>
            </form>

                {tarefas.map((tarefa) => {
                    return(
                        <article className='list' key={tarefa.id}>
                            <p>{tarefa.tarefa}</p>
                            <div>
                                <button>editar</button>
                                <button className='conclui' onClick={ () => deleteTarefa(tarefa.id) }>concluir</button>
                            </div>
                        </article>
                    )
                })}

        </div>
    )
}

export default Home;