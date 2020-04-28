import React, { Component, useEffect } from 'react'
import 'bootstrap-4-react'
import $ from 'jquery'
import Header from './components/includes/Header';
import axios from 'axios';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import About from './components/About';
import Contact from './components/Contact';
import Main from './components/Main';
import PassengerForm from './components/pages/PassengerForm';
import HospitalPage from './components/pages/HospitalPage';
import AlertCasePage from './components/pages/AlertCasePage';
import MonitoringPage from './components/pages/MonitoringPage';
import Footer from './components/includes/Footer';

export class App extends Component {

  state = {
    borders:[],
    hospitals:[],
    passengers:[],
    infectedPeople:[],
    loading:false,
    currentPage:1,
    passengerPerPage:5,
    isLoggedIn:sessionStorage.getItem('token') !== null ? true : false,
    user_id:localStorage.getItem('user_id') !== null ? localStorage.getItem('user_id') : 0,
    user_email:localStorage.getItem('user_email') !== null ? localStorage.getItem('user_email') : '',
    username:localStorage.getItem('username') !== null ? localStorage.getItem('username') : '',
  }

  componentDidMount(){

    //Fetch all borders
    axios.get('http://localhost:8000/api/border/all')
        .then(resp => this.setState({borders:resp.data}))
        .catch(err => console.log(err));

    //Fetch all passengers
    axios.get('http://localhost:8000/api/passenger/all')
      .then(resp => this.setState({passengers:resp.data}))
      .catch(err => console.log(err));

    //Fetch all hospitals
    axios.get('http://localhost:8000/api/hospital/all')
      .then(resp => this.setState({hospitals:resp.data}))
      .catch(error => console.log(error));
  }
  clearUserSession = () => {
    if (sessionStorage.getItem('token') !== null || localStorage.getItem('user_id')) {
      this.setState({isLoggedIn:false});
      sessionStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_email');
      localStorage.removeItem('username');
      this.setState({user_id:0});
      this.setState({user_email:''});
      this.setState({username:''});
    }
  }

  onAuthenticate = e => {
    e.preventDefault();
    // const {name, value} = e.target;
    const form = $(e.target).serializeArray();
    let isError = false;
    form.map(field => {
      if (field.value === '') {
        $(`#${field.name}_error`).text('Ce champs ne doit pas être vide').css('color', 'red');
        isError = true;
      }
      else {
        $(`#${field.name}_error`).text('');
        if (field.name === 'credential' && field.value.length <= 2) {
          $(`#${field.name}_error`).text('Ce champs doit avoit 3 caractères minimum').css('color', 'red');
          isError = true
        } else if (field.name === 'credential' && field.value.length > 2) {
          $(`#${field.name}_error`).text('');
          isError = false;
        }

        if (field.name === 'password' && field.value.length < 6) {
          $(`#${field.name}_error`).text('Ce champs doit avoit 6 caractères minimum').css('color', 'red');
          isError = true;
        } else if (field.name === 'password' && field.value.length >= 6) {
          $(`#${field.name}_error`).text('');
          isError = false;
        }
      }
    })

    if (!isError) {
      let data = {};
      for(let field of form) {
        data[field.name] = field.value;
      }

      console.log(data)
      axios.post('http://localhost:8000/api/login', data)
        .then(resp => {
          if (resp.data.error !== undefined) $('#login_error').css('display', 'block').text(resp.data.error.message);
          else {
            if (resp.data.success) {
              console.log(resp.data)
              $('#closeLoginModal').click();
              sessionStorage.setItem('token', resp.data.success.token);
              localStorage.setItem('user_id', resp.data.success.id);
              localStorage.setItem('user_email', resp.data.success.email);
              localStorage.setItem('username', resp.data.success.username);
              this.setState({user_id:resp.data.success.id});
              this.setState({user_email:resp.data.success.email});
              this.setState({username:resp.data.success.username});
              if (sessionStorage.getItem('token')) this.setState({isLoggedIn:true}); 
              else {
                if (sessionStorage.removeItem('token')) this.setState({isLoggedIn:false})
              }             
            }
          }
        })
        .catch(err => console.log(err));
    }
  }

  onLogout = e => {
    e.preventDefault();
    if (sessionStorage.getItem('token') || localStorage.getItem('user_id')) {
      this.clearUserSession();
    }
  }

  displayError = (index, message, show = 'block') => {
    if (index !== '') {
      if (message !== '') {
        $(`#${index}`)
        .text(message)
        .css('display', show);
      }
    }
  }

