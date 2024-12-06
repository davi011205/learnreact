import React,  { Component } from "react"

class Feed extends Component {

    render() {
        return (
            <div >
                <h1>id: {this.props.id}</h1>
                <p>usuario: {this.props.username}</p>
                <p>
                    {this.props.curtidas === 1 ? `${this.props.curtidas} curtida ` 
                    : this.props.curtidas === 0 ? 'nenhuma curtida '
                    : `${this.props.curtidas} curtidas ` 
                    }   
                    e 
                    {this.props.comentarios === 1 ? ` ${this.props.comentarios} comentario` 
                    : this.props.comentarios === 0 ? ' nenhum comentario'
                    : ` ${this.props.comentarios} comentarios` 
                    }  
                    
                </p>
                <hr></hr>
            </div>
        );
    }
}

export default Feed;