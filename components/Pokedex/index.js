import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PokedexTabs from './PokedexTabs'
import PokedexTable from './PokedexTable'
import AddPokedexModal from '../Modals/AddPokedexModal'
import ToggleHeader from '../shared/ToggleHeader'
import { PokedexDisplays, PokedexPages } from '../../app/displayOptions'

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
      pokedexDisplay,
      pokedexPage,
      setPokedexDisplay,
      setPokedexPage,
      onAddPokedex,
    } = this.props

    const trainersWithData = trainers.filter(t => t.xpUpdates.length > 0 || t._id == trainer._id)
    return (
      <div className="mt-3">
        <ToggleHeader
          title="Pokedex"
          enumObject={PokedexDisplays}
          value={pokedexDisplay}
          onValueChange={setPokedexDisplay}
        />
        <PokedexTabs pokedexPage={pokedexPage} setPokedexPage={setPokedexPage}/>
        <PokedexTable
          trainer={trainer}
          trainers={trainersWithData}
          catches={catches}
          pokedexDisplay={pokedexDisplay}
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
  pokedexDisplay: PropTypes.string.isRequired,
  pokedexPage: PropTypes.object.isRequired,
  setPokedexDisplay: PropTypes.func.isRequired,
  setPokedexPage: PropTypes.func.isRequired,
  onAddPokedex: PropTypes.func.isRequired,
}
