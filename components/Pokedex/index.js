import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PokedexTabs from './PokedexTabs'
import PokedexTable from './PokedexTable'
import AddPokedexModal from '../Modals/AddPokedexModal'
import { PokedexPages } from '../../app/displayOptions'

export default class Pokedex extends Component {
  constructor(props) {
    super(props)
    this.pokemonToAdd = {}
    this.onAddPokemon = this.onAddPokemon.bind(this)
  }

  onAddPokemon(pokemon) {
    this.pokemonToAdd = pokemon
    this.forceUpdate()
  }

  render() {
    const {
      trainer,
      trainers,
      catches,
      pokedexPage,
      setPokedexPage,
      onAddPokedex,
    } = this.props

    const trainersWithData = trainers.filter(t => t.xpUpdates.length > 0)
    return (
      <div className="mt-3">
        <h3>Pokedex</h3>
        <PokedexTabs pokedexPage={pokedexPage} setPokedexPage={setPokedexPage}/>
        <PokedexTable
          trainer={trainer}
          trainers={trainersWithData}
          catches={catches}
          pokedexPage={pokedexPage}
          onAddPokemon={this.onAddPokemon}
        />

        <AddPokedexModal pokemon={this.pokemonToAdd} onAddClick={onAddPokedex}/>
      </div>
    )
  }
}

Pokedex.propTypes = {
  trainer: PropTypes.object.isRequired,
  trainers: PropTypes.array.isRequired,
  catches: PropTypes.array.isRequired,
  pokedexPage: PropTypes.object.isRequired,
  setPokedexPage: PropTypes.func.isRequired,
  onAddPokedex: PropTypes.func.isRequired,
}
