//----------COMPONENTE SIMPLES----------
// import React from "react";

// const Equipe = (props) => {
//   return (
//     <div>
//       <Sobre nome={props.nome} cargo={props.cargo} idade={props.idade}></Sobre>
//       <Midias instagram={props.instagram} linkedin={props.linkedin}></Midias>

//       <hr></hr>
//     </div>
//   )
// }

// const Sobre = (props) => {
//   return (
//     <div>
//       <h1>Olá, me chamo {props.nome} e tenho {props.idade} anos</h1>
//       <p> Sou {props.cargo} na empresa, é um prazer telo em nossa página</p>
//     </div>
//   )
// }

// const Midias = (props) => {
//   return (
//     <div>
//       <h2>Me acompanhe nas redes sociais</h2>
//       <h3>
//         <a href={props.instagram}>instagram   </a>  
//         <a href={props.linkedin}>linkedin</a>
//       </h3>
//     </div>
//   )
// }

// function App() {
//   return (
//     <div>
//       <h1>Conheça nossa equipe</h1>
//       <Equipe nome='davi' cargo='programador' idade='18' instagram='https://www.instagram.com/davi_assuncao123/' linkedin='https://www.linkedin.com/in/davi-assunção-a3161b229/'></Equipe>
//     </div>
//   )
// }

// export default App;



//----------COMPONENTE COM ESTADOS----------
// import React, {Component} from "react";

// class Equipe extends Component {
//   render() {
//     return (
//       <div> 
//         <Sobre nome={this.props.nome} idade={this.props.idade} cargo={this.props.cargo}></Sobre>
//         <Social instagram={this.props.instagram} linkedin={this.props.linkedin}></Social>
//       </div>
//     )
//   }
// }

// class Sobre extends Component {
//   render() {
//     return (
//       <div> 
//         <h2>Olá, me chamo {this.props.nome}, tenho {this.props.idade} e sou {this.props.cargo}</h2>
//         <hr></hr>
//       </div> 
//     )
//   }
// }

// const Social = (props) => {
//   return (
//     <div>
//       <a href={props.instagram}>instagram</a>
//       <a href={props.linkedin}>linkedin</a>
//     </div>
//   )
// }

// function App () {
//   return ( 
//     <div>
//       <h1>Conheça nossa equipe</h1>
//       <Equipe nome='davi' idade='18' cargo='dev frontend' instagram='https://www.instagram.com/davi_assuncao123/' linkedin='https://www.linkedin.com/in/davi-assunção-a3161b229/'></Equipe>
//       <Equipe nome='julia' idade='18' cargo='dev backend' instagram='https://www.instagram.com/davi_assuncao123/' linkedin='https://www.linkedin.com/in/davi-assunção-a3161b229/'></Equipe>
//     </div>
//   );
// }

// export default App;



//----------ENTENDENDO OS STATES----------
// import React, { Component } from "react";

// class App extends Component {

//   constructor (props) {
//     super(props);
//     this.state = {
//       nome: 'davi',
//       contador: 0
//     }

//     this.aumentar = this.aumentar.bind(this); //bind = vincular
//     this.diminuir = this.diminuir.bind(this);
//   }


//   aumentar () {
//     let state = this.state; //acessando todos os states do constructor
//     state.contador += 1;

//     this.setState(state); //atualizando o state passando o state atual
//   }

//   diminuir () {
//     let state = this.state;

//     if(state.contador > 0) 
//     state.contador -= 1;

//     this.setState(state);
//   }

//     render() {
//     return (
//       <div>
//         {this.state.nome}
//         <h3><button onClick={this.diminuir}>-</button> {this.state.contador} <button onClick={this.aumentar}>+</button></h3>
//       </div>
//     )
//   }
// }

// export default App;



//----------ciclo de vida do componente----------
// import React, { Component } from "react";

// class App extends Component {
//   //  ciclos de vida  //

//   //primeira coisa que é carregada é o construtor
//   constructor(props) {
//     super(props);
//     this.state = {
//       hora: '00:00:00'
//     } 
//   }

//   //executa uma vez quando o componente é montado
//   componentDidMount() {
//     setInterval(() => {
//       this.setState({ hora: new Date().toLocaleTimeString() })
//     }, 1000)//executa infinitamente
//   }

//   //quando um compoenten ou state é atualizado pode atualizar algo
//   componentDidUpdate() {
//     // console.log('atualizou') //printa no console toda vez q atualiza, no caso a cada segundo
//   }

//   //retorna tru ou false, basicamente pergunta 'deve atualizar?'
//   shouldComponentUpdate() {}

//   render() {
//     return (
//       <div>
//         {this.state.hora}
//       </div>
//     )
//   }
// }

// export default App;



//----------renderização condicional----------
// import React, { Component } from "react";
// // import Membro from "./components/membro";


// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       status: false,

//     }
//     this.entrar = this.entrar.bind(this);
//     this.sair = this.sair.bind(this);
//   }

//   entrar () {
//     this.setState({status: true})
//   }
//   sair () {
//     this.setState({status: false})
//   }

//   render() {
//     return (
//       <div> 
//         {/* <Membro nome='visitante' /> */}

//         {this.state.status ?
//           <div>
//             <h1> voce esta logado</h1>
//             <button onClick={this.sair}>sair</button>
//           </div>
//           :
//           <div>
//             <h1>Bem vindo ao sistema</h1> 
//             <button onClick={this.entrar}>entrar</button>
//           </div>
//         }

//       </div>
//     )
//   }
// }

// export default App;



//----------trabalhando com listas----------
// import React, { Component } from "react";
// import Feed from "./components/feed"

// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       feed: [
//         {id: 1, username: 'davi', curtidas: 10, comentarios: 2},
//         {id: 2, username: 'joao', curtidas: 5, comentarios: 4},
//         {id: 3, username: 'marcelo', curtidas: 55, comentarios: 40},
//         {id: 4, username: 'ricardo', curtidas: 1, comentarios: 0},
//         {id: 5, username: 'ricardo', curtidas: 0, comentarios: 0},
//         {id: 6, username: 'ricardo', curtidas: 2, comentarios: 1},
//       ]
//     }
//   }

//   render() {
//     return (
//       <div>
//         {this.state.feed.map( (item) => {
//           return (
//             <Feed key={item.id}
//               id={item.id}
//               username={item.username}
//               curtidas={item.curtidas}
//               comentarios={item.comentarios}
//               />
//           )
//           })
//         }
//       </div>
//     )
//   }
// }

// export default App;



//----------trabalhando com formularios----------
// import React, { Component } from "react";


// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       senha: '',
//       sexo: 'masculino',
//     }

//     this.setaEmail = this.setaEmail.bind(this);
//     this.setaSenha = this.setaSenha.bind(this);
//     this.setaSexo = this.setaSexo.bind(this);
//   }

//   setaEmail(e) {
//     let emailDigitado = e.target.value;
//     this.setState({email: emailDigitado});
//   }

//   setaSenha(e) {
//     let senhaDigitada = e.target.value;
//     this.setState({senha: senhaDigitada});
//   }

//   setaSexo(e) {
//     let sexoSelecionado = e.target.value;
//     this.setState({sexo: sexoSelecionado});
//   }

//   render() {
//     return (
//       <div>
//         Email
//         <input type="email" 
//           name="email" 
//           value={this.state.email} 
//           onChange={this.setaEmail}
//         />
        
//         Senha
//         <input type="password" 
//           name="senha" 
//           value={this.state.senha}
//           onChange={this.setaSenha} //por funcao
//           // onChange={ (e) => this.setState({senha: e.target.value}) } //alterando state diretamente na linha
//         /> 

//         <select name="sexo" value={this.state.sexo} onChange={this.setaSexo}>
//           <option value='masculino'>masculino</option>
//           <option value='feminino'>feminino</option>
//           <option value='naoInforma'>prefiro nao informar</option>
//         </select>
        
//         {console.log(`email: ${this.state.email} senha: ${this.state.senha} sexo: ${this.state.sexo}`)}
//       </div>
//     )
//   }
// }

// export default App;



// ----------verificacoes formulario----------
// import React, { Component } from "react";

// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       form: {
//         nome: '',
//         email: '',
//         senha: ''
//       },
//       error: '',
//       success: '',
//     }

//     this.dadosForm = this.dadosForm.bind(this);
//     this.cadastrar = this.cadastrar.bind(this);
//   }

//   //pegando o que é digitado utilizando apenas uma funcao
//   dadosForm(e) {
//     let form = this.state.form;

//     form[e.target.name] = e.target.value; //pega o valor a partir do value do input, tem q ser igual ao nome da prop
//     this.setState({form: form});
//   }

//   cadastrar(e) {
//     const {nome, email, senha} = this.state.form; //desconstruindo 

//     if(!nome || !email || !senha) {
      
//       this.setState({error: 'preencha todos os campos', success: ''})
     
//     } else {
      
//       this.setState({success: `sua resposta foi enviada com sucesso`, error: ''});
//       alert(`o nome enviado eh ${nome}, seu email eh ${email} e sua senha eh: ${senha}`)
//     }
    
//     e.preventDefault();

//   }

 

//   render() {
//     return (
//       <div>
//        <h1>Novo usuario</h1>

//        <form onSubmit={this.cadastrar}>
//         <label htmlFor='nome'>Nome</label>
//         <input type="text" name="nome" id="nome" value={this.state.form.nome} onChange={this.dadosForm}/>

