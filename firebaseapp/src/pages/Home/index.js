import { useState, useEffect } from 'react';
import { db } from "../../firebaseConfig";
import { 
    doc, 
    setDoc, 
    collection, 
    addDoc, 
    getDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    onSnapshot
} from 'firebase/firestore';

import { toast } from "react-toastify";

import './home.css'

function Home() {
    const [fields, setFields] = useState({});
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
       async function loadUsers() { //um snapshot que verifica em tempo real a coleção de users
        const realTime = onSnapshot(collection(db, 'users'), (snapshot) => {
            let listaUsers = [];

                snapshot.forEach((doc) => {
                    listaUsers.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        idade: doc.data().idade
                    })
                })
                setUsers(listaUsers)
        })
       }
       loadUsers()
    }, [])

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value});
        console.log(setFields);
    }
    
    async function handleAdd(e) {
        e.preventDefault();
        
        try {
            // id especifico
            // await setDoc(doc(db, 'users', '1234'), {
            //     nome: fields.nome,
            //     idade: fields.idade,
            // })

            //gera id automaticamente
            await addDoc(collection(db, 'users'), {
                nome: fields.nome,
                idade: fields.idade,
            })
            toast.success('usuario cadastrado com sucesso');
            setFields({nome: '', idade: ''});
            setShowForm(false)
        }

        catch(error) {
            toast.error('nao foi possivel cadastrar')
        }
    }

    // async function  buscarUsuarios() {
    //     //pegar todos
    //     const usersRef = collection(db, 'users');
    //         await getDocs(usersRef)
    //         .then((snapshot) => {
    //             let lista = [];

    //             snapshot.forEach((doc) => {
    //                 lista.push({
    //                     id: doc.id,
    //                     nome: doc.data().nome,
    //                     idade: doc.data().idade
    //                 })
    //             })
    //             setUsers(lista)
                
    //         })
    //     .catch(() => {
    //         toast.error('nao foi possivel carregar os usuários')
    //     })
    // }

    async function  buscarUsuario() {
        //pegar especifico
        const userRef = doc(db, 'users', fields.idUser)
        
        await getDoc(userRef)
        .then((snapshot) => {
            setFields({nome: snapshot.data().nome, idade: snapshot.data().idade})
        })
        .catch(() => {
            toast.error('usuario nao encontrado')
        })
    }


    async function selectedUser(id) {
        const docRef = doc(db, 'users', id)
        
        await getDoc(docRef)
        .then((snapshot) => {
            setFields({nome: snapshot.data().nome, idade: snapshot.data().idade, idUser: id})
            setShowEditForm(true)
        })
        .catch(() => {
            toast.error('nao foi possivel pasar os dados')
        })
    }

    async function editarUsuario(e) {
        e.preventDefault()
        const docRef = doc(db, 'users', fields.idUser)
        
        await updateDoc(docRef, {
            idade: fields.idade,
            nome: fields.nome
        })
        .then(() => {
            toast.success('usuario atualizado com sucesso')
            setFields({nome: '', idade: '', idUser: ''})
            setShowEditForm(false)
        })
        .catch(() => {
            toast.error('nao foi possivel atualizar')
        })

    }

    async function excluirUsuario(id) {
        await deleteDoc(doc(db, 'users', id))
        .then(() => {
            toast.success('usuario excluido com sucesso')
        })
        .catch(() => {
            toast.error('nao foi possível excluir o usuario')
        })

    }

    return(
        <div className='home-container'>
            <header>
                <h1>Usuarios</h1>    
                <div>
                    <button onClick={() => setShowForm(true)}>Cadastrar Usuario</button>
                    <button>Buscar Usuario</button>
                </div>
            </header>
{/*      
                Id do Usuario
                <select name="idUser" value={fields.idUser} onChange={handleChange}>
                    <option>selecione um usuario</option>
                    {users.map((user) => {
                        return(
                            <option key={user.id}>{user.id}</option>
                        )
                    })}
                </select> */}
                
                {showForm && (

                    <div className='form-container'>
                        <form onSubmit={handleAdd} className='form'>
                            <p onClick={() => setShowForm(false)}>x</p>
                            
                            Nome 
                            <input type='text' name="nome" value={fields.nome} onChange={handleChange}></input>
                            Idade
                            <input type='number' name="idade" value={fields.idade} onChange={handleChange}></input>
                            <button type='submit'>Cadastrar </button>
                        </form>
                    </div>
                )
                
                }
                {showEditForm && (

                    <div className='form-container'>
                        <form onSubmit={editarUsuario} className='form'>
                            <p onClick={() => setShowEditForm(false)}>x</p>
                            
                            Nome 
                            <input type='text' name="nome" value={fields.nome} onChange={handleChange}></input>
                            Idade
                            <input type='number' name="idade" value={fields.idade} onChange={handleChange}></input>
                            <button type='submit'>Editar </button>
                        </form>
                    </div>
                )
                
                }
                
            <div className='container-tabela'>
                <h1>Lista dos Usuarios</h1>
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>Nome</td>
                            <td>idade</td>
                            <td>acao</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return(
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.idade}</td>
                                    <td colSpan={2}>
                                        <button onClick={ () => excluirUsuario(user.id) }>Excluir</button>
                                        <button onClick={() => selectedUser(user.id)}>Editar usuario</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Home;