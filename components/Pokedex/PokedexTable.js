import React, { Component } from 'react'
import PropTypes from 'prop-types'

import pokedexGroups from './pokedexGroups'
import { getPokemonForId } from '../../assets/utils'
import './pokedexTable.css'

export default class PokedexTable extends Component {
  getImgSrc(id) {
    return require('../../assets/pokemon/' + id + '.png')
  }

  render() {
    const { pokedexPage, trainers } = this.props
    const ids = pokedexGroups[pokedexPage.text]

    const pokemon = ids.map(id => getPokemonForId(id))
    const trainerHeaders = trainers.map(t => {
      return <th key={t.username}>{t.username}</th>
    })
    
    const rows = []
    pokemon.forEach(p => {
      rows.push(
        <tr key={p.id}>
          <td>
            <img src={this.getImgSrc(p.id)} style={{ height: "50px", width: "50px" }}/>
          </td>
          <td/><td/><td/>
        </tr>
      )
    })

    return (
      <div className="mt-3">
        <table className="table table-nonfluid">
          <thead>
            <tr>
              <th className="col-xs-3">Pokemon</th>
              { trainerHeaders }
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }
}

PokedexTable.propTypes = {
  trainers: PropTypes.array.isRequired,
  pokedexPage: PropTypes.object.isRequired,
}
