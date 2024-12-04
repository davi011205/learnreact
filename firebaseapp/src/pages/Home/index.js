import { db } from "../../firebaseConfig";
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore'
import { useState } from 'react'
import { toast } from "react-toastify";

function Home() {
    const [fields, setFields] = useState({});
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value});
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

    async function  buscarUsuario() {
        //pegar especifico
        // const userRef = doc(db, 'users', '5vB27HVL9aOArf3qjm6X')
        
        // await getDoc(userRef)
        // .then((snapshot) => {
        //     setFields({nome: snapshot.data().nome, idade: snapshot.data().idade})
        // })
        // .catch(() => {
        //     console.log('n deu bom')
        // })

        //pegar todos
        const usersRef = collection(db, 'users');
            await getDocs(usersRef)
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        idade: doc.data().idade
                    })
                })
                setUsers(lista)
            })
        .catch((error) => {
            toast.error('nao foi possivel carregar os usuários')
        })
    }

    return(
        <div>
            <h1>Cadastre um novo usuario</h1>
            <form onSubmit={handleAdd}>
                Nome
                <input type='text' name="nome" value={fields.nome} onChange={handleChange}></input>
                Idade
                <input type='number' name="idade" value={fields.idade} onChange={handleChange}></input>

                <button type='submit'>Cadastrar</button>
            </form>

            <button onClick={buscarUsuario}>Buscar usuario</button>
            <ul>
                {users.map((user) => {
                    return(
                        <li key={user.id}>
                            <h1>nome: {user.nome}</h1>
                            <h1>idade: {user.idade}</h1>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Home;