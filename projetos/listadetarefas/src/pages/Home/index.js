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
    getDoc
 } from 'firebase/firestore'

import './home.css'
import { toast } from 'react-toastify';



function Home() {
    const [user, setUser] = useState({});
    const [tarefa, setTarefa] = useState('');
    const [tarefas, setTarefas] = useState([]);
    const [editTarefa, setEditTarefa] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [willRemoved, setWillRemoved] = useState('');

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

        if(editTarefa?.id) {
            updateTarefa();
            return;
        }

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

    async function editarTarefa(item) {
        setTarefa(item.tarefa)  
        setEditTarefa(item)
    }

    async function updateTarefa() {
        await updateDoc(doc(db, 'tarefas', editTarefa?.id), {
            tarefa: tarefa,
            dataTarefa: new Date()
        })
        .then(() => {
            toast.success('tarefa atualizda')
            setTarefa('')
            setEditTarefa('')
        })
    }
    
    async function deleteTarefa(id) {
        await deleteDoc(doc(db, 'tarefas', id))
        .then(() => {
            setConfirmDelete(false)
            toast.success('tarefa deletada com sucesso')
        })
        .catch(() => {
            toast.error('nao foi possivel deletar a tarefa')
        })
    }

    async function logout() {
        await signOut(auth)
    }

    function tratarExclusao(id) {
        setConfirmDelete(true)
        setWillRemoved(id)
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
                {Object.keys(editTarefa).length > 0 ? (
                    <button type='submit'>Atualizar Tarefa</button>
                ) : (
                    <button type='submit'>Registrar Tarefa</button>
                )}
            </form>

                {tarefas.map((tarefa) => {
                    return(
                        <article className='list' key={tarefa.id}>
                            <p>{tarefa.tarefa}</p>
                            <div>
                                <button onClick={() => editarTarefa(tarefa)}>editar</button>
                                <button className='conclui' onClick={ () => tratarExclusao(tarefa.id) }>concluir</button>
                            </div>
                        </article>
                    )
                })}
                {confirmDelete && (
                    <div className='exclusao'>
                        <div className='exclusao-conteudo'>
                            <h1>Você tem certeza?</h1>
                            <div>
                                <button onClick={() => deleteTarefa(willRemoved)}>sim</button>
                                <button onClick={() => setConfirmDelete(false)}>nao</button>
                            </div>
                        </div>
                    </div>
                )}
            
        </div>
    )
}

export default Home;