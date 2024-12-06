import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

import './detalhes.css';

import { toast } from "react-toastify";

function Filme() {
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    const baseImg = 'https://image.tmdb.org/t/p/original/';
    const baseTrailer = 'https://www.youtube.com/results?search_query=trailer+';

    const navigate = useNavigate();

    useEffect(() => {
        async function loadDetalhes () {
            await api.get(`movie/${id}`, {
                params:{
                    api_key: 'a8b0be1b1330bceb5b8c2a0d4bd7e659',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false);
            })
            .catch(() => {
                navigate('/', {replace: true})
            })
        }

        loadDetalhes();

    }, [id, navigate])

    if(loading) {
        return(
            <h1>Carregando...</h1>
        )
    }

    function favoritar() {
        const minhaLista = localStorage.getItem('filme');

        let filmesSalvos = minhaLista ? JSON.parse(minhaLista) : [];

        const hasFilme = filmesSalvos.some((filmesSalvos) =>  filmesSalvos.id === filme.id);

        if(hasFilme) {
        toast.info('Esse filme já está salvo')
        return;
        }

        filmesSalvos.push(filme)
        localStorage.setItem('filme', JSON.stringify(filmesSalvos));

        toast.success('Filme salvo com sucesso');
    }

    return (
        <div className="filme">
            <div className="filme-info">
                <h1 className="filme-titulo">{filme.title}</h1>
                <img className="filme-img" src={`${baseImg}${filme.backdrop_path}`} alt=""></img>
                <h3>Sinopse:</h3>
                <span className="filme-sinopse">{filme.overview}</span>
                <strong className="filme-avaliacao">Avaliação: {filme.vote_average.toFixed(1)}/10</strong>
            </div>
            <div className="botoes">
                <button onClick={favoritar} >Salvar</button>
                <a href={`${baseTrailer}${filme.title}`} target="_blank" rel="noreferrer">Trailer</a>
            </div>
        </div>
    )
}

export default Filme;