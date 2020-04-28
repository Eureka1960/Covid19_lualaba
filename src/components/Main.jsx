import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            borders:props.all_borders,
        }
    }

      onSubmitPassengerForm = e => {
          e.preventDefault();
      }

  render() {
    return (
      <div>
        <div className="row">
            <div className="form-group col-6">
                <Link to={{ pathname:'/passenger_form', state:{all_borders: this.state.borders } }} className="btn btn-lg btn-info form-control" style={btnLinkStyle}>Formulaire D'Identification</Link>
            </div>
            <div className="form-group col-6">
                <Link to="/alert_case_page" className="btn btn-lg btn-info form-control" style={btnLinkStyle}>Signaler un cas</Link>
            </div>
            <div className="form-group col-6">
                <Link to="/hospital_page" className="btn btn-lg btn-info form-control" style={btnLinkStyle}>Centre de prise en charge</Link>
            </div>
            <div className="form-group col-6">
                <Link to="/monitoring_page" className="btn btn-lg btn-info form-control" style={btnLinkStyle}>Cas detecté et évolution</Link>
            </div>
        </div>
      </div>
    )
  }
}

const btnLinkStyle = {
    height:'65px',
    textTransform: 'uppercase'
}

export default Main;