import {useState, useEffect, createContext} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();
    
    async function signUp( email, password, name ) {
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, 'users', uid), {
                nome: name,
                avataUrl: null,
            })
            .then(() => {
                let dataUser = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avataUrl: null
                }
                setUser(dataUser)
                navigate('/dashboard')
                storageUser(dataUser)
                setLoadingAuth(false)
                toast.success('cadastrado com sucesso')
            })
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/weak-password': 
                    setError('a senha deve ter no minimo 6 digitos')
                    break;
                case 'auth/invalid-email': 
                    setError('insira um email válido')
                    break;
                case 'auth/email-already-in-use': 
                    setError('ja existe uma conta com este email')
                    break;
             
                default: console.log('houve um erro fora do escopo') ;
            }
            setLoadingAuth(false)
        })
    }

    function storageUser(data) {
        localStorage.setItem('tickets', JSON.stringify(data))
    }


    return(
        <AuthContext.Provider value={{
            signed: !!user, //converte em booleano, como user inicialmente é null vira false
            user,
            signUp,
            loadingAuth,
            error,
            setError
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;    