import React, { Component } from 'react'
import LoginModal from './partials/LoginModal'

 class Home extends Component {
    render() {
        return (
            <div className="col-12">
                <hr/>
                <main role="main" className="col-12">
                    <div className="jumbotron">
                        <h1 className="text-uppercase text-center">covid-19 f2qm</h1>
                        <p className="lead text-center">Portail web d'identification des cas et de la prise en charge.</p>
                        <p className="lead text-center">Veuillez vous authentifier pour procéder au processus d'identification et suivi des citoyens en transit.</p>
                        {
                            !this.props.isLoggedIn ?
                            <div className="text-center">
                                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#loginModal">
                                    Authentifiez vous
                                </button>
                            </div>
                            : ''
                        }
                        
                    </div>
                </main>
                <LoginModal onAuthenticate={this.props.onAuthenticate} />
            </div>
        )
    }
}

export default Home
