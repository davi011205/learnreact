import { db } from "../../firebaseConfig";
import { doc, setDoc, collection, addDoc, getDoc} from 'firebase/firestore'
import { useState } from 'react'
import { toast } from "react-toastify";

function Home() {
    const [fields, setFields] = useState({});

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
        const userRef = doc(db, 'users', '5vB27HVL9aOArf3qjm6X')


            // await getDoc(userRef)
            // .then((snapshot) => {
            //     setFields({nome: snapshot.data().nome, idade: snapshot.data().idade})
            // })
            // .catch(() => {
            //     console.log('n deu bom')
            // })

            try {
                let response = await getDoc(userRef)
                setFields({nome: response.data().nome, idade: response.data().idade})
            }
            catch{
                console.log('n deu bom')
            }
        
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
        </div>
    )
}
export default Home;