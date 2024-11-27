import { Link } from "react-router-dom";

function App () {
 
    return (
      <div >
        <h1>Estou no contato</h1>

        <Link to='/'>Home</Link>
        <Link to='/sobre'>Sobre</Link>
      </div>
    )
}

export default App;