  onSubmitPassengerForm = e => {
    e.preventDefault();
    const passengerForm = $(e.target).serializeArray();
    let newData = {};
    let validation = true;
    let confirmation = false;
    let span_error = '';
    // main_symptome
    passengerForm.map(field => {
      if (field.name === 'borders_id' && field.value === '') {
        validation = false;
        this.displayError('display_message', "Veuillez selectionner votre position (Péage ou Aeroport), Merci !");
      } else this.displayError('display_message', '', 'none');

      if (field.name === 'body_tempeture' && field.value === '') {
        validation = false;
        span_error = `${field.name}_error`;
        this.displayError(span_error, "La temperature du voyageur doit être fournie");
      } else this.displayError(span_error, '', 'none');

      //If person is infected
      if (field.name === 'main_symptome' && field.value === 'true') confirmation = true;

      if (confirmation) {
        if (field.name === 'hospitals_id' && field.value === 'none') {
          validation = false;
          span_error = `${field.name}_error`;
          this.displayError(span_error, "Veuillez selectionner l'établissement de prise en charge.");
        } else this.displayError(span_error, '', 'none');
  
        if (field.name === 'name_person_to_contact' && field.value === '') {
          validation = false;
          span_error = `${field.name}_error`;
          this.displayError(span_error, "Veuillez fournir le nom de la personne à contacter.");
        } else this.displayError(span_error, '', 'none');

        if (field.name === 'gender_person_to_contact' && field.value === 'none') {
          validation = false;
          span_error = `${field.name}_error`;
          this.displayError(span_error, "Quel le genre de la personne à contacter.");
        } else this.displayError(span_error, '', 'none');

        if (field.name === 'phone_person_to_contact' && field.value === '') {
          validation = false;
          span_error = `${field.name}_error`;
          this.displayError(span_error, "Le numéro téléphone ne doit pas être vide.");
        } else this.displayError(span_error, '', 'none');

        if (field.name === 'address_person_to_contact' && field.value === '') {
          validation = false;
          span_error = `${field.name}_error`;
          this.displayError(span_error, "Veuillez fournir l'adresse de la personne à contacter.");
        } else this.displayError(span_error, '', 'none');
      }

      const defaultMessage = 'Ce champs ne doit pas être vide'

      if (field.name === 'full_name' && field.value === '') {
          validation = false;
          span_error = `${field.name}_error`;
          this.displayError(span_error, defaultMessage);
      } else this.displayError(span_error, '', 'none');


      if (field.name === 'main_symptome') {
        if (typeof field.value === 'string') field.value = field.value === 'true' ? true : false;
      }

      if (field.name === 'lockdown') {
        if (typeof field.value === 'string') field.value = field.value !== 'false' ? true : false;
      }

      newData[field.name] = field.value
    });
    console.log(newData)

    if (validation) {
      axios.post('http://localhost:8000/api/passenger/register', newData)
        .then(resp =>  {
          if (resp.data.success !== undefined) {
            $('#display_message').text(resp.data.success.message).attr('class', resp.data.success.type ===  'danger' ? 'alert alert-danger' : 'alert alert-success').css('display', 'block');
            $('#passenger_form')[0].reset();
          }
        })
        .catch(err => console.log(err));
    }
  }

  fetchInfectedPeople = e => {
    axios.get(`http://localhost:8000/api/infetcted_people/${parseInt(e.target.value)}`)
      .then(resp => this.setState({infectedPeople:resp.data}))
      .catch(err => console.log(err));
    console.log(e.target.value)
  }

  
  render() {
    //Get current passengers
    const indexOfLastPassenger = this.state.currentPage * this.state.passengerPerPage;
    const indexOfFirstPassenger = indexOfLastPassenger - this.state.passengerPerPage;
    const currentPassengers = this.state.passengers.slice(indexOfFirstPassenger, indexOfLastPassenger);

    //Change page
    const paginate = pageNum => this.setState({currentPage:pageNum})
    return (
      <Router>
        <React.Fragment>
          <Header user_id={this.state.user_id} onLogout={this.onLogout} />
          <div className="container" style={{ marginTop:'20px' }}>
          {
              this.state.isLoggedIn ? <Redirect to={'/main'} />
              : <Redirect to={'/'} />
          }
          <Route exact path='/' render={props => (
            <Home isLoggedIn={this.state.isLoggedIn} onAuthenticate={this.onAuthenticate} />
          )} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} /> 
          <Route 
            path='/main' 
            component={(props) => <Main {...props} 
            all_borders={this.state.borders} />}
            />
        
          <Route 
            path='/alert_case_page' 
            component={(props) => <AlertCasePage {...props} 
            passengers={currentPassengers} 
            passengerPerPage={this.state.passengerPerPage}
            totalPassengers={this.state.passengers.length}
            paginate={paginate}
            loading={this.state.loading}             
            />}
            
            />
          

          <Route path='/monitoring_page' component={(props) => <MonitoringPage />} />

          <Route 
            path='/passenger_form' 
            component={(props) => <PassengerForm {...props} 
            onSubmitPassengerForm={this.onSubmitPassengerForm} 
            all_hospitals={this.state.hospitals} 
            
            /> } />
            <Route 
              path='/hospital_page' 
              component={(props) => <HospitalPage {...props}   
                all_passengers={this.state.passengers}             
                all_hospitals={this.state.hospitals}
                fetchInfectedPeople={this.fetchInfectedPeople}
                infectedPeople={this.state.infectedPeople}

                />} />
          </div>
            <Footer />
          </React.Fragment>
      </Router>
    )
  }
}

export default App
