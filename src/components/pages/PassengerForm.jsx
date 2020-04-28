import React, { useState } from 'react'

export default function PassengerForm(props) {

    let [hospitals, setHospitals] = useState(props.all_hospitals);
    let [body_tempeture, setBodyTempeture] = useState(36);
    let [main_symptome, setMainSymptome] = useState(false);
    let [lockdown, setLockdown] = useState(false);
    let [show_extra_div, setShowExtraDiv] = useState(false);


    const {all_borders} = props.location.state

    const onChangeValue = e => {
        switch (e.target.name) {
            case 'body_tempeture':
                setBodyTempeture(e.target.value);                
                break;
            case 'main_symptome':
                main_symptome = !main_symptome;
                setMainSymptome(main_symptome);
                main_symptome? setShowExtraDiv(true) : setShowExtraDiv(false)
                e.target.value = main_symptome
                console.log(e.target.value)
                break;
            case 'lockdown':
                lockdown = !lockdown
                setLockdown(lockdown);
                e.target.value = lockdown
                break;
            default:
                break;
        }
    }

  return (
    <div>
      <h1 className="text-center text-uppercase text-info">Formulaire Identification Citoyen en Transit</h1><hr/>
      <form onSubmit={props.onSubmitPassengerForm.bind(this)} id="passenger_form">
        <div className="alert alert-danger" id="display_message" style={{ display:'none' }}></div>
        <div className="form-group">
            <select name="borders_id" className="form-control">
                <option value="">Veullez selectionner votre frontière</option>
                {
                    all_borders.length > 0 ?
                    all_borders.map(border => (
                        <option value={border.id} key={border.id} >{border.name}</option>
                    ))
                    : ''
                }
            </select>
        </div>
        <div className="row">
            <div className="col-6">
                <h4 className="text-center text-primary text-uppercase">Controle Medical</h4>
                <div className="form-group">
                    <label htmlFor="body_tempeture">Température corporelle</label>
                    <input type="number" name="body_tempeture" className="form-control" min="0" max="50" onChange={onChangeValue}  value={body_tempeture} />
                    <span id="body_tempeture_error" className="text-danger"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="main_symptom">Signe Symptomatique</label> <br/>
                    <label>
                        <input type="checkbox" name="main_symptome" onChange={onChangeValue} value={main_symptome} /> Confirmation
                    </label>
                </div>
                <div id="div_infected_elements" style={{ display:show_extra_div ? 'block' : 'none' }} >
                    <div className="form-group">
                        <label htmlFor="hospitals_id">Hôpital de prise en charge</label>
                        <select name="hospitals_id" className="form-control">
                            <option value="none">veuillez selectionner un hôpital</option>
                            {
                                hospitals.length > 0 ?
                                    hospitals.map(hospital => (
                                        <option value={hospital.id} key={hospital.id}>{hospital.name}</option>
                                    ))
                                : ''
                            }
                        </select>
                        <span className="text-danger" id="hospitals_id_error"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name_person_to_contact">Nom de la personne à contacter</label>
                        <input type="text" name="name_person_to_contact" className="form-control"/>
                        <span className="text-danger" id="name_person_to_contact_error"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender_person_to_contact">Genre de la personne à contacter</label>
                        <select name="gender_person_to_contact" className="form-control">
                            <option value="none">Selectionner un genre</option>
                            <option value="F">Féminin</option>
                            <option value="M">Masculin</option>
                        </select>
                        <span className="text-danger" id="gender_person_to_contact_error"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_person_to_contact">Téléphone de la personne à contacter</label>
                        <input type="text" name="phone_person_to_contact" className="form-control"/>
                        <span className="text-danger" id="phone_person_to_contact_error"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address_person_to_contact">Adresse de la personne à contacter</label>
                        <input type="text" name="address_person_to_contact" className="form-control"/>
                        <span className="text-danger" id="address_person_to_contact_error"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="other_symptomes">Autres symptômes</label>
                    <select name="other_symptomes" className="form-control">
                        <option value="">Veuillez selectionner autre symptomes</option>
                        <option value="Convalescent">Convalescent</option>
                        <option value="Fievre">Fievre</option>
                        <option value="Rhume">Rhume</option>
                    </select>
                    <span className="text-danger" id="other_symptomes_error"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="lockdown">Mise en quarantaine</label> <br/>
                    <label>
                        <input type="checkbox" name="lockdown" onChange={onChangeValue} value={lockdown} /> Confirmation
                    </label>
                    <span className="text-danger" id="lockdown_error"></span>
                </div>
            </div>

            <div className="col-6">
                <h4 className="text-center text-uppercase">Renseignement de personne en transit</h4>
                <div className="form-group">
                    <label htmlFor="full_name">Nom complet</label>
                    <input type="text" name="full_name" className="form-control"/>
                    <span className="text-danger" id="full_name_error"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Genre</label>
                    <select name="gender" className="form-control">
                        <option value="">Selectionner un genre</option>
                        <option value="F">Féminin</option>
                        <option value="M">Masculin</option>
                    </select>
                    <span className="text-danger" id="gender_error"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="cell_phone">Téléphone</label>
                    <input type="text" name="cell_phone" className="form-control"/>
                    <span className="text-danger" id="cell_phone_error"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="address_from">Adresse Provenance</label>
                    <textarea name="address_from" cols="30" rows="1" className="form-control"></textarea>
                    <span className="text-danger" id="address_from_error"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="address_to">Adresse Destination</label>
                    <textarea name="address_to" cols="30" rows="1" className="form-control"></textarea>
                    <span className="text-danger" id="address_to_error"></span>
                </div>
            </div>            
        </div>
        <div className="float-right">
            <input type="submit" value="Confirmer" className="btn btn-success"/>
        </div> <div className="clear-fix"></div> <br/> <br/>
      </form>
    </div>
  )
}
