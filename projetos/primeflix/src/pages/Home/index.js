import { useEffect, useState } from "react";

import api from '../../services/api'

import './home.css';

import Filme from "../../components/Filme";

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes () {
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: 'a8b0be1b1330bceb5b8c2a0d4bd7e659',
                    language: 'pt-BR',
                    page: 1,
                }
            })

            setFilmes(response.data.results.slice(0, 10));
            setLoading(false);
        }
        loadFilmes();

    }, [])

    if(loading) {
        return(
            <div className="loading">
                
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }
    return (
        <div className="home-container">
            {filmes.map((filme) => {
                return(
                    <Filme key={filme.id} 
                        id={filme.id}
                        title={filme.title}
                        img={filme.poster_path}
                    />
                )
            })}
        </div>
    )
}

export default Home;