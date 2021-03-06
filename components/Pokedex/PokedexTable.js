import React, { Component } from 'react'
import PropTypes from 'prop-types'

import pokemonTableData from './pokemonTableData'
import { getPokemonWithTag, getImgSrcForPokemonId } from '../../assets/utils'
import { PokedexDisplays } from '../../app/displayOptions'
import './pokedexTable.css'

export default class PokedexTable extends Component {
  onLinkClick(pokemon, event) {
    return (event) => {
      this.props.onAddPokemon(pokemon)
      event.preventDefault()
    }
  }

  getPokedexCheck(date) {
    return (
      <div>
        <i className="fa fa-check fa-2x" aria-hidden="true"></i>
        <span className="check-text">{ date }</span>
      </div>
    )
  }

  getAddPokedexLink(pokemon) {
    if (pokemon.disabled)
      return null

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

  getRowsForData(trainer, trainers, pokemon, data, isCollapsed) {
    return pokemon.map(p => {
      var everyoneHasIt = true
      const trainerData = trainers.map(t => {
        const dateStr = data[p.id][t.username]
        var content

        // if dateStr is null, trainer has not caught it
        if (dateStr)
          content = this.getPokedexCheck(dateStr)
        else {
          everyoneHasIt = false
          if (t._id == trainer._id)
           content = this.getAddPokedexLink(p)
        }

        return <td key={t._id} style={{ textAlign: "center" }}>{ content }</td>
      })

      if (isCollapsed && (p.disabled || everyoneHasIt))
          return null

      return (
        <tr key={p.id}>
          <td>
            <img src={getImgSrcForPokemonId(p.id)} title={p.name} style={{ height: "50px", width: "50px" }}/>
          </td>
          { trainerData }
        </tr>
      )
    })
  }

  render() {
    const {
      trainer,
      trainers,
      pokedexDisplay,
      pokedexPage,
    } = this.props

    const pokemon = getPokemonWithTag(pokedexPage.tag)
    const data = pokemonTableData(pokemon, trainers)
    const isCollapsed = pokedexDisplay == PokedexDisplays.COLLAPSED

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
            { this.getRowsForData(trainer, trainers, pokemon, data, isCollapsed) }
          </tbody>
        </table>
      </div>
    )
  }
}

PokedexTable.propTypes = {
  trainer: PropTypes.object.isRequired,
  trainers: PropTypes.array.isRequired,
  pokedexDisplay: PropTypes.string.isRequired,
  pokedexPage: PropTypes.object.isRequired,
  onAddPokemon: PropTypes.func.isRequired,
}
