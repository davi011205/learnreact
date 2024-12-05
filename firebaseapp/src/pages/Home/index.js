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

function Home() {
    const [fields, setFields] = useState({});
    const [users, setUsers] = useState([]);

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
        const userRef = doc(db, 'users', 'lLrzHBXac0BvPcraMe9n')
        
        await getDoc(userRef)
        .then((snapshot) => {
            setFields({nome: snapshot.data().nome, idade: snapshot.data().idade})
        })
        .catch(() => {
            toast.error('usuario nao encontrado')
        })
    }


    async function editarUsuario() {
        const docRef = doc(db, 'users', fields.idUser)
        await updateDoc(docRef, {
            idade: fields.idade,
            nome: fields.nome
        })
        .then(() => {
            toast.success('usuario atualizado com sucesso')
            setFields({nome: '', idade: '', idUser: ''})
       
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
        <div>
            <h1>Cadastre um novo usuario</h1>
     
                Id do Usuario
                {/* <input type='text' name="idUser" value={fields.idUser} onChange={handleChange}></input> <br/><br/> */}
                <select name="idUser" value={fields.idUser} onChange={handleChange}>
                    <option>selecione um usuario</option>
                    {users.map((user) => {
                        return(
                            <option key={user.id}>{user.id}</option>
                        )
                    })}
                </select>
                <br/><br/>
                Nome
                <input type='text' name="nome" value={fields.nome} onChange={handleChange}></input> <br/><br/>
                Idade
                <input type='number' name="idade" value={fields.idade} onChange={handleChange}></input> <br/><br/>

                <button onClick={handleAdd}>Cadastrar</button>
                <button onClick={buscarUsuario}>Buscar usuario</button>
                <button onClick={editarUsuario}>Editar usuario</button>
            <ul>
                {users.map((user) => {
                    return(
                        <li key={user.id}>
                            <span>{user.id}</span>
                            <h1>nome: {user.nome}</h1>
                            <h1>idade: {user.idade}</h1>
                            <button onClick={ () => excluirUsuario(user.id) }>Excluir</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Home;