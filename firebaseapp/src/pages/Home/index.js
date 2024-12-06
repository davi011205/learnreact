import { useState, useEffect } from 'react';
import { auth, db } from "../../firebaseConfig";
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
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

import { toast } from "react-toastify";

import './home.css'

function Home() {
    const [cadastroFields, setCadastroFields] = useState({});
    const [editFields, setEditFields] = useState({});
    const [createUserFields, setCreateUserFields] = useState({});
    const [loginUserFields, setLoginUserFields] = useState({});
    const [users, setUsers] = useState([]);
    const [userSistema, setUserSistema] = useState(false)
    const [userSistemaDetails, setUserSistemaDetails] = useState({})
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

    const handleCadChange = (e) => {
        setCadastroFields({...cadastroFields, [e.target.name]: e.target.value});
    }
    const handleEditChange = (e) => {
        setEditFields({...editFields, [e.target.name]: e.target.value});
    }
    const handleCreateUserChange = (e) => {
        setCreateUserFields({...createUserFields, [e.target.name]: e.target.value});
    }
    const handleLoginUserChange = (e) => {
        setLoginUserFields({...loginUserFields, [e.target.name]: e.target.value});
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
                nome: cadastroFields.nome,
                idade: cadastroFields.idade,
            })
            toast.success('usuario cadastrado com sucesso');
            setCadastroFields({nome: '', idade: ''});
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

    // async function  buscarUsuario() {
    //     //pegar especifico
    //     const userRef = doc(db, 'users', fields.idUser)
        
    //     await getDoc(userRef)
    //     .then((snapshot) => {
    //         setFields({nome: snapshot.data().nome, idade: snapshot.data().idade})
    //     })
    //     .catch(() => {
    //         toast.error('usuario nao encontrado')
    //     })
    // }


    async function selectedUser(id) {
        const docRef = doc(db, 'users', id)
        
        await getDoc(docRef)
        .then((snapshot) => {
            setEditFields({nome: snapshot.data().nome, idade: snapshot.data().idade, idUser: id})
            setShowEditForm(true)
        })
        .catch(() => {
            toast.error('nao foi possivel pasar os dados')
        })
    }

    async function editarUsuario(e) {
        e.preventDefault()
        const docRef = doc(db, 'users', editFields.idUser)
        
        await updateDoc(docRef, {
            idade: editFields.idade,
            nome: editFields.nome
        })
        .then(() => {
            toast.success('usuario atualizado com sucesso')
            setEditFields({nome: '', idade: '', idUser: ''})
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

    async function createUser(){
        await createUserWithEmailAndPassword(auth, createUserFields.email, createUserFields.password)
        .then(() => {
            toast.success('usuario cadastrado com sucesso')
            setCreateUserFields({email: '', password: ''})
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/weak-password': 
                    toast.error('a senha deve ter no minimo 6 digitos')
                    break;
                case 'auth/email-alredy-in-use': 
                    toast.error('o email ja existe')
                    break;
                default: console.log('houve um erro fora do escopo') ;
            }
            
        })
    }

    async function loginUser(){
        await signInWithEmailAndPassword(auth, loginUserFields.email, loginUserFields.password)
        .then((user) => {
            console.log(user.user)
            setUserSistemaDetails({
                uid: user.user.uid,
                email: user.user.email   
            })
            setLoginUserFields({email: '', password: ''})
            setUserSistema(true)
            toast.success(`Bem vindo ao sistema`)
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/weak-password': 
                    toast.error('a senha deve ter no minimo 6 digitos')
                    break;
                case 'auth/email-alredy-in-use': 
                    toast.error('o email ja existe')
                    break;
                default: console.log('houve um erro fora do escopo') ;
            }
            
        })
    }

    async function logout() {
        await signOut(auth)
        .then(() => {
            setUserSistema(false)
            setUserSistemaDetails({})
            toast.success('usuario deslogado com sucesso')
        })
        .catch(() => {
            toast.error('nao foi possivel sair da sua conta')
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
 
            <div className='cadastroUsuario'>
                <label>Email</label>
                <input type='email' name='email' value={createUserFields.email} onChange={handleCreateUserChange}/>

                <label>Senha</label>
                <input type='password' name='password' value={createUserFields.password} onChange={handleCreateUserChange}/>

                <button onClick={createUser}>cadastrar</button>
            </div>
            <hr/>
            <div className='loginUsuario'>
                <label>Email</label>
                <input type='email' name='email' value={loginUserFields.email} onChange={handleLoginUserChange}/>

                <label>Senha</label>
                <input type='password' name='password' value={loginUserFields.password} onChange={handleLoginUserChange}/>

                <button onClick={loginUser}>Entrar</button>
            </div>
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
                            <input type='text' name="nome" value={cadastroFields.nome} onChange={handleCadChange}></input>
                            Idade
                            <input type='number' name="idade" value={cadastroFields.idade} onChange={handleCadChange}></input>
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
                            <input type='text' name="nome" value={editFields.nome} onChange={handleEditChange}></input>
                            Idade
                            <input type='number' name="idade" value={editFields.idade} onChange={handleEditChange}></input>
                            <button type='submit'>Editar </button>
                        </form>
                    </div>
                )
                
                }
                
            {userSistema  && (
                <div className='container-tabela'>
                    <button onClick={logout}>Logout</button>
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
            )}
        </div>
    )
}
export default Home;