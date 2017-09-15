import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getPokemonForId } from '../../assets/utils'
import {
  formatDate,
  LONG_DATE_STRING,
} from '../../shared/utils'

export default class UserCatchTable extends Component {

  onAddCatchClick(event) {
    event.preventDefault()
  }

  renderCatchTable(catches) {
  	if (!catches.length) {
      return (<p className="mt-3 text-center">No catches recorded.</p>)
    }

    const rows = []

    // sort chronologically
    catches.sort((c1, c2) => {
      return new Date(c1.date) - new Date(c2.date)
    }).forEach(c => {
      const pokemon = getPokemonForId(c.pokemonId)
      const check = c.cord ?
        (<i className="fa fa-check" aria-hidden="true"></i>) :
        null

      rows.push(
        <tr key={ new Date(c.date).getTime() }>
          <td>{ pokemon ? pokemon.name : '' }</td>
          <td>{ c.locationName }</td>
          <td>{ formatDate(c.date, LONG_DATE_STRING) }</td>
          <td>{ check }</td>
        </tr>
      )
    })

  	return (
      <div className="mt-3" style={{ height: "250px", overflow: "auto" }}>
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th>Pokemon</th>
              <th>Location</th>
              <th>Date</th>
              <th>Geocoded?</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }

  render() {
  	const { catches } = this.props
    return (
      <div>
        { this.renderCatchTable(catches) }
        <div className="row justify-content-end mt-3 mr-1">
          <a href="#" data-toggle="modal" data-target="#catchModal" onClick={this.onAddCatchClick.bind(this)}>Add Catch</a>
        </div>
      </div>
    )
  }
}

UserCatchTable.propTypes = {
  catches: PropTypes.array.isRequired,
}