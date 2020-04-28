import React from 'react'
import Pagination from './Pagination';

export default function AlertCasePage({passengers, loading, passengerPerPage, totalPassengers, paginate}) {

    if (loading) return <h2>Chargement...</h2>
    let passengerCount = 0;
    
    const onCheckCase = e => {
        const select_div = document.getElementById('select_div');
        const confirmed_input = document.getElementsByName('confirmed');
        console.log(confirmed_input);
        // if (e.target.value !== "") {
        //     select_div.style.display = 'block';
        // } else select_div.style.display = 'none';
        
    }
  return (
    <div>
      <h1 className="text-center text-info text-uppercase">Signaler un cas</h1><hr/>
      <div className="container">
          <div className="col-12" id="select_div" style={{ display:'none' }}>
              <div className="row">
                  <div className="col-6"></div>
                  <div className="col-6 form-group">
                      <select name="hospitals_id" className="form-control">
                          <option value="none">Veuillez selectionner un hôpital</option>
                          <option value="">Clinique</option>
                          <option value="">Gecamine</option>
                      </select>
                  </div>
              </div>
          </div>
        <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nom complet</th>
                <th scope="col">Genre</th>
                <th scope="col">Téléphone</th>
                <th scope="col">Signaler</th>
                <th scope="col">Signaler</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            {
                passengers.length > 0 ?
                    passengers.map(passenger => (
                        <tr key={passenger.id}>
                            <th scope="row">{++passengerCount}</th>
                            <td>{passenger.full_name}</td>
                            <td>{passenger.gender !== 'M' ? 'Féminin' :  'Masculin'}</td>
                            <td>{passenger.cell_phone}</td>
                            <td>
                                <input type="checkbox" name="confirmed" onClick={onCheckCase} data-field_name={passenger.id} value={false} />
                            </td>
                            <td>
                                <button className="btn btn-default btn-xs">
                                    Edit
                                </button>
                                <button className="btn btn-default btn-xs text-danger">Delete</button>
                            </td>
                        </tr>
                    ))
                : <tr>
                    <td className="text-center text-danger" colSpan="4">Aucun citoyen enregistré !!!</td>
                </tr>
            }            
        </tbody>
        </table>
      </div>
      <Pagination passengerPerPage={passengerPerPage} totalPassengers={totalPassengers} paginate={paginate} />
    </div>
  )
}
