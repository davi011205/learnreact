import { Link } from "react-router-dom";

import './contato.css';

function App () {
 
    return (
      <div className="contato-container container">
        <h1>Estou no contato</h1>

        <Link to='/'>Home</Link>
        <Link to='/sobre'>Sobre</Link>
      </div>
    )
}

export default App;