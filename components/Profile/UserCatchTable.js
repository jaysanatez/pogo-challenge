import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProfileTable from './ProfileTable'
import { getPokemonForId } from '../../assets/utils'
import {
  formatDate,
  LONG_DATE_STRING,
} from '../../shared/utils'

export default class UserCatchTable extends Component {
  constructor(props) {
    super(props)
    this.onAddCatchClick = this.onAddCatchClick.bind(this)
  }

  onAddCatchClick(event) {
    event.preventDefault()
  }

  sortCatches(catches) {
    return catches.sort((c1, c2) => {
      return new Date(c1.date) - new Date(c2.date)
    })
  }

  buildRowFromCatch(c) {
    const pokemon = getPokemonForId(c.pokemonId)
    const check = c.cord ?
      (<i className="fa fa-check" aria-hidden="true"></i>) :
      null

    return (
      <tr key={ c._id }>
        <td>{ pokemon ? pokemon.name : '' }</td>
        <td>{ c.locationName }</td>
        <td>{ formatDate(c.date, LONG_DATE_STRING) }</td>
        <td>{ check }</td>
      </tr>
    )
  }

  render() {
  	const { catches } = this.props
    const headerTitles = ['Pokemon', 'Location', 'Date', 'Geocoded?']

    return (
      <div>
        <ProfileTable
          headerTitles={headerTitles}
          emptyText="No catches recorded."
          data={this.sortCatches(catches)}
          getRowFunc={this.buildRowFromCatch}
        />
        <div className="row justify-content-end mt-3 mr-1">
          <a href="#" data-toggle="modal" data-target="#addCatchModal" onClick={this.onAddCatchClick}>Add Catch</a>
        </div>
      </div>
    )
  }
}

UserCatchTable.propTypes = {
  catches: PropTypes.array.isRequired,
}