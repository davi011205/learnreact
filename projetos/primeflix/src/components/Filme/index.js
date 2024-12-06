import { Link } from "react-router-dom";
import './filme.css';


function Filme({ id, title, img }) {

    const baseImg = 'https://image.tmdb.org/t/p/original/';

    return (
        <div className="filme">
            <article className="conteudo-filme">
                <strong className="titulo-filme">{title}</strong>
                <img className="img-filme" src={`${baseImg}${img}`} alt=""/>
                <Link to={`/filme/${id}`}>Acessar</Link>
            </article>
        </div>
    )
}

export default Filme;