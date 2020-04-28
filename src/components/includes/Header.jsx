import React from 'react'
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link className="navbar-brand text-uppercase" to={localStorage.getItem('user_id') !== null ? '/main' : '/'}>Covid19 - F2QM</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to={localStorage.getItem('user_id') !== null ? '/main' : '/'}  >Acceuil <span className="sr-only">(current)</span> </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">A Props de nous</Link>
                    </li>
                </ul>
                {
                    props.user_id !== 0 ?
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link to="/main" className="nav-link">
                            {localStorage.getItem('username') !== null ? localStorage.getItem('username') : ''}
                        </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/logout" className="nav-link" onClick={props.onLogout.bind(this)} >Quitter</a>
                        </li>
                    </ul>
                    : ''
                }
            </div>
        </nav>
        <div className="col-12" style={{ marginTop:'60px' }}>
            <div className="row">
                <div className="col-2">
                    <img  src={require('../../asset/images/flog_drc.jpeg')} style={imgStyle} alt="Drapeau RDC"/>
                </div>
                <div className="col-8">
                    <div className="content text-center">
                        <h3 className="text-uppercase">covid-19</h3>
                        <h3 className="text-uppercase">Province du lualaba rdc</h3>
                        <h3 className="text-uppercase">Ministere provincial de la santé</h3>
                    </div>
                </div>
                <div className="col-2">
                    <img src={require('../../asset/images/batiment_gouvernorat.jpg')} style={imgStyle} alt="Batiment Gouv"/>
                </div>
            </div>
        </div>
    </div>
  )
}

const imgStyle = {
    height:'80px',
    width:'110px'
}

export default Header;