import './home.css'

function Home() {

    function cadastrarTarefa() {
        alert('teste')
    }

    return  (
        <div className="container-home">
            <h1>Minhas Tarefas</h1>
            <form className='form-tarefas' onSubmit={cadastrarTarefa}>
                <textarea placeholder='Digite sua tarefa...'></textarea>
                <button type='submit'>Registrar Tarefa</button>
            </form>
        </div>
    )
}

export default Home;