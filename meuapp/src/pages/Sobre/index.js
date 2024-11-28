import { Link } from "react-router-dom";

import './sobre.css';

function Sobre () {
 
    return (
      <div className="sobre-container container">
        <h1>Pagina sobre</h1>
        
        <Link to='/'>Home</Link>
        <Link to='/contato'>Contato</Link>

      </div>
    )
}

export default Sobre;