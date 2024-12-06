import { Link } from "react-router-dom";

import './erro.css'

import imgError from '../../assets/gatoTriste.svg';

function Erro() {
    return(
        <div className="erro-container">
            <div className="img-erro">
                <img src={imgError} alt=""/>
            </div>

            <div className="texto">
                <div className="texto-erro">
                    <h1>Oh Nooooo</h1>
                    <h2>Não encontramos nada por aqui :(</h2>
                </div>
                <div className="texto-voltar">
                    <p>Mas fique calmo, essa é só uma pagina de erro <strong>404</strong></p>
                    <p><Link to='/'>Voltar para o site</Link> :)</p>
                </div>
            </div>
        </div>
    )
}

export default Erro;