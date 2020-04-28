import React from 'react'

export default function LoginModal(props) {
  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-center" id="exampleModalLabel">Authentifiez-vous ici</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form onSubmit={props.onAuthenticate.bind(this)}>
                <div className="alert alert-danger text-center" id="login_error" style={{ display:'none' }}></div>
                <div className="modal-body">
                    <div className="form-group">
                        <input type="text" name="credential" className="form-control" placeholder="identifiant" />
                        <span id="credential_error"></span>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" placeholder="mot de passe" />
                        <span id="password_error"></span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" id="closeLoginModal" data-dismiss="modal">Fermer</button>
                    <button type="submit" className="btn btn-primary">Connexion</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}