//         <label htmlFor='email'>Email</label>
//         <input type="email" name="email" id="email" value={this.state.form.email} onChange={this.dadosForm}/>

//         <label htmlFor='senha'>Senha</label>
//         <input type="password" name="senha" id="senha" value={this.state.form.senha} onChange={this.dadosForm}/>

//         <button type="submit">Enviar</button>
//        </form>
       
//        <p>
//         {this.state.error ? this.state.error :
//         this.state.success}
//        </p>
//        {/* {this.state.error && this.state.error}
//        {this.state.success && this.state.success} */}
//       </div>
//     )
//   }
// }

// export default App;



// ----------projeto biscoito da sorte----------
// import React, { Component } from "react";
// import imgBiscoito from './assets/biscoito.png'
// import Botao from "./components/botao";
// import './estilos.css';

// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       frase: '',
//     }

//     this.frases = ['Siga os bons e aprenda com eles.', 'O bom-senso vale mais do que muito conhecimento.', 
//  'O riso é a menor distância entre duas pessoas.', 
//  'Deixe de lado as preocupações e seja feliz.',
//  'Realize o óbvio, pense no improvável e conquiste o impossível.',
//  'Acredite em milagres, mas não dependa deles.',
//  'A maior barreira para o sucesso é o medo do fracasso.'];
//     this.abrirBiscoito = this.abrirBiscoito.bind(this);
   
//   }

//   abrirBiscoito() {
//     let numeroAleatorio = Math.floor(Math.random() * this.frases.length)
//     this.setState({frase: this.frases[numeroAleatorio]});
//   }

 

//   render() {
//     return (
//       <div className="container">
//         <h1> biscoito xing ling abliu poque quis</h1>
//         <img src={imgBiscoito} className="img" alt=""></img>
//         <Botao textoBotao='abrir biscoito' clickBotao={this.abrirBiscoito}></Botao>
//         <h3 className="textoFrase">{this.state.frase}</h3>
//       </div>
//     )
//   }
// }

// export default App;



// ----------projeto cronometro----------
// import React, { Component } from "react";
// import './estilos.css';
// import Cronometro from "./components/cronometro";

// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
   
//      }
//     }

//   render() {
//     return (
//       <div className="container">
//         <Cronometro></Cronometro>
//       </div>
//     )
//   }
// }

// export default App;


//----------React hooks----------
//----------api useState menos verbosidade para tratar estados----------
//----------api useEffect substitui os ciclos de vida ----------
//----------api useMemo usada para chamar funcao so quando necessario ----------
//----------api useCallback usada para chamar funcao so quando necessario ----------
import React, { useState, useEffect, useMemo, useCallback } from "react";
import './estilos.css';

function App () {
  //const [nome da state, funcao que atualiza a state] = useState(valor que inicializa por padrao)
  const [tarefas, setTarefas] = useState([]);
  const [tarefaDigitada, setTarefaDigitada] = useState('');

  //equivalente ao componentDidMount
  //quando deixa vazio ele executa automaticamente
  useEffect(() => {
    const tarefasStorage = localStorage.tarefas;

    if(tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    } 

 
  }, [])

  //equivalente ao componentDidUpDate
  //2 parametros, funcao q vai ser executada, array(state que ele monitora por ex)
  //toda vez q a state tarefas sofrer alteração ele executa a função
  useEffect(() => {
    localStorage.tarefas = JSON.stringify(tarefas);
  }, [tarefas])

  //forma tradicional, porem assim ele recria sempre que ha alteração na state(ao digitar por ex)
  // function handleAdd () {
  //   setTarefas([...tarefas, tarefaDigitada])
  //   setTarefaDigitada('')
  // }

  //para melhorar o desempenho, consumindo menos processamento usamos o useCallback
  //o useCallback deve receber como parametro todos os states que sao utilizados nele
  const handleAdd = useCallback(() => {
    setTarefas([...tarefas, tarefaDigitada])
    setTarefaDigitada('')
  }, [tarefas, tarefaDigitada])

  // qual funcao chamada quando a state é mudada, retorna um valor unico
  const totalTarefas = useMemo(() => tarefas.length, [tarefas])

  //parecido com o useMemo, porem pode retornar uma funcao complexa

    return (
      <div className="container">
        <ul>
          {tarefas.map((item, indice) => {
            return (
              <li key={indice}>{item}</li>
            )
          })}
        </ul>
        <strong>voce tem {totalTarefas} tarefas</strong>
        <div>

        <input type="text" 
          placeholder="qual tarefa deseja adicionar" 
          value={tarefaDigitada}
          onChange={(e) => setTarefaDigitada(e.target.value)}
        />
        <button onClick={handleAdd}>adicionar</button>
        </div>
      </div>
    )
}

export default App;