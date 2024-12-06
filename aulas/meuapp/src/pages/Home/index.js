import { Link } from 'react-router-dom';

import './home.css';

function Home () {
 
    return (
      <div className='home-container container'>
        <h1>Bem vindo a pagina Home</h1>

        <Link to='/sobre'>Sobre</Link>
        <Link to='/contato'>Contato</Link>

        <Link to='/produto/123'>acessar produto 123</Link>

      </div>
    )
}

export default Home;