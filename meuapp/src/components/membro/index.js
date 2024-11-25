import React, { Component } from "react";

class Membro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: props.nome,
        }

        this.entrarDavi = this.entrarDavi.bind(this);
        this.sair = this.sair.bind(this);
    }

    entrarDavi () {
        //forma completa
        let state = this.state;

        state.nome = 'davi';
        this.setState(state);
        
    }

    sair () {
       //forma resumida
       this.setState({nome: 'visitante'})
    }

    render(){
        return (
            <div>
                <h2>Bem vindo(a) {this.state.nome}</h2>
                <button onClick={this.entrarDavi}>Entrar como davi</button>
                <button onClick={this.sair}>Sair</button>
            </div>
        )
    }
}

export default Membro;