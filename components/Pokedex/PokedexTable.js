import React, { Component } from 'react'
import PropTypes from 'prop-types'

import pokedexGroups from './pokedexGroups'
import { getPokemonForId } from '../../assets/utils'
import pokemonTableData from './pokemonTableData'
import './pokedexTable.css'

export default class PokedexTable extends Component {
  onLinkClick(pokemon, event) {
    return (event) => {
      this.props.onAddPokemon(pokemon)
      event.preventDefault()
    }
  }

  getAddPokedexLink(pokemon) {
    return (
      <a
        href="#"
        data-toggle="modal"
        data-target="#addPokedexModal"
        onClick={this.onLinkClick(pokemon)}
      >
        Add
      </a>
    )
  }

  getTableHeaders(trainers) {
    return trainers.map(t => {
      return <th key={t.username}>{t.username}</th>
    })
  }

  getRowsForData(trainer, trainers, pokemon, data) {
    return pokemon.map(p => {
      const trainerData = trainers.map(t => {
        const dateStr = data[p.id][t.username]
        var content

        if (dateStr)
          content = 'Caught ' + dateStr
        else if (t._id == trainer._id)
          content = this.getAddPokedexLink(p)

        return <td key={t._id}>{ content }</td>
      })

      return (
        <tr key={p.id}>
          <td>
            <img src={this.getImgSrc(p.id)} style={{ height: "50px", width: "50px" }}/>
          </td>
          { trainerData }
        </tr>
      )
    })
  }

  getImgSrc(id) {
    return require('../../assets/pokemon/' + id + '.png')
  }

  render() {
    const {
      pokedexPage,
      trainer,
      trainers,
    } = this.props

    const ids = pokedexGroups[pokedexPage.text]
    const pokemon = ids.map(id => getPokemonForId(id))
    const data = pokemonTableData(pokemon, trainers)

    return (
      <div className="mt-3">
        <table className="table table-nonfluid">
          <thead>
            <tr>
              <th className="col-xs-3">Pokemon</th>
              { this.getTableHeaders(trainers) }
            </tr>
          </thead>
          <tbody>
            { this.getRowsForData(trainer, trainers, pokemon, data) }
          </tbody>
        </table>
      </div>
    )
  }
}

PokedexTable.propTypes = {
  trainer: PropTypes.object.isRequired,
  trainers: PropTypes.array.isRequired,
  pokedexPage: PropTypes.object.isRequired,
  onAddPokemon: PropTypes.func.isRequired,
}
