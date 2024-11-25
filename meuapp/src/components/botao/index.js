import { Component } from "react";

class Botao extends Component {

    render() {
        return (
            <div>
                <button onClick={this.props.clickBotao}>{this.props.textoBotao}</button>
            </div>
        );
    }
}

export default Botao;