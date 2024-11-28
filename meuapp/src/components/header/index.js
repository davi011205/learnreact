import { Link } from "react-router-dom";

import './header.css';

function Header () {
    return (
        <header>
            <h2><Link to='/'>Davi Dev</Link></h2>
            <div className="menu">
                <Link to='/'>Home</Link>
                <Link to='/sobre'>Sobre</Link>
                <Link to='/contato'>Contato</Link>
            </div>
        </header>
    )
}

export default Header;