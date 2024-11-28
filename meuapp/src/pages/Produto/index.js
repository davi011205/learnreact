import { useParams } from "react-router-dom";

function Produto () {
    const { id } = useParams(); //pegando da rota, tem q ser igual colocou na rota

    return(
        <div>
            meu produto e {id}
        </div>
    )
}

export default Produto;