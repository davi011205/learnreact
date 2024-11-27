import { Link } from "react-router-dom";
function Sobre () {
 
    return (
      <div className="container">
        <h1>Pagina sobre</h1>
        
        <Link to='/'>Home</Link>
        <Link to='/contato'>Contato</Link>

      </div>
    )
}

export default Sobre;