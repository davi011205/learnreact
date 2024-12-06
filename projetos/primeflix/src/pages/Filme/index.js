import { Link } from "react-router-dom";
import DetalhesFilme from '../../components/DetalhesFilme'

function Filme() {

    return (
        <div style={{paddingTop: '80px'}}>
            <DetalhesFilme/>
            <Link to='/'>voltar para a home</Link>
        </div>
    )
}

export default Filme;