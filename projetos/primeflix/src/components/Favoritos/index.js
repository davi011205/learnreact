import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {toast} from 'react-toastify';

import './favoritos.css';

function FilmesFavoritos () {
  const [filmesFavoritos, setFilmesFavoritos] = useState([]);
  const baseImg = 'https://image.tmdb.org/t/p/original/';


  useEffect(() => {
    const listaFavoritos = localStorage.getItem('filme');
    setFilmesFavoritos(listaFavoritos ? JSON.parse(listaFavoritos) : [])

  }, [])


  function excluir(id) {
    let filtroFilme = filmesFavoritos.filter( (filme) => {
      return (filme.id !== id)
    })

    setFilmesFavoritos(filtroFilme);
    localStorage.setItem('filme', JSON.stringify(filtroFilme));

    toast.success('Filme excluido com sucesso');
  }
   
  return(
    <div className="fav-container">
      {filmesFavoritos.length === 0 ? 
        <h1>Sua Lista de Filmes está vazia</h1>   
      : 
      <ul>
        {filmesFavoritos.map((filme) => {
          return(
            <li key={filme.id}>
              <img className="fav-img" src={`${baseImg}${filme.backdrop_path}`} alt=""></img>

              <div className="infos">
                <h1>{filme.title}</h1>
                <span>{filme.overview}</span>
                <Link to={`/filme/${filme.id}`}>Ver mais detalhes...</Link>
                <button className="fav-button" onClick={() => excluir(filme.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
        }
    </div>
  )
}

export default FilmesFavoritos;