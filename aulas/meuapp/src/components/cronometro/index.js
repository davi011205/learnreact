import React, {Component} from "react";
import imgCronometro from '../../assets/cronometro.png';

class Cronometro extends Component {

    constructor(props) {
      super(props);
      this.state = {
      //  numero: 0,
  
       relogio: {
        hora: 0,
        minuto: 0,
        segundo: 0
       },
       voltas: [],
       
      }

      this.timer = null;
      this.pause = false;
  
      this.iniciar = this.iniciar.bind(this);
      this.pausar = this.pausar.bind(this);
      this.volta = this.volta.bind(this);
      this.limpar = this.limpar.bind(this);
    }
  
    verificaSegundo() {
      let state = this.state;
  
      if(this.state.relogio.segundo > 60) {
        state.relogio.minuto += 1;
        state.relogio.segundo = 0;
        this.setState(this.state);
      }
  
      this.verificaMinuto();
      
    }
  
    verificaMinuto() {
      let state = this.state;
  
      if(this.state.relogio.minuto > 1) {
        state.relogio.hora += 1;
        state.relogio.minuto = 0;
        state.relogio.segundo = 0;
        console.log(this.state);
      }
      
    }
  
    iniciar() {
  
      this.timer = setInterval( () => {
        let state = this.state;
        state.relogio.segundo += 0.1;
        this.setState(state)
        this.verificaSegundo();
      }, 100)
  
      this.setState({pause: false});
    }
  
    pausar() {
      if(this.timer) {
        clearInterval(this.timer);
      }
  
      this.setState({pause: true})
    }

    volta() {

      let {relogio, voltas} = this.state; //desconstroi os obj

      this.setState({
        voltas: [...voltas, {...relogio}] //adiciona as voltas ja existentes + o tempo que o relogio esta marcando
      })
    }
  
    limpar() {
      let cronometro = {
        hora: 0,
        minuto: 0,
        segundo: 0
      }
      this.setState({relogio: cronometro, voltas: []});
      this.pausar();
    }
  
  
    render() {
      return (
        <div className="container">
            <img className="img" src={imgCronometro} alt=""></img>
            <p className="timer">{`${this.state.relogio.hora}:${this.state.relogio.minuto}:${this.state.relogio.segundo.toFixed(1)} `}</p>

            <div className="botoes">
                {this.state.relogio.segundo === 0 ?
                  <button onClick={this.iniciar}>Iniciar</button>
                  : this.state.pause ? 
                  <div>
                      <button onClick={this.iniciar}>Retomar</button>
                      <button onClick={this.limpar}>Zerar</button>
                  </div>
                  : 
                  <div>
                    <button onClick={this.pausar}>Pausar</button>
                    <button onClick={this.volta}>Volta</button>
                  </div>
                } 
                <div>
                    <table>
                      <thead>
                        <tr aria-colspan={2}>Voltas</tr>
                      </thead>
                      <tbody>
                        {this.state.voltas.map( (item, index) => {
                          return(
                            <tr key={index}>
                              <td>{index + 1}</td> {/*numero da volta */}
                              <td>{`${item.hora}:${item.minuto}:${item.segundo.toFixed(2)}`}</td> {/*tempo da volta*/}
                            </tr>
                        )
              
                        })}
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
      )
    }
  }
  
  export default Cronometro;