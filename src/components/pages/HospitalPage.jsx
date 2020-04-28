import React, { useState } from 'react'
import Hospital from './components/Hospital';

export default function HospitalPage(props) {
    const [hospital_name, setHospital] = useState(' Par...');
    let personInfectedCount = 0;
    const all_hospitals = props.all_hospitals;
    const infectedPeople = props.infectedPeople;
    let passengers = props.all_passengers;
    passengers = passengers.length > 0 ? passengers.filter(passenger => passenger.covid === 1)  : []

  return (
    <div>
      <h1 className="text-center text-uppercase text-info">Centre de prise en charge</h1>
      <div className="row">
          <div className="col-3">
              <h3 className="text-uppercase text-center">Etablissements</h3><hr/>
              <input type="radio" name="hospital_name" value="0" /> Tous
              {
                  all_hospitals.length > 0 ?
                    all_hospitals.map(hospital => 
                        <Hospital hospital={hospital} fetchInfectedPeople={props.fetchInfectedPeople} hospital_name={hospital_name} key={hospital.id} />
                    ) 
                    : ''
              }
          </div>
          <div className="col-9">
              <h3 className="text-uppercase text-center">Les Personnes prises en charge</h3><hr/>
              <div className="form-group">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom complet</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Téléphone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            passengers.length > 0 ? 
                            passengers.map(person => (
                                <tr key={person.id}>
                                    <th scope="row">{++personInfectedCount}</th>
                                    <td>{person.full_name}</td>
                                    <td>{person.gender !== 'F' ? 'Masculin' : 'Féminin'}</td>
                                    <td>{person.cell_phone}</td>
                                </tr>
                                ))
                            : <tr>
                                <td className="text-danger" colSpan="4">Pas de cas pris en charge ici</td>
                            </tr>
                        }
                        
                    </tbody>
                    </table>

                    {/* <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </table> */}
              </div>
          </div>
      </div>
    </div>
  )
}
