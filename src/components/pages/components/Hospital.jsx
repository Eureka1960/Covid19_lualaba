import React, { Component } from 'react'

export class Hospital extends Component {
    render() {
        return (
            <div>
                <input type="radio" name="hospital_name" onClick={this.props.fetchInfectedPeople.bind(this)}  value={this.props.hospital.id} /> {this.props.hospital.name}
            </div>
        )
    }
}

export default Hospital
